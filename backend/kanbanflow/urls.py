from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse, HttpResponse
from django.conf import settings
import os

def serve_react_app(request):
    try:
        # Intentar servir React build
        index_path = os.path.join(settings.BASE_DIR, 'static-files', 'index.html')
        if os.path.exists(index_path):
            with open(index_path, 'r', encoding='utf-8') as f:
                return HttpResponse(f.read(), content_type='text/html')
    except:
        pass
    
    try:
        # Servir template temporal
        template_path = os.path.join(settings.BASE_DIR, 'templates', 'index.html')
        if os.path.exists(template_path):
            with open(template_path, 'r', encoding='utf-8') as f:
                return HttpResponse(f.read(), content_type='text/html')
    except:
        pass
    
    return HttpResponse("KanbanFlow - Error loading page")

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

from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_status, name='api_status'),
    path('api/auth/', include('kanbanflow.apps.authentication.urls')),
    path('api/projects/', include('kanbanflow.apps.projects.urls')),
    path('api/tasks/', include('kanbanflow.apps.tasks.urls')),
    path('', serve_react_app, name='react_app'),
]

# Servir archivos estáticos de React en producción
if settings.DEBUG or True:  # Forzar en producción para React
    urlpatterns += static('/static/', document_root=os.path.join(settings.BASE_DIR, 'static-files', 'static'))
    urlpatterns += static('/', document_root=os.path.join(settings.BASE_DIR, 'static-files'))