from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import login, logout
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def register(request):
    if request.method == 'GET':
        return Response({
            'message': 'Endpoint de registro',
            'method': 'POST',
            'fields': ['username', 'password', 'email', 'first_name', 'last_name']
        })
    
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'Usuario registrado exitosamente',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def login_view(request):
    if request.method == 'GET':
        return Response({
            'message': 'Endpoint de login',
            'method': 'POST',
            'fields': ['username', 'password']
        })
    
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        login(request, user)
        return Response({
            'message': 'Inicio de sesión exitoso',
            'user': UserSerializer(user).data
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def logout_view(request):
    try:
        logout(request)
    except:
        pass
    return Response({'message': 'Sesión cerrada exitosamente'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def user_profile(request):
    return Response(UserSerializer(request.user).data)