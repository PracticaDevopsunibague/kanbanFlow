from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from .models import Project
from .serializers import ProjectSerializer

@method_decorator(cache_page(60), name='list')  # Cache por 1 minuto
class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    queryset = Project.objects.select_related('owner').order_by('-created_at')
    
    def perform_create(self, serializer):
        user = User.objects.first() or User.objects.create_user('demo', 'demo@demo.com', 'demo')
        serializer.save(owner=user)