from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        'message': '¡KanbanFlow API funcionando! 🚀',
        'endpoints': {
            'admin': '/admin/',
            'auth': '/api/auth/',
            'projects': '/api/projects/',
            'tasks': '/api/tasks/'
        }
    })

urlpatterns = [
    path('', api_root, name='api_root'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('kanbanflow.apps.authentication.urls')),
    path('api/projects/', include('kanbanflow.apps.projects.urls')),
    path('api/tasks/', include('kanbanflow.apps.tasks.urls')),
]