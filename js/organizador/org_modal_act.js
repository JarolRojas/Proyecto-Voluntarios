function seleccionarTodasActividades() {
    const checkboxes = document.querySelectorAll('.actividad-checkbox');
    const allSelected = Array.from(checkboxes).every(checkbox => checkbox.checked);

    checkboxes.forEach(checkbox => {
        checkbox.checked = !allSelected;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todas las actividades
    const seleccionarTodasBtn = document.querySelector('.button[onclick="seleccionarTodasActividades()"]');
    const eliminarActividadBtn = document.querySelector('.button[onclick="eliminarActividades()"]');
    const checkboxes = document.querySelectorAll('.actividad-checkbox');

    // Función para seleccionar/deseleccionar todas las actividades
    seleccionarTodasBtn.addEventListener('click', () => {
        const allSelected = Array.from(checkboxes).every(checkbox => checkbox.checked);
        checkboxes.forEach(checkbox => {
            checkbox.checked = !allSelected;
            toggleActividadSeleccionada(checkbox);
        });
    });

    // Función para eliminar actividades seleccionadas
    eliminarActividadBtn.addEventListener('click', () => {
        const selectedCheckboxes = document.querySelectorAll('.actividad-checkbox:checked');
        if (selectedCheckboxes.length === 0) {
            alert('Por favor, selecciona al menos una actividad para eliminar.');
            return;
        }

        if (confirm('¿Estás seguro de que deseas eliminar las actividades seleccionadas?')) {
            selectedCheckboxes.forEach(checkbox => {
                const actividadBox = checkbox.closest('.actividad-box');
                actividadBox.remove();
            });
        }
    });

    // Agregar evento a cada checkbox para resaltar la actividad seleccionada
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            toggleActividadSeleccionada(checkbox);
        });
    });

    // Función para alternar la clase "selected" en la actividad
    function toggleActividadSeleccionada(checkbox) {
        const actividadBox = checkbox.closest('.actividad-box');
        if (checkbox.checked) {
            actividadBox.classList.add('selected');
        } else {
            actividadBox.classList.remove('selected');
        }
    }
});

function openModal(modalId) {
    document.getElementById(modalId).classList.add('is-active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('is-active');
}


function saveNewActivity() {
    const form = document.getElementById('addActivityForm');
    const formData = new FormData(form);

    // Obtener los datos del formulario
    const nuevaActividad = {
        nombre: formData.get('nombreActividad'),
        organizacion: formData.get('organizacionActividad'),
        fecha: formData.get('fechaActividad'),
        horas: formData.get('horasActividad'),
        tipo: formData.getAll('tipoActividad[]'), // Obtener múltiples valores
        estado: formData.get('estadoActividad'),
        ods: formData.getAll('odsActividad[]'), // Obtener múltiples valores
        descripcion: formData.get('descripcionActividad'),
        imagen: formData.get('imagenActividad') ? URL.createObjectURL(formData.get('imagenActividad')) : '', // Crear URL para la imagen
    };

    // Crear una nueva actividad en el DOM
    const actividadesContainer = document.querySelector('.columns.is-multiline.mt-4.actividades');
    const nuevaActividadHTML = `
        <div class="column is-12 is-6-desktop actividades">
            <div class="box actividad-box">
                <div class="checkbox-container">
                    <input type="checkbox" class="actividad-checkbox">
                </div>
                <div class="columns">
                    <div class="column is-4">
                        <figure class="img-actividad">
                            <img src="${nuevaActividad.imagen}" alt="${nuevaActividad.nombre}">
                        </figure>
                    </div>
                    <div class="column is-8">
                        <p class="title is-4 is-txt4v">${nuevaActividad.nombre}</p>
                        <p><b class="is-txt4v">Organización: </b><a href="">@${nuevaActividad.organizacion}</a></p>
                        <p><b class="is-txt4v">Descripción: </b>${nuevaActividad.descripcion}</p>
                        <p class="is-txt4v my-1"><b>Estado: </b><span class="tag ${nuevaActividad.estado === 'En Curso' ? 'is-success' : nuevaActividad.estado === 'Finalizado' ? 'is-danger' : ''}">${nuevaActividad.estado}</span></p>
                        <p class="is-txt4v my-1"><b>Fecha: </b><span class="tag fecha">${nuevaActividad.fecha.split('-').reverse().join('/')}</span></p>
                        <p class="is-txt4v my-1"><b>Horas: </b><span class="tag">${nuevaActividad.horas}h</span></p>
                        <p class="is-txt4v my-1"><b>Tipo de Actividad: </b>
                            ${nuevaActividad.tipo.map(tipo => `<span class="tag is-${tipo.toLowerCase()}">${tipo}</span>`).join(' ')}
                        </p>
                        <p class="is-txt4v my-1"><b>ODS Realizados</b></p>
                        <div class="is-flex">
                            ${nuevaActividad.ods.map(ods => `<img class="image is-48x48 mx-2" src="/img/ODS/${ods.toLowerCase()}.png" alt="${ods}">`).join('')}
                        </div>
                        <div class="has-text-right mt-1">
                            <button class="button" onclick="openModal('modalEditActivity')">Modificar Actividad</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Insertar la nueva actividad en el contenedor
    actividadesContainer.insertAdjacentHTML('beforeend', nuevaActividadHTML);

    // Cerrar el modal y resetear el formulario
    closeModal('modalAddActivity');
    form.reset(); // Limpiar el formulario
}



function saveEditedActivity() {
    const form = document.getElementById('editActivityForm');
    const formData = new FormData(form);

    // Actualizar los datos de la actividad seleccionada
    const actividadBox = document.querySelector('.actividad-box.selected');
    actividadBox.querySelector('.title').textContent = formData.get('nombreActividad');
    actividadBox.querySelector('a').textContent = `@${formData.get('organizacionActividad')}`;
    actividadBox.querySelector('.tag.fecha').textContent = formData.get('fechaActividad').split('-').reverse().join('/');
    actividadBox.querySelector('.tag').textContent = `${formData.get('horasActividad')}h`;
    actividadBox.querySelector('.tag.is-success, .tag.is-danger').textContent = formData.get('estadoActividad');
    actividadBox.querySelector('p:nth-of-type(3)').textContent = `Descripción: ${formData.get('descripcionActividad')}`;

    closeModal('modalEditActivity');
}