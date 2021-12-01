from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Record
from .serializers import RecordSerializer, PopulatedRecordSerializer

class RecordListView(APIView):

  def get(self, _request):
    records = Record.objects.all()
    # serialized_records = RecordSerializer(records, many=True)
    serialized_records = PopulatedRecordSerializer(records, many=True)

    return Response(serialized_records.data, status=status.HTTP_200_OK)

class RecordDetailView(APIView):
  def get(self, request, pk):
    record = Record.objects.get(id=pk)
    # serialized_record = RecordSerializer(record)
    serialized_record = PopulatedRecordSerializer(record)
    return Response(serialized_record.data, status=status.HTTP_200_OK)