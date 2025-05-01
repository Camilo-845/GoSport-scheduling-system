# API Documentation for Gosport System

This document provides the detailed API documentation for the Gosport system, which manages reservations for sports facilities, events, and users.

## Base URL

The base URL for all endpoints is:

```
https://api.gosport.com
```

## Authentication

### Register User

- **POST** `/api/auth/register`
- **Description**: Registers a new user in the system.
- **Request Body**:
  ```json
  {
    "nombre": "John",
    "apellido": "Doe",
    "email": "john.doe@example.com",
    "telefono": 123456789,
    "password": "securepassword"
  }
  ```

### Login User

- **POST** `/api/auth/login`
- **Description**: Logs in a user and returns a JWT token for authentication.
- **Request Body**:
  ```json
  {
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```

### Change Password

- **PUT** `/api/auth/changePassword`
- **Description**: Changes the password for the currently authenticated user.
- **Request Body**:
  ```json
  {
    "oldPassword": "oldpassword",
    "newPassword": "newpassword"
  }
  ```

### Delete User

- **DELETE** `/api/auth/`
- **Description**: Deletes the current user's account.

---

## User Endpoints

### Get User Information

- **GET** `/api/user`
- **Description**: Retrieves the information of the currently authenticated user.

### Update User Information

- **PUT** `/api/user`
- **Description**: Updates the current user's information.
- **Request Body**:
  ```json
  {
    "nombre": "John",
    "apellido": "Doe",
    "email": "new.email@example.com",
    "telefono": 987654321
  }
  ```

---

## Consultations

### Get Available Sports

- **GET** `/api/deportes`
- **Description**: Retrieves the list of available sports.

### Get Available Courts

- **GET** `/api/canchas`
- **Description**: Retrieves the list of available courts.

### Get Events

- **GET** `/api/eventos`
- **Description**: Retrieves the list of scheduled events.

### Get Participants of an Event

- **GET** `/api/eventos/{id_evento}/participantes`
- **Description**: Retrieves the list of participants for a specific event.

---

## Reservations

### Create Reservation

- **POST** `/api/reservas`
- **Description**: Creates a new reservation for a court.
- **Request Body**:
  ```json
  {
    "id_cancha": 1,
    "fecha": "2025-05-01",
    "hora_inicio": "10:00:00",
    "hora_fin": "12:00:00"
  }
  ```

### Check Court Availability

- **GET** `/api/canchas/{id_cancha}/disponibilidad`
- **Description**: Checks if a court is available for reservation at the specified date and time.

### Cancel Reservation

- **DELETE** `/api/reservas/{id_reserva}`
- **Description**: Cancels an existing reservation.

---

## Events

### Join Event

- **POST** `/api/eventos/{id_evento}/participantes`
- **Description**: Allows a user to join a specific event as a participant.

### Cancel Event Participation

- **DELETE** `/api/eventos/{id_evento}/participantes`
- **Description**: Cancels a user's participation in an event.

### Create Event

- **POST** `/api/eventos`
- **Description**: Creates a new event.
- **Request Body**:
  ```json
  {
    "nombre": "Torneo de Fútbol",
    "fecha": "2025-06-01",
    "hora_inicio": "14:00:00",
    "id_cancha": 1
  }
  ```

---

## Sports Management (Admin Only)

### Get Available Sports

- **GET** `/api/deportes`
- **Description**: Retrieves the list of sports available in the system.

### Create Sport

- **POST** `/api/deportes`
- **Description**: Creates a new sport.
- **Request Body**:
  ```json
  {
    "nombre": "Fútbol"
  }
  ```

### Edit Sport

- **PUT** `/api/deportes/{id_deporte}`
- **Description**: Edits an existing sport.
- **Request Body**:
  ```json
  {
    "nombre": "Fútbol Sala"
  }
  ```

### Delete Sport

- **DELETE** `/api/deportes/{id_deporte}`
- **Description**: Deletes an existing sport.

---

## Example Responses

### Successful Registration

```json
{
  "message": "User registered successfully"
}
```

### Successful Login

```json
{
  "token": "jwt_token_here"
}
```

### Successful Reservation

```json
{
  "message": "Reservation created successfully"
}
```

### Successful Event Join

```json
{
  "message": "You have successfully joined the event"
}
```

### Successful Event Cancellation

```json
{
  "message": "You have successfully canceled your participation"
}
```
