from rest_framework import serializers
from .models import Record

class NewRecordSerializer(serializers.ModelSerializer):
  class Meta:
    model = Record
    fields = ('title', 'image', )