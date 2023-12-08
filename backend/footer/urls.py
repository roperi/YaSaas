from django.urls import path
from .views import FooterListView

urlpatterns = [
  path('', FooterListView.as_view()),
]
