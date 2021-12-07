from django.db import models

class Favourite(models.Model):
  owner = models.ForeignKey(
    "jwt_auth.User",
    related_name="favourites",
    on_delete = models.CASCADE
  )
  record = models.ForeignKey("records.Record", on_delete=models.CASCADE)

  # def __str__(self):
  #   return f'{}'

