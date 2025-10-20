from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings

def api_root(request):
    return JsonResponse({
        'message': '¡KanbanFlow API funcionando! 🚀',
        'endpoints': {
            'admin': '/admin/',
            'auth': '/api/auth/',
            'projects': '/api/projects/',
            'tasks': '/api/tasks/'
        },
        'debug': {
            'installed_apps': list(settings.INSTALLED_APPS),
            'test_endpoints': {
                'auth_register': '/api/auth/register/',
                'auth_login': '/api/auth/login/',
                'projects_list': '/api/projects/',
                'tasks_list': '/api/tasks/'
            }
        }
    })

urlpatterns = [
    path('', api_root, name='api_root'),
    path('admin/', admin.site.urls),
    path('api/auth/', include('kanbanflow.apps.authentication.urls')),
    path('api/projects/', include('kanbanflow.apps.projects.urls')),
    path('api/tasks/', include('kanbanflow.apps.tasks.urls')),
]