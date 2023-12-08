from django.test import TestCase
from .models import About


class AboutModelUnitTestCase(TestCase):
  def setUp(self):
    self.about = About.objects.create(
      value=90,
      suffix='+',
      description='Lorem ipsum dolor sit amet'
    )

  def test_about_model(self):
    data = self.about
    self.assertIsInstance(data, About)
