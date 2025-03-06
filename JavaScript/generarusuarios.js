const NUM_USUARIOS = 200; // Cambia este valor para generar más o menos usuarios

const nombres = ["Ana", "Carlos", "Lucía", "David", "Sofía", "Martín", "Paula", "Javier", "Elena", "Fernando", "María", "José", "Antonio", "Isabel", "Manuel", "Raquel", "Rubén", "Clara", "Hugo", "Carmen", "Miguel", "Laura", "Alejandro", "Patricia", "Sergio", "Beatriz", "Iván", "Noelia", "Andrés", "Cristina"];
const apellidos = ["Martínez", "Pérez", "Fernández", "Gómez", "López", "Ruiz", "Díaz", "Hernández", "Torres", "Vargas", "Santos", "Navarro", "Castro", "Ortega", "Delgado", "Moreno", "Romero", "Rubio", "Molina", "Marín"];
const cursos = { "DAM": "Desarrollo de Aplicaciones Multiplataforma", "ASIR": "Administración de Sistemas Informáticos en Red", "AF": "Administración y Finanzas", "CI": "Comercio Internacional", "GVEC": "Gestión de Ventas y Espacios Comerciales", "TL": "Transporte y Logística", "GA": "Gestión Administrativa", "AC": "Actividades Comerciales", "SMR": "Sistemas Microinformáticos y Redes" };
const voluntariados = {
    "Social": "is-primary",
    "Ambiental": "is-success",
    "Educativo": "is-info",
    "Cultural": "is-link",
    "Deportivo": "is-danger",
    "Salud": "is-white",
    "Digital": "is-warning"
};

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomEdad() {
    return Math.floor(Math.random() * (25 - 15 + 1)) + 15; // Cambiado para usuarios de 15 años en adelante
}

function getRandomVoluntariados() {
    const keys = Object.keys(voluntariados);
    const cantidad = Math.floor(Math.random() * 3) + 1;
    return Array.from(new Set(Array.from({ length: cantidad }, () => getRandomItem(keys)))); // Voluntariados aleatorios
}

function generarUsuarios() {
    const tbody = document.querySelector("tbody");
    let html = "";
    let usuariosGenerados = new Set(); // Usamos un set para asegurar la unicidad del usuario
    let telefonosGenerados = new Set(); // Usamos un set para asegurar la unicidad del teléfono

    for (let i = 0; i < NUM_USUARIOS; i++) {
        const nombre = getRandomItem(nombres);
        const apellido = getRandomItem(apellidos);
        const apellido2 = getRandomItem(apellidos);

        // Creamos el nombre de usuario con nombre + iniciales de apellidos, usando guion bajo
        let usuarioBase = `${nombre.toLowerCase()}_${apellido[0].toLowerCase()}${apellido2[0].toLowerCase()}`;
        let usuario = usuarioBase;
        let contador = 1;

        // Verificamos si el usuario ya existe
        while (usuariosGenerados.has(usuario)) {
            usuario = `${usuarioBase}${contador}`;
            contador++;
        }

        // Agregamos el usuario generado al set para asegurarnos de que no se repita
        usuariosGenerados.add(usuario);

        const cursoClave = getRandomItem(Object.keys(cursos));
        const curso = `${Math.random() > 0.5 ? '1º' : '2º'} ${cursoClave}`;

        // Verificar que `curso` esté definido y tenga el formato esperado
        let cursoCompleto;
        if (curso && typeof curso === "string" && curso.includes(" ")) {
            const cursoNivel = curso.substring(0, curso.indexOf(" ")); // Extraer el nivel (1º o 2º)
            cursoCompleto = `${cursoNivel} ${cursos[cursoClave]}`; // Combinar nivel y nombre completo
        } else {
            console.error("Error: La variable 'curso' no tiene el formato esperado.");
            cursoCompleto = curso; // Usar el valor original si no se puede procesar
        }

        const edad = getRandomEdad();
        const tiposVoluntariado = getRandomVoluntariados();
        const correo = `${usuario}@email.com`;

        // Generación de teléfono único
        let telefono;
        do {
            telefono = `6${Math.floor(10000000 + Math.random() * 89999999)}`;
        } while (telefonosGenerados.has(telefono)); // Si el teléfono ya existe, generamos uno nuevo
        telefonosGenerados.add(telefono); // Añadimos el teléfono al set para evitar repeticiones

        // Aquí añadimos los apellidos en la columna correspondiente
        html += `
        <tr data-usuario="${usuario}">
            <td><input type="checkbox" class="select-user"></td>
            <td>${nombre} ${apellido} ${apellido2}</td>
            <td><a href="#">@${usuario}</a></td>
            <td><abbr title="${cursoCompleto}">${curso}</abbr></td>
            <td>${edad}</td>
            <td>${tiposVoluntariado.map(v => `<span class="tag ${voluntariados[v]}">${v}</span>`).join(" ")}</td>
            <td><a href="mailto:${correo}">${correo}</a></td>
            <td><a href="tel:+34${telefono}">${telefono}</a></td>
        </tr>`;
    }

    tbody.innerHTML = html;

    // Añadir evento a los checkboxes
    const checkboxes = document.querySelectorAll(".select-user");
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const row = checkbox.closest("tr"); // Obtener la fila más cercana al checkbox
            if (checkbox.checked) {
                row.style.backgroundColor = "rgba(240, 248, 255, 0.1)"; // Color de fila cuando se selecciona
            } else {
                row.style.backgroundColor = ""; // Eliminar el color de la fila cuando no está seleccionado
            }
        });
    });
}




// ! SELECIONAR TODO

document.addEventListener("DOMContentLoaded", function () {
    generarUsuarios();

    // Seleccionar el checkbox de "select-all"
    const selectAllCheckbox = document.getElementById("select-all");
    
    // Añadir el evento de cambio
    selectAllCheckbox.addEventListener("change", function () {
        // Obtener todos los checkboxes de usuario
        const checkboxes = document.querySelectorAll(".select-user");
        
        // Si "select-all" está marcado, marcar todos los checkboxes
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;

            // Cambiar el color de fondo de las filas según si está seleccionado
            const row = checkbox.closest("tr");
            if (checkbox.checked) {
                row.style.backgroundColor = "rgba(240, 248, 255, 0.3)"; // Color de fila seleccionada
            } else {
                row.style.backgroundColor = ""; // Eliminar color de fila no seleccionada
            }
        });
    });
});
