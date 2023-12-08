from django.db import models
from django.core.files.base import ContentFile
from io import BytesIO
from PIL import Image


class Product(models.Model):
  name = models.CharField(max_length=100)
  description = models.CharField(max_length=200)
  image = models.ImageField(upload_to='images')

  # override the save method and
  # use the Image class of the PIL package
  # to convert it to JPEG
  def save(self, *args, **kwargs):
    if self.image:
      filename = "%s.jpg" % self.image.name.split('.')[0]

      image = Image.open(self.image)
      # for PNG images discard the alpha channel and fill it with some color
      if image.mode in ('RGBA', 'LA'):
        background = Image.new(image.mode[:-1], image.size, '#fff')
        background.paste(image, image.split()[-1])
        image = background
        image_io = BytesIO()
        image.save(image_io, format='JPEG', quality=100)

        # change the image field value to be the newly modified image value
        self.image.save(filename, ContentFile(image_io.getvalue()), save=False)
    super(Product, self).save(*args, **kwargs)

  def __str__(self):
    return self.name
