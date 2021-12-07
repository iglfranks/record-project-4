from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework import status
import jwt
from .serializers import PopulatedUserSerializer, UserSerializer
User = get_user_model()

from rest_framework.permissions import IsAuthenticatedOrReadOnly

class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)

        # try:
        #   serializer = UserSerializer(data=request.data)
        #   if serializer.is_valid():
        #     serializer.save()
        #     return Response({'message': 'Registration successful'})
        # except serializer.is_valid():
        #   # raise PermissionDenied({'message': 'Invalid'})
        #   return Response(serializer.errors, status=422)


class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})

class ProfileListView(APIView):

  # def get(self, request, pk):
  #   user = User
  #   print('User->>>', vars(user))

  def get(self, _request):
    users = User.objects.all()
    serialized_users = UserSerializer(users, many=True)

    return Response(serialized_users.data, status=200)

class ProfileDetailView(APIView):

  permission_classes = (IsAuthenticatedOrReadOnly, )

  def get(self, request, pk):
    try: 
      user = User.objects.get(id=pk)
    except User.DoesNotExist():
      raise PermissionDenied({'message': 'Invalid credentials'})

    serialized_user = PopulatedUserSerializer(user)
    return Response(serialized_user.data, status=200)

  # def get(self, request):
  #   user = User.objects.get()
  #   serialized_user = PopulatedUserSerializer(user, many=True)
  #   return Response(serialized_user.data, status=200)

  def put(self, request, pk):
    user = User.objects.get(id=pk)
    updated_user = UserSerializer(user, data=request.data)
    if updated_user.is_valid():
      updated_user.save()
      return Response(updated_user.data, status=status.HTTP_202_ACCEPTED)
    else:
      return Response(updated_user.errors, status=-status.HTTP_422_UNPROCESSABLE_ENTITY)

    # ^^^^ ERROR HANDLING DOESNT WORK