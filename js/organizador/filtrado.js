document.addEventListener('DOMContentLoaded', function () {
    // Obtener los elementos de filtro
    const filterNombre = document.getElementById('filter-nombre');
    const filterNivel = document.getElementById('filter-nivel');
    const filterCurso = document.getElementById('filter-curso');
    const filterVoluntariado = document.getElementById('filter-voluntariado');
    const filterDisponibilidad = document.getElementById('filter-disponibilidad');
    const userList = document.getElementById('user-list');
    
    // Función para filtrar los voluntarios
    function filterVolunteers() {
        const nombre = filterNombre.value.toLowerCase();
        const nivel = filterNivel.value.toLowerCase();
        const curso = filterCurso.value.toLowerCase();
        const voluntariado = filterVoluntariado.value.toLowerCase();
        const disponibilidad = filterDisponibilidad.value.toLowerCase();
        
        const volunteers = userList.getElementsByClassName('voluntarios');
        
        // Recorrer todos los voluntarios y comprobar si cumplen con los filtros
        Array.from(volunteers).forEach(voluntario => {
            const nombreVoluntario = voluntario.querySelector('h3').textContent.toLowerCase();
            const cursoVoluntario = voluntario.querySelector('p').textContent.toLowerCase();
            const tags = voluntario.querySelectorAll('.tag');
            const disponibilidadVoluntario = voluntario.querySelector('p').textContent.toLowerCase();
            
            // Verificar si el voluntario cumple con todos los filtros
            const matchesNombre = nombreVoluntario.includes(nombre);
            const matchesNivel = nivel ? cursoVoluntario.includes(nivel) : true;
            const matchesCurso = curso ? cursoVoluntario.includes(curso) : true;
            const matchesVoluntariado = Array.from(tags).some(tag => tag.textContent.toLowerCase().includes(voluntariado));
            const matchesDisponibilidad = disponibilidad ? disponibilidadVoluntario.includes(disponibilidad) : true;
            
            if (matchesNombre && matchesNivel && matchesCurso && matchesVoluntariado && matchesDisponibilidad) {
                voluntario.style.display = ''; // Mostrar el voluntario
            } else {
                voluntario.style.display = 'none'; // Ocultar el voluntario
            }
        });
    }
    
    // Agregar eventos a los filtros para que se actualicen al cambiar
    filterNombre.addEventListener('input', filterVolunteers);
    filterNivel.addEventListener('change', filterVolunteers);
    filterCurso.addEventListener('change', filterVolunteers);
    filterVoluntariado.addEventListener('change', filterVolunteers);
    filterDisponibilidad.addEventListener('change', filterVolunteers);
});
