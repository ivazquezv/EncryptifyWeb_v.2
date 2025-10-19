// main.js - tema + año + menú hamburguesa accesible
document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------
     TEMA (detección y toggle)
  -------------------------- */
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.body.classList.add("dark-theme");
  }

  const themeToggle = document.querySelector("#theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
    });
  }

  /* -------------------------
     AÑO ACTUAL EN FOOTER
  -------------------------- */
  const yearSpan = document.querySelector("#current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* -------------------------
     MENÚ HAMBURGUESA RESPONSIVE
     Requisitos HTML esperados:
     - botón con id="nav-toggle"
     - nav con id="primary-nav"
     - enlaces con clase .menu-btn
  -------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (!navToggle || !primaryNav) return;

  function openNav() {
    primaryNav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú");
    const firstLink = primaryNav.querySelector(".menu-btn");
    if (firstLink) firstLink.focus();
    document.documentElement.style.overflow = "hidden";
  }

  function closeNav() {
    primaryNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    navToggle.focus();
    document.documentElement.style.overflow = "";
  }

  // Toggle al pulsar el botón (evita que el click burbujee y cierre inmediatamente)
  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    if (expanded) closeNav();
    else openNav();
  });

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && primaryNav.classList.contains("open")) {
      closeNav();
    }
  });

  // Cerrar al hacer click fuera del panel (en mobile)
  document.addEventListener("click", (e) => {
    if (!primaryNav.classList.contains("open")) return;
    const insideNav =
      primaryNav.contains(e.target) || navToggle.contains(e.target);
    if (!insideNav) closeNav();
  });

  // Asegura estado coherente al redimensionar
  window.addEventListener("resize", () => {
    if (window.innerWidth > 880 && primaryNav.classList.contains("open")) {
      primaryNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.documentElement.style.overflow = "";
    }
  });
});
