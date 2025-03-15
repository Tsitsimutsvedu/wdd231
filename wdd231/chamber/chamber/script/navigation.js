// Responsive Navigation Menu
const menuButton = document.getElementById('menu-button');
const navList = document.querySelector('nav ul');

menuButton.addEventListener('click', () => {
    navList.classList.toggle('active');
});