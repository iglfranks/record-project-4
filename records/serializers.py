from rest_framework import serializers
from .models import Record
from artists.serializers import ArtistSerializer

class RecordSerializer(serializers.ModelSerializer):
  class Meta:
    model = Record
    fields = '__all__'

class PopulatedRecordSerializer(RecordSerializer):
  artists = ArtistSerializer(many=True)