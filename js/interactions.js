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

  function initAll(scope = document) {
    initReveal();
    initAccordions(scope);
    initExpandableCards(scope);
    initTableToggles(scope);
  }

  window.RespiraInteractions = {
    initAll,
    initReveal,
    initAccordions,
    initExpandableCards,
    initTableToggles
  };

  document.addEventListener("DOMContentLoaded", () => initReveal());
})();
