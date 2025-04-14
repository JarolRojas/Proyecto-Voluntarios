document.addEventListener("DOMContentLoaded", function () {
    const calendarContainer = document.getElementById("calendarioPerfil");

    function generateCalendar(year, month) {
        const date = new Date(year, month, 1);
        const today = new Date();
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        let days = "";
        for (let i = 0; i < new Date(year, month, 1).getDay(); i++) {
            days += `<div class="calendar-day"></div>`;
        }

        for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
            const isToday = (day === today.getDate() && year === today.getFullYear() && month === today.getMonth());
            days += `<div class="calendar-day ${isToday ? 'is-bg4v has-text-white' : ''}">${day}</div>`;
        }

        calendarContainer.innerHTML = `
            <div class="calendar-header">
                <button class="button is-small" id="prevMonth">◀</button>
                <span class="calendar-title">${monthNames[month]} ${year}</span>
                <button class="button is-small" id="nextMonth">▶</button>
            </div>
            <div class="calendar-grid">
                <div class="calendar-day-name">D</div> <div class="calendar-day-name">L</div>
                <div class="calendar-day-name">M</div> <div class="calendar-day-name">M</div>
                <div class="calendar-day-name">J</div> <div class="calendar-day-name">V</div>
                <div class="calendar-day-name">S</div>
                ${days}
            </div>
        `;

        document.getElementById("prevMonth").addEventListener("click", () => updateCalendar(year, month - 1));
        document.getElementById("nextMonth").addEventListener("click", () => updateCalendar(year, month + 1));
    }

    function updateCalendar(year, month) {
        const newDate = new Date(year, month, 1);
        generateCalendar(newDate.getFullYear(), newDate.getMonth());
    }

    generateCalendar(new Date().getFullYear(), new Date().getMonth());

});
