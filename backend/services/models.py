from django.db import models


class Service(models.Model):
  title = models.CharField(max_length=50)
  description = models.CharField(max_length=250)
  icon = models.CharField(max_length=30)  # Material Icon name

  class Meta:
    verbose_name = 'Service'
    verbose_name_plural = 'Services'

  def __str__(self):
    return self.title
