from django.db import models


class Feature(models.Model):
  name = models.CharField(max_length=30)

  def __str__(self):
    return self.name


class Pricing(models.Model):
  title = models.CharField(max_length=50)
  price = models.FloatField()
  currency = models.CharField(max_length=5)
  features = models.ManyToManyField(Feature)

  class Meta:
    verbose_name = 'Pricing'
    verbose_name_plural = 'Pricing'

  def __str__(self):
    return self.title
