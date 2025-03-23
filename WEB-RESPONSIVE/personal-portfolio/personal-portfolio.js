const overlay = document.querySelector(".overlay");
const navbar = document.querySelector(".navbar");
const btnMenu = document.getElementById("menu-button");
const btnClose = document.getElementById("close-button");

const toggleNavbar = () => {
  navbar.classList.toggle("open");
  overlay.classList.toggle("open");
};

btnMenu.addEventListener("click", toggleNavbar);
btnClose.addEventListener("click", toggleNavbar);
overlay.addEventListener("click", toggleNavbar);