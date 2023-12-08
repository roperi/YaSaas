from django.db import models


class Hero(models.Model):
  title = models.CharField(max_length=200)
  description = models.CharField(max_length=300)

  class Meta:
    verbose_name = 'Hero'
    verbose_name_plural = 'Hero'

  def __str__(self):
    return self.title
