(function () {
  function setActiveLink(id) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function closeDrawer() {
    const drawer = document.getElementById("sidebarDrawer");
    const toggle = document.querySelector(".menu-toggle");
    if (!drawer || !toggle) return;
    drawer.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  function initMobileDrawer() {
    const drawer = document.getElementById("sidebarDrawer");
    const toggle = document.querySelector(".menu-toggle");
    if (!drawer || !toggle) return;

    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      drawer.hidden = expanded;
      toggle.setAttribute("aria-expanded", String(!expanded));
      document.body.classList.toggle("nav-open", !expanded);
    });

    drawer.addEventListener("click", (event) => {
      if (event.target.matches("a")) {
        closeDrawer();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    });
  }

  function initActiveSections() {
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveLink(visible.target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.12, 0.2, 0.4, 0.65]
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initSmoothFocus() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        setTimeout(() => {
          if (!target.hasAttribute("tabindex")) {
            target.setAttribute("tabindex", "-1");
          }
          target.focus({ preventScroll: true });
        }, 420);
      });
    });
  }

  function initNavigation() {
    initMobileDrawer();
    initActiveSections();
    initSmoothFocus();
  }

  window.RespiraNavigation = {
    init: initNavigation,
    closeDrawer,
    setActiveLink
  };

  document.addEventListener("DOMContentLoaded", initNavigation);
})();
