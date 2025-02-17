document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos la tabla que está en el tab "Alumnos" (asumiendo que está en el contenedor con id="tab2")
    const table = document.querySelector('#tab2 table');
    if (!table) return;

    // Seleccionar todos los <th> de la cabecera
    const headerCells = table.querySelectorAll('thead th');

    headerCells.forEach((header, index) => {
        // Omitir la primera columna si es la de checkbox
        if (index === 0) return;

        // Agregamos una clase para identificar que es sortable
        header.classList.add('sortable');
        header.style.cursor = "pointer";

        // Asegurarse de que exista un span para el indicador de orden
        let indicator = header.querySelector('.sort-indicator');
        if (!indicator) {
            indicator = document.createElement('span');
            indicator.classList.add('sort-indicator');
            indicator.style.marginLeft = '5px';
            header.appendChild(indicator);
        }

        // Agregar evento de clic para ordenar
        header.addEventListener('click', function () {
            sortTableByColumn(table, index, header);
        });
    });

    /**
     * Función que ordena las filas de la tabla según la columna indicada.
     * @param {HTMLTableElement} table - La tabla a ordenar.
     * @param {number} column - El índice de la columna por la que ordenar.
     * @param {HTMLElement} headerElement - El elemento <th> que se clickeó.
     */
    function sortTableByColumn(table, column, headerElement) {
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        // Determinar el orden actual (asc o desc) y alternarlo
        let currentOrder = headerElement.dataset.order || 'asc';
        let newOrder = currentOrder === 'asc' ? 'desc' : 'asc';
        headerElement.dataset.order = newOrder;

        // Limpiar los indicadores de orden de los demás encabezados
        const headers = table.querySelectorAll('thead th.sortable');
        headers.forEach(h => {
            if (h !== headerElement) {
                h.dataset.order = 'asc'; // reiniciamos a ascendente
                const ind = h.querySelector('.sort-indicator');
                if (ind) ind.innerHTML = '';
            }
        });

        // Actualizar el indicador de orden en el encabezado clickeado
        const indicator = headerElement.querySelector('.sort-indicator');
        if (indicator) {
            indicator.innerHTML = newOrder === 'asc'
                ? '<i class="fas fa-arrow-up"></i>'
                : '<i class="fas fa-arrow-down"></i>';
        }

        // Ordenar las filas
        rows.sort((a, b) => {
            let aText = a.cells[column].textContent.trim();
            let bText = b.cells[column].textContent.trim();

            // Intentar convertir a número para orden numérico
            let aNum = parseFloat(aText);
            let bNum = parseFloat(bText);
            if (!isNaN(aNum) && !isNaN(bNum)) {
                return newOrder === 'asc' ? aNum - bNum : bNum - aNum;
            }

            // Ordenar como cadenas (insensible a mayúsculas)
            aText = aText.toLowerCase();
            bText = bText.toLowerCase();
            if (aText < bText) return newOrder === 'asc' ? -1 : 1;
            if (aText > bText) return newOrder === 'asc' ? 1 : -1;
            return 0;
        });

        // Reinsertar las filas ordenadas en el tbody
        rows.forEach(row => tbody.appendChild(row));
    }
});
