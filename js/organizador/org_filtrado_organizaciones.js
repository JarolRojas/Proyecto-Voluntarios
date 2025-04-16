document.addEventListener('DOMContentLoaded', function() {
    const filterInput = document.getElementById('filter-nombreOrg');
    const columns = document.querySelectorAll('.column.is-4');

    filterInput.addEventListener('input', function() {
        const filterValue = filterInput.value.toLowerCase();

        columns.forEach(function(column) {
            const orgName = column.getAttribute('data-nombre');
            if (orgName) {
                const orgNameLower = orgName.toLowerCase();
                if (orgNameLower.includes(filterValue)) {
                    column.style.display = 'block';
                } else {
                    column.style.display = 'none';
                }
            }
        });
    });
});