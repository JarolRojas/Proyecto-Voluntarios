document.addEventListener('DOMContentLoaded', function () {
    // Obtener los elementos de filtro
    const filterNombre = document.getElementById('filter-nombreAct');
    const filterFecha = document.getElementById('filter-fechaAct');
    const filterTipo = document.getElementById('filter-tipoAct');
    const filterEstado = document.getElementById('filter-estadoAct');
    const filterOds = document.getElementById('filter-odsAct');
    const activityList = document.querySelectorAll('.actividades .box');

    // Función para convertir una fecha al formato DD/MM/YYYY
    function formatFecha(fecha) {
        const [year, month, day] = fecha.split('-'); // Separar la fecha en partes
        return `${day}/${month}/${year}`; // Reorganizar al formato DD/MM/YYYY
    }

    // Función para filtrar las actividades
    function filterActivities() {
        const nombre = filterNombre.value.toLowerCase();
        const fecha = filterFecha.value ? formatFecha(filterFecha.value) : ''; // Convertir la fecha seleccionada
        const tipo = filterTipo.value.toLowerCase();
        const estado = filterEstado.value.toLowerCase();
        const ods = filterOds.value.toUpperCase(); // Convertir el valor del filtro a mayúsculas para coincidir con el formato ODS+numero

        activityList.forEach(activity => {
            const nombreActividad = activity.querySelector('.title')?.textContent.toLowerCase() || '';
            const fechaActividad = activity.querySelector('.tag.fecha')?.textContent.trim() || ''; // Selector corregido
            const tipoActividad = Array.from(activity.querySelectorAll('.tag.is-ambiental, .tag.is-educativo, .tag.is-social, .tag.is-digital, .tag.is-cultural'))
                .map(tag => tag.textContent.toLowerCase());
            const estadoActividad = activity.querySelector('.tag.is-success, .tag.is-danger')?.textContent.toLowerCase() || '';
            const odsActividad = Array.from(activity.querySelectorAll('.image')).map(img => img.alt.toUpperCase()); // Convertir a mayúsculas para coincidir con el filtro

            // Verificar si la actividad cumple con los filtros
            const matchesNombre = nombre ? nombreActividad.includes(nombre) : true;
            const matchesFecha = fecha ? fechaActividad === fecha : true; // Comparar fechas en formato DD/MM/YYYY
            const matchesTipo = tipo ? tipoActividad.some(t => t.includes(tipo)) : true;
            const matchesEstado = estado ? estadoActividad.includes(estado) : true;
            const matchesOds = ods ? odsActividad.includes(ods) : true; // Comparar directamente con el valor del filtro

            // Mostrar u ocultar la actividad según los filtros
            if (matchesNombre && matchesFecha && matchesTipo && matchesEstado && matchesOds) {
                activity.parentElement.style.display = '';
            } else {
                activity.parentElement.style.display = 'none';
            }
        });
    }

    // Agregar eventos a los filtros para que se actualicen al cambiar
    filterNombre.addEventListener('input', filterActivities);
    filterFecha.addEventListener('input', filterActivities);
    filterTipo.addEventListener('change', filterActivities);
    filterEstado.addEventListener('change', filterActivities);
    filterOds.addEventListener('change', filterActivities);
});