from django.urls import path , include
from account.views import UserRegistrationView, UserLoginView, UserProfileView, UserChangePasswordView, UserPasswordResetEmailView, UserPasswordResetView


urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', UserChangePasswordView.as_view(), name='change-password'),
    path('reset-password-email/', UserPasswordResetEmailView.as_view(), name='reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password')
]
