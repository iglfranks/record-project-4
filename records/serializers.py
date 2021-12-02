from rest_framework import serializers
from reviews.models import Review

# from reviews.serializers import ReviewSerializer
from reviews.populated_serializer import PopulatedReviewSerializer
from .models import Record
from artists.serializers import ArtistSerializer

from jwt_auth.serializers import UserSerializer

class RecordSerializer(serializers.ModelSerializer):
  class Meta:
    model = Record
    fields = '__all__'

class PopulatedRecordSerializer(RecordSerializer):
  artists = ArtistSerializer(many=True)

  review_set = PopulatedReviewSerializer(read_only=True, many=True)
  owner = UserSerializer()