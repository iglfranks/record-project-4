from rest_framework import serializers
from django.contrib.auth import get_user_model
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from favourites.serializers import FavouriteSerializer, PopulatedFavouriteSerializer
from records.single_serializer import NewRecordSerializer

from reviews.serializers import ReviewSerializer
from reviews.singleSeri import NewReviewSerializer
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = '__all__'

    

class PopulatedUserSerializer(UserSerializer):
  # serializers.StringRelatedField(many=True)
  reviews = NewReviewSerializer(read_only=True, many=True)
  records = NewRecordSerializer(read_only=True, many=True)
  favourites = PopulatedFavouriteSerializer(read_only=True, many=True)