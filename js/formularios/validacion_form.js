// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Definir las reglas de validación
    const reglasValidacion = {
        nombre: {
            required: true,
            regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
            mensaje: 'El nombre solo debe contener letras.'
        },
        apellidos: {
            required: true,
            regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
            mensaje: 'Los apellidos solo deben contener letras.'
        },
        telefono: {
            required: true,
            regex: /^[6-9][0-9]{8}$/,
            mensaje: 'El teléfono debe contener 9 dígitos.'
        },
        fechaNacimiento: {
            required: true,
            validar: function(value) {
                if (!value) {
                    return 'La fecha de nacimiento es obligatoria.';
                }

                // Crear objeto Date directamente desde el valor (AAAA-MM-DD)
                const fechaNac = new Date(value);
                const fechaActual = new Date('2025-04-10'); // 10 de abril de 2025
                const fechaMinima = new Date('1905-04-10'); // 120 años atrás

                // Normalizar horas para evitar problemas
                fechaNac.setHours(0, 0, 0, 0);
                fechaActual.setHours(0, 0, 0, 0);
                fechaMinima.setHours(0, 0, 0, 0);

                // Comparar usando getTime() para mayor precisión
                if (fechaNac.getTime() > fechaActual.getTime()) {
                    return 'La fecha no puede ser posterior al 10 de abril de 2025.';
                }
                if (fechaNac.getTime() < fechaMinima.getTime()) {
                    return 'La fecha no puede ser anterior al 10 de abril de 1905.';
                }
                return true;
            }
        },
           
        email: {
            required: true,
            regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(es|com|org|net)$/,
            mensaje: 'El email debe tener formato válido y terminar en .es, .com, .org o .net'
        },
        direccion: {
            required: true,
            mensaje: 'La dirección es obligatoria.'
        }
    };

    // Función para actualizar el estado del input
    function actualizarEstadoInput(input, errorElement, esValido, mensajeError) {
        input.classList.remove('is-success', 'is-danger');
        if (esValido) {
            input.classList.add('is-success');
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        } else {
            input.classList.add('is-danger');
            errorElement.style.display = 'block';
            errorElement.textContent = mensajeError;
        }
    }

    // Función genérica para validar cualquier formulario
    function validarFormulario(form) {
        let esValido = true;
        const campos = form.querySelectorAll('input[name]');
        
        campos.forEach(input => {
            const nombreCampo = input.name;
            const regla = reglasValidacion[nombreCampo];
            if (regla) {
                const valor = input.value.trim();
                const errorElement = form.querySelector(`#${nombreCampo}-error-${form.id.split('-')[1]}`);
                let resultado = true;
                let mensajeError = '';

                if (regla.required && !valor) {
                    resultado = false;
                    mensajeError = regla.mensaje || 'Este campo es obligatorio.';
                } else if (regla.regex && !regla.regex.test(valor)) {
                    resultado = false;
                    mensajeError = regla.mensaje;
                }

                actualizarEstadoInput(input, errorElement, resultado, mensajeError);
                esValido = esValido && resultado;
            }
        });

        if (esValido) {
            alert("Formulario enviado con éxito.");
            form.submit();
        } else {
            console.log("Validación fallida en formulario: ", form.id);
        }
    }

    // Asignar eventos a los formularios
    const formVoluntario = document.getElementById('register-voluntario');
    const formOrganizacion = document.getElementById('register-organizacion');

    if (formVoluntario) {
        formVoluntario.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Validando formulario de voluntario");
            validarFormulario(this);
        });
    } else {
        console.error("Formulario register-voluntario no encontrado");
    }

    if (formOrganizacion) {
        formOrganizacion.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Validando formulario de organización");
            validarFormulario(this);
        });
    } else {
        console.error("Formulario register-organizacion no encontrado");
    }
});
