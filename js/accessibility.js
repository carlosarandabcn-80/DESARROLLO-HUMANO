(function () {
  const STORAGE_KEY = "respira-accessibility";
  const root = document.documentElement;
  const body = document.body;

  const defaultState = {
    accessibleMode: false,
    highContrast: false,
    reduceMotion: false,
    textScale: "normal"
  };

  function readState() {
    try {
      return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
    } catch (error) {
      return { ...defaultState };
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function announce(message) {
    const region = document.getElementById("status-region");
    if (region) {
      region.textContent = message;
    }
  }

  function updatePressed(id, value) {
    const button = document.getElementById(id);
    if (button) {
      button.setAttribute("aria-pressed", String(Boolean(value)));
    }
  }

  function applyTextScale(scale) {
    root.classList.remove("text-scale-small", "text-scale-large", "text-scale-xlarge");
    if (scale === "small") root.classList.add("text-scale-small");
    if (scale === "large") root.classList.add("text-scale-large");
    if (scale === "xlarge") root.classList.add("text-scale-xlarge");

    document.querySelectorAll(".text-controls button").forEach((button) => {
      button.classList.remove("active");
    });

    if (scale === "normal") {
      document.getElementById("textReset")?.classList.add("active");
    }
  }

  function applyState(state) {
    body.classList.toggle("accessible-mode", state.accessibleMode);
    body.classList.toggle("high-contrast", state.highContrast);
    body.classList.toggle("reduce-motion", state.reduceMotion);
    applyTextScale(state.textScale);

    updatePressed("accessibleMode", state.accessibleMode);
    updatePressed("contrastToggle", state.highContrast);
    updatePressed("motionToggle", state.reduceMotion);

    if (state.textScale === "small") document.getElementById("textDecrease")?.classList.add("active");
    if (state.textScale === "large" || state.textScale === "xlarge") {
      document.getElementById("textIncrease")?.classList.add("active");
    }
  }

  function nextScale(current, direction) {
    const order = ["small", "normal", "large", "xlarge"];
    const index = Math.max(0, order.indexOf(current));
    const next = Math.min(order.length - 1, Math.max(0, index + direction));
    return order[next];
  }

  function initAccessibility() {
    let state = readState();
    applyState(state);

    document.getElementById("accessibleMode")?.addEventListener("click", () => {
      state = {
        ...state,
        accessibleMode: !state.accessibleMode
      };

      if (state.accessibleMode) {
        state.highContrast = true;
        state.reduceMotion = true;
        if (state.textScale === "normal" || state.textScale === "small") {
          state.textScale = "large";
        }
      }

      applyState(state);
      saveState(state);
      announce(state.accessibleMode ? "Modo accesible activado." : "Modo accesible desactivado.");
      window.RespiraCharts?.refreshCharts?.();
    });

    document.getElementById("contrastToggle")?.addEventListener("click", () => {
      state = { ...state, highContrast: !state.highContrast };
      applyState(state);
      saveState(state);
      announce(state.highContrast ? "Alto contraste activado." : "Alto contraste desactivado.");
      window.RespiraCharts?.refreshCharts?.();
    });

    document.getElementById("motionToggle")?.addEventListener("click", () => {
      state = { ...state, reduceMotion: !state.reduceMotion };
      applyState(state);
      saveState(state);
      announce(state.reduceMotion ? "Animaciones desactivadas." : "Animaciones activadas.");
      window.RespiraCharts?.refreshCharts?.();
    });

    document.getElementById("textDecrease")?.addEventListener("click", () => {
      state = { ...state, textScale: nextScale(state.textScale, -1) };
      applyState(state);
      saveState(state);
      announce("Tamaño del texto actualizado.");
    });

    document.getElementById("textIncrease")?.addEventListener("click", () => {
      state = { ...state, textScale: nextScale(state.textScale, 1) };
      applyState(state);
      saveState(state);
      announce("Tamaño del texto actualizado.");
    });

    document.getElementById("textReset")?.addEventListener("click", () => {
      state = { ...state, textScale: "normal" };
      applyState(state);
      saveState(state);
      announce("Tamaño del texto restablecido.");
    });
  }

  window.RespiraAccessibility = {
    init: initAccessibility,
    announce,
    prefersReducedMotion: () => body.classList.contains("reduce-motion")
  };

  document.addEventListener("DOMContentLoaded", initAccessibility);
})();
