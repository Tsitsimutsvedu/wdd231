const year = document.querySelector("#year");
const lastmodified=document.querySelector('#lastmodified');
const today = new Date();

year.innerHTML = today.getFullYear();
lastmodified.innerHTML = document.lastModified;