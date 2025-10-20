#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "kanbanflow.settings")
    
    from django.core.management import execute_from_command_line
    
    try:
        # Ejecutar migraciones
        print("Ejecutando migraciones...")
        execute_from_command_line(['manage.py', 'makemigrations'])
        execute_from_command_line(['manage.py', 'migrate'])
        print("Migraciones completadas")
    except Exception as e:
        print(f"Error en migraciones: {e}")
    
    # Iniciar Gunicorn
    port = os.environ.get('PORT', '8000')
    print(f"Iniciando servidor en puerto {port}")
    os.system(f'gunicorn --bind=0.0.0.0:{port} --timeout 600 kanbanflow.wsgi')