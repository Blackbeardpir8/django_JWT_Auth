from django.urls import path , include

#For API
from account.views import UserRegistrationView, UserLoginView, UserProfileView, UserChangePasswordView, UserPasswordResetEmailView, UserPasswordResetView

#For Frontend
from account.views import register_page

urlpatterns = [
    # API URLs
    path('api/user/register/', UserRegistrationView.as_view(), name='register'),
    path('api/user/login/', UserLoginView.as_view(), name='login'),
    path('api/user/profile/', UserProfileView.as_view(), name='profile'),
    path('api/user/change-password/', UserChangePasswordView.as_view(), name='change-password'),
    path('api/user/reset-password-email/', UserPasswordResetEmailView.as_view(), name='reset-password-email'),
    path('api/user/reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),

    # Frontend URLs
    path('register/', register_page, name='register_page'),
]