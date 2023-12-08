from django.urls import path
from .views import PricingListView

urlpatterns = [
  path('', PricingListView.as_view()),
]
