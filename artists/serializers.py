from rest_framework import serializers
# from records.models import Record


# from records.serializers import RecordSerializer
from .models import Artist

class ArtistSerializer(serializers.ModelSerializer):
  class Meta:
    model = Artist
    fields = '__all__'
    # fields = ('name', )

  

from records.single_serializer import NewRecordSerializer

class PopulatedArtistSerializer(ArtistSerializer):

  record_set = NewRecordSerializer(read_only=True, many=True)
