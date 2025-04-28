document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const addVolunteerBtn = document.getElementById('add-volunteer');
    const modal = document.getElementById('modal-add-volunteer');
    const closeModalBtn = modal.querySelector('.delete');
    const cancelBtn = modal.querySelector('.button:not(.is-success)');
    const saveBtn = document.getElementById('save-volunteer');
    const form = document.getElementById('add-volunteer-form');
    const disponibilidadCheckboxes = document.querySelectorAll('#disponibilidad-checkboxes input[type="checkbox"]');
    const disponibilidadHorasContainer = document.getElementById('disponibilidad-horas');
    const userList = document.getElementById('user-list');
    const profileModal = document.getElementById('modal-voluntario');
    const profileModalCloseBtn = document.getElementById('cerrar-modal');

    // Open modal
    addVolunteerBtn.addEventListener('click', function () {
        modal.classList.add('is-active');
        resetForm();
    });

    // Close modal
    function closeModal(modalId = 'modal-add-volunteer') {
        document.getElementById(modalId).classList.remove('is-active');
        if (modalId === 'modal-add-volunteer') {
            resetForm();
        }
    }

    closeModalBtn.addEventListener('click', () => closeModal('modal-add-volunteer'));
    cancelBtn.addEventListener('click', () => closeModal('modal-add-volunteer'));
    profileModalCloseBtn.addEventListener('click', () => closeModal('modal-voluntario'));

    // Reset form
    function resetForm() {
        form.reset();
        clearErrors();
        disponibilidadHorasContainer.innerHTML = '';
        updateAvailabilityHours();
        toggleIcons();
    }

    // Clear error messages
    function clearErrors() {
        const errorElements = form.querySelectorAll('.help.is-danger');
        errorElements.forEach(el => el.style.display = 'none');
    }

    // Toggle check icons based on input validity
    function toggleIcons() {
        const inputs = form.querySelectorAll('input:not([type="checkbox"]), select');
        inputs.forEach(input => {
            const icon = input.parentElement.querySelector('.icon.is-right i');
            if (icon) {
                icon.className = input.value && input.checkValidity() ? 'fas fa-check' : 'fas fa-exclamation-triangle';
            }
        });
    }

    // Update availability hours inputs
    function updateAvailabilityHours() {
        disponibilidadHorasContainer.innerHTML = '';
        const selectedDays = Array.from(disponibilidadCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        selectedDays.forEach(day => {
            const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
            const div = document.createElement('div');
            div.className = 'field is-horizontal';
            div.style.marginRight = '10px';
            div.innerHTML = `
                <div class="field-label is-normal">
                    <label class="label">${capitalizedDay}</label>
                </div>
                <div class="field-body">
                    <div class="field is-narrow">
                        <div class="control">
                            <input class="input" type="time" name="horas-${day}-inicio" required>
                        </div>
                    </div>
                    <div class="field is-narrow">
                        <div class="control">
                            <input class="input" type="time" name="horas-${day}-fin" required>
                        </div>
                    </div>
                </div>
            `;
            disponibilidadHorasContainer.appendChild(div);
        });
    }

    // Add event listeners for availability checkboxes
    disponibilidadCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateAvailabilityHours);
    });

    // Form validation
    function validateForm() {
        let isValid = true;
        clearErrors();

        // Nombre
        const nombre = form.querySelector('input[name="nombre"]').value.trim();
        if (!nombre || !/^[A-Za-z\s]{2,}$/.test(nombre)) {
            showError('nombre-error-voluntario', 'El nombre debe contener solo letras y al menos 2 caracteres.');
            isValid = false;
        }

        // Apellidos
        const apellidos = form.querySelector('input[name="apellidos"]').value.trim();
        if (!apellidos || !/^[A-Za-z\s]{2,}$/.test(apellidos)) {
            showError('apellidos-error-voluntario', 'Los apellidos deben contener solo letras y al menos 2 caracteres.');
            isValid = false;
        }

        // Email
        const email = form.querySelector('input[name="email"]').value.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError('email-error-voluntario', 'Por favor, introduce un email válido.');
            isValid = false;
        }

        // Teléfono
        const telefono = form.querySelector('input[name="telefono"]').value.trim();
        if (!telefono || !/^\d{9}$/.test(telefono)) {
            showError('telefono-error-voluntario', 'El teléfono debe contener exactamente 9 dígitos.');
            isValid = false;
        }

        // Fecha de nacimiento
        const fechaNacimiento = form.querySelector('input[name="fechaNacimiento"]').value;
        if (!fechaNacimiento) {
            showError('fechaNacimiento-error-voluntario', 'La fecha de nacimiento es obligatoria.');
            isValid = false;
        } else {
            const birthDate = new Date(fechaNacimiento);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 16) {
                showError('fechaNacimiento-error-voluntario', 'Debes tener al menos 16 años.');
                isValid = false;
            }
        }

        // Clase
        const clase = form.querySelector('select[name="clase"]').value;
        if (!clase) {
            showError('clase-error', 'Por favor, selecciona una clase.');
            isValid = false;
        }

        // Curso
        const curso = form.querySelector('select[name="curso"]').value;
        if (!curso) {
            showError('curso-error', 'Por favor, selecciona un curso.');
            isValid = false;
        }

        // Tipo de voluntariado
        const voluntariado = form.querySelectorAll('input[name="voluntariado"]:checked');
        if (voluntariado.length === 0) {
            showError('voluntariado-error', 'Por favor, selecciona al menos un tipo de voluntariado.');
            isValid = false;
        }

        // Disponibilidad
        const disponibilidad = form.querySelectorAll('input[name="disponibilidad"]:checked');
        if (disponibilidad.length === 0) {
            showError('disponibilidad-error', 'Por favor, selecciona al menos un día de disponibilidad.');
            isValid = false;
        } else {
            const timeInputs = form.querySelectorAll('#disponibilidad-horas input[type="time"]');
            timeInputs.forEach(input => {
                if (!input.value) {
                    showError('disponibilidad-error', 'Por favor, completa los horarios para todos los días seleccionados.');
                    isValid = false;
                }
            });
        }

        return isValid;
    }

    // Show error message
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Map class to course abbreviation
    function getCourseAbbreviation(clase) {
        const classMap = {
            'FP básica Servicios Comerciales': 'SC',
            'FP especial Auxiliar Administrativo General': 'AAG',
            'FP Imagen': 'IMG',
            'CFM Gestión Administrativa': 'GA',
            'CFM Actividades Comerciales': 'AC',
            'CFM Sistemas Microinformáticos y redes': 'SMR',
            'CFS Administración y finanzas': 'AF',
            'CFS Comercio Internacional': 'CI',
            'CFS Gestión de ventas': 'GV',
            'CFS Transporte y logística': 'TL',
            'CFS Administración de sistemas informáticos y redes': 'ASIR',
            'CFS Desarrollo de aplicaciones multiplataforma': 'DAM'
        };
        return classMap[clase] || 'Unknown';
    }

    // Map volunteering type to tag class
    function getVolunteerTagClass(type) {
        const typeMap = {
            'social': 'is-social',
            'ambiental': 'is-ambiental',
            'educativo': 'is-educativo',
            'cultural': 'is-cultural',
            'deportivo': 'is-deportivo',
            'salud': 'is-salud',
            'digital': 'is-digital',
            'tecnico': 'is-tecnologico'
        };
        return typeMap[type.toLowerCase()] || 'is-info';
    }

    // Show volunteer profile
    function showVolunteerProfile(volunteerData) {
        // Populate modal fields
        document.getElementById('modal-nombre').textContent = `${volunteerData.nombre} ${volunteerData.apellidos}`;
        document.getElementById('modal-img').src = '/img/icons/avatar.png';
        document.getElementById('modal-correo').textContent = volunteerData.email;
        document.getElementById('modal-telefono').textContent = `+34 ${volunteerData.telefono}`;
        document.getElementById('modal-fecha').textContent = volunteerData.fechaNacimiento;
        document.getElementById('modal-curso').textContent = `${volunteerData.curso} ${getCourseAbbreviation(volunteerData.clase)}`;

        // Volunteering types
        const voluntariadoTags = volunteerData.voluntariado.map(type => 
            `<span class="tag ${getVolunteerTagClass(type)}">${type.charAt(0).toUpperCase() + type.slice(1)}</span>`
        ).join(' ');
        document.getElementById('modal-voluntariado').innerHTML = voluntariadoTags;

        // Availability
        const disponibilidadTags = volunteerData.disponibilidad.map(item => 
            `<span class="tag">${item.day.charAt(0).toUpperCase() + item.day.slice(1)} (${item.inicio} - ${item.fin})</span>`
        ).join(' ');
        document.getElementById('modal-disponibilidad').innerHTML = disponibilidadTags;

        // Valuation (0 stars)
        document.getElementById('modal-valoracion').innerHTML = `
            <span class="icon is-small"><i class="fa-regular fa-star"></i></span>
            <span class="icon is-small"><i class="fa-regular fa-star"></i></span>
            <span class="icon is-small"><i class="fa-regular fa-star"></i></span>
            <span class="icon is-small"><i class="fa-regular fa-star"></i></span>
            <span class="icon is-small"><i class="fa-regular fa-star"></i></span>
        `;

        // Description (invented if not provided)
        document.getElementById('modal-descripcion').textContent = volunteerData.sobreTi || 
            'Voluntario comprometido con contribuir al bienestar de la comunidad mediante actividades de voluntariado.';

        // Activities (invented as none yet)
        document.getElementById('modal-actividades').innerHTML = `
            <li><i class="fas fa-info-circle has-text-info"></i> Aún no ha participado en actividades.</li>
        `;

        // Show modal
        profileModal.classList.add('is-active');
    }

    // Add new volunteer to the list
    function addVolunteerToList(volunteerData) {
        const div = document.createElement('div');
        div.className = 'column is-6-desktop voluntarios';
        const courseAbbreviation = getCourseAbbreviation(volunteerData.clase);
        const fullName = `${volunteerData.nombre} ${volunteerData.apellidos}`;
        const cursoDisplay = `${volunteerData.curso} ${courseAbbreviation}`;

        // Generate volunteering type tags
        const voluntariadoTags = volunteerData.voluntariado.map(type => `
            <span class="tag ${getVolunteerTagClass(type)}">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
        `).join(' ');

        // Generate availability tags
        const disponibilidadTags = volunteerData.disponibilidad.map(item => `
            <span class="tag">${item.day.charAt(0).toUpperCase() + item.day.slice(1)}</span>
        `).join(' ');

        div.innerHTML = `
            <div class="box voluntario-box">
                <div class="checkbox-container">
                    <input type="checkbox" class="voluntario-checkbox">
                </div>
                <div class="columns is-variable is-1 is-flex-direction-column-mobile">
                    <div class="column is-4 has-text-centered is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                        <figure class="image is-128x128 mb-3">
                            <img src="/img/icons/avatar.png" alt="perfil" class="is-rounded">
                        </figure>
                        <button class="button mostrarperfil">Mostrar Perfil</button>
                    </div>
                    <div class="column is-8">
                        <h3 class="title is-3 is-txt4v">${fullName}</h3>
                        <p><b>Correo:</b> <a href="mailto:${volunteerData.email}">${volunteerData.email}</a></p>
                        <p><b>Teléfono:</b> +34 ${volunteerData.telefono}</p>
                        <p><b>Curso:</b> ${cursoDisplay}</p>
                        <p><b>Tipo de Voluntariado:</b> ${voluntariadoTags}</p>
                        <p><b>Disponibilidad:</b> ${disponibilidadTags}</p>
                        <p><b>Valoración:</b></p>
                        <div class="rating">
                            <span class="icon is-small"><i class="fa-regular fa-star"></i></span>
                            <span class="icon is-small"><i class="fa-regular fa-star"></i></span>
                            <span class="icon is-small"><i class="fa-regular fa-star"></i></span>
                            <span class="icon is-small"><i class="fa-regular fa-star"></i></span>
                            <span class="icon is-small"><i class="fa-regular fa-star"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        userList.appendChild(div);

        // Attach event listener to the new profile button
        const profileButton = div.querySelector('.mostrarperfil');
        profileButton.addEventListener('click', () => showVolunteerProfile(volunteerData));
    }

    // Handle form submission
    saveBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData(form);
            const volunteerData = {
                nombre: formData.get('nombre'),
                apellidos: formData.get('apellidos'),
                email: formData.get('email'),
                telefono: formData.get('telefono'),
                fechaNacimiento: formData.get('fechaNacimiento'),
                clase: formData.get('clase'),
                curso: formData.get('curso'),
                voluntariado: formData.getAll('voluntariado'),
                disponibilidad: formData.getAll('disponibilidad').map(day => {
                    return {
                        day,
                        inicio: formData.get(`horas-${day}-inicio`),
                        fin: formData.get(`horas-${day}-fin`)
                    };
                }),
                sobreTi: formData.get('sobreTi')
            };

            // Add volunteer to the list
            addVolunteerToList(volunteerData);

            // Simulate saving to backend
            console.log('Volunteer Data:', volunteerData);
            alert('Voluntario añadido con éxito.');
            closeModal('modal-add-volunteer');
        }
    });

    // Real-time validation for inputs
    form.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('input', toggleIcons);
        input.addEventListener('change', toggleIcons);
    });

    // Attach event listeners to existing profile buttons
    document.querySelectorAll('.mostrarperfil').forEach(button => {
        button.addEventListener('click', function () {
            // This assumes existing logic in org_modal.js or modals.js handles these
            console.log('Existing profile button clicked (handled by other scripts)');
        });
    });
});