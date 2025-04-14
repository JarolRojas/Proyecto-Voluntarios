function updateHoras() {
    const checkboxes = document.querySelectorAll('#disponibilidad-checkboxes input[type="checkbox"]');
    const horasContainer = document.getElementById('disponibilidad-horas');
    const diasOrden = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

    const selectedDays = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    selectedDays.sort((a, b) => diasOrden.indexOf(a) - diasOrden.indexOf(b));
    horasContainer.innerHTML = '';

    selectedDays.forEach(day => {
        const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);
        const html = `
            <div class="field" style="margin-right: 10px; margin-bottom: 10px; display: flex; flex-direction: column; align-items: center;">
                <label class="label is-txt4v" style="margin-bottom: 5px;">${dayCapitalized}</label>
                <div class="control" style="display: flex; gap: 5px;">
                    <input class="input" type="time" name="horaInicio_${day}" style="width: 100px;" required>
                    <input class="input" type="time" name="horaFin_${day}" style="width: 100px;" required>
                </div>
            </div>
        `;
        horasContainer.innerHTML += html;
    });
}

// Llama a esta función cuando cambien los checkboxes
document.querySelectorAll('#disponibilidad-checkboxes input').forEach(checkbox => {
    checkbox.addEventListener('change', updateHoras);
});