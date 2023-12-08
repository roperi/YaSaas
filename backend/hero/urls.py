from django.urls import path
from .views import HeroListView

urlpatterns = [
  path('', HeroListView.as_view()),
]
