# Go Sport - Aplicación web de Agendamientos

> Aplicación web de agendamientos de espacios deportivos construida
> con angular, nodejs y postreSQL

## Inicializar

### Requerimientos

- Docker
- Docker-compose

Iniciar contendores

```sh
docker-compose up -d --build
```

- Localmente disponible en el puesto 8080 [localhost:8080](http://localhost:8080/)
- API en el puerto 8081

## Diagrama de Casos de Uso

## [Modelo de base de datos](./DataBase/README.md)

![dbDiagram](./resources/DbDiagrampng)

## Funcionamiento

La aplicación "Go Sport" permite a los usuarios registrarse y iniciar
sesión para acceder a funcionalidades de agendamiento de espacios deportivos.

A continuación se describen los pasos para utilizar la aplicación:

1. **Registro de Usuario**:

   - Los nuevos usuarios pueden registrarse a través de la página de registro (`signup.html`).
   - Se requiere que ingresen su nombre completo, apellido, correo electrónico,
     teléfono y una contraseña.
   - Al enviar el formulario, se realiza una solicitud POST a la API en
     `http://localhost:8081/auth/register`.
   - Si el registro es exitoso, se muestra una alerta de éxito utilizando SweetAlert2.
     Si hay un error, se muestra un mensaje de error.

2. **Inicio de Sesión**:

   - Los usuarios existentes pueden iniciar sesión a través de la página
     de inicio de sesión (`login.html`).
   - Se requiere que ingresen su correo electrónico y contraseña.
   - Al enviar el formulario, se realiza una solicitud POST a la API en `http://localhost:8081/auth/login`.
   - Si el inicio de sesión es exitoso, se muestra una alerta de éxito.
     Si hay un error, se muestra un mensaje de error.

3. **Interacción con la API**:

   - La aplicación se comunica con la API a través de solicitudes HTTP
     utilizando `fetch`.
   - La API está configurada para manejar las solicitudes de registro e inicio
     de sesión, y responde con mensajes adecuados según el resultado de la operación.

4. **Alertas**:
   - Se utiliza SweetAlert2 para mostrar alertas de éxito y error, mejorando
     la experiencia del usuario al proporcionar retroalimentación visual
     clara sobre las acciones realizadas.

Con estas funcionalidades, los usuarios pueden gestionar su acceso a la
plataforma de agendamientos de manera sencilla y efectiva.
