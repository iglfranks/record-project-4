from jwt_auth.serializers import UserSerializer
from .serializers import ReviewSerializer

class PopulatedReviewSerializer(ReviewSerializer):
  owner = UserSerializer()