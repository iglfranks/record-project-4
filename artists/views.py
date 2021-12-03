from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Artist
from .serializers import ArtistSerializer
from .serializers import PopulatedArtistSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ArtistDetailView(APIView):
  def get(self, request, pk):
    artist = Artist.objects.get(id=pk)
    serialized_artist = ArtistSerializer(artist)
    return Response(serialized_artist.data, status=status.HTTP_200_OK)


class ArtistListView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def post(self, request):
    artist = ArtistSerializer(data = request.data)
    if artist.is_valid():
      artist.save()
      return Response(artist.data, status=status.HTTP_201_CREATED)
    else:
      return Response(artist.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def get(self, _request):
    artists = Artist.objects.all()
    # serialized_artists = ArtistSerializer(artists, many=True)
    serialized_artists = PopulatedArtistSerializer(artists, many=True)

    return Response(serialized_artists.data, status=status.HTTP_200_OK)
