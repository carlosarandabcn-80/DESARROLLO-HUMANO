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

  function injectQuickStyle() {
    if (document.getElementById("respira-hotfix-style")) return;
    const style = document.createElement("style");
    style.id = "respira-hotfix-style";
    style.textContent = `
      .topbar{position:fixed;top:1rem;right:1rem;left:auto;min-height:0;display:block;padding:0;border:0;background:transparent;backdrop-filter:none;z-index:80}
      .topbar-title,.barcelona-skyline,.topbar-progress{display:none!important}
      .accessibility-trigger{width:52px;height:52px;min-height:52px;padding:0;border-radius:50%;background:#fff;box-shadow:0 18px 42px rgba(10,31,68,.22)}
      .accessibility-trigger span{display:none!important}
      .accessibility-trigger img{width:30px;height:30px;display:block}
      .accessibility-panel{right:0;top:calc(100% + .75rem)}
      @media(max-width:900px){.topbar{top:.75rem;right:.75rem}}
    `;
    document.head.append(style);
  }

  function applyDomFixes() {
    injectQuickStyle();

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

    const accessibilityButton = document.getElementById("accessibilityToggle");
    if (accessibilityButton) {
      accessibilityButton.replaceChildren();
      accessibilityButton.setAttribute("aria-label", "Abrir opciones de accesibilidad");
      const icon = document.createElement("img");
      icon.src = "assets/images/accessibility-icon.png";
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
      accessibilityButton.append(icon);
    }

    const textControls = document.querySelector(".text-controls");
    if (textControls && !textControls.querySelector("span")) {
      const label = document.createElement("span");
      label.textContent = "Tamaño de texto";
      textControls.prepend(label);
    }

    document.querySelectorAll('a[href="#aprendizajes"], #aprendizajes, [aria-labelledby="kpi-title"]').forEach((node) => node.remove());

    const heroImage = document.querySelector(".hero-media img");
    if (heroImage) {
      heroImage.src = "https://upload.wikimedia.org/wikipedia/commons/2/24/Parc_Central_Nou_Barris_%287185960105%29.jpg";
      heroImage.alt = "Parc Central de Nou Barris, espacio comunitario del distrito de intervención.";
    }

    const heroCaption = document.querySelector(".hero-media figcaption");
    if (heroCaption) {
      heroCaption.textContent = "Territorio de intervención: Parc Central de Nou Barris.";
    }

    const photoMap = [
      [".photo-card.large img", "https://upload.wikimedia.org/wikipedia/commons/3/34/186_Institut_Nou_Barris%2C_c._Badosa_10-18_%28Barcelona%29.jpg", "Fachada del Institut Nou Barris, centro educativo de referencia para la intervención con adolescentes."],
      [".photo-card:not(.large):nth-of-type(2) img", "https://upload.wikimedia.org/wikipedia/commons/a/a2/Hospital_Mental_de_la_Santa_Creu_-_seu_del_districte_de_Nou_Barris_P1520529.jpg", "Antiguo Hospital Mental de la Santa Creu, actual sede del distrito de Nou Barris."],
      [".photo-card:not(.large):nth-of-type(3) img", "https://upload.wikimedia.org/wikipedia/commons/8/8e/Vista_de_Torre_Bar%C3%B3_-_20210801_190720.jpg", "Vista de Torre Baró y el paisaje urbano de Nou Barris."]
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
