#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "kanbanflow.settings")
    
    from django.core.management import execute_from_command_line
    
    # Ejecutar migraciones
    execute_from_command_line(['manage.py', 'migrate'])
    
    # Iniciar Gunicorn
    port = os.environ.get('PORT', '8000')
    os.system(f'gunicorn --bind=0.0.0.0:{port} --timeout 600 kanbanflow.wsgi')