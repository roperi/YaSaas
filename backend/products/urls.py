from django.urls import path
from .views import ProductListView

urlpatterns = [
  path('', ProductListView.as_view()),
]
