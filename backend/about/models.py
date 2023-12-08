from django.db import models


class About(models.Model):
  value = models.IntegerField()
  suffix = models.CharField(max_length=1)
  description = models.CharField(max_length=250)

  class Meta:
    verbose_name = 'About'
    verbose_name_plural = 'About'

  def __str__(self):
    return f'{self.value}{self.suffix}'
