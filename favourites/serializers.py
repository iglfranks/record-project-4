from rest_framework import serializers
# from records.serializers import PopulatedRecordSerializer

from records.single_serializer import NewRecordSerializer
# from reviews.populated_serializer import PopulatedReviewSerializer
from .models import Favourite

class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = '__all__'

class PopulatedFavouriteSerializer(FavouriteSerializer):

  record_set = NewRecordSerializer(read_only=True, many=True)