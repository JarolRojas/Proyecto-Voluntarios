document.addEventListener('DOMContentLoaded', function () {
    // Cargar organizaciones al iniciar la página
    cargarOrganizaciones();

    // Evento para abrir el modal de añadir organización
    document.getElementById('add-organization').addEventListener('click', function () {
        document.getElementById('modalAddOrganization').classList.add('is-active');
    });

    // Evento para guardar nueva organización desde el modal
    document.getElementById('addOrganizationForm').addEventListener('submit', function (event) {
        event.preventDefault();
        saveNewOrganization();
    });

    // Función para cerrar modales
    window.closeModal = function (modalId) {
        document.getElementById(modalId).classList.remove('is-active');
    };
});

// Función para cargar y mostrar las organizaciones desde localStorage
function cargarOrganizaciones() {
    const organizaciones = JSON.parse(localStorage.getItem('organizaciones')) || [];
    const container = document.querySelector('#organizaciones .container .columns.is-multiline');
    // Limpiar el contenedor excepto el modal
    container.querySelectorAll('.column').forEach(col => {
        if (!col.querySelector('.modal')) {
            col.remove();
        }
    });

    organizaciones.forEach(org => {
        const orgHTML = `
            <div class="column is-4" data-nombre="${org.nombre}">
                <div class="box">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-64x64">
                                <img src="${org.logo || '../img/logos/organizaciones/default.png'}" alt="Logo" />
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>${org.nombre}</strong><br>
                                    <strong>Correo:</strong> ${org.email}<br>
                                    <strong>Dirección:</strong> ${org.direccion}<br>
                                    <strong>Teléfono:</strong> ${org.telefono}
                                </p>
                            </div>
                            <button class="button is-small is-danger mt-1" onclick="eliminarOrganizacion('${org.nombre}')">Eliminar</button>
                            <button class="button is-small is-info mt-1" onclick="enviarMensaje('${org.email}')">Enviar Mensaje</button>
                            <button class="button is-small is-light mt-1" onclick="mostrarPerfil('${org.nombre}')">Mostrar perfil</button>
                        </div>
                    </article>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', orgHTML);
    });

    // Aplicar el filtro después de cargar las organizaciones
    if (typeof window.aplicarFiltroOrganizaciones === 'function') {
        window.aplicarFiltroOrganizaciones();
    }
}

// Función para guardar una nueva organización desde el modal
function saveNewOrganization() {
    const form = document.getElementById('addOrganizationForm');
    const formData = new FormData(form);
    const organizacion = {};
    const ambitos = [];

    formData.forEach((value, key) => {
        if (key === 'ambitoOrg') {
            ambitos.push(value);
        } else if (key !== 'logo') {
            organizacion[key.replace('Org', '')] = value;
        }
    });
    organizacion.ambito = ambitos;

    // Manejar el logo si se subió
    const logoInput = form.querySelector('input[name="logo"]');
    if (logoInput.files.length > 0) {
        const file = logoInput.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            organizacion.logo = e.target.result;
            guardarYActualizar(organizacion);
        };
        reader.readAsDataURL(file);
    } else {
        organizacion.logo = '../img/logos/organizaciones/default.png';
        guardarYActualizar(organizacion);
    }

    function guardarYActualizar(org) {
        let organizaciones = JSON.parse(localStorage.getItem('organizaciones')) || [];
        organizaciones.push(org);
        localStorage.setItem('organizaciones', JSON.stringify(organizaciones));
        cargarOrganizaciones();
        closeModal('modalAddOrganization');
    }
}

// Función para mostrar el perfil de una organización
window.mostrarPerfil = function (nombre) {
    const organizaciones = JSON.parse(localStorage.getItem('organizaciones')) || [];
    const org = organizaciones.find(o => o.nombre === nombre);
    if (org) {
        document.getElementById('viewNombre').textContent = org.nombre;
        document.getElementById('viewDireccion').textContent = org.direccion;
        document.getElementById('viewEmail').textContent = org.email;
        document.getElementById('viewTelefono').textContent = org.telefono;
        document.getElementById('viewTipo').textContent = org.tipo;
        document.getElementById('viewSector').textContent = org.sector;
        document.getElementById('viewAmbito').textContent = org.ambito.join(', ');
        document.getElementById('viewDescripcion').textContent = org.descripcion || '';
        document.getElementById('modalAmavir').classList.add('is-active');
    }
};

// Función para alternar entre modo visualización y edición
window.toggleEditMode = function () {
    const viewMode = document.getElementById('viewMode');
    const editMode = document.getElementById('editMode');
    const modifyButton = document.getElementById('modifyButton');
    const saveButton = document.getElementById('saveButton');
    const cancelButton = document.getElementById('cancelButton');

    if (editMode.style.display === 'none') {
        viewMode.style.display = 'none';
        editMode.style.display = 'block';
        modifyButton.style.display = 'none';
        saveButton.style.display = 'inline-block';
        cancelButton.style.display = 'inline-block';

        document.getElementById('editNombre').value = document.getElementById('viewNombre').textContent;
        document.getElementById('editDireccion').value = document.getElementById('viewDireccion').textContent;
        document.getElementById('editEmail').value = document.getElementById('viewEmail').textContent;
        document.getElementById('editTelefono').value = document.getElementById('viewTelefono').textContent;
        document.getElementById('editTipo').value = document.getElementById('viewTipo').textContent;
        document.getElementById('editSector').value = document.getElementById('viewSector').textContent;
        const ambitos = document.getElementById('viewAmbito').textContent.split(', ');
        document.getElementById('editAmbitoLocal').checked = ambitos.includes('Local');
        document.getElementById('editAmbitoRegional').checked = ambitos.includes('Regional');
        document.getElementById('editAmbitoNacional').checked = ambitos.includes('Nacional');
        document.getElementById('editAmbitoInternacional').checked = ambitos.includes('Internacional');
        document.getElementById('editDescripcion').value = document.getElementById('viewDescripcion').textContent;
    } else {
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
        modifyButton.style.display = 'inline-block';
        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
    }
};

// Función para guardar cambios al modificar una organización
window.saveChanges = function () {
    const nombreOriginal = document.getElementById('viewNombre').textContent;
    const organizaciones = JSON.parse(localStorage.getItem('organizaciones')) || [];
    const index = organizaciones.findIndex(o => o.nombre === nombreOriginal);
    if (index !== -1) {
        const ambitos = [];
        if (document.getElementById('editAmbitoLocal').checked) ambitos.push('Local');
        if (document.getElementById('editAmbitoRegional').checked) ambitos.push('Regional');
        if (document.getElementById('editAmbitoNacional').checked) ambitos.push('Nacional');
        if (document.getElementById('editAmbitoInternacional').checked) ambitos.push('Internacional');

        const logoInput = document.getElementById('editLogo');
        const updatedOrg = {
            nombre: document.getElementById('editNombre').value,
            direccion: document.getElementById('editDireccion').value,
            email: document.getElementById('editEmail').value,
            telefono: document.getElementById('editTelefono').value,
            tipo: document.getElementById('editTipo').value,
            sector: document.getElementById('editSector').value,
            ambito: ambitos,
            descripcion: document.getElementById('editDescripcion').value,
            logo: organizaciones[index].logo // Mantener logo por defecto
        };

        if (logoInput && logoInput.files.length > 0) {
            const file = logoInput.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                updatedOrg.logo = e.target.result;
                organizaciones[index] = updatedOrg;
                localStorage.setItem('organizaciones', JSON.stringify(organizaciones));
                cargarOrganizaciones();
                toggleEditMode();
                closeModal('modalAmavir');
            };
            reader.readAsDataURL(file);
        } else {
            organizaciones[index] = updatedOrg;
            localStorage.setItem('organizaciones', JSON.stringify(organizaciones));
            cargarOrganizaciones();
            toggleEditMode();
            closeModal('modalAmavir');
        }
    }
};

// Función para eliminar una organización
window.eliminarOrganizacion = function (nombre) {
    if (confirm(`¿Estás seguro de eliminar la organización ${nombre}?`)) {
        let organizaciones = JSON.parse(localStorage.getItem('organizaciones')) || [];
        organizaciones = organizaciones.filter(o => o.nombre !== nombre);
        localStorage.setItem('organizaciones', JSON.stringify(organizaciones));
        cargarOrganizaciones();
    }
};

// Función para enviar un mensaje
window.enviarMensaje = function (email) {
    window.location.href = `mailto:${email}`;
};