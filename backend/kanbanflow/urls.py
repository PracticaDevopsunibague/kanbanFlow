from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('kanbanflow.apps.authentication.urls')),
    path('api/projects/', include('kanbanflow.apps.projects.urls')),
    path('api/tasks/', include('kanbanflow.apps.tasks.urls')),
]