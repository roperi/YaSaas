from django.db import models


class Footer(models.Model):
  copyright = models.CharField(max_length=200)

  class Meta:
    verbose_name = 'Footer'
    verbose_name_plural = 'Footer'

  def __str__(self):
    return self.copyright
