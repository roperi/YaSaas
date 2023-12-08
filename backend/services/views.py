from rest_framework.generics import ListAPIView
from rest_framework import permissions

from .models import Service
from .serializers import ServiceSerializer


class ServiceListView(ListAPIView):
  permission_classes = (permissions.AllowAny, )
  queryset = Service.objects.all()
  serializer_class = ServiceSerializer
  pagination_class = None
