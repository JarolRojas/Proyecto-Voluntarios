document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".toggle-info").forEach(toggleLink => {
        toggleLink.addEventListener("click", function (event) {
            event.preventDefault();

            const card = this.closest(".card");
            const extraContent = card.querySelector(".extra-content");

            if (card.classList.contains("expanded")) {
                // Primero reduce la opacidad y luego la altura para hacer la animación más fluida
                extraContent.style.opacity = "0";
                setTimeout(() => {
                    card.classList.remove("expanded");
                    // Cambiar el texto del botón después de cerrar completamente
                    this.textContent = "Más información";
                    this.setAttribute("aria-expanded", "false");
                }, 300); // Espera que la opacidad se reduzca antes de cerrar completamente
            } else {
                card.classList.add("expanded");
                setTimeout(() => {
                    extraContent.style.opacity = "1";
                    // Cambiar el texto del botón después de abrir completamente
                    this.textContent = "Menos información";
                    this.setAttribute("aria-expanded", "true");
                }, 50); // Pequeño retraso para evitar animación brusca
            }
        });
    });
});