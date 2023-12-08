from django.contrib import admin
from subscriptions.models import StripeCustomer


admin.site.register(StripeCustomer)
