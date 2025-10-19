from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    created_by = serializers.StringRelatedField(read_only=True)
    assigned_to = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'priority', 'project', 
                 'assigned_to', 'created_by', 'created_at', 'updated_at', 'due_date']
        read_only_fields = ['created_at', 'updated_at']