from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterUserView

urlpatterns =[
    # Authentication
    path('auth/', include('rest_framework.urls')),
    path('auth/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('auth/register/', RegisterUserView.as_view(), name='register'),
]