from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


from .models import Record
from .serializers import RecordSerializer

class RecordListView(APIView):

  def get(self, _request):
    records = Record.objects.all()
    serialized_records = RecordSerializer(records, many=True)

    return Response(serialized_records.data, status=status.HTTP_200_OK)
