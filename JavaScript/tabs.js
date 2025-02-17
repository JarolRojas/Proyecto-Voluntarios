document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs li');
    const tabContents = document.querySelectorAll('.tab-content');
    const filtrosOrden = document.getElementById('filtros-orden');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Eliminar la clase 'is-active' de todos los tabs
            tabs.forEach(t => t.classList.remove('is-active'));
            // Añadir la clase 'is-active' al tab clicado
            tab.classList.add('is-active');

            // Ocultar todos los contenidos de los tabs
            tabContents.forEach(content => content.classList.remove('is-active'));

            // Mostrar el contenido correspondiente al tab clicado
            const tabId = tab.getAttribute('data-tab');
            const activeTabContent = document.getElementById(tabId);
            if (activeTabContent) {
                activeTabContent.classList.add('is-active');
            }

            // Mostrar u ocultar el contenedor de filtros y orden
            if (tabId === 'tab2') {
                filtrosOrden.style.display = 'block'; // Mostrar filtros y orden
            } else {
                filtrosOrden.style.display = 'none'; // Ocultar filtros y orden
            }
        });
    });
});