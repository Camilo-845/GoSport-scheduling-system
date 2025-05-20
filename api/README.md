# Documentación de la API GoSport

## Cómo probar la API localmente

1. Instala las dependencias:
   ```bash
   pnpm install
   ```
2. Compila el proyecto en modo watch (en una terminal):
   ```bash
   pnpm run build --watch
   ```
3. En otra terminal, inicia el servidor de desarrollo:
   ```bash
   pnpm run dev
   ```

> **Nota:** Todos los endpoints documentados pueden probarse fácilmente usando [Bruno](https://www.usebruno.com/) y abriendo la colección `GoSport_API_test` incluida en este repositorio.

Este documento muestra únicamente los endpoints de la API que están cubiertos por tests funcionales en la carpeta `GoSport_API_test`.

## URL Base

```
https://localhost:8080
```

---

## Autenticación

### Registrar usuario
- **POST** `/auth/register`
- **Body:**
```json
{
  "nombre": "Juan",
  "apellido": "Perez",
  "email": "juan24@example.com",
  "telefono": 3124321432,
  "password": "hola123"
}
```

### Iniciar sesión
- **POST** `/auth/login`
- **Body:**
```json
{
  "email": "pedro@gmail.com",
  "password": "hola123"
}
```

### Cambiar contraseña
- **PUT** `/auth/changePassword`
- **Headers:** Authorization: Bearer {token}
- **Body:**
```json
{
  "oldPassword": "hola1234",
  "newPassword": "hola123"
}
```

### Eliminar usuario
- **DELETE** `/auth`
- **Headers:** Authorization: Bearer {token}

---

## Usuario

### Obtener información del usuario
- **GET** `/user`
- **Headers:** Authorization: Bearer {token}

### Actualizar información del usuario
- **PUT** `/user`
- **Headers:** Authorization: Bearer {token}
- **Body:**
```json
{
  "nombre": "Camilo",
  "apellido": "Sarmiento",
  "telefono": "312432434"
}
```

---

## Reservas

### Crear reserva
- **POST** `/booking`
- **Headers:** Authorization: Bearer {token}
- **Body:**
```json
{
  "fecha": "2025-06-01",
  "idReserva": 1,
  "hora_inicio": "08:00:00",
  "hora_fin": "09:00:00",
  "id_usuario": 12,
  "id_cancha": 1
}
```

### Eliminar reserva
- **DELETE** `/booking/:id`
- **Headers:** Authorization: Bearer {token}

### Obtener reserva por ID
- **GET** `/booking/:id`

### Obtener reservas por usuario
- **GET** `/booking/user`
- **Headers:** Authorization: Bearer {token}

### Obtener reservas por cancha
- **GET** `/booking/court/:id`
- **Headers:** Authorization: Bearer {token}

---

## Eventos

### Listar eventos
- **GET** `/event`
- **Headers:** Authorization: Bearer {token}

### Obtener evento por ID
- **GET** `/event/:id`
- **Headers:** Authorization: Bearer {token}

### Crear evento
- **POST** `/event`
- **Headers:** Authorization: Bearer {token}
- **Body:**
```json
{
  "nombre": "Nuevo evento123",
  "fecha": "2025-08-10",
  "hora_inicio": "10:00",
  "id_cancha": 9
}
```

### Unirse a evento
- **POST** `/event/:id/participant`
- **Headers:** Authorization: Bearer {token}

### Salir de evento
- **DELETE** `/event/:id/participants`
- **Headers:** Authorization: Bearer {token}

### Listar participantes de un evento
- **GET** `/event/:id/participants`
- **Headers:** Authorization: Bearer {token}

---

## Deportes

### Listar deportes
- **GET** `/sport`
- **Headers:** Authorization: Bearer {token}

### Crear deporte
- **POST** `/sport/`
- **Headers:** Authorization: Bearer {token}
- **Body:**
```json
{
  "nombre": "futbol"
}
```

### Obtener deporte por ID
- **GET** `/sport/:id`
- **Headers:** Authorization: Bearer {token}

### Editar deporte
- **PUT** `/sport/:id`
- **Headers:** Authorization: Bearer {token}
- **Body:**
```json
{
  "nombre": "Fútbol Sala"
}
```

### Eliminar deporte
- **DELETE** `/sport/:id`
- **Headers:** Authorization: Bearer {token}

### Listar canchas por deporte
- **GET** `/sport/:id/courts`
- **Headers:** Authorization: Bearer {token}

---

## Canchas

### Listar canchas
- **GET** `/court`
- **Headers:** Authorization: Bearer {token}

### Crear cancha
- **POST** `/court`
- **Headers:** Authorization: Bearer {token}
- **Body:**
```json
{
  "nombre": "Cancha 5",
  "capacidad": 3,
  "id_deporte": 4
}
```

### Obtener cancha por ID
- **GET** `/court/:id`
- **Headers:** Authorization: Bearer {token}

### Editar cancha
- **PUT** `/court/:id`
- **Headers:** Authorization: Bearer {token}
- **Body:**
```json
{
  "nombre": "Cancha 55",
  "capacidad": 2,
  "id_deporte": 4
}
```

### Eliminar cancha
- **DELETE** `/court/:id`
- **Headers:** Authorization: Bearer {token}

---

## Notas
- Todos los endpoints requieren autenticación Bearer salvo los de registro e inicio de sesión.
- Los endpoints y ejemplos aquí listados están garantizados como funcionales según los tests automáticos existentes.
