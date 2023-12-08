from django.test import TestCase
from .models import Service


class ServiceModelUnitTestCase(TestCase):
  def setUp(self):
    self.service = Service.objects.create(
      title='Service 1',
      description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt quis odio id.',
      icon='settings'
    )

  def test_service_model(self):
    data = self.service
    self.assertIsInstance(data, Service)
