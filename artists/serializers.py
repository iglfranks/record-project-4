from rest_framework import serializers

# from records.serializers import RecordSerializer
from .models import Artist

class ArtistSerializer(serializers.ModelSerializer):
  class Meta:
    model = Artist
    fields = '__all__'
    # fields = ('name', )

  # record_set = RecordSerializer(read_only=True, many=True)