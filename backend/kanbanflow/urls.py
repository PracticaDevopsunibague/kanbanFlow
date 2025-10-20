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
    #prueba
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

def debug_info(request):
    import sys
    from django.db import connection
    
    try:
        # Test database connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        db_status = "OK"
    except Exception as e:
        db_status = f"Error: {str(e)}"
    
    return JsonResponse({
        'python_version': sys.version,
        'django_version': settings.DEBUG,
        'database_status': db_status,
        'installed_apps': settings.INSTALLED_APPS,
        'environment_vars': {
            'DB_NAME': os.environ.get('DB_NAME', 'Not set'),
            'DB_HOST': os.environ.get('DB_HOST', 'Not set'),
            'DB_USER': os.environ.get('DB_USER', 'Not set'),
        }
    })

def test_register(request):
    from django.contrib.auth.models import User
    import traceback
    
    try:
        # Test simple user creation
        test_data = {
            'username': 'testuser123',
            'email': 'test@test.com',
            'password': 'testpass123'
        }
        
        user = User.objects.create_user(**test_data)
        user.delete()  # Clean up
        
        return JsonResponse({
            'status': 'OK',
            'message': 'User creation test passed'
        })
    except Exception as e:
        return JsonResponse({
            'status': 'ERROR',
            'message': str(e),
            'traceback': traceback.format_exc()
        })

from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_status, name='api_status'),
    path('api/debug/', debug_info, name='debug_info'),
    path('api/test-register/', test_register, name='test_register'),
    path('api/auth/', include('kanbanflow.apps.authentication.urls')),
    path('api/projects/', include('kanbanflow.apps.projects.urls')),
    path('api/tasks/', include('kanbanflow.apps.tasks.urls')),
    path('', serve_react_app, name='react_app'),
]

# Servir archivos estáticos de React en producción
if settings.DEBUG or True:  # Forzar en producción para React
    urlpatterns += static('/static/', document_root=os.path.join(settings.BASE_DIR, 'static-files', 'static'))
    urlpatterns += static('/', document_root=os.path.join(settings.BASE_DIR, 'static-files'))