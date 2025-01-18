document.getElementById("menu-toggle").addEventListener("click", function () {
  var navbarMovile = document.getElementById("navbarMovile");
  const menuToggle = document.getElementById('menu-toggle');
  if (navbarMovile.style.display === "none") {
    navbarMovile.style.display = "flex";
    menuToggle.textContent = "⨯";
  } else {
    navbarMovile.style.display = "none";
    menuToggle.textContent = "☰";
  }
});

function navigateAndHideNav(value) {
  if (value) {
    location.href = value; // Navegar a la sección
    document.getElementById("navbarMovile").style.display = "none"; // Ocultar la barra de navegación
  }
}
