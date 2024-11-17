from django.urls import include, path, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ChatRoomMessageListAPIView, ChatRoomsListView, RegisterUserView, MyProfileView, UserProfileView

urlpatterns = [
    # Authentication
    path('auth/', include('rest_framework.urls')),
    path('auth/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('auth/register/', RegisterUserView.as_view(), name='register'),

    # Profile
    path('profile/', MyProfileView.as_view(), name="my-profile"),
    path('profile/<str:username>/', UserProfileView.as_view(), name="user-profile"),

    # Room
    path('rooms/', ChatRoomsListView.as_view(), name="get-rooms"),
    path('room/<int:pk>/messages/', ChatRoomMessageListAPIView.as_view(), name='room-messages'),
    # path('room/<int:room_id>/messages/create/', MessageCreateAPIView.as_view(), name='message-create'),
]