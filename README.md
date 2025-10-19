# KanbanFlow

Sistema de gestión de proyectos con tableros Kanban desarrollado con Django (backend) y React (frontend).

## Características

- 🔐 Sistema de autenticación completo (registro e inicio de sesión)
- 📋 Gestión de proyectos y tareas
- 🎯 Tableros Kanban con drag & drop
- 🎨 Interfaz moderna con Tailwind CSS
- 🔄 API REST con Django REST Framework
- 📱 Diseño responsivo

## Tecnologías

### Backend
- Python 3.8+
- Django 4.2
- Django REST Framework
- SQLite (configurable a PostgreSQL)

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- React Beautiful DnD
- Axios

## Instalación

### Backend

1. Navegar al directorio backend:
```bash
cd backend
```

2. Crear entorno virtual:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac
```

3. Instalar dependencias:
```bash
pip install -r requirements.txt
```

4. Ejecutar migraciones:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Crear superusuario (opcional):
```bash
python manage.py createsuperuser
```

6. Ejecutar servidor:
```bash
python manage.py runserver
```

### Frontend

1. Navegar al directorio frontend:
```bash
cd frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar aplicación:
```bash
npm start
```

## Uso

1. Accede a `http://localhost:3000`
2. Regístrate o inicia sesión
3. Crea un nuevo proyecto
4. Añade tareas al proyecto
5. Arrastra y suelta las tareas entre columnas (Pendiente, En Progreso, Completado)

## API Endpoints

### Autenticación
- `POST /api/auth/register/` - Registro de usuario
- `POST /api/auth/login/` - Inicio de sesión
- `POST /api/auth/logout/` - Cerrar sesión
- `GET /api/auth/profile/` - Perfil del usuario

### Proyectos
- `GET /api/projects/` - Listar proyectos
- `POST /api/projects/` - Crear proyecto
- `PUT /api/projects/{id}/` - Actualizar proyecto
- `DELETE /api/projects/{id}/` - Eliminar proyecto

### Tareas
- `GET /api/tasks/?project={id}` - Listar tareas de un proyecto
- `POST /api/tasks/` - Crear tarea
- `PUT /api/tasks/{id}/` - Actualizar tarea
- `PATCH /api/tasks/{id}/update_status/` - Actualizar estado de tarea
- `DELETE /api/tasks/{id}/` - Eliminar tarea

## Estructura del Proyecto

```
kanbanFlow/
├── backend/
│   ├── kanbanflow/
│   │   ├── apps/
│   │   │   ├── authentication/
│   │   │   ├── projects/
│   │   │   └── tasks/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── manage.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── context/
    │   └── App.js
    ├── public/
    └── package.json
```

## Configuración de Base de Datos

Por defecto usa SQLite. Para PostgreSQL, actualiza `settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'kanbanflow',
        'USER': 'tu_usuario',
        'PASSWORD': 'tu_contraseña',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.