document.addEventListener('DOMContentLoaded', () => {
    const initializeTab = (tabId, prevBtnId, nextBtnId) => {
        const tab = document.getElementById(tabId);
        const cardContainer = tab.querySelector('.card-container');
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        if (!cardContainer || !prevBtn || !nextBtn) return;

        let scrollAmount = 0;
        let cardWidth = cardContainer.querySelector('.card').offsetWidth + 10;
        let maxScroll = cardContainer.scrollWidth - cardContainer.clientWidth;

        const updateButtons = () => {
            prevBtn.style.visibility = scrollAmount <= 0 ? 'hidden' : 'visible';
            nextBtn.style.visibility = scrollAmount >= maxScroll ? 'hidden' : 'visible';
        };

        const handleResize = () => {
            cardWidth = cardContainer.querySelector('.card').offsetWidth + 10;
            maxScroll = cardContainer.scrollWidth - cardContainer.clientWidth;
            updateButtons();
        };

        nextBtn.addEventListener('click', () => {
            scrollAmount += cardWidth * 3;
            if (scrollAmount > maxScroll) scrollAmount = maxScroll;
            cardContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            updateButtons();
        });

        prevBtn.addEventListener('click', () => {
            scrollAmount -= cardWidth * 3;
            if (scrollAmount < 0) scrollAmount = 0;
            cardContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            updateButtons();
        });

        // 🚨 Actualizar al cambiar de pestaña o redimensionar
        tab.addEventListener('tab-activado', updateButtons); // Si usas un evento personalizado
        window.addEventListener('resize', handleResize);
        updateButtons();
        // Dentro de initializeTab():
        tab.addEventListener('tab-activado', () => {
            scrollAmount = 0; // Reinicia el scroll
            cardWidth = cardContainer.querySelector('.card').offsetWidth + 10;
            maxScroll = cardContainer.scrollWidth - cardContainer.clientWidth;
            updateButtons(); // Actualiza la visibilidad de los botones
        });
    };

    initializeTab('tab1', 'prev-btn-actividades', 'next-btn-actividades');
    initializeTab('tab2', 'prev-btn-eventos', 'next-btn-eventos');
    initializeTab('tab3', 'prev-btn-reuniones', 'next-btn-reuniones');
});
