# 🧠 Sistema Distribuido - Menú de Pedidos

Este proyecto implementa un sistema distribuido compuesto por:

* 🧾 **Frontend**: React + TypeScript + Vite
* 🔙 **Backend**: Node.js + Express + PostgreSQL
* 🌐 **Proxy**: NGINX
* 🐳 **Orquestador**: Docker Compose

---

## 📁 Estructura del Proyecto

```
DistribuidosProyect/
├── BackendDistribuido/         # Backend Express
├── FrontDistribuido/           # Frontend React + Vite
│   └── dist/                   # Build generado con Vite
├── nginx.conf                  # Configuración del proxy NGINX
├── docker-compose.yml          # Definición de servicios Docker
```

---

## 🚀 Levantar el sistema

### 1. Clonar el proyecto

```bash
git clone https://github.com/usuario/proyecto-distribuidos.git
cd proyecto-distribuidos
```

### 2. Generar el build del frontend

```bash
cd FrontDistribuido
npm install
npm run build
cd ..
```

### 3. Levantar todos los servicios

```bash
docker-compose up --build
```

El sistema estará disponible en: [http://localhost](http://localhost)

---

## 🔁 Servicios incluidos

### 🔙 Backend (Node.js + Express)

* Escucha en `http://localhost:3000`
* Rutas REST bajo `/api/menu`

### 🧾 Frontend (React + Vite)

* Servido por NGINX desde `/usr/share/nginx/html`

### 🌐 NGINX Proxy

* Redirige:

  * `/` al frontend (SPA React)
  * `/api/*` al backend en `http://backend:3000/api/*`

### 🐘 PostgreSQL

* Usuario: `postgres`
* Contraseña: `admin`
* Base de datos: `menu_db`

---

## 🔐 nginx.conf utilizado

```nginx
events {}

http {
  include       mime.types;
  default_type  application/octet-stream;

  server {
    listen 80;

    location / {
      root /usr/share/nginx/html;
      index index.html;
      try_files $uri $uri/ /index.html;
    }

    location /api/ {
      proxy_pass http://backend:3000/api/;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
}
```

---

## 🧪 Comandos útiles

* Parar todos los contenedores:

```bash
docker-compose down
```

* Ver logs en vivo:

```bash
docker-compose logs -f
```

---

## ✅ Estado actual

* [x] Visualización del menú
* [x] Registro de platillos
* [x] Actualización con validaciones
* [x] Filtrado por categoría y búsqueda
* [x] Contenerizado con Docker y servido por NGINX

---

## 📦 Requisitos

* Docker
* Node.js (solo si vas a desarrollar el frontend fuera de contenedor)

---

## 🙌 Autor

**Fabricio Mariscal**
Estudiante de Ingeniería de Sistemas Informáticos
Especializado en React, Node.js, Docker y sistemas distribuidos
