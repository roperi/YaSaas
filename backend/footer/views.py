from rest_framework.generics import ListAPIView
from rest_framework import permissions

from .models import Footer
from .serializers import FooterSerializer


class FooterListView(ListAPIView):
  permission_classes = (permissions.AllowAny, )
  queryset = Footer.objects.all()
  serializer_class = FooterSerializer
  pagination_class = None
