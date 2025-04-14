document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el input y el contenedor
    const filterNombre = document.getElementById('filter-nombre');
    const contenedorOrganizaciones = document.querySelector('.container .columns');

    // Verificar que los elementos existen
    if (!filterNombre) {
        console.error('Input #filter-nombre no encontrado');
        return;
    }
    if (!contenedorOrganizaciones) {
        console.error('Contenedor .container .columns no encontrado');
        return;
    }

    // Función para aplicar el filtro
    function applyFilters() {
        const nombreFilter = filterNombre.value.trim().toLowerCase();
        const orgBoxes = contenedorOrganizaciones.querySelectorAll('.box');

        // Depuración: verificar cuántos boxes se encuentran
        console.log('Boxes encontrados:', orgBoxes.length);

        orgBoxes.forEach((box) => {
            const nombre = box.dataset.nombre ? box.dataset.nombre.toLowerCase() : '';
            // Depuración: mostrar nombre y comparación
            console.log('Comparando:', nombre, 'con', nombreFilter);

            // Mostrar si coincide exactamente o si el filtro está vacío
            const matchesNombre = nombreFilter === '' || nombre === nombreFilter;
            box.closest('.column').style.display = matchesNombre ? '' : 'none';
        });
    }

    // Escuchar cambios en el input
    filterNombre.addEventListener('input', function() {
        // Depuración: confirmar que el evento se dispara
        console.log('Input cambiado, valor:', filterNombre.value);
        applyFilters();
    });

    // Observador para cambios dinámicos
    const observer = new MutationObserver(function(mutations) {
        // Depuración: confirmar cambios detectados
        console.log('Cambio detectado en el contenedor');
        applyFilters();
    });

    // Configurar el observador
    observer.observe(contenedorOrganizaciones, {
        childList: true,
        subtree: true
    });

    // Aplicar filtro inicial
    console.log('Aplicando filtro inicial');
    applyFilters();
});