from django.urls import path
from .views import redirect_view


urlpatterns = [
  path('', redirect_view, name='redirect_view'),

]
