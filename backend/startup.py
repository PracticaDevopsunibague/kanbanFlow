import os
import django
from django.core.management import execute_from_command_line

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kanbanflow.settings')
django.setup()

# Ejecutar migraciones automáticamente
try:
    execute_from_command_line(['manage.py', 'migrate'])
    print("Migraciones ejecutadas correctamente")
except Exception as e:
    print(f"Error en migraciones: {e}")