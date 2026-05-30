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
    if (!container || !Array.isArray(paragraphs)) return;
    clear(container);
    paragraphs.forEach((text) => container.append(el("p", "", text)));
  }

  function renderList(container, items) {
    if (!container || !Array.isArray(items)) return;
    clear(container);
    items.forEach((item) => container.append(el("li", "", item)));
  }

  function renderInfoCards(container, cards) {
    if (!container || !Array.isArray(cards)) return;
    clear(container);
    cards.forEach((cardData) => {
      const card = el("article", "info-card");
      card.append(el("h3", "", cardData.title || cardData.name), el("p", "", cardData.text || cardData.application));
      container.append(card);
    });
  }

  function renderHome(data) {
    const home = data?.sections?.home;
    if (!home) return;
    if (byId("home-eyebrow")) byId("home-eyebrow").textContent = home.eyebrow || "";
    if (byId("home-title")) byId("home-title").textContent = home.title || "";
    if (byId("home-lead")) byId("home-lead").textContent = home.lead || "";
    if (byId("hero-population")) {
      byId("hero-population").textContent = new Intl.NumberFormat("es-ES").format(data?.project?.populationBase || 0);
    }
    renderList(byId("home-highlights"), home.highlights || []);
  }

  function renderContext(data) {
    const context = data?.sections?.context;
    if (!context) return;
    if (byId("contexto-title")) byId("contexto-title").textContent = context.title || "Contexto";
    renderParagraphs(byId("context-content"), context.paragraphs || []);
    renderInfoCards(byId("context-cards"), context.cards || []);

    const diagram = byId("context-diagram");
    if (diagram && context.diagram) {
      diagram.src = context.diagram.src;
      diagram.alt = context.diagram.alt;
    }
  }

  function renderProblem(data) {
    const problem = data?.sections?.problem;
    if (!problem) return;
    if (byId("problema-title")) byId("problema-title").textContent = problem.title || "Problema y datos";
    renderParagraphs(byId("problem-content"), problem.paragraphs || []);

    const facts = byId("problem-facts");
    if (!facts) return;
    clear(facts);
    (problem.facts || []).forEach((fact) => {
      const card = el("article", "fact-card");
      card.append(el("span", "", fact.label), el("strong", "", fact.value));
      facts.append(card);
    });
  }

  function renderCharts(data) {
    if (!window.RespiraCharts?.createChartCard) return;

    const charts = data?.charts || {};

    const grid = byId("charts-grid");
    if (grid) {
      clear(grid);
      ["population", "mentalHealth", "wellbeing", "bodyDissatisfaction"].forEach((id) => {
        if (charts[id]) grid.append(window.RespiraCharts.createChartCard(id, charts[id]));
      });
    }

    const impactGrid = byId("impact-chart-grid");
    if (impactGrid && charts.projectIndicators) {
      clear(impactGrid);
      impactGrid.append(window.RespiraCharts.createChartCard("projectIndicators", charts.projectIndicators));
    }

    const budgetGrid = byId("budget-chart-grid");
    if (budgetGrid && charts.budget) {
      clear(budgetGrid);
      budgetGrid.append(window.RespiraCharts.createChartCard("budget", { ...charts.budget, items: data?.budget?.items || [] }));
    }
  }

  function renderInequality(data) {
    const inequality = data?.sections?.inequality;
    if (!inequality) return;
    if (byId("desigualdad-title")) byId("desigualdad-title").textContent = inequality.title || "Desigualdad";
    renderParagraphs(byId("inequality-content"), inequality.paragraphs || []);

    const tags = byId("inequality-tags");
    if (!tags) return;
    clear(tags);
    (inequality.tags || []).forEach((tag) => tags.append(el("span", "tag", tag)));
  }

  function renderJustification(data) {
    const justification = data?.sections?.justification;
    if (!justification) return;
    if (byId("justificacion-title")) byId("justificacion-title").textContent = justification.title || "Justificación";
    renderParagraphs(byId("justification-content"), justification.paragraphs || []);
    renderList(byId("justification-needs"), justification.needs || []);
  }

  function renderTheory(data) {
    const theory = data?.sections?.theory;
    if (!theory) return;
    if (byId("marco-title")) byId("marco-title").textContent = theory.title || "Marco teórico";
    if (byId("theory-intro")) byId("theory-intro").textContent = theory.intro || "";

    const frameworks = byId("theory-frameworks");
    if (frameworks) {
      clear(frameworks);
      (theory.frameworks || []).forEach((item, index) => {
        const article = el("article", "accordion-item");
        const button = el("button", "accordion-trigger");
        button.type = "button";
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", `framework-panel-${index}`);
        button.append(el("span", "", item.name), el("span", "", "+"));

        const panel = el("div", "accordion-panel");
        panel.id = `framework-panel-${index}`;
        panel.hidden = true;
        panel.append(el("p", "", item.contribution), el("p", "", item.application));

        article.append(button, panel);
        frameworks.append(article);
      });
    }

    renderList(byId("theory-risks"), theory.risks || []);
    renderList(byId("theory-protective"), theory.protectiveFactors || []);
    renderInfoCards(byId("theory-foundations"), theory.foundations || []);
  }

  function renderObjectives(data) {
    const objectives = data?.sections?.objectives;
    if (!objectives) return;
    if (byId("objetivos-title")) byId("objetivos-title").textContent = objectives.title || "Objetivos";
    if (byId("objective-general")) byId("objective-general").textContent = objectives.general || "";
    renderList(byId("objective-specific"), objectives.specific || []);
  }

  function renderParticipants(data) {
    const participants = data?.sections?.participants;
    if (!participants) return;
    if (byId("destinatarios-title")) byId("destinatarios-title").textContent = participants.title || "Destinatarios";

    const content = byId("participants-content");
    if (content) {
      clear(content);
      content.append(
        el("p", "", participants.profile || ""),
        el("p", "", `Participación directa: ${participants.direct || ""}.`),
        el("p", "", `Participación indirecta: ${participants.indirect || ""}`)
      );
    }

    renderList(byId("participants-criteria"), participants.inclusionCriteria || []);
    renderList(byId("participants-signals"), participants.prioritySignals || []);
    renderList(byId("participants-priority"), participants.prioritization || []);
  }

  function renderMethodology(data) {
    const method = data?.sections?.methodology;
    if (!method) return;
    if (byId("metodologia-title")) byId("metodologia-title").textContent = method.title || "Metodología";
    if (byId("method-description")) {
      byId("method-description").textContent = `${method.description || ""} Lógica del proyecto: ${method.logic || ""}`;
    }

    const approach = byId("method-approach");
    if (approach) {
      clear(approach);
      (method.approach || []).forEach((tag) => approach.append(el("span", "", tag)));
    }

    renderInfoCards(
      byId("method-levels"),
      (method.levels || []).map((level) => ({ title: level.name, text: level.application }))
    );
    renderList(byId("method-strategies"), method.strategies || []);
  }

  function detailBlock(title, items) {
    const wrapper = el("div");
    wrapper.append(el("h4", "", title));
    const list = el("ul");
    (items || []).forEach((item) => list.append(el("li", "", item)));
    wrapper.append(list);
    return wrapper;
  }

  function renderActivities(data) {
    const grid = byId("activities-grid");
    if (!grid) return;
    clear(grid);

    (data?.activities || []).forEach((activity) => {
      const card = el("article", "activity-card");
      const header = document.createElement("header");
      header.append(el("span", "months", activity.months), el("h3", "", activity.name), el("p", "subtitle", activity.subtitle));

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
    if (byId("impact-summary")) byId("impact-summary").textContent = data?.impact?.summary || "";

    const grid = byId("impact-results");
    if (!grid) return;
    clear(grid);
    (data?.impact?.results || []).forEach((result) => {
      const card = el("article", "impact-card");
      card.append(el("h3", "", result.objective), el("p", "", result.expected), el("strong", "", result.indicator));
      grid.append(card);
    });
  }

  function renderBudget(data) {
    const tbody = document.querySelector("#budget-table tbody");
    if (tbody) {
      clear(tbody);
      (data?.budget?.items || []).forEach((item) => {
        const row = document.createElement("tr");
        row.append(
          el("th", "", item.category),
          el("td", "", item.description),
          el("td", "", window.RespiraCharts?.formatSpanish ? window.RespiraCharts.formatSpanish(item.amount, "EUR") : `${item.amount} €`)
        );
        row.querySelector("th").scope = "row";
        tbody.append(row);
      });
    }

    if (byId("budget-total")) {
      byId("budget-total").textContent = window.RespiraCharts?.formatSpanish
        ? window.RespiraCharts.formatSpanish(data?.budget?.total || 0, "EUR")
        : `${data?.budget?.total || 0} €`;
    }
  }

  function renderReferences(data) {
    const list = byId("references-list");
    if (!list) return;
    clear(list);
    (data?.references || []).forEach((reference) => {
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

  function renderDashboard(data) {
    [
      renderHome,
      renderContext,
      renderProblem,
      renderInequality,
      renderJustification,
      renderTheory,
      renderObjectives,
      renderParticipants,
      renderMethodology,
      renderActivities,
      renderImpact,
      renderBudget,
      renderCharts,
      renderReferences
    ].forEach((renderSection) => {
      try {
        renderSection(data);
      } catch (error) {
        console.error(`Error en ${renderSection.name}`, error);
      }
    });

    window.RespiraInteractions?.initAll(document);
    window.RespiraAccessibility?.announce?.("Dashboard cargado.");
  }

  async function loadData() {
    const candidates = [
      DATA_URL,
      `${window.location.pathname.replace(/\/[^/]*$/, "/")}assets/data/data.json`,
      "https://raw.githubusercontent.com/carlosarandabcn-80/DESARROLLO-HUMANO/main/assets/data/data.json"
    ];

    let lastError;
    for (const url of candidates) {
      try {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) throw new Error(`No se pudo cargar ${url}`);
        return response.json();
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error("No se pudo cargar data.json");
  }

  async function init() {
    try {
      const data = await loadData();
      renderDashboard(data);
    } catch (error) {
      console.error(error);
      const main = byId("main-content");
      if (main && !main.querySelector(".load-error")) {
        const message = el("section", "section load-error");
        message.append(
          el("h1", "", "No se pudo cargar el dashboard"),
          el("p", "", "No se ha podido leer el archivo de datos. Recarga la página o revisa la publicación en GitHub Pages.")
        );
        main.prepend(message);
      }
      window.RespiraAccessibility?.announce?.("Error al cargar el dashboard.");
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
