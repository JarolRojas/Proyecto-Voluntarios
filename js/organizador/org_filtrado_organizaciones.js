document.addEventListener('DOMContentLoaded', function() {
    const filterInput = document.getElementById('filter-nombreOrg');

    // Función para aplicar el filtro
    window.aplicarFiltroOrganizaciones = function() {
        const filterValue = filterInput.value.toLowerCase();
        const columns = document.querySelectorAll('#organizaciones .container .columns.is-multiline .column.is-4');

        columns.forEach(function(column) {
            const orgName = column.getAttribute('data-nombre');
            if (orgName) {
                const orgNameLower = orgName.toLowerCase();
                column.style.display = orgNameLower.includes(filterValue) ? 'block' : 'none';
            }
        });
    };

    // Escuchar cambios en el input de filtro
    filterInput.addEventListener('input', window.aplicarFiltroOrganizaciones);
});