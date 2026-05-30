(function () {
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
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
      button.addEventListener("click", () => {
        const item = button.closest(".accordion-item");
        const panel = item?.querySelector(".accordion-panel");
        const expanded = button.getAttribute("aria-expanded") === "true";
        item?.classList.toggle("open", !expanded);
        button.setAttribute("aria-expanded", String(!expanded));
        if (panel) {
          panel.hidden = expanded;
        }
      });
    });
  }

  function initExpandableCards(scope = document) {
    scope.querySelectorAll(".expand-button").forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".activity-card");
        const details = card?.querySelector(".activity-details");
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        card?.classList.toggle("open", !expanded);
        if (details) {
          details.hidden = expanded;
        }
        const label = expanded ? "Ver detalle" : "Ocultar detalle";
        button.querySelector("span").textContent = label;
      });
    });
  }

  function initTableToggles(scope = document) {
    scope.querySelectorAll(".table-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.getAttribute("aria-controls"));
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        button.textContent = expanded ? "Ver tabla accesible" : "Ocultar tabla accesible";
        if (target) {
          target.hidden = expanded;
        }
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
    const cards = scope.querySelectorAll(".photo-card, .kpi-card, .chart-card, .activity-card");
    cards.forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        if (document.body.classList.contains("reduce-motion")) return;
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
        card.style.setProperty("--tilt-x", `${y.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${x.toFixed(2)}deg`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
      });
    });
  }

  function initAll(scope = document) {
    initReveal();
    initScrollProgress();
    initAccordions(scope);
    initExpandableCards(scope);
    initTableToggles(scope);
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
    initReveal();
    initScrollProgress();
  });
})();

(function () {
  const version = "20260529c";
  const images = [
    [".hero-media img", `assets/images/photos/hero-ai-respira-nou-barris.svg?v=${version}`, "Ilustración generada con IA de Nou Barris como entorno comunitario de bienestar adolescente."],
    [".photo-card.large img", `assets/images/photos/school-community.svg?v=${version}`, "Ilustración de un instituto y adolescentes en un entorno comunitario de Nou Barris."],
    [".photo-card:not(.large):nth-of-type(2) img", `assets/images/photos/mental-health-network.svg?v=${version}`, "Ilustración de red comunitaria, apoyo emocional y recursos de salud mental de proximidad."],
    [".photo-card:not(.large):nth-of-type(3) img", `assets/images/photos/barcelona-nou-barris.svg?v=${version}`, "Ilustración del paisaje urbano de Barcelona con skyline y colinas de Nou Barris."]
  ];

  function ensureStyle() {
    if (document.getElementById("respira-final-hotfix")) return;
    const style = document.createElement("style");
    style.id = "respira-final-hotfix";
    style.textContent = `
      .app-shell{background:#dfeeff}
      .sidebar{overflow-y:auto;scrollbar-width:thin}
      .brand-block{gap:.62rem!important}
      .brand-block img{width:172px!important;max-width:100%;height:auto!important;object-fit:contain}
      .brand-kicker{font-size:.72rem!important;line-height:1.28!important;letter-spacing:.025em!important;color:#f2f7ff!important}
      .brand-project{color:#fff;font-size:1rem;font-weight:950;line-height:1.2}
      .main-nav a[href="#aprendizajes"],.mobile-drawer a[href="#aprendizajes"],#aprendizajes{display:none!important}
      .group-mini{padding:.85rem!important;gap:.45rem!important}
      .group-mini p{font-size:.66rem!important}
      .group-mini li{font-size:.72rem!important;line-height:1.18!important;font-weight:720!important}
      .topbar{position:fixed;top:1rem;right:1rem;left:auto;min-height:0;display:block;padding:0;border:0;background:transparent;backdrop-filter:none;z-index:80}
      .topbar-title,.barcelona-skyline,.topbar-progress{display:none!important}
      .accessibility-trigger{width:52px;height:52px;min-height:52px;padding:0;border-radius:50%;background:#fff;box-shadow:0 18px 42px rgba(10,31,68,.22)}
      .accessibility-trigger img{width:30px;height:30px;display:block}
      .accessibility-trigger span{display:none}
      .accessibility-panel{right:0;top:calc(100% + .75rem)}
      .hero{min-height:calc(100vh - 1px);display:grid!important;grid-template-columns:minmax(0,1fr) minmax(340px,.82fr)!important;align-items:center!important;gap:clamp(1.5rem,4vw,4rem)!important;padding:clamp(2.5rem,5vw,5rem)!important}
      .hero-content{align-self:center!important;max-width:760px!important;transform:none!important}
      .hero-content .eyebrow{margin-top:0!important}
      .hero-panel{align-self:center!important;max-width:560px!important;width:100%!important}
      .hero-media{border-radius:18px!important;overflow:hidden!important;background:#fff!important;box-shadow:0 28px 80px rgba(10,31,68,.18)!important}
      .hero-media img{display:block!important;width:100%!important;height:auto!important;aspect-ratio:18/11!important;object-fit:cover!important;object-position:center center!important;opacity:1!important;filter:none!important}
      .hero-media::after{display:none!important}
      .photo-card img,.media-frame img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;opacity:1!important}
      @media(max-width:1100px){.hero{grid-template-columns:1fr!important;padding:2rem!important}.hero-panel{max-width:720px!important}}
      @media(max-width:900px){.topbar{top:.75rem;right:.75rem}.hero{padding:1.5rem!important}}
    `;
    document.head.append(style);
  }

  function applyFinalPolish() {
    ensureStyle();

    const brandKicker = document.querySelector(".brand-kicker");
    if (brandKicker) brandKicker.textContent = "Estructura Social - Grado en Educación Social.";

    const brandBlock = document.querySelector(".brand-block");
    if (brandBlock && !brandBlock.querySelector(".brand-project")) {
      const project = document.createElement("span");
      project.className = "brand-project";
      project.textContent = "Respira Nou Barris";
      brandBlock.append(project);
    }

    document.querySelectorAll('a[href="#aprendizajes"], #aprendizajes').forEach((node) => node.remove());

    images.forEach(([selector, src, alt]) => {
      const image = document.querySelector(selector);
      if (image) {
        image.src = src;
        image.alt = alt;
        image.removeAttribute("srcset");
      }
    });

    const caption = document.querySelector(".hero-media figcaption");
    if (caption) caption.textContent = "Imagen generada con IA: bienestar adolescente, comunidad y territorio de Nou Barris.";
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyFinalPolish();
    window.setTimeout(applyFinalPolish, 300);
    window.setTimeout(applyFinalPolish, 1200);
  });
})();
