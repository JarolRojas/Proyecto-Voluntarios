let filtrosActivos = {
    ciclo: "",
    curso: "",
    voluntariado: "",
    mayorEdad: false
};

// Aplica los filtros a la tabla
function aplicarFiltros() {
    const nombreFiltro = document.getElementById("filter-nombre").value.toLowerCase();
    const filas = document.querySelectorAll("tbody tr");
    let hayResultados = false;

    filas.forEach(fila => {
        const nombre = fila.cells[1].textContent.toLowerCase();
        const edad = parseInt(fila.cells[4].textContent);
        const cursoNivel = fila.cells[3].textContent.trim().toLowerCase(); // Ej: "1º DAM"
        const voluntariado = fila.cells[5].textContent.toLowerCase();

        let mostrar = true;

        // Filtro por nombre
        if (nombreFiltro && !nombre.includes(nombreFiltro)) {
            mostrar = false;
        }

        // Filtrar por ciclo (1º o 2º)
        if (filtrosActivos.ciclo && !cursoNivel.startsWith(filtrosActivos.ciclo.toLowerCase())) {
            mostrar = false;
        }

        // Filtrar por curso (DAM, ASIR, etc.)
        if (filtrosActivos.curso && !cursoNivel.includes(filtrosActivos.curso.toLowerCase())) {
            mostrar = false;
        }

        // Filtrar por voluntariado
        if (filtrosActivos.voluntariado && !voluntariado.includes(filtrosActivos.voluntariado.toLowerCase())) {
            mostrar = false;
        }

        // Filtrar por mayor de edad
        if (filtrosActivos.mayorEdad && edad < 18) {
            mostrar = false;
        }

        if (mostrar) {
            hayResultados = true;
        }
        fila.style.display = mostrar ? "" : "none";
    });

    // Mostrar mensaje si no hay resultados
    document.getElementById("no-results").style.display = hayResultados ? "none" : "block";
}

// Actualizar los filtros activos en una sola fila
function actualizarFiltros() {
    const selectedFiltersDiv = document.getElementById("selected-filters");
    selectedFiltersDiv.innerHTML = "";

    let filtrosHTML = [];

    if (filtrosActivos.ciclo) filtrosHTML.push(crearEtiquetaFiltro(filtrosActivos.ciclo, "ciclo"));
    if (filtrosActivos.curso) filtrosHTML.push(crearEtiquetaFiltro(filtrosActivos.curso, "curso"));
    if (filtrosActivos.voluntariado) filtrosHTML.push(crearEtiquetaFiltro(filtrosActivos.voluntariado, "voluntariado"));
    if (filtrosActivos.mayorEdad) filtrosHTML.push(crearEtiquetaFiltro("+18", "mayorEdad"));

    if (filtrosHTML.length === 0) {
        selectedFiltersDiv.innerHTML = "<p>No hay filtros aplicados.</p>";
    } else {
        selectedFiltersDiv.innerHTML = filtrosHTML.join(" ");
    }
}

// Crear una etiqueta de filtro con botón de eliminar
function crearEtiquetaFiltro(texto, tipo) {
    return `<span class="tag is-info is-light">
                ${texto} 
                <button class="delete is-small" onclick="eliminarFiltro('${tipo}')"></button>
            </span>`;
}

// Eliminar un filtro específico
function eliminarFiltro(tipo) {
    filtrosActivos[tipo] = (tipo === "mayorEdad") ? false : "";
    actualizarFiltros();
    aplicarFiltros();
}

// Agregar filtros desde los select y checkbox
document.getElementById("add-filter").addEventListener("click", () => {
    const cicloFiltro = document.getElementById("filter-nivel").value.trim();
    const cursoFiltro = document.getElementById("filter-curso").value.trim();
    const voluntariadoFiltro = document.getElementById("filter-voluntariado").value.trim();
    const mayorEdadFiltro = document.getElementById("filter-mayor-edad").checked;

    // Guardamos los valores en la estructura
    filtrosActivos.ciclo = cicloFiltro || filtrosActivos.ciclo;
    filtrosActivos.curso = cursoFiltro || filtrosActivos.curso;
    filtrosActivos.voluntariado = voluntariadoFiltro || filtrosActivos.voluntariado;
    filtrosActivos.mayorEdad = mayorEdadFiltro;

    actualizarFiltros();
    aplicarFiltros();
});

// Botón para restablecer filtros
document.getElementById("reset-filters").addEventListener("click", () => {
    filtrosActivos = {
        ciclo: "",
        curso: "",
        voluntariado: "",
        mayorEdad: false
    };

    document.getElementById("filter-nombre").value = "";
    document.getElementById("filter-nivel").value = "";
    document.getElementById("filter-curso").value = "";
    document.getElementById("filter-voluntariado").value = "";
    document.getElementById("filter-mayor-edad").checked = false;

    actualizarFiltros();
    aplicarFiltros();
});

// Aplicar filtro en vivo para el nombre
document.getElementById("filter-nombre").addEventListener("input", aplicarFiltros);

// Exponer la función en el ámbito global
window.aplicarFiltros = aplicarFiltros;
function actualizarResetButton() {
    const resetButton = document.getElementById('reset-filters');

    // Obtenemos los valores actuales de los filtros
    const filterNombre = document.getElementById('filter-nombre').value.trim();
    const filterNivel = document.getElementById('filter-nivel').value.trim();
    const filterCurso = document.getElementById('filter-curso').value.trim();
    const filterVoluntariado = document.getElementById('filter-voluntariado').value.trim();
    const filterMayorEdad = document.getElementById('filter-mayor-edad').checked;

    // 'filtrosCursos' es un array de filtros combinados (si lo usas)
    // Si no usas ese array, puedes eliminar esa comprobación.
    const tieneFiltrosCombinados = (typeof filtrosCursos !== 'undefined' && filtrosCursos.length > 0);

    // Si ninguno de los filtros está activo, ocultamos el botón; de lo contrario, lo mostramos.
    if (
        filterNombre === '' &&
        filterNivel === '' &&
        filterCurso === '' &&
        filterVoluntariado === '' &&
        !filterMayorEdad &&
        !tieneFiltrosCombinados
    ) {
        resetButton.style.display = 'none';
    } else {
        resetButton.style.display = 'inline-block';
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Función que muestra u oculta la sección de filtros según el tab activo
    function toggleFiltersDisplay() {
        const alumnosTab = document.querySelector('li[data-tab="tab2"]');
        const filterArea = document.getElementById('ag_filtros');
        // Si el tab de "Alumnos" tiene la clase "is-active", mostramos la sección
        if (alumnosTab && alumnosTab.classList.contains('is-active')) {
            filterArea.style.display = 'flex'; // O 'block', según el layout deseado
        } else {
            filterArea.style.display = 'none';
        }
    }

    // Llamar a la función al cargar la página
    toggleFiltersDisplay();

    // Agregar eventos a cada tab para actualizar la visualización de filtros cuando se haga clic
    const tabLinks = document.querySelectorAll('.tabs ul li');
    tabLinks.forEach(function (tabLink) {
        tabLink.addEventListener('click', function () {
            // Se usa un pequeño retraso para permitir que el cambio de tab se complete
            setTimeout(toggleFiltersDisplay, 0);
        });
    });
});
