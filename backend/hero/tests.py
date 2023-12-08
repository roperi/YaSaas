from django.test import TestCase
from .models import Hero


class HeroModelUnitTestCase(TestCase):
  def setUp(self):
    self.hero = Hero.objects.create(
      title='Lorem ipsum dolor sit amet',
      description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt quis odio id.',
    )

  def test_hero_model(self):
    data = self.hero
    self.assertIsInstance(data, Hero)
