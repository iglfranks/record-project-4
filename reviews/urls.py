from django.urls import path
from .views import ReviewListView, ReviewDetailView

urlpatterns = [
    path('<int:pk>/', ReviewDetailView.as_view()),
    path('', ReviewListView.as_view()),
]