// navigation.js

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("#nav-toggle");
  const navMenu = document.querySelector("nav ul");

  if (navToggle && navMenu) {
    // Abrir/cerrar menú en móviles
    navToggle.addEventListener("click", () => {
      const expanded =
        navToggle.getAttribute("aria-expanded") === "true" || false;
      navToggle.setAttribute("aria-expanded", !expanded);
      navMenu.classList.toggle("open");
    });
  }

  // Accesibilidad: cerrar menú con tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("open")) {
      navMenu.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  });

  // Accesibilidad: navegación con tabulación
  const links = navMenu.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("focus", () => navMenu.classList.add("focus"));
    link.addEventListener("blur", () => navMenu.classList.remove("focus"));
  });
});
