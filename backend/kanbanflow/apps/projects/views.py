from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    queryset = Project.objects.all()
    
    def perform_create(self, serializer):
        user = User.objects.first() or User.objects.create_user('demo', 'demo@demo.com', 'demo')
        serializer.save(owner=user)