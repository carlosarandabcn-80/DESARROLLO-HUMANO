(function () {
  const images = [
    [".hero-media img", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Parc_Central_Nou_Barris_%287185960105%29.jpg/1600px-Parc_Central_Nou_Barris_%287185960105%29.jpg", "Parc Central de Nou Barris, territorio comunitario donde se sitúa el proyecto Respira Nou Barris."],
    [".photo-card.large img", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Students_outside_.jpg/1280px-Students_outside_.jpg", "Estudiantes en un contexto educativo al aire libre, imagen relacionada con la intervención escolar y comunitaria."],
    [".photo-card:not(.large):nth-of-type(2) img", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/America%27s_Outdoor_Initiative_Youth_Conference_%284816617296%29.jpg/1280px-America%27s_Outdoor_Initiative_Youth_Conference_%284816617296%29.jpg", "Grupo de jóvenes en conversación, imagen relacionada con escucha, participación y apoyo entre iguales."],
    [".photo-card:not(.large):nth-of-type(3) img", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Parc_Central_Nou_Barris_%287185960105%29.jpg/1280px-Parc_Central_Nou_Barris_%287185960105%29.jpg", "Parc Central de Nou Barris como referencia territorial del proyecto y de la desigualdad urbana."]
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

  const imageReferences = [
    "Kaufmann, B. (2012). Parc Central Nou Barris (7185960105) [Fotografía]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Parc_Central_Nou_Barris_(7185960105).jpg",
    "CommunicationsTCS. (2013). Students outside [Fotografía]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:Students_outside_.jpg",
    "Raine, S./USFWS. (2010). America's Outdoor Initiative Youth Conference (4816617296) [Fotografía]. Wikimedia Commons. https://commons.wikimedia.org/wiki/File:America%27s_Outdoor_Initiative_Youth_Conference_(4816617296).jpg"
  ];

  function injectStyle() {
    if (document.getElementById("respira-light-final")) return;
    const style = document.createElement("style");
    style.id = "respira-light-final";
    style.textContent = `
      body{background:#eaf3ff!important;color:#101827!important}.app-shell{background:#eaf3ff!important}.page{background:linear-gradient(135deg,#f7fbff 0%,#eaf3ff 54%,#e6f8f7 100%)!important}.sidebar{background:linear-gradient(180deg,#101a2e 0%,#132642 100%)!important;border-right:1px solid rgba(255,255,255,.12)!important;overflow-y:auto;scrollbar-width:thin}.brand-block{gap:.58rem!important}.brand-block img{width:172px!important;max-width:100%;height:auto!important;object-fit:contain}.brand-kicker{font-size:.78rem!important;line-height:1.22!important;letter-spacing:.025em!important;color:#f8fbff!important;font-weight:900!important;white-space:normal!important}.brand-project{color:#fff;font-size:1rem;font-weight:950;line-height:1.2}.main-nav a[href="#aprendizajes"],.mobile-drawer a[href="#aprendizajes"],#aprendizajes{display:none!important}.group-mini{padding:.85rem!important;gap:.45rem!important;background:rgba(255,255,255,.08)!important;border:1px solid rgba(255,255,255,.14)!important}.group-mini p{font-size:.66rem!important}.group-mini li{font-size:.72rem!important;line-height:1.18!important;font-weight:720!important}.topbar{position:fixed;top:1rem;right:1rem;left:auto;min-height:0;display:block;padding:0;border:0;background:transparent;backdrop-filter:none;z-index:80}.topbar-title,.barcelona-skyline,.topbar-progress,.menu-toggle{display:none!important}.accessibility-trigger{width:52px;height:52px;min-height:52px;padding:0;border-radius:50%;background:#0a0d14!important;border:3px solid #fff!important;box-shadow:0 10px 26px rgba(10,31,68,.28),0 0 0 1px rgba(10,13,20,.16)!important;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='25' fill='none' stroke='white' stroke-width='4'/%3E%3Ccircle cx='32' cy='18' r='4.5' fill='white'/%3E%3Cpath d='M18 27h28M32 23v13M24 49l8-13 8 13M24 35h16' fill='none' stroke='white' stroke-width='4.6' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")!important;background-repeat:no-repeat!important;background-position:center!important;background-size:35px!important}.accessibility-trigger img,.accessibility-trigger span{display:none!important}.accessibility-panel{right:0;top:calc(100% + .75rem)}.hero{min-height:calc(100vh - 1px);display:grid!important;grid-template-columns:minmax(0,1fr) minmax(360px,.82fr)!important;align-items:center!important;gap:clamp(1.5rem,4vw,4rem)!important;padding:clamp(3.2rem,5.5vw,5.5rem)!important;background:radial-gradient(circle at 12% 8%,rgba(0,166,166,.17),transparent 28%),linear-gradient(135deg,rgba(247,251,255,.96),rgba(232,243,255,.94))!important}.hero-content{align-self:center!important;max-width:760px!important;transform:none!important}.hero-content .eyebrow{margin-top:0!important}.hero h1,.section h2{color:#101827!important}.hero .lead,.hero li,.section-intro,.prose p{color:#2c3b52!important}.hero-panel{align-self:center!important;max-width:620px!important;width:100%!important}.hero-media{border-radius:10px!important;overflow:hidden!important;background:#fff!important;box-shadow:0 24px 70px rgba(13,45,84,.2)!important;border:1px solid rgba(14,82,150,.16)!important}.hero-media img{display:block!important;width:100%!important;height:auto!important;aspect-ratio:16/10!important;object-fit:cover!important;object-position:center center!important;opacity:1!important;filter:saturate(1.03) contrast(1.03)!important}.hero-media::after{display:none!important}.photo-card img,.media-frame img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;opacity:1!important;filter:saturate(.98) contrast(1.04)!important}.section:not(.hero){max-width:min(1180px,calc(100vw - 330px))!important;margin:2rem auto!important;padding:clamp(1.25rem,3vw,2.4rem)!important;border:1px solid rgba(14,82,150,.13)!important;border-radius:14px!important;background:rgba(255,255,255,.9)!important;box-shadow:0 20px 60px rgba(13,45,84,.13)!important;overflow:hidden!important}.kpi-card,.info-card,.chart-card,.activity-card,.impact-card,.check-panel,.objective-card,.rubric-panel,.media-frame,.photo-card{background:#fff!important;border:1px solid rgba(14,82,150,.15)!important;color:#101827!important}.pulse-card{background:rgba(255,255,255,.92)!important;color:#101827!important;border:1px solid rgba(14,82,150,.16)!important}.pulse-card strong{color:#063f8e!important}.mini-timeline span{background:#fff!important;color:#101827!important;border:1px solid rgba(14,82,150,.16)!important}.eyebrow{color:#007c89!important}table,td,th{color:#101827!important}@media(max-width:1100px){.hero{grid-template-columns:1fr!important;padding:2rem!important}.hero-panel{max-width:720px!important}}@media(max-width:900px){.topbar{top:.75rem;right:.75rem}.hero{padding:1.5rem!important}.section:not(.hero){max-width:calc(100vw - 2rem)!important}}
    `;
    document.head.append(style);
  }

  function wireInteractions(scope = document) {
    scope.querySelectorAll(".accordion-trigger").forEach((button) => {
      if (button.dataset.bound) return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => {
        const panel = button.closest(".accordion-item")?.querySelector(".accordion-panel");
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
    scope.querySelectorAll(".table-toggle").forEach((button) => {
      if (button.dataset.bound) return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => {
        const target = document.getElementById(button.getAttribute("aria-controls"));
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        button.textContent = expanded ? "Ver tabla accesible" : "Ocultar tabla accesible";
        if (target) target.hidden = expanded;
      });
    });
  }

  function applyFinalPolish() {
    injectStyle();
    wireInteractions(document);

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
    if (caption) caption.textContent = "Fotografía: Parc Central de Nou Barris, territorio comunitario del proyecto.";

    document.querySelectorAll(".photo-card figcaption").forEach((captionNode, index) => {
      const notes = [
        ["Entorno escolar", "Imagen de apoyo para representar la intervención socioeducativa en centros y espacios comunitarios."],
        ["Apoyo entre iguales", "Imagen de apoyo para representar escucha, participación y acompañamiento adolescente."],
        ["Territorio", "Parc Central de Nou Barris como contexto urbano y comunitario de la propuesta."]
      ];
      if (!notes[index]) return;
      captionNode.replaceChildren(
        Object.assign(document.createElement("span"), { textContent: notes[index][0] }),
        Object.assign(document.createElement("small"), { textContent: notes[index][1] })
      );
    });

    const eyebrow = document.getElementById("home-eyebrow");
    if (eyebrow) eyebrow.textContent = "Intervención socioeducativa comunitaria";
    const lead = document.getElementById("home-lead");
    if (lead) lead.textContent = "Respira Nou Barris acompaña a adolescentes de 12 a 17 años mediante educación emocional, apoyo entre iguales, orientación familiar y conexión con recursos del barrio para prevenir ansiedad y depresión desde una mirada ecológica, inclusiva y no estigmatizante.";

    const justification = document.getElementById("justification-content");
    if (justification) {
      justification.replaceChildren(...justificationParagraphs.map((text) => Object.assign(document.createElement("p"), { textContent: text })));
    }

    const referenceList = document.getElementById("references-list");
    if (referenceList) {
      imageReferences.forEach((reference) => {
        const exists = Array.from(referenceList.children).some((item) => item.textContent.includes(reference.slice(0, 24)));
        if (!exists) referenceList.append(Object.assign(document.createElement("li"), { textContent: reference }));
      });
    }
  }

  window.RespiraInteractions = { initAll: applyFinalPolish };
  document.addEventListener("DOMContentLoaded", () => {
    applyFinalPolish();
    window.setTimeout(applyFinalPolish, 300);
    window.setTimeout(applyFinalPolish, 1200);
  });
})();
