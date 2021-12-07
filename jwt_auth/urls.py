from django.urls import path
from .views import ProfileDetailView, RegisterView, LoginView, ProfileListView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', ProfileListView.as_view()),
    path('user/<int:pk>', ProfileDetailView.as_view()),
    # path('profile/', ProfileDetailView.as_view())
]
