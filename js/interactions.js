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
  const images = [
    [".hero-media img", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/A_group_of_students.jpg/1280px-A_group_of_students.jpg", "Fotografía real de estudiantes adolescentes en contexto educativo, tratada visualmente en blanco y negro."],
    [".photo-card.large img", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Students_outside_.jpg/1280px-Students_outside_.jpg", "Fotografía real en blanco y negro de adolescentes aprendiendo en un entorno exterior."],
    [".photo-card:not(.large):nth-of-type(2) img", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Teenagers%20gathered%20around%20campfire%20at%20summer%20camp%20%287736437820%29.jpg", "Fotografía real en blanco y negro de adolescentes reunidos en un espacio comunitario."],
    [".photo-card:not(.large):nth-of-type(3) img", "https://upload.wikimedia.org/wikipedia/commons/a/a2/Blau-Weiss_youth_group_%284923336845%29.jpg", "Fotografía real en blanco y negro de un grupo juvenil como representación de comunidad y resiliencia."]
  ];
  const participantNames = [
    "Aranda Sánchez, Carlos",
    "Martínez Ruiz, Úrsula",
    "Pavón Torres, Yolanda",
    "Saavedra Farías, Yeissy Sorana",
    "Ziegler Edwards, Rebeca Ruth"
  ];
  const justificationParagraphs = [
    "La justificación se alinea con la asignatura porque interpreta la ansiedad y la depresión adolescente como problemas de desarrollo multidimensional, contextual y multicausal.",
    "La adolescencia implica cambios en maduración cerebral, identidad, autoconcepto, relación con iguales y autonomía familiar; por tanto, un proyecto socioeducativo no debe limitarse a derivar casos clínicos, sino crear condiciones protectoras en el entorno cotidiano.",
    "En términos de ciclo vital, la intervención temprana aprovecha la plasticidad del desarrollo y puede fortalecer recursos de afrontamiento, vínculos prosociales y participación comunitaria antes de que el malestar se cronifique.",
    "El proyecto responde a necesidades sociales concretas: desestigmatizar el malestar emocional, crear alternativas de ocio saludable y comunitario, educar en gestión digital y autoestima, ofrecer apoyo psicológico de proximidad y fortalecer vínculos familiares.",
    "La elección de Nou Barris se justifica por la relación entre desigualdad territorial, vulnerabilidad socioeconómica y exposición adolescente a factores de riesgo como aislamiento, presión estética, uso problemático de redes, absentismo o baja disponibilidad de apoyos. Desde el enfoque ecológico, intervenir en el barrio permite actuar sobre microsistemas reales: instituto, familia, grupo de iguales, equipamientos juveniles y recursos comunitarios.",
    "La propuesta es coherente con la rúbrica UNIR porque define territorio, población destinataria, problema, marco teórico, objetivos, metodología, actividades, impacto, presupuesto y referencias APA. Además, transforma el contenido académico en un producto visual accesible, con datos, gráficos, tablas alternativas y navegación clara.",
    "Respira Nou Barris no plantea una respuesta asistencial aislada, sino una intervención preventiva de seis meses orientada a generar resiliencia: aumentar la competencia emocional, reforzar la percepción de apoyo, activar referentes adolescentes, mejorar la coordinación entre agentes y facilitar la derivación responsable ante señales de riesgo."
  ];

  function ensureStyle() {
    if (document.getElementById("respira-final-hotfix")) return;
    const style = document.createElement("style");
    style.id = "respira-final-hotfix";
    style.textContent = `
      .app-shell{background:#0a1020!important}
      body{background:#0a1020!important;color:#edf3ff!important}
      .page{background:linear-gradient(135deg,#0a1020 0%,#101b33 48%,#07141f 100%)!important}
      .sidebar{overflow-y:auto;scrollbar-width:thin;background:#090f1f!important;border-right:1px solid rgba(255,255,255,.09)!important}
      .brand-block{gap:.62rem!important}
      .brand-block img{width:172px!important;max-width:100%;height:auto!important;object-fit:contain}
      .brand-kicker{font-size:.72rem!important;line-height:1.28!important;letter-spacing:.025em!important;color:#f2f7ff!important}
      .brand-project{color:#fff;font-size:1rem;font-weight:950;line-height:1.2}
      .main-nav a[href="#aprendizajes"],.mobile-drawer a[href="#aprendizajes"],#aprendizajes{display:none!important}
      .group-mini{padding:.85rem!important;gap:.45rem!important}
      .group-mini p{font-size:.66rem!important}
      .group-mini li{font-size:.72rem!important;line-height:1.18!important;font-weight:720!important}
      .topbar{position:fixed;top:1rem;left:calc(280px + 1rem);right:auto;min-height:0;display:block;padding:0;border:0;background:transparent;backdrop-filter:none;z-index:80}
      .topbar-title,.barcelona-skyline,.topbar-progress,.menu-toggle{display:none!important}
      .accessibility-trigger{width:52px;height:52px;min-height:52px;padding:0;border-radius:50%;background:#fff;box-shadow:0 18px 42px rgba(10,31,68,.22)}
      .accessibility-trigger img{width:30px;height:30px;display:block}
      .accessibility-trigger span{display:none}
      .accessibility-panel{right:0;top:calc(100% + .75rem)}
      .hero{min-height:calc(100vh - 1px);display:grid!important;grid-template-columns:minmax(0,1fr) minmax(360px,.9fr)!important;align-items:center!important;gap:clamp(1.5rem,4vw,4rem)!important;padding:clamp(3.5rem,6vw,6rem)!important;background:radial-gradient(circle at 18% 20%,rgba(0,166,166,.18),transparent 28%),linear-gradient(135deg,rgba(9,15,31,.96),rgba(14,26,49,.94))!important}
      .hero-content{align-self:center!important;max-width:760px!important;transform:none!important}
      .hero-content .eyebrow{margin-top:0!important}
      .hero h1,.section h2{color:#f8fbff!important}
      .hero .lead,.hero li,.section-intro,.prose p{color:#cbd7ea!important}
      .hero-panel{align-self:center!important;max-width:620px!important;width:100%!important}
      .hero-media{border-radius:10px!important;overflow:hidden!important;background:#111827!important;box-shadow:0 28px 90px rgba(0,0,0,.42)!important;border:1px solid rgba(255,255,255,.14)!important}
      .hero-media img{display:block!important;width:100%!important;height:auto!important;aspect-ratio:16/10!important;object-fit:cover!important;object-position:center center!important;opacity:1!important;filter:grayscale(1) contrast(1.08)!important}
      .hero-media::after{display:none!important}
      .photo-card img,.media-frame img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;opacity:1!important;filter:grayscale(1) contrast(1.06)!important}
      .section:not(.hero){max-width:min(1180px,calc(100vw - 330px))!important;margin:2rem auto!important;padding:clamp(1.25rem,3vw,2.4rem)!important;border:1px solid rgba(255,255,255,.12)!important;border-radius:14px!important;background:linear-gradient(145deg,rgba(17,27,50,.94),rgba(10,16,32,.9))!important;box-shadow:0 24px 70px rgba(0,0,0,.28)!important;overflow:hidden!important}
      .kpi-card,.info-card,.chart-card,.activity-card,.impact-card,.check-panel,.objective-card,.rubric-panel,.media-frame,.photo-card{background:rgba(255,255,255,.06)!important;border:1px solid rgba(255,255,255,.13)!important;color:#edf3ff!important}
      .pulse-card{background:rgba(255,255,255,.08)!important;color:#edf3ff!important;border:1px solid rgba(255,255,255,.13)!important}
      .pulse-card strong{color:#9edcff!important}
      .mini-timeline span{background:rgba(255,255,255,.08)!important;color:#f8fbff!important;border:1px solid rgba(255,255,255,.13)!important}
      .eyebrow{color:#45d4d0!important}
      table,td,th{color:#edf3ff!important}
      @media(max-width:1100px){.hero{grid-template-columns:1fr!important;padding:2rem!important}.hero-panel{max-width:720px!important}}
      @media(max-width:900px){.topbar{top:.75rem;left:auto;right:.75rem}.hero{padding:1.5rem!important}.section:not(.hero){max-width:calc(100vw - 2rem)!important}}
    `;
    document.head.append(style);
  }

  function applyFinalPolish() {
    ensureStyle();

    const brandKicker = document.querySelector(".brand-kicker");
    if (brandKicker) brandKicker.textContent = "Estructura Social - Grado en Educación Social.";

    const groupList = document.querySelector(".group-mini ul");
    if (groupList) {
      groupList.replaceChildren(...participantNames.map((name) => {
        const item = document.createElement("li");
        item.textContent = name;
        return item;
      }));
    }

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
    if (caption) caption.textContent = "Imagen documental en blanco y negro: adolescencia, aprendizaje compartido y resiliencia comunitaria.";

    const eyebrow = document.getElementById("home-eyebrow");
    if (eyebrow) eyebrow.textContent = "Intervención socioeducativa comunitaria";

    const lead = document.getElementById("home-lead");
    if (lead) {
      lead.textContent = "Respira Nou Barris acompaña a adolescentes de 12 a 17 años mediante educación emocional, apoyo entre iguales, orientación familiar y conexión con recursos del barrio para prevenir ansiedad y depresión desde una mirada ecológica, inclusiva y no estigmatizante.";
    }

    const justification = document.getElementById("justification-content");
    if (justification) {
      justification.replaceChildren(...justificationParagraphs.map((text) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = text;
        return paragraph;
      }));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    applyFinalPolish();
    window.setTimeout(applyFinalPolish, 300);
    window.setTimeout(applyFinalPolish, 1200);
  });
})();
