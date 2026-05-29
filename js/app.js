(function () {
  const DATA_URL = "assets/data/data.json";

  function byId(id) {
    return document.getElementById(id);
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function clear(node) {
    if (node) node.replaceChildren();
  }

  function renderParagraphs(container, paragraphs) {
    clear(container);
    paragraphs.forEach((text) => container.append(el("p", "", text)));
  }

  function renderList(container, items) {
    clear(container);
    items.forEach((item) => container.append(el("li", "", item)));
  }

  function renderKpis(data) {
    const grid = byId("kpi-grid");
    clear(grid);
    data.kpis.forEach((kpi) => {
      const card = el("article", "kpi-card");
      const label = el("span", "", kpi.label);
      const value = el("strong", "", kpi.value);
      const detail = el("p", "", kpi.detail);
      const source = el("span", "", kpi.source);
      card.append(label, value, detail, source);
      grid.append(card);
    });
  }

  function renderRubric(data) {
    const grid = byId("rubric-grid");
    clear(grid);
    data.rubric.criteria.forEach((criterion) => {
      const card = el("article", "rubric-card");
      card.title = criterion.description;
      const name = el("span", "", criterion.name.replace("Criterio ", ""));
      const points = el("strong", "", `${criterion.points} pts`);
      const weight = el("p", "", criterion.weight);
      card.append(name, points, weight);
      grid.append(card);
    });
  }

  function renderInfoCards(container, cards) {
    clear(container);
    cards.forEach((cardData) => {
      const card = el("article", "info-card");
      card.append(el("h3", "", cardData.title || cardData.name), el("p", "", cardData.text || cardData.application));
      container.append(card);
    });
  }

  function renderHome(data) {
    const home = data.sections.home;
    byId("home-eyebrow").textContent = home.eyebrow;
    byId("home-title").textContent = home.title;
    byId("home-lead").textContent = home.lead;
    byId("hero-population").textContent = new Intl.NumberFormat("es-ES").format(data.project.populationBase);
    renderList(byId("home-highlights"), home.highlights);
  }

  function renderContext(data) {
    const context = data.sections.context;
    byId("contexto-title").textContent = context.title;
    renderParagraphs(byId("context-content"), context.paragraphs);
    renderInfoCards(byId("context-cards"), context.cards);

    const diagram = byId("context-diagram");
    diagram.src = context.diagram.src;
    diagram.alt = context.diagram.alt;
  }

  function renderProblem(data) {
    const problem = data.sections.problem;
    byId("problema-title").textContent = problem.title;
    renderParagraphs(byId("problem-content"), problem.paragraphs);

    const facts = byId("problem-facts");
    clear(facts);
    problem.facts.forEach((fact) => {
      const card = el("article", "fact-card");
      card.append(el("span", "", fact.label), el("strong", "", fact.value));
      facts.append(card);
    });
  }

  function renderCharts(data) {
    const grid = byId("charts-grid");
    clear(grid);
    ["population", "mentalHealth", "wellbeing", "bodyDissatisfaction"].forEach((id) => {
      grid.append(window.RespiraCharts.createChartCard(id, data.charts[id]));
    });

    const impactGrid = byId("impact-chart-grid");
    clear(impactGrid);
    impactGrid.append(window.RespiraCharts.createChartCard("projectIndicators", data.charts.projectIndicators));

    const budgetChart = {
      ...data.charts.budget,
      items: data.budget.items
    };
    const budgetGrid = byId("budget-chart-grid");
    clear(budgetGrid);
    budgetGrid.append(window.RespiraCharts.createChartCard("budget", budgetChart));
  }

  function renderInequality(data) {
    const inequality = data.sections.inequality;
    byId("desigualdad-title").textContent = inequality.title;
    renderParagraphs(byId("inequality-content"), inequality.paragraphs);

    const tags = byId("inequality-tags");
    clear(tags);
    inequality.tags.forEach((tag) => tags.append(el("span", "tag", tag)));
  }

  function renderJustification(data) {
    const justification = data.sections.justification;
    byId("justificacion-title").textContent = justification.title;
    renderParagraphs(byId("justificacion-content"), justification.paragraphs);
    renderList(byId("justification-needs"), justification.needs);
  }

  function renderTheory(data) {
    const theory = data.sections.theory;
    byId("marco-title").textContent = theory.title;
    byId("theory-intro").textContent = theory.intro;

    const frameworks = byId("theory-frameworks");
    clear(frameworks);
    theory.frameworks.forEach((item, index) => {
      const article = el("article", "accordion-item");
      const button = el("button", "accordion-trigger");
      button.type = "button";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", `framework-panel-${index}`);
      button.append(el("span", "", item.name), el("span", "", "+"));

      const panel = el("div", "accordion-panel");
      panel.id = `framework-panel-${index}`;
      panel.hidden = true;
      const contribution = el("p", "", item.contribution);
      const application = el("p", "", item.application);
      panel.append(contribution, application);
      article.append(button, panel);
      frameworks.append(article);
    });

    renderList(byId("theory-risks"), theory.risks);
    renderList(byId("theory-protective"), theory.protectiveFactors);
    renderInfoCards(byId("theory-foundations"), theory.foundations);
  }

  function renderObjectives(data) {
    const objectives = data.sections.objectives;
    byId("objetivos-title").textContent = objectives.title;
    byId("objective-general").textContent = objectives.general;
    renderList(byId("objective-specific"), objectives.specific);
  }

  function renderParticipants(data) {
    const participants = data.sections.participants;
    byId("destinatarios-title").textContent = participants.title;

    const content = byId("participants-content");
    clear(content);
    content.append(
      el("p", "", participants.profile),
      el("p", "", `Participación directa: ${participants.direct}.`),
      el("p", "", `Participación indirecta: ${participants.indirect}`)
    );

    renderList(byId("participants-criteria"), participants.inclusionCriteria);
    renderList(byId("participants-signals"), participants.prioritySignals);
    renderList(byId("participants-priority"), participants.prioritization);
  }

  function renderMethodology(data) {
    const method = data.sections.methodology;
    byId("metodologia-title").textContent = method.title;
    byId("method-description").textContent = `${method.description} Lógica del proyecto: ${method.logic}`;

    const approach = byId("method-approach");
    clear(approach);
    method.approach.forEach((tag) => approach.append(el("span", "", tag)));

    renderInfoCards(
      byId("method-levels"),
      method.levels.map((level) => ({ title: level.name, text: level.application }))
    );
    renderList(byId("method-strategies"), method.strategies);
  }

  function detailBlock(title, items) {
    const wrapper = el("div");
    wrapper.append(el("h4", "", title));
    const list = el("ul");
    items.forEach((item) => list.append(el("li", "", item)));
    wrapper.append(list);
    return wrapper;
  }

  function renderActivities(data) {
    const grid = byId("activities-grid");
    clear(grid);

    data.activities.forEach((activity) => {
      const card = el("article", "activity-card");
      const header = document.createElement("header");
      header.append(
        el("span", "months", activity.months),
        el("h3", "", activity.name),
        el("p", "subtitle", activity.subtitle)
      );

      const objective = el("p", "", activity.generalObjective);
      const button = el("button", "expand-button");
      button.type = "button";
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-controls", `${activity.id}-details`);
      button.append(el("span", "", "Ver detalle"));

      const details = el("div", "activity-details");
      details.id = `${activity.id}-details`;
      details.hidden = true;
      details.append(
        detailBlock("Objetivos específicos", activity.specificObjectives),
        el("p", "", activity.description),
        detailBlock("Recursos humanos", activity.humanResources),
        detailBlock("Recursos materiales", activity.materialResources),
        detailBlock("Evaluación", activity.evaluation),
        el("p", "", `Temporalización: ${activity.schedule}`),
        el("p", "", `Indicador: ${activity.indicator}`)
      );

      const actions = el("div", "activity-actions");
      actions.append(button);

      card.append(header, objective, actions, details);
      grid.append(card);
    });
  }

  function renderImpact(data) {
    byId("impact-summary").textContent = data.impact.summary;

    const grid = byId("impact-results");
    clear(grid);
    data.impact.results.forEach((result) => {
      const card = el("article", "impact-card");
      card.append(
        el("h3", "", result.objective),
        el("p", "", result.expected),
        el("strong", "", result.indicator)
      );
      grid.append(card);
    });
  }

  function renderBudget(data) {
    const tbody = document.querySelector("#budget-table tbody");
    clear(tbody);

    data.budget.items.forEach((item) => {
      const row = document.createElement("tr");
      row.append(el("th", "", item.category), el("td", "", item.description), el("td", "", window.RespiraCharts.formatSpanish(item.amount, "EUR")));
      row.querySelector("th").scope = "row";
      tbody.append(row);
    });

    byId("budget-total").textContent = window.RespiraCharts.formatSpanish(data.budget.total, "EUR");
  }

  function renderReferences(data) {
    const list = byId("references-list");
    clear(list);
    data.references.forEach((reference) => {
      const item = el("li");
      item.append(el("p", "", reference.citation));
      if (reference.url) {
        const link = el("a", "", reference.url);
        link.href = reference.url;
        link.target = "_blank";
        link.rel = "noreferrer";
        item.append(link);
      }
      list.append(item);
    });
  }

  function renderLearning(data) {
    const grid = byId("learning-grid");
    clear(grid);
    data.groupLearning.forEach((entry) => {
      const card = el("article", "learning-card");
      card.append(
        el("h3", "", entry.member),
        el("p", "", entry.actions),
        el("p", "", entry.learning)
      );
      grid.append(card);
    });
  }

  function applyVisualCorrections() {
    const visualMap = [
      [".hero-media img", "assets/images/photos/hero-ai-respira-nou-barris.svg", "Ilustración generada con IA de Nou Barris como entorno comunitario de bienestar adolescente."],
      [".photo-card.large img", "assets/images/photos/school-community.svg", "Ilustración de un instituto y adolescentes en un entorno comunitario de Nou Barris."],
      [".photo-card:not(.large):nth-of-type(2) img", "assets/images/photos/mental-health-network.svg", "Ilustración de red comunitaria, apoyo emocional y recursos de salud mental de proximidad."],
      [".photo-card:not(.large):nth-of-type(3) img", "assets/images/photos/barcelona-nou-barris.svg", "Ilustración del paisaje urbano de Barcelona con skyline y colinas de Nou Barris."]
    ];

    visualMap.forEach(([selector, src, alt]) => {
      const image = document.querySelector(selector);
      if (image) {
        image.src = src;
        image.alt = alt;
        image.removeAttribute("srcset");
      }
    });

    const heroCaption = document.querySelector(".hero-media figcaption");
    if (heroCaption) {
      heroCaption.textContent = "Imagen generada con IA: bienestar adolescente, comunidad y territorio de Nou Barris.";
    }

    const logo = document.querySelector(".brand-block img");
    if (logo) {
      logo.src = "https://raw.githubusercontent.com/carlosarandabcn-80/infografia-interactiva/main/assets/unir-logo.svg";
    }

    const brandBlock = document.querySelector(".brand-block");
    if (brandBlock && !brandBlock.querySelector(".brand-project")) {
      const project = el("span", "brand-project", "Respira Nou Barris");
      brandBlock.append(project);
    }

    const accessibilityButton = byId("accessibilityToggle");
    if (accessibilityButton && !accessibilityButton.querySelector("img")) {
      accessibilityButton.replaceChildren();
      const icon = document.createElement("img");
      icon.src = "assets/images/accessibility-icon.png";
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
      accessibilityButton.append(icon);
      accessibilityButton.setAttribute("aria-label", "Abrir opciones de accesibilidad");
    }

    const textControls = document.querySelector(".text-controls");
    if (textControls && !textControls.querySelector("span")) {
      textControls.prepend(el("span", "", "Tamaño de texto"));
    }

    let style = byId("visual-hotfix-style");
    if (!style) {
      style = document.createElement("style");
      style.id = "visual-hotfix-style";
      document.head.append(style);
    }

    style.textContent = `
      .brand-project{color:#fff;font-size:1rem;font-weight:950;line-height:1.2}
      .topbar{position:fixed;top:1rem;right:1rem;left:auto;min-height:0;display:block;padding:0;border:0;background:transparent;backdrop-filter:none;z-index:80}
      .topbar-title,.barcelona-skyline,.topbar-progress{display:none!important}
      .accessibility-trigger{width:52px;height:52px;min-height:52px;padding:0;border-radius:50%;background:#fff;box-shadow:0 18px 42px rgba(10,31,68,.22)}
      .accessibility-trigger img{width:30px;height:30px;display:block}
      .accessibility-trigger span{display:none}
      .accessibility-panel{right:0;top:calc(100% + .75rem)}
      .hero{min-height:calc(100vh - 1px);padding-top:3.3rem}
      .hero-media img{aspect-ratio:16/10;object-position:center center}
      @media(max-width:900px){.topbar{top:.75rem;right:.75rem}.hero{padding-top:2rem}}
    `;
  }

  function renderDashboard(data) {
    applyVisualCorrections();
    renderHome(data);
    renderKpis(data);
    renderRubric(data);
    renderContext(data);
    renderProblem(data);
    renderInequality(data);
    renderJustification(data);
    renderTheory(data);
    renderObjectives(data);
    renderParticipants(data);
    renderMethodology(data);
    renderActivities(data);
    renderImpact(data);
    renderBudget(data);
    renderCharts(data);
    renderReferences(data);
    renderLearning(data);
    applyVisualCorrections();

    window.RespiraInteractions?.initAll(document);
    window.RespiraAccessibility?.announce?.("Dashboard cargado.");
  }

  async function init() {
    try {
      const response = await fetch(DATA_URL);
      if (!response.ok) throw new Error(`No se pudo cargar ${DATA_URL}`);
      const data = await response.json();
      renderDashboard(data);
    } catch (error) {
      console.error(error);
      const main = byId("main-content");
      const message = el("section", "section");
      message.append(
        el("h1", "", "No se pudo cargar el dashboard"),
        el("p", "", "Revisa que el proyecto se esté abriendo desde un servidor local o GitHub Pages para que el archivo JSON pueda cargarse correctamente.")
      );
      main.prepend(message);
      window.RespiraAccessibility?.announce?.("Error al cargar el dashboard.");
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
