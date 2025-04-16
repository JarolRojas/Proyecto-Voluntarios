// Selecciona todos los botones de "Mostrar Perfil"
const botonesMostrarPerfil = document.querySelectorAll('.mostrarperfil');

// Selecciona el modal y el botón de cierre
const modal = document.getElementById('modal-voluntario');
const cerrarModal = document.getElementById('cerrar-modal');
const cerrarModalFooter = document.getElementById('cerrar-modal-footer');

// Función para abrir el modal
function abrirModal(event) {
    // Obtén los datos del voluntario
    const columna = event.target.closest('.voluntarios');
    const nombre = columna.querySelector('h3').innerText;
    const correo = columna.querySelector('p').innerText.split(': ')[1];
    const telefono = columna.querySelectorAll('p')[1].innerText.split(': ')[1];
    const curso = columna.querySelectorAll('p')[2].innerText.split(': ')[1];
    const voluntariadoTags = columna.querySelectorAll('.tag');
    const disponibilidad = columna.querySelectorAll('p')[3].innerText.split(': ')[1];
    const valoracionStars = columna.querySelectorAll('.rating .icon');

    // Cambiar la imagen del voluntario dinámicamente
    const imagen = columna.querySelector('img').getAttribute('src');
    document.getElementById('modal-img').setAttribute('src', imagen);

    // Rellena el modal con los datos del voluntario
    document.getElementById('modal-nombre').innerText = nombre;
    document.getElementById('modal-correo').innerText = correo;
    document.getElementById('modal-telefono').innerText = telefono;
    document.getElementById('modal-fecha').innerText = "Fecha no disponible";  // Aquí podrías agregar una fecha si la tienes
    document.getElementById('modal-curso').innerText = curso;

    // Limpia las etiquetas de tipo de voluntariado
    const tipoVoluntariado = document.getElementById('modal-voluntariado');
    tipoVoluntariado.innerHTML = '';
    voluntariadoTags.forEach(tag => {
        const tagClone = tag.cloneNode(true);
        tipoVoluntariado.appendChild(tagClone);
    });

    // Rellena la disponibilidad
    document.getElementById('modal-disponibilidad').innerText = disponibilidad;

    // Rellena la valoración
    const valoracion = document.getElementById('modal-valoracion');
    valoracion.innerHTML = '';
    valoracionStars.forEach(star => {
        const starClone = star.cloneNode(true);
        valoracion.appendChild(starClone);
    });

    // Muestra el modal
    modal.classList.add('is-active');
}


// Función para cerrar el modal
function cerrarModalFunction() {
    modal.classList.remove('is-active');
}

// Asigna el evento de clic a cada botón "Mostrar Perfil"
botonesMostrarPerfil.forEach(boton => {
    boton.addEventListener('click', abrirModal);
});

// Asigna el evento de cierre al botón de cerrar del modal
cerrarModal.addEventListener('click', cerrarModalFunction);
cerrarModalFooter.addEventListener('click', cerrarModalFunction);
