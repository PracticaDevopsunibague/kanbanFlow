from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.shortcuts import render
from django.views.generic import TemplateView
import os

class ReactAppView(TemplateView):
    template_name = 'index.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        return context

def api_status(request):
    return JsonResponse({
        'message': '¡KanbanFlow API funcionando! 🚀',
        'status': 'OK',
        'endpoints': {
            'admin': '/admin/',
            'auth': '/api/auth/',
            'projects': '/api/projects/',
            'tasks': '/api/tasks/'
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_status, name='api_status'),
    path('api/auth/', include('kanbanflow.apps.authentication.urls')),
    path('api/projects/', include('kanbanflow.apps.projects.urls')),
    path('api/tasks/', include('kanbanflow.apps.tasks.urls')),
    path('', ReactAppView.as_view(), name='react_app'),
]