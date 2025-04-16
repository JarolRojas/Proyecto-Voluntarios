document.addEventListener('DOMContentLoaded', () => {
    // Abrir modales
    const openModalButtons = document.querySelectorAll('button[open-modal]');
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('open-modal');
            const modal = document.querySelector(`.${modalId}`);
            if (modal) {
                modal.classList.add('is-active');
            }
        });
    });

    // Cerrar modales (para todos los modales, incluyendo Unzutxiki)
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        // Selecciona todos los elementos de cierre dentro del modal
        const closeElements = modal.querySelectorAll('.delete, .button[aria-label="close"], .modal-background');
        closeElements.forEach(element => {
            element.addEventListener('click', () => {
                modal.classList.remove('is-active');
            });
        });
    });
});