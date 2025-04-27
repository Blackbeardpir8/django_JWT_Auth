from django.urls import path 

#For API
from account.views import UserRegistrationView, UserLoginView, UserProfileView, UserChangePasswordView, UserPasswordResetEmailView, UserPasswordResetView

#For Frontend
from account.views import register_page,login_page,profile_page,change_password_page,reset_password_page,reset_password_email_page

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
    path('login/', login_page, name='login_page'),
    path('profile/', profile_page, name='profile_page'),
    path('change-password/', change_password_page, name='change_password_page'),
    path('reset-password-email/', reset_password_email_page, name='reset_password_email_page'),
    path('reset-password/', reset_password_page, name='reset_password_page'),

]