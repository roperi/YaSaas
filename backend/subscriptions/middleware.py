from subscriptions.models import StripeCustomer
import stripe
from django.conf import settings

class SubscriptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user = request.user

        if user.is_authenticated and user.is_staff:
            try:
                stripe_customer = StripeCustomer.objects.get(user=user)
                stripe.api_key = settings.STRIPE_SECRET_KEY
                subscription = stripe.Subscription.retrieve(stripe_customer.stripeSubscriptionId)

                if subscription.status != "active":
                    # User has an inactive subscription, remove staff status
                    user.is_staff = False
                    user.save()

            except StripeCustomer.DoesNotExist:
                # Handle the case where StripeCustomer doesn't exist for the user
                pass

        response = self.get_response(request)
        return response
