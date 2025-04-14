document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('#noticias .card-container');
    const prevButton = document.querySelector('#noticias .prev-btn');
    const nextButton = document.querySelector('#noticias .next-btn');

    let scrollAmount = 0;

    nextButton.addEventListener('click', function () {
        scrollAmount += container.clientWidth;
        if (scrollAmount >= container.scrollWidth) {
            scrollAmount = 0; // Volver al inicio si llegas al final
        }
        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    prevButton.addEventListener('click', function () {
        scrollAmount -= container.clientWidth;
        if (scrollAmount < 0) {
            scrollAmount = container.scrollWidth - container.clientWidth;
        }
        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});
