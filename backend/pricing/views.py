from rest_framework.generics import ListAPIView
from rest_framework import permissions

from .models import Pricing
from .serializers import PricingSerializer


class PricingListView(ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Pricing.objects.all()
    serializer_class = PricingSerializer
    pagination_class = None


