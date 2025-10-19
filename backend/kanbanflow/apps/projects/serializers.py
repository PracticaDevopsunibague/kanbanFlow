from rest_framework import serializers
from .models import Project
from django.contrib.auth.models import User

class ProjectSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(read_only=True)
    members = serializers.StringRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'owner', 'members', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']