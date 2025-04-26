document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-enviar-mensaje");
    const abrirModalBtn = document.getElementById("abrir-modal-mensaje");
    const cerrarModalBtn = document.getElementById("cerrar-modal-mensaje");
    const cancelarMensajeBtn = document.getElementById("cancelar-mensaje");
    const enviarMensajeBtn = document.getElementById("enviar-mensaje");
    const voluntariosSeleccionados = document.getElementById("voluntarios-seleccionados");
    const mensajeTexto = document.getElementById("mensaje-texto");

    // Abrir el modal
    abrirModalBtn.addEventListener("click", () => {
        voluntariosSeleccionados.innerHTML = ""; // Limpia la lista
        mensajeTexto.value = ""; // Limpia el mensaje
        const checkboxes = document.querySelectorAll(".voluntario-checkbox:checked");
        checkboxes.forEach((checkbox) => {
            const voluntarioBox = checkbox.closest(".voluntario-box");
            const nombre = voluntarioBox.querySelector(".title").textContent;
            agregarVoluntario(nombre);
        });
        modal.classList.add("is-active");
    });

    // Cerrar el modal
    cerrarModalBtn.addEventListener("click", () => modal.classList.remove("is-active"));
    cancelarMensajeBtn.addEventListener("click", () => modal.classList.remove("is-active"));

    // Enviar mensaje
    enviarMensajeBtn.addEventListener("click", () => {
        const mensaje = mensajeTexto.value.trim();
        if (!mensaje) {
            alert("Por favor, escribe un mensaje antes de enviar.");
            return;
        }
        const voluntarios = Array.from(voluntariosSeleccionados.querySelectorAll("li")).map(
            (li) => li.textContent.replace("✖", "").trim()
        );
        console.log("Mensaje enviado a:", voluntarios);
        console.log("Contenido del mensaje:", mensaje);
        modal.classList.remove("is-active");
        alert("Mensaje enviado con éxito.");
    });

    // Función para agregar un voluntario a la lista
    function agregarVoluntario(nombre) {
        const li = document.createElement("li");
        li.className = "tag is-light is-medium mb-1";
        li.textContent = nombre;

        const removeBtn = document.createElement("button");
        removeBtn.className = "delete ml-2";
        removeBtn.addEventListener("click", () => li.remove());

        li.appendChild(removeBtn);
        voluntariosSeleccionados.appendChild(li);
    }
});