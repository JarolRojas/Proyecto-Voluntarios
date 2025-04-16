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
                // Verificar si el valor está vacío
                if (!value) {
                    return 'La fecha de nacimiento es obligatoria.';
                }

                // Validar formato básico de fecha (AAAA-MM-DD)
                const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
                if (!regexFecha.test(value)) {
                    return 'Formato de fecha inválido (use AAAA-MM-DD).';
                }

                // Crear objeto Date desde el valor
                const fechaNac = new Date(value);
                
                // Verificar si la fecha es válida
                if (isNaN(fechaNac.getTime())) {
                    return 'Fecha inválida.';
                }

                // Obtener fecha actual del sistema
                const fechaActual = new Date();
                
                // Calcular fecha mínima (120 años atrás desde hoy)
                const fechaMinima = new Date();
                fechaMinima.setFullYear(fechaActual.getFullYear() - 120);

                // Normalizar horas para evitar problemas de comparación
                fechaNac.setHours(0, 0, 0, 0);
                fechaActual.setHours(0, 0, 0, 0);
                fechaMinima.setHours(0, 0, 0, 0);

                // Validaciones
                if (fechaNac.getTime() > fechaActual.getTime()) {
                    return 'La fecha no puede ser futura.';
                }
                if (fechaNac.getTime() < fechaMinima.getTime()) {
                    return `La fecha no puede ser anterior a ${fechaMinima.toISOString().split('T')[0]}.`;
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
        },
        clase: {
            required: true,
            mensaje: 'Debes seleccionar una clase.'
        },
        curso: {
            required: true,
            mensaje: 'Debes seleccionar un curso.'
        },
        terminos: {
            required: true,
            mensaje: 'Debes aceptar los términos y condiciones.'
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
        const campos = form.querySelectorAll('input[name], select[name]');
        
        campos.forEach(input => {
            const nombreCampo = input.name;
            const regla = reglasValidacion[nombreCampo];
            if (regla) {
                let resultado = true;
                let mensajeError = '';
                const errorElement = form.querySelector(`#${nombreCampo}-error-${form.id.split('-')[1]}`) || 
                                   form.querySelector(`#${nombreCampo}-error`);

                if (input.type === 'checkbox') {
                    // Validar checkboxes
                    if (regla.required && !input.checked) {
                        resultado = false;
                        mensajeError = regla.mensaje || 'Este campo es obligatorio.';
                    }
                } else {
                    // Validar otros campos
                    const valor = input.value.trim();
                    if (regla.required && !valor) {
                        resultado = false;
                        mensajeError = regla.mensaje || 'Este campo es obligatorio.';
                    } else if (regla.regex && !regla.regex.test(valor)) {
                        resultado = false;
                        mensajeError = regla.mensaje;
                    } else if (regla.validar) {
                        const validacion = regla.validar(valor);
                        if (validacion !== true) {
                            resultado = false;
                            mensajeError = validacion;
                        }
                    }
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