(function () {
  function initReveal(scope = document) {
    const items = scope.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((item) => observer.observe(item));
  }

  function initAccordions(scope = document) {
    scope.querySelectorAll(".accordion-trigger").forEach((button) => {
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      button.addEventListener("click", () => {
        const item = button.closest(".accordion-item");
        const panel = item?.querySelector(".accordion-panel");
        const expanded = button.getAttribute("aria-expanded") === "true";
        item?.classList.toggle("open", !expanded);
        button.setAttribute("aria-expanded", String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  }

  function initExpandableCards(scope = document) {
    scope.querySelectorAll(".expand-button").forEach((button) => {
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      button.addEventListener("click", () => {
        const card = button.closest(".activity-card");
        const details = card?.querySelector(".activity-details");
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        card?.classList.toggle("open", !expanded);
        if (details) details.hidden = expanded;
        const label = expanded ? "Ver detalle" : "Ocultar detalle";
        const span = button.querySelector("span");
        if (span) span.textContent = label;
      });
    });
  }

  function initTableToggles(scope = document) {
    scope.querySelectorAll(".table-toggle").forEach((button) => {
      if (button.dataset.bound === "1") return;
      button.dataset.bound = "1";
      button.addEventListener("click", () => {
        const target = document.getElementById(button.getAttribute("aria-controls"));
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        button.textContent = expanded ? "Ver tabla accesible" : "Ocultar tabla accesible";
        if (target) target.hidden = expanded;
      });
    });
  }

  function initScrollProgress() {
    const progress = document.getElementById("scrollProgress");
    if (!progress) return;

    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = total > 0 ? window.scrollY / total : 0;
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
  }

  function initMagneticCards(scope = document) {
    const cards = scope.querySelectorAll(".photo-card, .chart-card, .activity-card, .impact-card");
    cards.forEach((card) => {
      if (card.dataset.boundTilt === "1") return;
      card.dataset.boundTilt = "1";
      card.addEventListener("pointermove", (event) => {
        if (document.body.classList.contains("reduce-motion")) return;
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
        card.style.setProperty("--tilt-x", `${y.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${x.toFixed(2)}deg`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      });
    });
  }

  function repairProjectImages() {
    const replacements = [
      [".hero-media img", "assets/images/photos/hero-blue-cover.svg", "Adolescentes en una sesión grupal socioeducativa en una sala azul."],
      [".photo-card.large img", "assets/images/photos/group-session-real.svg", "Jóvenes caminando por un entorno comunitario de Nou Barris."],
      [".photo-card:nth-of-type(2) img", "assets/images/photos/group-session-illustration.svg", "Círculo de apoyo emocional entre adolescentes."],
      [".photo-card:nth-of-type(3) img", "assets/images/photos/hero-blue-cover.svg", "Adolescentes en una sesión grupal socioeducativa en una sala azul."]
    ];

    replacements.forEach(([selector, src, alt]) => {
      const image = document.querySelector(selector);
      if (!image) return;
      image.src = src;
      image.alt = alt;
      image.removeAttribute("srcset");
      image.decoding = "async";
    });
  }

  function initAll(scope = document) {
    repairProjectImages();
    initReveal(scope);
    initAccordions(scope);
    initExpandableCards(scope);
    initTableToggles(scope);
    initScrollProgress();
    initMagneticCards(scope);
  }

  window.RespiraInteractions = {
    initAll,
    initReveal,
    initAccordions,
    initExpandableCards,
    initTableToggles,
    initScrollProgress,
    initMagneticCards,
    repairProjectImages
  };

  document.addEventListener("DOMContentLoaded", () => {
    initAll(document);
    window.setTimeout(repairProjectImages, 350);
    window.setTimeout(repairProjectImages, 1200);
  });
})();
