from django.urls import path
from .views import RecordDetailView, RecordListView

urlpatterns = [
  path('', RecordListView.as_view()),
  path('<int:pk>', RecordDetailView.as_view())
]