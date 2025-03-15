// Dynamic Dates in Footer
const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Updated: ${lastModified}`;