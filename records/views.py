from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Record
from .serializers import RecordSerializer, PopulatedRecordSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly

class RecordListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def post(self, request):
    request.data['owner'] = request.user.id
    print('->>>>>>', request.data)
    record = RecordSerializer(data = request.data)
    if record.is_valid():
      record.save()
      return Response(record.data, status=status.HTTP_201_CREATED)
    else:
      return Response(record.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def get(self, _request):
    records = Record.objects.all()
    # serialized_records = RecordSerializer(records, many=True)
    serialized_records = PopulatedRecordSerializer(records, many=True)

    return Response(serialized_records.data, status=status.HTTP_200_OK)



class RecordDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )

  def delete(self, request, pk):
    try:
      record = Record.objects.get(id=pk)
      record.delete()
    except:
      return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(status=status.HTTP_204_NO_CONTENT)

  def put(self, request, pk):
    record = Record.objects.get(id=pk)
    updated_record = RecordSerializer(record, data=request.data)
    if updated_record.is_valid():
      updated_record.save()
      return Response(updated_record.data, status=status.HTTP_202_ACCEPTED)
    else:
      return Response(updated_record.errors, status=-status.HTTP_422_UNPROCESSABLE_ENTITY)

  def get(self, request, pk):
    record = Record.objects.get(id=pk)
    # serialized_record = RecordSerializer(record)
    serialized_record = PopulatedRecordSerializer(record)
    return Response(serialized_record.data, status=status.HTTP_200_OK)