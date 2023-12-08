from django.test import TestCase
from .models import Footer


class FooterModelUnitTestCase(TestCase):
  def setUp(self):
    self.footer = Footer.objects.create(
      copyright="Copyright © 2023 Bob's Programming Academy.",
    )

  def test_footer_model(self):
    data = self.footer
    self.assertIsInstance(data, Footer)
