from django.urls import path
from .views import ServiceListView

urlpatterns = [
  path('', ServiceListView.as_view()),
]
