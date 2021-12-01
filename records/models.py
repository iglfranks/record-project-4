from django.db import models

class Record(models.Model):

  RECORD_TYPES = (
    ('single', 'Single Release'),
    ('EP', 'Extended Project'),
    ('LP', 'Long Play'),
    ('V/A', 'Artist Compilation')
  )

  title = models.CharField(max_length=100, default=None)
  image = models.CharField(max_length=100, default=None)
  release_date = models.IntegerField(default=None)
  label = models.CharField(max_length=100, default=None)
  genre = models.CharField(max_length=100, default=None)
  type_of_record = models.CharField(max_length=100, choices=RECORD_TYPES, default=None)
  is_vinyl_only = models.BooleanField(default=None)
  link = models.CharField(max_length=200, default=None)

  def __str__(self):
    return f'{self.title}'





