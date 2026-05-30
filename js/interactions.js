(function () {
  const images = [
    [".hero-media img", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Parc_Central_Nou_Barris_%287185960105%29.jpg/1600px-Parc_Central_Nou_Barris_%287185960105%29.jpg", "Parc Central de Nou Barris, territorio comunitario donde se sitúa el proyecto Respira Nou Barris."],
    [".photo-card.large img", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Parc_Central_Nou_Barris_%287185960105%29.jpg/1280px-Parc_Central_Nou_Barris_%287185960105%29.jpg", "Parc Central de Nou Barris como espacio comunitario y de proximidad para adolescentes y familias."],
    [".photo-card:not(.large):nth-of-type(2) img", "https://commons.wikimedia.org/wiki/Special:Redirect/file/164%20Ateneu%20Popular%20de%20Nou%20Barris,%20Arte.jpg", "Ateneu Popular de Nou Barris, equipamiento cultural y comunitario del distrito."],
    [".photo-card:not(.large):nth-of-type(3) img", "https://commons.wikimedia.org/wiki/Special:Redirect/file/Biblioteca%20Nou%20Barris%20Barcelona.jpg", "Biblioteca pública en Barcelona como recurso educativo y comunitario de proximidad."]
  ];

  const participantNames = ["Aranda Sánchez, Carlos", "Martínez Ruiz, Úrsula", "Pavón Torres, Yolanda", "Saavedra Farías, Yeissy Sorana", "Ziegler Edwards, Rebeca Ruth"];
  const kpis = [
    ["Población adolescente de Barcelona", "148.431", "Personas de 10 a 19 años en 2025", "Idescat, 2025"],
    ["Participantes directos", "400", "Adolescentes escolarizados o residentes en Nou Barris", "Borrador del proyecto"],
    ["Duración", "6", "Meses de intervención preventiva y comunitaria", "Convocatoria UNIR"],
    ["Presupuesto máximo", "20.000 €", "Ayuda solicitada ajustada al límite de la convocatoria", "Convocatoria UNIR"]
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
  const imageReferences = [
    "Kaufmann, B. (2012). Parc Central Nou Barris (7185960105) [Fotografía]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Parc_Central_Nou_Barris_(7185960105).jpg",
    "Wikimedia Commons. (s. f.). Ateneu Popular de Nou Barris [Fotografía]. Wikimedia Commons. https://commons.wikimedia.org/wiki/Special:Redirect/file/164%20Ateneu%20Popular%20de%20Nou%20Barris,%20Arte.jpg",
    "Wikimedia Commons. (s. f.). Biblioteca Nou Barris Barcelona [Fotografía]. Wikimedia Commons. https://commons.wikimedia.org/wiki/Special:Redirect/file/Biblioteca%20Nou%20Barris%20Barcelona.jpg"
  ];

  function injectStyle() {
    if (document.getElementById("respira-premium-final")) return;
    const style = document.createElement("style");
    style.id = "respira-premium-final";
    style.textContent = `
      body{background:#eaf3ff!important;color:#101827!important}.app-shell{background:#eaf3ff!important}.page{background:linear-gradient(135deg,#f7fbff 0%,#eaf3ff 54%,#e8f7f3 100%)!important}.sidebar{background:linear-gradient(180deg,#101a2e 0%,#132642 100%)!important;overflow-y:auto}.brand-block{gap:.58rem!important}.brand-block img{width:172px!important;height:auto!important}.brand-kicker{font-size:.78rem!important;line-height:1.22!important;color:#f8fbff!important;font-weight:900!important}.brand-project{color:#fff;font-size:1rem;font-weight:950}.main-nav a[href="#aprendizajes"],.mobile-drawer a[href="#aprendizajes"],#aprendizajes{display:none!important}.group-mini{padding:.85rem!important}.group-mini li{font-size:.72rem!important;line-height:1.18!important}.topbar{position:fixed;top:1rem;right:1rem;left:auto;min-height:0;display:block;padding:0;border:0;background:transparent;z-index:80}.topbar-title,.barcelona-skyline,.topbar-progress,.menu-toggle{display:none!important}.accessibility-trigger{width:52px;height:52px;min-height:52px;padding:0;border-radius:50%;background:#0a0d14!important;border:3px solid #fff!important;box-shadow:0 10px 26px rgba(10,31,68,.28)!important;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='25' fill='none' stroke='white' stroke-width='4'/%3E%3Ccircle cx='32' cy='18' r='4.5' fill='white'/%3E%3Cpath d='M18 27h28M32 23v13M24 49l8-13 8 13M24 35h16' fill='none' stroke='white' stroke-width='4.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-position:center!important;background-size:35px!important}.accessibility-trigger img,.accessibility-trigger span{display:none!important}.accessibility-panel{right:0;top:calc(100% + .75rem)}.hero{min-height:calc(100vh - 1px);display:grid!important;grid-template-columns:minmax(0,1fr) minmax(420px,.95fr)!important;align-items:center!important;gap:clamp(1.5rem,4vw,4rem)!important;padding:clamp(3rem,5vw,5rem)!important;background:radial-gradient(circle at 12% 8%,rgba(0,166,166,.17),transparent 28%),linear-gradient(135deg,#f8fbff,#eaf3ff)!important}.hero-content{align-self:center!important;max-width:740px!important}.hero h1,.section h2{color:#101827!important}.hero .lead,.hero li,.section-intro,.prose p{color:#2c3b52!important}.hero-panel{align-self:center!important;max-width:720px!important;width:100%!important}.hero-media{border-radius:10px!important;overflow:hidden!important;background:#fff!important;box-shadow:0 24px 70px rgba(13,45,84,.2)!important;border:1px solid rgba(14,82,150,.16)!important}.hero-media img{display:block!important;width:100%!important;height:auto!important;aspect-ratio:16/9!important;object-fit:cover!important;object-position:center!important;opacity:1!important}.hero-media::after{display:none!important}.pulse-card,.mini-timeline{display:none!important}.hero-kpi-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:1rem}.hero-kpi{position:relative;background:#fff;border:1px solid rgba(14,82,150,.16);border-radius:8px;padding:1rem 1.1rem;box-shadow:0 18px 40px rgba(13,45,84,.1);overflow:hidden}.hero-kpi:before{content:"";position:absolute;inset:0 0 auto;height:4px;background:linear-gradient(90deg,#0b63ce,#00a6a6,#ff6b35)}.hero-kpi span{display:block;color:#59677f;font-size:.82rem;line-height:1.45}.hero-kpi strong{display:block;margin:.25rem 0 .45rem;color:#07377c;font-size:clamp(1.8rem,3vw,2.55rem);line-height:1;font-weight:950}.hero-kpi small{color:#66738a;font-size:.78rem}.kpi-grid,.rubric-panel{display:none!important}.section[aria-labelledby="kpi-title"]{display:none!important}.photo-card img,.media-frame img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;opacity:1!important}.section:not(.hero){max-width:min(1180px,calc(100vw - 330px))!important;margin:2rem auto!important;padding:clamp(1.25rem,3vw,2.4rem)!important;border:1px solid rgba(14,82,150,.13)!important;border-radius:14px!important;background:rgba(255,255,255,.92)!important;box-shadow:0 20px 60px rgba(13,45,84,.13)!important;overflow:hidden!important}.kpi-card,.info-card,.chart-card,.activity-card,.impact-card,.check-panel,.objective-card,.media-frame,.photo-card{background:#fff!important;border:1px solid rgba(14,82,150,.15)!important;color:#101827!important}.info-card,.objective-card,.activity-card{border-top:4px solid #00a6a6!important}.chart-card{border-top:4px solid #0b63ce!important}.impact-card{border-top:4px solid #ff6b35!important}.eyebrow{color:#007c89!important}table,td,th{color:#101827!important}.reveal{opacity:1!important;transform:none!important;visibility:visible!important}.ecosystem-map{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:.7rem;margin-top:1.2rem}.ecosystem-map span{background:linear-gradient(135deg,#07377c,#007c89);color:#fff;border-radius:999px;padding:.65rem .5rem;text-align:center;font-weight:850;font-size:.82rem;box-shadow:0 12px 24px rgba(7,55,124,.16)}@media(max-width:1100px){.hero{grid-template-columns:1fr!important;padding:2rem!important}.hero-panel{max-width:760px!important}.ecosystem-map{grid-template-columns:repeat(2,1fr)}}@media(max-width:900px){.topbar{top:.75rem;right:.75rem}.hero{padding:1.5rem!important}.hero-kpi-grid{grid-template-columns:1fr}.section:not(.hero){max-width:calc(100vw - 2rem)!important}.ecosystem-map{grid-template-columns:1fr}}
    `;
    document.head.append(style);
  }

  function bindControls(scope = document) {
    scope.querySelectorAll(".accordion-trigger,.table-toggle").forEach((button) => {
      if (button.dataset.respiraBound) return;
      button.dataset.respiraBound = "true";
      button.addEventListener("click", () => {
        const target = button.classList.contains("table-toggle") ? document.getElementById(button.getAttribute("aria-controls")) : button.closest(".accordion-item")?.querySelector(".accordion-panel");
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        if (target) target.hidden = expanded;
        if (button.classList.contains("table-toggle")) button.textContent = expanded ? "Ver tabla accesible" : "Ocultar tabla accesible";
      });
    });
  }

  function upsertHeroKpis() {
    const panel = document.querySelector(".hero-panel");
    if (!panel || panel.querySelector(".hero-kpi-grid")) return;
    const grid = document.createElement("div");
    grid.className = "hero-kpi-grid";
    grid.setAttribute("aria-label", "Indicadores ejecutivos del proyecto");
    kpis.forEach(([label, value, detail, source]) => {
      const card = document.createElement("article");
      card.className = "hero-kpi";
      card.innerHTML = `<span>${label}</span><strong>${value}</strong><span>${detail}</span><small>${source}</small>`;
      grid.append(card);
    });
    panel.append(grid);
  }

  function upsertEcosystem() {
    const method = document.getElementById("method-description")?.parentElement;
    if (!method || method.querySelector(".ecosystem-map")) return;
    const map = document.createElement("div");
    map.className = "ecosystem-map";
    ["Instituto", "Familia", "Iguales", "Barrio", "Salud mental"].forEach((item) => map.append(Object.assign(document.createElement("span"), { textContent: item })));
    method.append(map);
  }

  function applyFinalPolish() {
    injectStyle();
    bindControls(document);
    document.querySelectorAll(".reveal").forEach((section) => section.classList.add("is-visible"));
    document.querySelector('.section[aria-labelledby="kpi-title"]')?.remove();
    document.querySelectorAll(".rubric-panel").forEach((node) => node.remove());

    const brandKicker = document.querySelector(".brand-kicker");
    if (brandKicker) brandKicker.innerHTML = "Grado de Educación Social<br>Estructura Social";
    const groupList = document.querySelector(".group-mini ul");
    if (groupList) groupList.replaceChildren(...participantNames.map((name) => Object.assign(document.createElement("li"), { textContent: name })));
    const brandBlock = document.querySelector(".brand-block");
    if (brandBlock && !brandBlock.querySelector(".brand-project")) brandBlock.append(Object.assign(document.createElement("span"), { className: "brand-project", textContent: "Respira Nou Barris" }));
    document.querySelectorAll('a[href="#aprendizajes"], #aprendizajes').forEach((node) => node.remove());

    images.forEach(([selector, src, alt]) => {
      const image = document.querySelector(selector);
      if (image) { image.src = src; image.alt = alt; image.removeAttribute("srcset"); }
    });
    const caption = document.querySelector(".hero-media figcaption");
    if (caption) caption.textContent = "Fotografía: Parc Central de Nou Barris, territorio comunitario del proyecto.";
    document.querySelectorAll(".photo-card figcaption").forEach((captionNode, index) => {
      const notes = [["Territorio", "Parc Central de Nou Barris como espacio comunitario de referencia."], ["Equipamiento comunitario", "Ateneu Popular de Nou Barris como ejemplo de red cultural y barrial."], ["Recurso educativo", "Biblioteca pública como apoyo comunitario y educativo de proximidad."]];
      if (!notes[index]) return;
      captionNode.replaceChildren(Object.assign(document.createElement("span"), { textContent: notes[index][0] }), Object.assign(document.createElement("small"), { textContent: notes[index][1] }));
    });

    upsertHeroKpis();
    upsertEcosystem();

    const eyebrow = document.getElementById("home-eyebrow");
    if (eyebrow) eyebrow.textContent = "Intervención socioeducativa comunitaria";
    const lead = document.getElementById("home-lead");
    if (lead) lead.textContent = "Respira Nou Barris acompaña a adolescentes de 12 a 17 años mediante educación emocional, apoyo entre iguales, orientación familiar y conexión con recursos del barrio para prevenir ansiedad y depresión desde una mirada ecológica, inclusiva y no estigmatizante.";
    const justification = document.getElementById("justification-content");
    if (justification) justification.replaceChildren(...justificationParagraphs.map((text) => Object.assign(document.createElement("p"), { textContent: text })));
    const referenceList = document.getElementById("references-list");
    if (referenceList) imageReferences.forEach((reference) => {
      const exists = Array.from(referenceList.children).some((item) => item.textContent.includes(reference.slice(0, 24)));
      if (!exists) referenceList.append(Object.assign(document.createElement("li"), { textContent: reference }));
    });
  }

  window.RespiraInteractions = { initAll: applyFinalPolish };
  document.addEventListener("DOMContentLoaded", () => {
    applyFinalPolish();
    window.setTimeout(applyFinalPolish, 300);
    window.setTimeout(applyFinalPolish, 1200);
  });
})();
