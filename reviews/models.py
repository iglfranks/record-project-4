from django.db import models

class Review(models.Model):
  comment = models.TextField()
  rating = models.IntegerField()
  record = models.ForeignKey("records.Record", on_delete=models.CASCADE)
  owner = models.ForeignKey(
    "jwt_auth.User",
    related_name="reviews",
    on_delete = models.CASCADE
  )

  def __str__(self):
    return f'{self.record} Review: {self.rating}/5 {self.comment}'
