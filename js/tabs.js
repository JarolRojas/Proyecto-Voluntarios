document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs li');
    const tabContents = document.querySelectorAll('.tab-content');

    // Ocultar todos los contenidos excepto el activo
    tabContents.forEach(content => {
        if (!content.classList.contains('is-active')) {
            content.style.display = 'none';
        }
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Eliminar la clase 'is-active' de todos los tabs y ocultar contenido
            tabs.forEach(t => t.classList.remove('is-active'));
            tabContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('is-active'); // 🚨 Asegura quitar la clase
            });

            // Añadir la clase 'is-active' al tab clicado
            tab.classList.add('is-active');

            // Mostrar el contenido correspondiente al tab clicado
            const tabId = tab.getAttribute('data-tab');
            const activeTabContent = document.getElementById(tabId);
            if (activeTabContent) {
                activeTabContent.style.display = 'block';
                activeTabContent.classList.add('is-active'); // 🚨 Clave para sincronizar
                activeTabContent.dispatchEvent(new Event('tab-activado')); // 🚨 Notificar a controlcard.js
            }
        });
    });
});
