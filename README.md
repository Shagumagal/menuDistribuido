# 🍽️ Sistema Distribuido de Gestión de Menú y Pedidos

Este sistema distribuido permite gestionar un menú de platillos y realizar pedidos a través de una arquitectura cliente-servidor por capas. Está compuesto por un frontend en React, dos backends (Node.js y Django), y múltiples bases de datos. Todo se ejecuta de manera orquestada con Docker.

---

## 📦 Tecnologías Usadas

| Componente        | Tecnología                    |
|-------------------|-------------------------------|
| Frontend          | React + TypeScript            |
| Backend Menú      | Node.js + Express             |
| Backend Pedidos   | Django + Django REST Framework|
| Base de datos Menú| PostgreSQL                    |
| Base de datos Ped.| SQLite (modo desarrollo)      |
| Proxy reverso     | NGINX                         |
| Contenedores      | Docker + Docker Compose       |

---

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/menuDistribuido.git
cd menuDistribuido
2. Ejecutar los servicios con Docker
bash
Copiar
Editar
docker compose up --build
Esto levanta:

🌐 Frontend en http://localhost

API de menú (Node.js) en /api/menu/

API de pedidos (Django) en /api/pedidos/

PostgreSQL como base de datos de menú
3. Aplicar migraciones de Django (si no se aplicaron automáticamente)
En contenedor Docker:
bash
Copiar
Editar
docker exec -it backend-pedidos python manage.py migrate
O en desarrollo local:
bash
Copiar
Editar
cd BackendDistribuido/Pedidos-Backend
pip install -r requirements.txt
python manage.py migrate
🌐 Acceso a las funcionalidades
Ruta	Descripción
/	Interfaz principal (React)
/api/menu/	API REST para gestión del menú
/api/pedidos/	API REST para pedidos (crear, listar, editar)

🧠 Funcionalidades Principales
📋 Menú
Visualizar lista de platillos

Crear y editar platillos

Filtrar por categoría

Marcar como "no disponible"

🛒 Pedidos
Selección de cliente ficticio

Agregar platillos con cantidad

Enviar pedidos con estado pendiente

Visualizar pedidos existentes

Actualizar estado del pedido (pendiente, en preparación, entregado)

⚙️ Estructura de Carpetas
csharp
Copiar
Editar
menuDistribuido/
│
├── frontend/                    # React + Vite + Tailwind
├── BackendDistribuido/
│   ├── Menu-Backend/           # Backend en Node.js
│   └── Pedidos-Backend/        # Backend en Django
├── docker-compose.yml
├── nginx/
│   └── default.conf            # Configuración NGINX
🐍 Requisitos para desarrollo local (solo si no usas Docker)
Backend Django
bash
Copiar
Editar
cd BackendDistribuido/Pedidos-Backend
pip install -r requirements.txt
python manage.py runserver
Backend Node.js
bash
Copiar
Editar
cd BackendDistribuido/Menu-Backend
npm install
npm run dev
🛑 Detener los servicios
bash
Copiar
Editar
docker compose down
🔒 Recomendaciones
Usa variables de entorno para credenciales en producción.

Configura una base de datos PostgreSQL también para el backend de pedidos si deseas producción.

Implementa autenticación para ambientes reales.
IIIIIIIIIIIIIIIMMMPORTANTE
El menu ditribuido a veces tarda en cargar, si no te gusta esperar, ctrl + shit +r para recargar la pagina, en caso de no funcionar bastara con crear un platillo en menu

👨‍💻 Autor
Fabricio Mariscal — Proyecto de grado (2025)

📄 Licencia
Este proyecto está bajo la licencia MIT.
