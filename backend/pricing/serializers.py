from rest_framework import serializers
from .models import Pricing, Feature


class FeatureSerializer(serializers.ModelSerializer):
  class Meta:
    model = Feature
    fields = ('name',)


class PricingSerializer(serializers.ModelSerializer):
  features = FeatureSerializer(many=True)

  class Meta:
    model = Pricing
    fields = ('title', 'price', 'currency', 'features')
