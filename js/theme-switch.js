document.getElementById('themeToggle').addEventListener('change', function () {
    const isChecked = this.checked;
    const htmlElement = document.documentElement;
    const newTheme = isChecked ? 'dark' : 'light';

    if (newTheme === 'system') {
        htmlElement.removeAttribute('data-theme');
        htmlElement.classList.remove('dark-mode');
    } else {
        htmlElement.setAttribute('data-theme', newTheme);
        htmlElement.classList.toggle('dark-mode', newTheme === 'dark');
    }

    localStorage.setItem('theme', newTheme);
});

window.addEventListener('load', function () {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const htmlElement = document.documentElement;

    if (savedTheme === 'system') {
        htmlElement.removeAttribute('data-theme');
        htmlElement.classList.remove('dark-mode');
    } else {
        htmlElement.setAttribute('data-theme', savedTheme);
        htmlElement.classList.toggle('dark-mode', savedTheme === 'dark');
    }

    document.getElementById('themeToggle').checked = savedTheme === 'dark';
});
