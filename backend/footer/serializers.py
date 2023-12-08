from rest_framework import serializers
from .models import Footer


class FooterSerializer(serializers.ModelSerializer):
  class Meta:
    model = Footer
    fields = '__all__'
