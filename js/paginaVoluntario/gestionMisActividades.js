document.addEventListener('DOMContentLoaded', function() {
    // Asignar IDs únicos a las columnas de actividades
    const actividades = document.querySelectorAll('#actividad .column.is-12.is-6-desktop');
    actividades.forEach((col, index) => {
        col.id = `activity-${index + 1}`;
    });

    const contenedorMisActividades = document.querySelector('#misActividades .actividades');
    if (!contenedorMisActividades) {
        console.error('Contenedor para Mis Actividades no encontrado');
        return;
    }

    // Delegación de eventos para botones Desapuntarse
    contenedorMisActividades.addEventListener('click', function(event) {
        if (event.target.classList.contains('desapuntarse-button')) {
            const columnaActividad = event.target.closest('.column.is-12.is-6-desktop');
            if (columnaActividad) {
                const idActividad = columnaActividad.getAttribute('data-original-id');
                if (idActividad) {
                    const originalButton = document.querySelector(`#${idActividad} .apuntarse-button`);
                    if (originalButton) {
                        originalButton.disabled = false;
                    }
                }
                columnaActividad.remove();
            }
        }
    });

    // Manejar botones Apuntarse
    const apuntarseBotones = document.querySelectorAll('.apuntarse-button');
    apuntarseBotones.forEach(button => {
        button.addEventListener('click', function() {
            const activityColumn = this.closest('.column.is-12.is-6-desktop');
            if (!activityColumn || !activityColumn.id) return;
            const nodoClonado = activityColumn.cloneNode(true);
            nodoClonado.setAttribute('data-original-id', activityColumn.id);
            const botonClonado = nodoClonado.querySelector('.apuntarse-button');
            if (botonClonado) {
                botonClonado.textContent = 'Desapuntarse';
                botonClonado.classList.remove('apuntarse-button');
                botonClonado.classList.add('desapuntarse-button');
            }
            contenedorMisActividades.appendChild(nodoClonado);
            this.disabled = true;
        });
    });
});