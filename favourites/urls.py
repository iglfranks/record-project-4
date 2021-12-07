from django.urls import path
from .views import FavouriteDetailView, FavouriteListView 

urlpatterns = [
    path('', FavouriteListView.as_view()),
    path('<int:pk>', FavouriteDetailView.as_view())

]