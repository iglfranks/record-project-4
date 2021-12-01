from django.db import models

class Artist(models.Model):

  name = models.CharField(max_length=100, default=None)
  image = models.CharField(max_length=100, default=None)
  social_link = models.CharField(max_length=100, default=None)

  def __str__(self):
    return f'{self.name}'