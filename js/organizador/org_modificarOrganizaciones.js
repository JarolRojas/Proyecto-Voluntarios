

// Cargar datos en el modo visualización y edición
function loadData(data, index) {
    document.getElementById(`viewNombre${index}`).textContent = data.nombre;
    document.getElementById(`viewDireccion${index}`).textContent = data.direccion;
    document.getElementById(`viewEmail${index}`).textContent = data.email;
    document.getElementById(`viewTelefono${index}`).textContent = data.telefono;
    document.getElementById(`viewTipo${index}`).textContent = data.tipo;
    document.getElementById(`viewSector${index}`).textContent = data.sector;
    document.getElementById(`viewAmbito${index}`).textContent = data.ambito.join(', ');
    document.getElementById(`viewDescripcion${index}`).textContent = data.descripcion;
    document.getElementById(`viewLogo${index}`).src = data.logo || '../img/logos/organizaciones/default.png';

    document.getElementById(`editNombre${index}`).value = data.nombre;
    document.getElementById(`editDireccion${index}`).value = data.direccion;
    document.getElementById(`editEmail${index}`).value = data.email;
    document.getElementById(`editTelefono${index}`).value = data.telefono;
    document.getElementById(`editTipo${index}`).value = data.tipo;
    document.getElementById(`editSector${index}`).value = data.sector;
    document.getElementById(`editAmbitoLocal${index}`).checked = data.ambito.includes('Local');
    document.getElementById(`editAmbitoRegional${index}`).checked = data.ambito.includes('Regional');
    document.getElementById(`editAmbitoNacional${index}`).checked = data.ambito.includes('Nacional');
    document.getElementById(`editAmbitoInternacional${index}`).checked = data.ambito.includes('Internacional');
    document.getElementById(`editDescripcion${index}`).value = data.descripcion;
    // No asignamos valor al input file por seguridad, pero mostramos el logo actual en el modo visualización
}

// Abrir modal
function openModal(modalId, data) {
    const modal = document.getElementById(modalId);
    modal.classList.add('is-active');
    const index = modalId.replace('modalOrg', '');
    loadData(data, index);
}

// Cerrar modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('is-active');
    const index = modalId.replace('modalOrg', '');
    document.getElementById(`viewMode${index}`).style.display = 'block';
    document.getElementById(`editMode${index}`).style.display = 'none';
    document.getElementById(`modifyButton${index}`).style.display = 'block';
    document.getElementById(`saveButton${index}`).style.display = 'none';
    document.getElementById(`cancelButton${index}`).style.display = 'none';
}

// Cambiar entre modo visualización y edición
function toggleEditMode(index) {
    const viewMode = document.getElementById(`viewMode${index}`);
    const editMode = document.getElementById(`editMode${index}`);
    const modifyButton = document.getElementById(`modifyButton${index}`);
    const saveButton = document.getElementById(`saveButton${index}`);
    const cancelButton = document.getElementById(`cancelButton${index}`);

    if (viewMode.style.display === 'block') {
        viewMode.style.display = 'none';
        editMode.style.display = 'block';
        modifyButton.style.display = 'none';
        saveButton.style.display = 'block';
        cancelButton.style.display = 'block';
    } else {
        viewMode.style.display = 'block';
        editMode.style.display = 'none';
        modifyButton.style.display = 'block';
        saveButton.style.display = 'none';
        cancelButton.style.display = 'none';
    }
}

// Guardar cambios
function saveChanges(index) {
    const logoInput = document.getElementById(`editLogo${index}`);
    const newData = {
        nombre: document.getElementById(`editNombre${index}`).value,
        direccion: document.getElementById(`editDireccion${index}`).value,
        email: document.getElementById(`editEmail${index}`).value,
        telefono: document.getElementById(`editTelefono${index}`).value,
        tipo: document.getElementById(`editTipo${index}`).value,
        sector: document.getElementById(`editSector${index}`).value,
        ambito: [
            document.getElementById(`editAmbitoLocal${index}`).checked ? 'Local' : '',
            document.getElementById(`editAmbitoRegional${index}`).checked ? 'Regional' : '',
            document.getElementById(`editAmbitoNacional${index}`).checked ? 'Nacional' : '',
            document.getElementById(`editAmbitoInternacional${index}`).checked ? 'Internacional' : ''
        ].filter(item => item !== ''),
        descripcion: document.getElementById(`editDescripcion${index}`).value,
        logo: logoInput.files[0] ? URL.createObjectURL(logoInput.files[0]) : organizations[index].logo
    };

    organizations[index] = newData;
    localStorage.setItem('organizations', JSON.stringify(organizations));
    loadData(newData, index);
    toggleEditMode(index);
    renderOrganizations(); // Actualizar la interfaz
}

