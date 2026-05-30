(function () {
  const images = [
    [".hero-media img", "assets/images/photos/hero-ai-respira-nou-barris.svg", "Imagen generada con IA: bienestar adolescente, comunidad y territorio de Nou Barris."],
    [".photo-card.large img", "assets/images/photos/school-community.svg", "Imagen generada con IA: entorno educativo y comunitario de intervención."],
    [".photo-card:not(.large):nth-of-type(2) img", "assets/images/photos/mental-health-network.svg", "Imagen generada con IA: red comunitaria de apoyo y salud mental de proximidad."],
    [".photo-card:not(.large):nth-of-type(3) img", "assets/images/photos/barcelona-nou-barris.svg", "Imagen generada con IA: paisaje urbano y desigualdad territorial en Barcelona y Nou Barris."]
  ];

  const participantNames = [
    "Aranda Sánchez, Carlos",
    "Martínez Ruiz, Úrsula",
    "Pavón Torres, Yolanda",
    "Saavedra Farías, Yeissy Sorana",
    "Ziegler Edwards, Rebeca Ruth"
  ];

  const heroKpis = [
    ["Población adolescente de Barcelona", "148.431", "Personas de 10 a 19 años en 2025", "Idescat, 2025"],
    ["Participantes directos", "400", "Adolescentes escolarizados o residentes en Nou Barris", "Proyecto Respira Nou Barris"],
    ["Duración", "6", "Meses de intervención preventiva y comunitaria", "Convocatoria UNIR"],
    ["Presupuesto máximo", "20.000 €", "Ayuda solicitada ajustada al límite de la convocatoria", "Convocatoria UNIR"]
  ];

  const justificationParagraphs = [
    "La justificación se alinea con la asignatura porque interpreta la ansiedad y la depresión adolescente como problemas de desarrollo multidimensional, contextual y multicausal.",
    "La adolescencia implica cambios en maduración cerebral, identidad, autoconcepto, relación con iguales y autonomía familiar; por tanto, un proyecto socioeducativo no debe limitarse a derivar casos clínicos, sino crear condiciones protectoras en el entorno cotidiano.",
    "En términos de ciclo vital, la intervención temprana aprovecha la plasticidad del desarrollo y puede fortalecer recursos de afrontamiento, vínculos prosociales y participación comunitaria antes de que el malestar se cronifique.",
    "El proyecto responde a necesidades sociales concretas: desestigmatizar el malestar emocional, crear alternativas de ocio saludable y comunitario, educar en gestión digital y autoestima, ofrecer apoyo psicológico de proximidad y fortalecer vínculos familiares.",
    "La elección de Nou Barris se justifica por la relación entre desigualdad territorial, vulnerabilidad socioeconómica y exposición adolescente a factores de riesgo como aislamiento, presión estética, uso problemático de redes, absentismo o baja disponibilidad de apoyos.",
    "La propuesta es coherente con la rúbrica UNIR porque define territorio, población destinataria, problema, marco teórico, objetivos, metodología, actividades, impacto, presupuesto y referencias APA.",
    "Respira Nou Barris no plantea una respuesta asistencial aislada, sino una intervención preventiva de seis meses orientada a generar resiliencia y coordinación entre escuela, familia, iguales y recursos de proximidad."
  ];

  function injectStyle() {
    if (document.getElementById("respira-senior-layout")) return;
    const style = document.createElement("style");
    style.id = "respira-senior-layout";
    style.textContent = `
      body{background:#eaf3ff!important;color:#14213d!important}
      .app-shell{background:#eaf3ff!important}
      .page{background:linear-gradient(140deg,#f8fbff 0%,#ecf4ff 52%,#e9f7f4 100%)!important}
      .sidebar{background:linear-gradient(180deg,#0f1d35 0%,#163159 100%)!important;overflow-y:auto}
      .brand-block{gap:.58rem!important}
      .brand-block img{width:172px!important;height:auto!important;object-fit:contain}
      .brand-kicker{font-size:.78rem!important;line-height:1.25!important;color:#f7fbff!important;font-weight:900!important;letter-spacing:.02em!important}
      .brand-project{color:#fff!important;font-size:1rem!important;font-weight:900!important}
      .group-mini{padding:.85rem!important;background:rgba(255,255,255,.08)!important;border:1px solid rgba(255,255,255,.16)!important}
      .group-mini li{font-size:.72rem!important;line-height:1.2!important}
      .topbar{position:fixed;top:1rem;right:1rem;left:auto;display:block;min-height:0;padding:0;background:transparent;border:0;z-index:80}
      .topbar-title,.barcelona-skyline,.topbar-progress,.menu-toggle{display:none!important}
      .accessibility-trigger{width:52px;height:52px;min-height:52px;padding:0;border-radius:50%;background:#0b0e16!important;border:3px solid #fff!important;box-shadow:0 10px 24px rgba(10,31,68,.28)!important;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='25' fill='none' stroke='white' stroke-width='4'/%3E%3Ccircle cx='32' cy='18' r='4.5' fill='white'/%3E%3Cpath d='M18 27h28M32 23v13M24 49l8-13 8 13M24 35h16' fill='none' stroke='white' stroke-width='4.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-position:center!important;background-size:35px!important}
      .accessibility-trigger img,.accessibility-trigger span{display:none!important}
      .accessibility-panel{right:0;top:calc(100% + .75rem)}
      .hero{min-height:calc(100vh - 1px);display:grid!important;grid-template-columns:minmax(0,1fr) minmax(440px,.95fr)!important;align-items:center!important;gap:clamp(1.5rem,4vw,3.2rem)!important;padding:clamp(2.7rem,4.8vw,4.4rem)!important;background:radial-gradient(circle at 14% 10%,rgba(0,166,166,.16),transparent 30%),linear-gradient(140deg,#f8fbff 0%,#e9f2ff 55%,#ecf7f3 100%)!important}
      .hero-content{max-width:720px!important}
      .hero h1,.section h2{color:#0f274c!important}
      .hero .lead,.hero li,.section-intro,.prose p{color:#2c3f5d!important}
      .hero-media{border-radius:12px!important;overflow:hidden!important;background:#fff!important;border:1px solid rgba(12,82,150,.14)!important;box-shadow:0 24px 60px rgba(13,45,84,.14)!important}
      .hero-media img{display:block!important;width:100%!important;height:auto!important;aspect-ratio:16/9!important;object-fit:cover!important;opacity:1!important}
      .hero-media::after{display:none!important}
      .hero-media figcaption{font-size:.78rem!important;color:#5c6e86!important}
      .pulse-card,.mini-timeline{display:none!important}
      .hero-kpi-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:1rem}
      .hero-kpi{position:relative;background:#fff;border:1px solid #cfdced;border-radius:9px;padding:1rem 1.1rem;box-shadow:0 12px 28px rgba(13,45,84,.08);display:grid;gap:.38rem;align-content:start;min-height:186px}
      .hero-kpi:before{content:"";position:absolute;left:0;right:0;top:0;height:4px;background:linear-gradient(90deg,#0b63ce,#00a6a6,#ff6b35)}
      .hero-kpi .k-label{font-size:.81rem;color:#5f6f85;line-height:1.35}
      .hero-kpi .k-value{font-size:clamp(2.1rem,3vw,2.6rem);line-height:1;font-weight:950;color:#0a3779;letter-spacing:0}
      .hero-kpi .k-detail{font-size:.83rem;line-height:1.5;color:#2c3f5d}
      .hero-kpi .k-source{font-size:.78rem;color:#6b7b90}
      .section[aria-labelledby="kpi-title"],.rubric-panel,.kpi-grid{display:none!important}
      .section:not(.hero){max-width:min(1180px,calc(100vw - 330px))!important;margin:2rem auto!important;padding:clamp(1.25rem,3vw,2.2rem)!important;border:1px solid rgba(14,82,150,.13)!important;border-radius:14px!important;background:#ffffff!important;box-shadow:0 16px 44px rgba(13,45,84,.1)!important;overflow:hidden!important}
      .kpi-card,.info-card,.chart-card,.activity-card,.impact-card,.check-panel,.objective-card,.media-frame,.photo-card{background:#fff!important;border:1px solid rgba(14,82,150,.14)!important;color:#13213d!important}
      .info-card,.objective-card,.activity-card{border-top:4px solid #00a6a6!important}
      .chart-card{border-top:4px solid #0b63ce!important}
      .impact-card{border-top:4px solid #ff6b35!important}
      .eyebrow{color:#007b89!important}
      table,td,th{color:#13213d!important}
      .reveal{opacity:1!important;transform:none!important;visibility:visible!important}
      .ecosystem-map{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.7rem;margin-top:1rem}
      .ecosystem-map span{background:linear-gradient(135deg,#0a458f,#007c89);color:#fff;border-radius:999px;padding:.62rem .5rem;text-align:center;font-weight:800;font-size:.8rem;box-shadow:0 8px 18px rgba(10,69,143,.17)}
      @media(max-width:1100px){.hero{grid-template-columns:1fr!important;padding:2rem!important}.hero-panel{max-width:760px!important}.ecosystem-map{grid-template-columns:repeat(2,1fr)}}
      @media(max-width:900px){.topbar{top:.75rem;right:.75rem}.section:not(.hero){max-width:calc(100vw - 1.2rem)!important;margin:1rem auto!important}.hero-kpi-grid{grid-template-columns:1fr}.hero{padding:1.35rem!important}.ecosystem-map{grid-template-columns:1fr}}
    `;
    document.head.append(style);
  }

  function bindControls(scope = document) {
    scope.querySelectorAll(".accordion-trigger,.table-toggle").forEach((button) => {
      if (button.dataset.respiraBound) return;
      button.dataset.respiraBound = "true";
      button.addEventListener("click", () => {
        const target = button.classList.contains("table-toggle")
          ? document.getElementById(button.getAttribute("aria-controls"))
          : button.closest(".accordion-item")?.querySelector(".accordion-panel");
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        if (target) target.hidden = expanded;
        if (button.classList.contains("table-toggle")) {
          button.textContent = expanded ? "Ver tabla accesible" : "Ocultar tabla accesible";
        }
      });
    });
  }

  function upsertHeroKpis() {
    const panel = document.querySelector(".hero-panel");
    if (!panel || panel.querySelector(".hero-kpi-grid")) return;
    const grid = document.createElement("div");
    grid.className = "hero-kpi-grid";
    grid.setAttribute("aria-label", "Indicadores ejecutivos del proyecto");

    heroKpis.forEach(([label, value, detail, source]) => {
      const card = document.createElement("article");
      card.className = "hero-kpi";
      card.innerHTML = `<span class="k-label">${label}</span><strong class="k-value">${value}</strong><span class="k-detail">${detail}</span><small class="k-source">${source}</small>`;
      grid.append(card);
    });
    panel.append(grid);
  }

  function upsertEcosystem() {
    const method = document.getElementById("method-description")?.parentElement;
    if (!method || method.querySelector(".ecosystem-map")) return;
    const map = document.createElement("div");
    map.className = "ecosystem-map";
    ["Instituto", "Familia", "Iguales", "Barrio", "Salud mental"].forEach((item) => {
      map.append(Object.assign(document.createElement("span"), { textContent: item }));
    });
    method.append(map);
  }

  function applyFinalPolish() {
    injectStyle();
    bindControls(document);

    document.querySelectorAll(".reveal").forEach((section) => section.classList.add("is-visible"));
    document.querySelector('.section[aria-labelledby="kpi-title"]')?.remove();
    document.querySelectorAll(".rubric-panel").forEach((node) => node.remove());
    document.querySelectorAll('a[href="#aprendizajes"], #aprendizajes').forEach((node) => node.remove());

    const brandKicker = document.querySelector(".brand-kicker");
    if (brandKicker) brandKicker.innerHTML = "Grado de Educación Social<br>Estructura Social";

    const groupList = document.querySelector(".group-mini ul");
    if (groupList) {
      groupList.replaceChildren(...participantNames.map((name) => Object.assign(document.createElement("li"), { textContent: name })));
    }

    const brandBlock = document.querySelector(".brand-block");
    if (brandBlock && !brandBlock.querySelector(".brand-project")) {
      brandBlock.append(Object.assign(document.createElement("span"), { className: "brand-project", textContent: "Respira Nou Barris" }));
    }

    images.forEach(([selector, src, alt]) => {
      const image = document.querySelector(selector);
      if (!image) return;
      image.src = src;
      image.alt = alt;
      image.removeAttribute("srcset");
    });

    const heroCaption = document.querySelector(".hero-media figcaption");
    if (heroCaption) heroCaption.textContent = "Imagen generada con IA para esta propuesta académica (representación visual del territorio y red comunitaria).";

    document.querySelectorAll(".photo-card figcaption").forEach((captionNode, index) => {
      const notes = [
        ["Entorno escolar", "Imagen generada con IA para esta propuesta académica."],
        ["Red comunitaria", "Imagen generada con IA para esta propuesta académica."],
        ["Territorio", "Imagen generada con IA para esta propuesta académica."]
      ];
      if (!notes[index]) return;
      captionNode.replaceChildren(
        Object.assign(document.createElement("span"), { textContent: notes[index][0] }),
        Object.assign(document.createElement("small"), { textContent: notes[index][1] })
      );
    });

    upsertHeroKpis();
    upsertEcosystem();

    const eyebrow = document.getElementById("home-eyebrow");
    if (eyebrow) eyebrow.textContent = "Intervención socioeducativa comunitaria";

    const lead = document.getElementById("home-lead");
    if (lead) {
      lead.textContent = "Respira Nou Barris acompaña a adolescentes de 12 a 17 años mediante educación emocional, apoyo entre iguales, orientación familiar y conexión con recursos del barrio para prevenir ansiedad y depresión desde una mirada ecológica, inclusiva y no estigmatizante.";
    }

    const justification = document.getElementById("justification-content");
    if (justification) {
      justification.replaceChildren(...justificationParagraphs.map((text) => Object.assign(document.createElement("p"), { textContent: text })));
    }

    const references = document.getElementById("references-list");
    if (references) {
      const refText = "Equipo del proyecto Respira Nou Barris. (2026). Serie visual del dashboard (imágenes generadas con IA para uso académico).";
      const exists = Array.from(references.children).some((item) => item.textContent.includes("Serie visual del dashboard"));
      if (!exists) references.append(Object.assign(document.createElement("li"), { textContent: refText }));
    }
  }

  window.RespiraInteractions = { initAll: applyFinalPolish };

  document.addEventListener("DOMContentLoaded", () => {
    applyFinalPolish();
    window.setTimeout(applyFinalPolish, 300);
    window.setTimeout(applyFinalPolish, 1200);
  });
})();
