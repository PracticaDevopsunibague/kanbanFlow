import os
import sys

# Add the project directory to the sys.path
sys.path.insert(0, os.path.dirname(__file__))

from kanbanflow.wsgi import application

# Gunicorn entry point
app = application