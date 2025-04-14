document.addEventListener("DOMContentLoaded", () => {
    const filters = {
        nombre: document.getElementById("filter-nombre"),
        curso: document.getElementById("filter-curso"),
        voluntariado: document.getElementById("filter-voluntariado"),
        disponibilidad: document.getElementById("filter-disponibilidad"),
    };

    const userCards = document.querySelectorAll(".user-card");

    function applyFilters() {
        const nombreFilter = filters.nombre.value.toLowerCase();
        const cursoFilter = filters.curso.value;
        const voluntariadoFilter = filters.voluntariado.value;
        const disponibilidadFilter = filters.disponibilidad.value;

        userCards.forEach((card) => {
            const nombre = card.dataset.nombre.toLowerCase();
            const curso = card.dataset.curso;
            const voluntariado = card.dataset.voluntariado;
            const disponibilidad = card.dataset.disponibilidad;

            const matchesNombre = nombre.includes(nombreFilter);
            const matchesCurso = !cursoFilter || curso === cursoFilter;
            const matchesVoluntariado = !voluntariadoFilter || voluntariado === voluntariadoFilter;
            const matchesDisponibilidad = !disponibilidadFilter || disponibilidad === disponibilidadFilter;

            if (matchesNombre && matchesCurso && matchesVoluntariado && matchesDisponibilidad) {
                card.style.display = ""; // Mostrar
            } else {
                card.style.display = "none"; // Ocultar
            }
        });
    }

    // Escuchar cambios en los filtros
    Object.values(filters).forEach((filter) => {
        filter.addEventListener("input", applyFilters);
    });
});