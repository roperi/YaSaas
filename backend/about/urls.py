from django.urls import path
from .views import AboutListView

urlpatterns = [
  path('', AboutListView.as_view()),
]
