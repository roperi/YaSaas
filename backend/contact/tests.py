from django.test import TestCase
from .models import Contact


class ContactModelUnitTestCase(TestCase):
  def setUp(self):
    self.contact = Contact.objects.create(
      address='Dublin, Ireland',
      email='bob@test.com',
      phone='123456789',
      latitude='53.350140',
      longitude='-6.266155'
    )

  def test_contact_model(self):
    data = self.contact
    self.assertIsInstance(data, Contact)
