from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from account.serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer , UserChangePasswordSerializer, UserPasswordResetEmailSerializer , UserPasswordResetSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from account.renderers import UserRenderer


from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

#Generate Token Manually 
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

#Register User
class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({
                "status": True,
                "token":token,
                "message": "User registered successfully!"
                }, status=status.HTTP_201_CREATED)
        return Response({
            "status": False,
            "error":serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
    

#Login User
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({
                    "status": True,
                    "token":token,
                    "message": "User logged in successfully!"
                    }, status=status.HTTP_200_OK)
        return Response({
            "status": False,
            "error": {'non_field_errors':['Email or Password is not Valid']}
            }, status=status.HTTP_404_NOT_FOUND)
    
#Profile View
class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        
        return Response({
            "status": True,
            "user": serializer.data,
            "message": "User Profile Fetched Successfully!"
        }, status=status.HTTP_200_OK)
        
    
# Change Password View
class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({
                "status": True,
                "message": "Password Changed Successfully!"
            }, status=status.HTTP_200_OK)
        return Response({
            "status": False,
            "error": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


# Reset Email View
class UserPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request):
        serializer = UserPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({
                "status": True,
                "message": "Password Reset Email Sent Successfully!"
            }, status=status.HTTP_200_OK)
        return Response({   
            "status": False,
            "error": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
#User password reset view
class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request,uid, token):
        serializer = UserPasswordResetSerializer(data=request.data, context={'uid': uid, 'token': token})
        if serializer.is_valid(raise_exception=True):
            return Response({
                "status": True,
                "message": "Password Reset Successfully!"
            }, status=status.HTTP_200_OK)
        return Response({
            "status": False,
            "error": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    



# Normal Views


def home(request):
    return render(request, 'account/base.html')

def register_page(request):
    return render(request, 'account/register.html')

def login_page(request):
    return render(request, 'account/login.html')

def profile_page(request):
    return render(request, 'account/profile.html')

def change_password_page(request):
    return render(request, 'account/change_password.html')

def reset_password_email_page(request):
    return render(request, 'account/reset_password_email.html')


def reset_password_page(request):
    return render(request, 'account/reset_password.html')
