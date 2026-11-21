// Runs inside the page's own JS world at document_start, so these listeners
// sit first in line and see every event before any site script does.
(() => {
  const FLAG = "__freeAllowCopy";
  if (window[FLAG]) return;
  Object.defineProperty(window, FLAG, { value: true });

  const root = document.documentElement;
  if (!root) return;
  const on = () => root.hasAttribute("data-fac"); // set by bridge.js
  const stop = (e) => e.stopImmediatePropagation();

  // Events that sites hook to block copying, pasting, selecting, right-click and dragging.
  const BLOCKED = ["copy", "cut", "paste", "selectstart", "contextmenu", "dragstart"];
  for (const type of BLOCKED) {
    window.addEventListener(type, (e) => { if (on()) stop(e); }, true);
  }

  // Some sites cancel paste/cut at the input level instead.
  window.addEventListener("beforeinput", (e) => {
    if (on() && (e.inputType === "insertFromPaste" || e.inputType === "deleteByCut")) stop(e);
  }, true);

  // Ctrl/Cmd + C, X, V, A, S, P, U and Ctrl/Shift + Insert. The physical key is checked
  // too, so this also works on non-Latin keyboard layouts.
  const KEYS = new Set(["c", "x", "v", "a", "s", "p", "u"]);
  const CODES = new Set(["KeyC", "KeyX", "KeyV", "KeyA", "KeyS", "KeyP", "KeyU"]);
  const isClipboardKey = (e) => {
    if (e.code === "Insert") return e.ctrlKey || e.shiftKey;
    if (!(e.ctrlKey || e.metaKey)) return false;
    return KEYS.has(String(e.key).toLowerCase()) || CODES.has(e.code);
  };
  // Alt+Shift+V is this extension's own paste shortcut; keep pages from eating it.
  const isPasteHotkey = (e) => e.altKey && e.shiftKey && e.code === "KeyV";
  for (const type of ["keydown", "keyup"]) {
    window.addEventListener(type, (e) => {
      if (isPasteHotkey(e) || (on() && isClipboardKey(e))) stop(e);
    }, true);
  }

  // Old-school "no right click" scripts use mousedown/mouseup; leave left clicks alone.
  for (const type of ["mousedown", "mouseup"]) {
    window.addEventListener(type, (e) => { if (on() && e.button === 2) stop(e); }, true);
  }
})();
