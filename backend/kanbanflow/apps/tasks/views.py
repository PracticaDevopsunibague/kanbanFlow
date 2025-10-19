from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from .models import Task
from .serializers import TaskSerializer
from kanbanflow.apps.projects.models import Project

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [AllowAny]
    queryset = Task.objects.all()
    
    def get_queryset(self):
        project_id = self.request.query_params.get('project', None)
        if project_id:
            return Task.objects.filter(project_id=project_id)
        return Task.objects.all()
    
    def perform_create(self, serializer):
        from django.contrib.auth.models import User
        user = User.objects.first() or User.objects.create_user('demo', 'demo@demo.com', 'demo')
        serializer.save(created_by=user)
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        task = self.get_object()
        new_status = request.data.get('status')
        if new_status in ['pending', 'in_progress', 'completed']:
            task.status = new_status
            task.save()
            return Response(TaskSerializer(task).data)
        return Response({'error': 'Estado inválido'}, status=400)