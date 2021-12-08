from rest_framework import serializers
from .models import Review

class NewReviewSerializer(serializers.ModelSerializer):
  serializers.StringRelatedField(many=True)

  class Meta:
    model = Review
    fields = '__all__'