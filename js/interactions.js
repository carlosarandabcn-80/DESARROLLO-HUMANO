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

  function applyDomFixes() {
    const logo = document.querySelector(".brand-block img");
    if (logo) logo.src = "assets/images/logo-unir.png";

    const brandKicker = document.querySelector(".brand-kicker");
    if (brandKicker) brandKicker.innerHTML = "Grado de Educación Social<br>Estructura Social";

    const project = document.querySelector(".brand-project");
    if (!project) {
      const block = document.querySelector(".brand-block");
      if (block) {
        const node = document.createElement("span");
        node.className = "brand-project";
        node.textContent = "Respira Nou Barris";
        block.append(node);
      }
    }

    document.querySelectorAll('a[href="#aprendizajes"], #aprendizajes, [aria-labelledby="kpi-title"]').forEach((node) => node.remove());

    const heroImage = document.querySelector(".hero-media img");
    if (heroImage) {
      heroImage.src = "assets/images/photos/hero-resilience-bw.jpg";
      heroImage.alt = "Adolescentes y educadora social en Nou Barris durante una dinámica de apoyo comunitario.";
    }

    const heroCaption = document.querySelector(".hero-media figcaption");
    if (heroCaption) {
      heroCaption.innerHTML = "<small>Imagen generada con IA para esta propuesta académica: resiliencia adolescente y acompañamiento socioeducativo.</small>";
    }

    const photoMap = [
      [".photo-card.large img", "assets/images/photos/community-resilience-bw.jpg", "Grupo de adolescentes con educadora social en un espacio comunitario de Nou Barris."],
      [".photo-card:not(.large):nth-of-type(2) img", "assets/images/photos/peer-support-bw.jpg", "Círculo de apoyo entre iguales para prevención de ansiedad y depresión adolescente."],
      [".photo-card:not(.large):nth-of-type(3) img", "assets/images/photos/torre-baro-nou-barris-2200.jpg", "Vista territorial de Nou Barris y Barcelona para contextualizar desigualdad y entorno social."]
    ];

    photoMap.forEach(([selector, src, alt]) => {
      const image = document.querySelector(selector);
      if (!image) return;
      image.src = src;
      image.alt = alt;
      image.removeAttribute("srcset");
    });
  }

  function initAll(scope = document) {
    applyDomFixes();
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
    initMagneticCards
  };

  document.addEventListener("DOMContentLoaded", () => {
    initAll(document);
    window.setTimeout(() => applyDomFixes(), 400);
    window.setTimeout(() => applyDomFixes(), 1200);
  });
})();
