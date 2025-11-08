// main.js — Tema, año dinámico, menú accesible y robustez general
document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------
     TEMA (detección y toggle)
  -------------------------- */
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) document.body.classList.add("dark-theme");

  const themeToggle = document.querySelector("#theme-toggle");
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-pressed",
      document.body.classList.contains("dark-theme").toString()
    );

    themeToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark-theme");
      themeToggle.setAttribute("aria-pressed", isDark.toString());
    });
  }

  /* -------------------------
     AÑO ACTUAL EN FOOTER
     Requiere: <span id="current-year"></span>
  -------------------------- */
  const yearSpan = document.querySelector("#current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* -------------------------
     MENÚ HAMBURGUESA ACCESIBLE
     Requisitos HTML:
     - botón con id="nav-toggle"
     - nav con id="primary-nav"
     - enlaces con clase .menu-btn
  -------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (!navToggle || !primaryNav) {
    console.warn("⚠️ Elementos de navegación no encontrados.");
    return;
  }

  const openNav = () => {
    primaryNav.classList.add("open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú");
    const firstLink = primaryNav.querySelector(".menu-btn");
    if (firstLink) firstLink.focus();
    document.documentElement.style.overflow = "hidden";
  };

  const closeNav = () => {
    primaryNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    navToggle.focus();
    document.documentElement.style.overflow = "";
  };

  navToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    expanded ? closeNav() : openNav();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && primaryNav.classList.contains("open")) {
      closeNav();
    }
  });

  document.addEventListener("click", (e) => {
    if (!primaryNav.classList.contains("open")) return;
    const insideNav =
      primaryNav.contains(e.target) || navToggle.contains(e.target);
    if (!insideNav) closeNav();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 880 && primaryNav.classList.contains("open")) {
      closeNav();
    }
  });
});
