function toggleSidebar() {
    document.querySelector('.dashboard-sidebar').classList.toggle('is-active');
}

document.querySelectorAll('.menu-list a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionId = link.getAttribute('data-section');

        document.querySelectorAll('.section-content').forEach(section => {
            section.classList.remove('is-visible');
        });
        document.getElementById(sectionId).classList.add('is-visible');

        document.querySelectorAll('.menu-list a').forEach(link => link.classList.remove('is-active'));
        link.classList.add('is-active');

        if (window.innerWidth <= 1023) {
            document.querySelector('.dashboard-sidebar').classList.remove('is-active');
        }
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1023) {
        document.querySelector('.dashboard-sidebar').classList.remove('is-active');
    }
});


// ! OCULTAR FILTROS EN VOLUNTARIOS:
document.getElementById('toggle-filters').addEventListener('click', function () {
    const filterContainer = document.getElementById('filter-container');
    filterContainer.classList.toggle('is-active');
});