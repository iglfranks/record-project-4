from django.core.exceptions import PermissionDenied
from django.http.response import HttpResponse
from rest_framework.exceptions import NotFound

from .models import Favourite
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FavouriteSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly

class FavouriteListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self,request):
        faves = Favourite.objects.all()
        serialized_faves = FavouriteSerializer(faves, many=True)
        return Response(serialized_faves.data, status=status.HTTP_200_OK)

  def post(self, request):
      request.data["owner"] = request.user.id
      fave = FavouriteSerializer(data = request.data)
      if fave.is_valid():
        fave.save() 
        return Response(fave.data, status=status.HTTP_201_CREATED)
      else:
        return Response(fave.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class FavouriteDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, request, pk):
        fave = Favourite.objects.get(id=pk)
        serialized_fave = FavouriteSerializer(fave)
        return Response(serialized_fave.data, status=status.HTTP_200_OK)

  def delete(self, request, pk):
        try:
            fave = Favourite.objects.get(id=pk)
        except Favourite.DoesNotExist:
            raise NotFound()
        if fave.owner != request.user:
            raise PermissionDenied()
        fave.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
