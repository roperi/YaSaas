import logging
import stripe
from django.conf import settings
from django.contrib.auth.models import User, Group
from django.http.response import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import StripeCustomer


@csrf_exempt
def stripe_config(request):
    if request.method == 'GET':
        stripe_config = {'publicKey': settings.STRIPE_PUBLISHABLE_KEY}
        return JsonResponse(stripe_config, safe=False)


@csrf_exempt
def stripe_webhook(request):
    logger = logging.getLogger('subscriptions')

    stripe.api_key = settings.STRIPE_SECRET_KEY
    endpoint_secret = settings.STRIPE_ENDPOINT_SECRET
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        logger.info(f"Processing an `{event.get('type')}` Stripe event")
        session = event['data']['object']

        # Fetch all the required data from session
        client_reference_id = session.get('client_reference_id')
        stripe_customer_id = session.get('customer')
        stripe_subscription_id = session.get('subscription')

        # Get the user and create a new StripeCustomer
        user = User.objects.get(id=client_reference_id)
        StripeCustomer.objects.create(
            user=user,
            stripeCustomerId=stripe_customer_id,
            stripeSubscriptionId=stripe_subscription_id,
        )
        logger.info(f'{user.username} (user #{client_reference_id}) just subscribed.')

        # Get product name from subscription data (will be used as Group name)
        stripe_customer = StripeCustomer.objects.get(user=client_reference_id)
        stripe.api_key = settings.STRIPE_SECRET_KEY
        subscription = stripe.Subscription.retrieve(stripe_customer.stripeSubscriptionId)
        product_name = stripe.Product.retrieve(subscription.plan.product).name

        # Add Group to user
        logger.info(f'Adding {user.username} (user #{user.id}) to Group `{product_name}`')
        user.groups.add(Group.objects.get(name=product_name))

        # Add staff status to user
        logger.info(f'Granting {user.username} (user #{user.id}) with staff status')
        user.is_staff = True
        user.save()

    elif event.get('type') == 'customer.subscription.deleted':
        logger.info(f"Processing an `{event.get('type')}` Stripe event")

        # Get product name from subscription data (will be used as Group name)
        stripe_customer_id = event.get('data').get('object').get('customer')
        user = User.objects.get(id=StripeCustomer.objects.get(stripeCustomerId=stripe_customer_id).user_id)
        stripe_customer = StripeCustomer.objects.get(user=user)
        stripe.api_key = settings.STRIPE_SECRET_KEY
        subscription = stripe.Subscription.retrieve(stripe_customer.stripeSubscriptionId)
        product_name = stripe.Product.retrieve(subscription.plan.product).name

        # Remove Group from user
        logger.info(f'Removing {user.username} (user #{user.id}) from Group `{product_name}`')
        user.groups.remove(Group.objects.get(name=product_name))

        # Revoke staff status to user
        logger.info(f'Revoking {user.username} (user #{user.id}) staff status')
        user.is_staff = False
        user.save()

    else:
        logger.info('')
        logger.info('')
        logger.info(f"Event {event.get('type')} is not one of the available choices so it won't be handled")

    return HttpResponse(status=200)
