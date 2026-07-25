/* Salón Alto Estilo — interacciones */
(function () {
  "use strict";

  // Marca que hay JS disponible (para las animaciones reveal)
  document.documentElement.classList.add("js");

  // ── Scroll reveal ──
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    // Fallback: si algo no se reveló en 2.5s (elemento muy alto, observer
    // bloqueado, etc.), se muestra igualmente para que el contenido nunca
    // quede oculto de forma permanente.
    setTimeout(function () {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }, 2500);
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // ── Nav activa según sección visible ──
  var links = document.querySelectorAll(".nav-link");
  var sections = [];
  links.forEach(function (a) {
    var id = a.getAttribute("href").slice(1);
    var el = document.getElementById(id);
    if (el) sections.push({ link: a, el: el });
  });
  function setActive() {
    var pos = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function (s) {
      if (s.el.offsetTop <= pos) current = s;
    });
    links.forEach(function (a) { a.classList.remove("is-active"); });
    if (current) current.link.classList.add("is-active");
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  // ── Header sombra al hacer scroll ──
  var header = document.querySelector(".site-header");
  window.addEventListener("scroll", function () {
    header.style.boxShadow = window.scrollY > 40
      ? "0 8px 30px rgba(0,0,0,.45)" : "none";
  }, { passive: true });

  // ── Menú móvil ──
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
    nav.querySelectorAll(".nav-link").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("open"); });
    });
  }

  // ── Carrusel de miniaturas (promo) ──
  var nextBtn = document.querySelector(".thumb-next");
  var thumbs = document.querySelectorAll(".promo-thumbs .thumb");
  if (nextBtn && thumbs.length) {
    var order = Array.prototype.slice.call(thumbs);
    nextBtn.addEventListener("click", function () {
      var first = order.shift();
      order.push(first);
      order.forEach(function (t, i) {
        t.style.order = i;
      });
      // pequeño feedback visual
      first.style.transition = "opacity .3s";
      first.style.opacity = "0.4";
      setTimeout(function () { first.style.opacity = "1"; }, 180);
    });
  }
})();
