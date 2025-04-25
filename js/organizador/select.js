document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.voluntario-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const box = this.closest('.voluntario-box');
            if (this.checked) {
                box.classList.add('selected');
            } else {
                box.classList.remove('selected');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const checkboxes = document.querySelectorAll('.voluntario-checkbox');
    const selectAllButton = document.querySelector('.button.select-all');

    // Función para seleccionar o deseleccionar todos los checkboxes
    selectAllButton.addEventListener('click', function () {
        const allSelected = Array.from(checkboxes).every(checkbox => checkbox.checked);

        checkboxes.forEach(checkbox => {
            checkbox.checked = !allSelected; // Alternar selección
            const box = checkbox.closest('.voluntario-box');
            if (checkbox.checked) {
                box.classList.add('selected');
            } else {
                box.classList.remove('selected');
            }
        });
    });

    // Manejar el cambio individual de cada checkbox
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const box = this.closest('.voluntario-box');
            if (this.checked) {
                box.classList.add('selected');
            } else {
                box.classList.remove('selected');
            }
        });
    });
});