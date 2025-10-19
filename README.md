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

## 🚀 Instalación y Configuración Local

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Python 3.8 o superior** - [Descargar Python](https://www.python.org/downloads/)
- **Node.js 16 o superior** - [Descargar Node.js](https://nodejs.org/)
- **Git** - [Descargar Git](https://git-scm.com/)

### 📥 Paso 1: Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd kanbanFlow
```

### 🐍 Paso 2: Configurar el Backend (Django)

#### 2.1 Navegar al directorio backend
```bash
cd backend
```

#### 2.2 Crear y activar entorno virtual

**En Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**En Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 2.3 Instalar dependencias de Python
```bash
pip install -r requirements.txt
```

#### 2.4 Configurar la base de datos
```bash
# Crear migraciones para las apps
python manage.py makemigrations authentication projects tasks

# Aplicar migraciones
python manage.py migrate
```

#### 2.5 (Opcional) Crear superusuario para admin
```bash
python manage.py createsuperuser
```

#### 2.6 Iniciar el servidor backend
```bash
python manage.py runserver
```

✅ **El backend estará disponible en:** `http://localhost:8000`

---

### ⚛️ Paso 3: Configurar el Frontend (React)

**Abrir una nueva terminal** (mantener la del backend abierta)

#### 3.1 Navegar al directorio frontend
```bash
cd frontend
```

#### 3.2 Instalar dependencias de Node.js
```bash
npm install
```

#### 3.3 Iniciar la aplicación React
```bash
npm start
```

✅ **El frontend estará disponible en:** `http://localhost:3000`

---

### 🎯 Paso 4: Verificar la Instalación

1. **Abrir el navegador** y ir a `http://localhost:3000`
2. **Registrar un nuevo usuario** o iniciar sesión
3. **Crear un proyecto** usando el botón "Nuevo Proyecto"
4. **Añadir tareas** al proyecto
5. **Probar el drag & drop** arrastrando tareas entre columnas
6. **Hacer click en una tarea** para ver sus detalles

---

### 🔧 Solución de Problemas Comunes

#### Error: "python no se reconoce como comando"
- **Windows:** Usar `py` en lugar de `python`
- **Linux/Mac:** Usar `python3` en lugar de `python`

#### Error: "npm no se reconoce como comando"
- Reinstalar Node.js desde [nodejs.org](https://nodejs.org/)
- Reiniciar la terminal después de la instalación

#### Error: "Puerto ya en uso"
- **Backend (8000):** Cambiar puerto con `python manage.py runserver 8001`
- **Frontend (3000):** Cambiar puerto cuando npm pregunte, o usar `npm start -- --port 3001`

#### Error: "Módulo no encontrado"
- **Backend:** Verificar que el entorno virtual esté activado
- **Frontend:** Ejecutar `npm install` nuevamente

---

### 📱 Comandos Rápidos para Desarrollo

#### Reiniciar todo desde cero:
```bash
# Backend
cd backend
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
python manage.py runserver

# Frontend (nueva terminal)
cd frontend
npm start
```

#### Ver logs del backend:
- Los logs aparecen automáticamente en la terminal donde ejecutaste `runserver`

#### Acceder al panel de administración:
- Ir a `http://localhost:8000/admin`
- Usar las credenciales del superusuario creado

---

### 🌐 URLs Importantes

- **Aplicación Principal:** `http://localhost:3000`
- **API Backend:** `http://localhost:8000/api/`
- **Panel Admin Django:** `http://localhost:8000/admin/`
- **Documentación API:** `http://localhost:8000/api/` (endpoints listados abajo)

## Uso

1. Accede a `http://localhost:3000`
2. Regístrate o inicia sesión
3. Crea un nuevo proyecto
4. Añade tareas al proyecto
5. Arrastra y suelta las tareas entre columnas (Pendiente, En Progreso, Completado)
6. Haz click en cualquier tarea para ver sus detalles completos

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