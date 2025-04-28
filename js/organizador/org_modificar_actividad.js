function openModifyActivityModal(button) {
    try {
        const activityBox = button.closest('.box');
        if (!activityBox) throw new Error('No se encontró el contenedor de la actividad');

        const modal = document.getElementById('modal-modificar-actividad');
        if (!modal) throw new Error('No se encontró el modal');

        // Obtener datos de la actividad
        const nombre = activityBox.querySelector('.title')?.textContent || '';
        const organizacion = activityBox.querySelector('p:nth-child(2) a')?.textContent.replace('@', '') || '';
        const descripcion = activityBox.querySelector('p:nth-child(3)')?.textContent.replace('Descripción: ', '') || '';
        const estado = activityBox.querySelector('p:nth-child(4) .tag')?.textContent || '';
        const fecha = activityBox.querySelector('p:nth-child(5) .tag')?.textContent || '';
        const horas = activityBox.querySelector('p:nth-child(6) .tag')?.textContent.replace('h', '') || '';
        const tipos = Array.from(activityBox.querySelectorAll('p:nth-child(7) .tag')).map(tag => tag.textContent);
        const odsImages = Array.from(activityBox.querySelectorAll('.is-flex img')).map(img => {
            const match = img.src.match(/ods(\d+)\.png/);
            return match ? match[1] : null;
        }).filter(Boolean);
        const imagenSrc = activityBox.querySelector('img')?.src || '';

        // Rellenar el formulario del modal
        document.getElementById('edit-nombre-actividad').value = nombre;
        document.getElementById('edit-organizacion-actividad').value = organizacion;
        document.getElementById('edit-descripcion-actividad').value = descripcion;
        document.getElementById('edit-estado-actividad').value = estado;
        document.getElementById('edit-fecha-actividad').value = fecha;
        document.getElementById('edit-horas-actividad').value = horas;

        // Marcar los tipos de actividad
        const tipoCheckboxes = ['ambiental', 'educativo', 'social', 'digital', 'cultural', 'deportivo', 'tecnologico'];
        tipoCheckboxes.forEach(tipo => {
            const checkbox = document.getElementById(`edit-tipo-${tipo}`);
            if (checkbox) {
                checkbox.checked = tipos.includes(tipo.charAt(0).toUpperCase() + tipo.slice(1));
            }
        });

        // Seleccionar ODS
        const odsSelect = document.getElementById('edit-ods-actividad');
        if (odsSelect) {
            Array.from(odsSelect.options).forEach(option => {
                option.selected = odsImages.includes(option.value);
            });
        }

        // Guardar la referencia del contenedor de la actividad
        modal.dataset.activityBoxId = activityBox.dataset.id || Date.now().toString();
        activityBox.dataset.id = modal.dataset.activityBoxId;

        // Mostrar el modal
        modal.classList.add('is-active');
    } catch (error) {
        console.error('Error al abrir el modal:', error);
        alert('Error al abrir el modal. Por favor, revisa la consola para más detalles.');
    }
}

// Función para guardar los cambios
function saveActivityChanges() {
    try {
        const modal = document.getElementById('modal-modificar-actividad');
        if (!modal) throw new Error('No se encontró el modal');

        const activityBox = document.querySelector(`.box[data-id="${modal.dataset.activityBoxId}"]`);
        if (!activityBox) throw new Error('No se encontró el contenedor de la actividad');

        // Obtener valores del formulario
        const nombre = document.getElementById('edit-nombre-actividad')?.value || '';
        const organizacion = document.getElementById('edit-organizacion-actividad')?.value || '';
        const descripcion = document.getElementById('edit-descripcion-actividad')?.value || '';
        const estado = document.getElementById('edit-estado-actividad')?.value || '';
        const fecha = document.getElementById('edit-fecha-actividad')?.value || '';
        const horas = document.getElementById('edit-horas-actividad')?.value || '';
        const tipos = [];
        ['ambiental', 'educativo', 'social', 'digital', 'cultural', 'deportivo', 'tecnologico'].forEach(tipo => {
            if (document.getElementById(`edit-tipo-${tipo}`).checked) {
                tipos.push(tipo.charAt(0).toUpperCase() + tipo.slice(1));
            }
        });
        const odsSelected = Array.from(document.getElementById('edit-ods-actividad')?.selectedOptions || []).map(option => option.value);
        const imagenInput = document.getElementById('edit-imagen-actividad');
        const imagen = imagenInput.files[0] ? URL.createObjectURL(imagenInput.files[0]) : activityBox.querySelector('img')?.src || '';

        // Validar campos requeridos
        if (!nombre || !organizacion || !descripcion || !estado || !fecha || !horas) {
            throw new Error('Por favor, completa todos los campos requeridos.');
        }

        // Actualizar el DOM
        const titleElement = activityBox.querySelector('.title');
        if (titleElement) titleElement.textContent = nombre;

        const orgElement = activityBox.querySelector('p:nth-child(2) a');
        if (orgElement) orgElement.textContent = `@${organizacion}`;

        const descElement = activityBox.querySelector('p:nth-child(3)');
        if (descElement) descElement.textContent = `Descripción: ${descripcion}`;

        const estadoTag = activityBox.querySelector('p:nth-child(4) .tag');
        if (estadoTag) {
            estadoTag.textContent = estado;
            estadoTag.className = `tag ${estado === 'En Curso' ? 'is-success' : estado === 'Finalizado' ? 'is-danger' : 'is-warning'}`;
        }

        const fechaTag = activityBox.querySelector('p:nth-child(5) .tag');
        if (fechaTag) fechaTag.textContent = fecha;

        const horasTag = activityBox.querySelector('p:nth-child(6) .tag');
        if (horasTag) horasTag.textContent = `${horas}h`;

        // Actualizar tipos
        const tiposContainer = activityBox.querySelector('p:nth-child(7)');
        if (tiposContainer) {
            tiposContainer.innerHTML = '<b>Tipo de Actividad: </b>' + tipos.map(tipo => `<span class="tag is-${tipo.toLowerCase()}">${tipo}</span>`).join(' ');
        }

        // Actualizar ODS
        const odsContainer = activityBox.querySelector('.is-flex');
        if (odsContainer) {
            odsContainer.innerHTML = odsSelected.map(ods => `<img class="image is-48x48 mx-2" src="/img/ODS/ods${ods}.png" alt="ODS${ods}">`).join('');
        }

        // Actualizar imagen
        const imgElement = activityBox.querySelector('img');
        if (imgElement) imgElement.src = imagen;

        // Cerrar el modal
        closeModal('modal-modificar-actividad');
    } catch (error) {
        console.error('Error al guardar los cambios:', error);
        alert('Error al guardar los cambios. Por favor, revisa la consola para más detalles.');
    }
}

// Función para cerrar el modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('is-active');
    }
}

// Añadir event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners para los botones "Modificar Actividad"
    document.querySelectorAll('.actividades .button').forEach(button => {
        button.addEventListener('click', () => openModifyActivityModal(button));
    });

    // Event listener para el botón "Guardar"
    const saveButton = document.getElementById('save-activity-btn');
    if (saveButton) {
        saveButton.addEventListener('click', saveActivityChanges);
    } else {
        console.error('No se encontró el botón de guardar (#save-activity-btn)');
    }
});

