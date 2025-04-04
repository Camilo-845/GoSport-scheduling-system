document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('form'); // Selecciona el formulario de registro
    const loginForm = document.querySelector('form'); // Selecciona el formulario de inicio de sesión

    // Manejar el registro
    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            console.log('Formulario de registro enviado'); // Verifica que esto se imprima
            event.preventDefault(); // Prevenir el envío del formulario

            const nombre = document.getElementById('fullname').value;
            const apellido = document.getElementById('lastname').value;
            const correoElectronico = document.getElementById('email').value;
            const telefono = document.getElementById('phone').value;
            const contrasena = document.getElementById('password').value;

            const response = await fetch('http://localhost:8081/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    correoElectronico: correoElectronico,
                    telefono: telefono,
                    user_name: correoElectronico.split('@')[0],
                    contrasena: contrasena,
                }),
            });

            const result = await response.json();
            console.log(result);
            if (response.ok) {
                // Mostrar alerta de éxito
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: 'Te has registrado correctamente.',
                });
            } else {
                // Mostrar alerta de error
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message || 'Ocurrió un error al registrarte.',
                });
            }
        });
    }

    // Manejar el inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevenir el envío del formulario

            const correoElectronico = document.getElementById('email').value;
            const contrasena = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:8081/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        correoElectronico: correoElectronico,
                        contrasena: contrasena,
                    }),
                });

                const result = await response.json();

                if (response.ok) {
                    // Mostrar alerta de éxito
                    Swal.fire({
                        icon: 'success',
                        title: 'Inicio de sesión exitoso',
                        text: 'Has iniciado sesión correctamente.',
                    }).then(() => {
                        // Redirigir a la página de bienvenida
                        window.location.href = 'welcome.html';
                    });
                } else {
                    // Mostrar alerta de error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: result.message || 'Ocurrió un error al iniciar sesión.',
                    });
                }
            } catch (error) {
                // Mostrar alerta de error en caso de fallo en la conexión
                Swal.fire({
                    icon: 'error',
                    title: 'Error de conexión',
                    text: 'No se pudo conectar al servidor.',
                });
            }
        });
    }
}); 