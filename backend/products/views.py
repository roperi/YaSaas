from rest_framework.generics import ListAPIView
from rest_framework import permissions

from .models import Product
from .serializers import ProductSerializer


class ProductListView(ListAPIView):
  permission_classes = (permissions.AllowAny, )
  queryset = Product.objects.all()
  serializer_class = ProductSerializer
  pagination_class = None
