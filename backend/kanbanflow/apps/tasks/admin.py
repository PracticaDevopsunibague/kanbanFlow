from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'project', 'status', 'priority', 'created_by', 'created_at']
    list_filter = ['status', 'priority', 'created_at']
    search_fields = ['title', 'description']