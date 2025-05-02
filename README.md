# 🏀 Go Sport - Aplicación web de Agendamientos

> 📅 Aplicación web de agendamientos de espacios deportivos construida  
> con Angular, Node.js , PostgreSQL y Docker

---

## ⚙️ Inicializar

### ✅ Requerimientos

- 🐳 [Docker](https://docs.docker.com/engine/install/)

### 🚀 Iniciar contenedores

```sh
sudo docker compose up -d --build
```

- 🌐 Localmente disponible en el puerto 8080: [localhost:8080](http://localhost:8080/)

---

## 📁 Estructura del proyecto

### 🧩 [Client](./client/)

Contiene la aplicación frontend desarrollada en **Angular 19**. Aquí se gestiona la interfaz de usuario, la navegación, el consumo de la API y los estilos.

### 🚀 [API](./api/)

Contiene la lógica del backend desarrollada con **Node.js 18** y **TypeScript**. Incluye controladores, rutas, servicios y configuración del servidor. Esta carpeta se encarga de exponer los endpoints REST para ser consumidos por el cliente.

### 🗄️ [DataBase](./DataBase/)

Contiene los scripts de definición y migración de base de datos para **PostgreSQL 13**, modelos, consultas SQL y configuraciones del ORM. También puede incluir datos de prueba (seeds) y archivos de inicialización.

---

## 🧭 Puertos del Proyecto

- 🧩 **Cliente (Angular)**: [`http://localhost:8080`](http://localhost:8080)
- 🚀 **API (Node.js)**: [`http://localhost:8081`](http://localhost:8081)
- 🗄️ **Base de Datos (PostgreSQL 13)**: `localhost:5434`

---

## 🧩 [Diagrama de Casos de Uso](./resources/UseCases/useCases.puml)

## 🗄️ [Modelo de base de datos](./DataBase/README.md)

![dbDiagram](./resources/DbDiagram.png)

---

## 🧪 Funcionamiento

### 👤 1. Autenticación de usuarios

- Los usuarios pueden **registrarse** mediante un formulario que solicita nombre, correo, teléfono y contraseña.
- Una vez registrados, pueden **iniciar sesión** para acceder al sistema.
- Ambas operaciones se comunican con la API a través de solicitudes HTTP `POST` a los endpoints `/auth/register` y `/auth/login`.

### 📋 2. Consultas generales

- Los usuarios autenticados pueden:

  - **Ver los deportes disponibles**.
  - **Consultar canchas habilitadas** según deporte y disponibilidad.
  - **Visualizar eventos** deportivos abiertos.
  - **Ver la lista de participantes de eventos**.

- Los administradores, además, pueden **ver todas las reservas existentes** para fines de gestión.

### 🏟️ 3. Reservas deportivas

- Los usuarios pueden **reservar canchas deportivas** disponibles, consultando previamente la disponibilidad.
- También pueden **cancelar reservas previamente realizadas** si lo desean.

### 📆 4. Participación en eventos

- Los usuarios pueden:
  - **Unirse a eventos deportivos** disponibles.
  - **Cancelar su participación** si no pueden asistir.
  - Ambos casos están relacionados: unirse incluye ver eventos; cancelar extiende la participación.
- Los administradores pueden:
  - **Crear nuevos eventos**, los cuales automáticamente incluyen selección de deporte y visibilidad para los usuarios.

### 🛠️ 5. Administración del sistema (rol administrador)

- Los administradores tienen acceso a funcionalidades avanzadas de gestión:
  - **Gestionar deportes** existentes (crear, editar, eliminar).
  - **Gestionar eventos**, incluyendo su creación y asignación de canchas y deportes.
  - **Consultar todas las reservas** y tener visibilidad sobre la actividad en el sistema.
