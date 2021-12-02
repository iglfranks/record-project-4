from django.urls import path
from .views import ProfileDetailView, RegisterView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    # path('<int:pk>', ProfileDetailView.as_view())
]
