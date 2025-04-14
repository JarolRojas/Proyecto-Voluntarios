document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendarAside');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',  // Vista de mes
        locale: 'es',  // Idioma español
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: [
            // Aquí puedes agregar eventos predefinidos
            {
                title: 'Reunión de Voluntarios',
                start: '2025-04-05T10:00:00',
                end: '2025-04-05T12:00:00',
                description: 'Reunión para organizar actividades'
            },
            {
                title: 'Campaña de Reforestación',
                start: '2025-04-08T09:00:00',
                end: '2025-04-08T17:00:00',
                description: 'Evento para plantar árboles en el parque central'
            }
        ],
        // Funcionalidad para agregar eventos al hacer clic
        dateClick: function(info) {
            var eventTitle = prompt("¿Qué actividad vas a agregar?");
            if (eventTitle) {
                calendar.addEvent({
                    title: eventTitle,
                    start: info.dateStr,
                    allDay: true
                });
            }
        }
    });

    calendar.render();
});
