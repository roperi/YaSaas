from django.test import TestCase
from .models import Product


class ProductModelUnitTestCase(TestCase):
  def setUp(self):
    self.product = Product.objects.create(
      name='Lorem ipsum dolor sit amet',
      description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt quis odio id.'
    )

  def test_product_model(self):
    data = self.product
    self.assertIsInstance(data, Product)
