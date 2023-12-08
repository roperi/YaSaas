from django.db import models


class BasicData(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    value = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name_plural = 'DATA PRODUCT - Basic data'

    def __str__(self):
        return self.name


class ValuableData(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    value = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name_plural = 'DATA PRODUCT - Valuable data 1'

    def __str__(self):
        return self.name


class AnotherValuableData(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    value = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name_plural = 'DATA PRODUCT - Valuable data 2'

    def __str__(self):
        return self.name