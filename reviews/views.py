from django.core.exceptions import PermissionDenied
from django.http.response import HttpResponse
from rest_framework.exceptions import NotFound

from .models import Review
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ReviewSerializer

from rest_framework.permissions import IsAuthenticatedOrReadOnly

class ReviewDetailView(APIView):

    permission_classes = (IsAuthenticatedOrReadOnly, )

    def delete(self, request, pk):
        try:
            review = Review.objects.get(id=pk)
        except Review.DoesNotExist:
            raise NotFound()
        if review.owner != request.user:
            raise PermissionDenied()
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def put(self, request, pk):
        review = Review.objects.get(id=pk)
        updated_review = ReviewSerializer(review, data=request.data)
        if updated_review.is_valid():
            updated_review.save()
            return Response(updated_review.data, status=status.HTTP_202_ACCEPTED)
        else:
            return Response(updated_review.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def get(self, request, pk):
        review = Review.objects.get(id=pk)
        serialized_review = ReviewSerializer(review)
        return Response(serialized_review.data,status=status.HTTP_200_OK)

class ReviewListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def post(self,request):
        request.data["owner"] = request.user.id
        print('->>>>>', request.user.id)
        review = ReviewSerializer(data = request.data)
        
        if review.is_valid():
            review.save() # <--- django ORM method to save to db
            return Response(review.data, status=status.HTTP_201_CREATED)
        else:
            return Response(review.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


    def get(self,request):
        reviews = Review.objects.all()
        serialized_reviews = ReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data, status=status.HTTP_200_OK)
