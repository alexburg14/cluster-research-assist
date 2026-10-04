// Runs before first paint, so the page never flashes the wrong theme.
// Loaded as a file rather than inline so the Content-Security-Policy can
// refuse inline scripts altogether. It always sets data-theme to the theme
// in effect, so the stylesheets need no media query of their own; with no
// stored choice it follows the system, also when that changes.
(function () {
  const KEY = "cra-theme",
    LEGACY = "econverse-theme";
  const root = document.documentElement;
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  function stored() {
    try {
      let mode = localStorage.getItem(KEY);
      if (mode === null && (mode = localStorage.getItem(LEGACY)) !== null) {
        localStorage.setItem(KEY, mode);
        localStorage.removeItem(LEGACY);
      }
      return mode;
    } catch {
      return null; // private mode
    }
  }
  function apply() {
    const mode = stored();
    root.dataset.theme =
      mode === "light" || mode === "dark" ? mode : system.matches ? "dark" : "light";
  }
  apply();
  system.addEventListener("change", apply);

  // A phone's browser tints its toolbar to match the page's own header, also
  // when the page's theme differs from the system's. The colour is the brand's,
  // so it is read once the stylesheets are in, and again after every switch.
  const tint = document.createElement("meta");
  tint.name = "theme-color";
  document.head.appendChild(tint);
  function retint() {
    const panel = getComputedStyle(root).getPropertyValue("--panel").trim();
    if (panel) tint.content = panel;
  }
  window.addEventListener("load", retint);
  new MutationObserver(retint).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
})();
