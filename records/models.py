from django.db import models

class Record(models.Model):

  RECORD_TYPES = (
    ('single', 'Single Release'),
    ('EP', 'Extended Project'),
    ('LP', 'Long Play'),
    ('V/A', 'Artist Compilation')
  )

  RECORD_GENRES = (
    ('UKG', 'UKG'),
    ('Breaks', 'Breaks'),
    ('Jungle', 'Jungle'),
    ('House', 'House'),
    ('Drum and Bass', 'Drum and Bass'),
    ('Techno', 'Techno'),
    ('Dubstep', 'Dubstep'),
    ('Other', 'Other')
  )

  title = models.CharField(max_length=100, default=None)
  image = models.CharField(max_length=100, default=None)
  release_date = models.IntegerField(default=None)
  label = models.CharField(max_length=100, default=None)
  genre = models.CharField(max_length=100, choices=RECORD_GENRES, default=None)
  type_of_record = models.CharField(max_length=100, choices=RECORD_TYPES, default=None)
  is_vinyl_only = models.BooleanField(default=None)
  link = models.CharField(max_length=200, default=None)
  artists = models.ManyToManyField("artists.Artist")
  owner = models.ForeignKey(
    "jwt_auth.User",
    related_name = 'records',
    on_delete = models.CASCADE
  )

  def __str__(self):
    return f'{self.title}'





