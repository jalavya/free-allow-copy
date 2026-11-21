// Isolated-world script: reads your settings and flips data-fac on <html> (main.js and
// style.css both key off it), reports the ON badge, and types text in for the paste shortcut.
(() => {
  const root = document.documentElement;
  if (!root) return;

  // Inside iframes, follow the top-level page's host so one switch covers the whole page.
  const host = (() => {
    try {
      const o = location.ancestorOrigins;
      if (o && o.length) return new URL(o[o.length - 1]).hostname;
    } catch (_) {}
    return location.hostname;
  })();

  const apply = ({ all, sites }) => {
    const enabled = !!((sites && sites[host]) ?? all); // a per-site choice beats "all sites"
    root.toggleAttribute("data-fac", enabled);
    if (window === window.top) {
      try { chrome.runtime.sendMessage({ type: "state", on: enabled }).catch(() => {}); } catch (_) {}
    }
  };
  const load = () =>
    chrome.storage.local.get({ all: false, sites: {} }).then(apply).catch(() => {});
  load();
  chrome.storage.onChanged.addListener(load);

  // ---- Paste shortcut (Alt+Shift+V): the background worker reads the clipboard
  // and sends the text here; only the frame that holds the focused field acts on it.
  const NON_TEXT = new Set(["checkbox", "radio", "button", "submit", "reset", "file", "image", "range", "color", "hidden"]);
  const focusedField = () => {
    let el = document.activeElement;
    while (el && el.shadowRoot && el.shadowRoot.activeElement) el = el.shadowRoot.activeElement;
    if (!el) return null;
    if (el instanceof HTMLTextAreaElement) return el;
    if (el instanceof HTMLInputElement) return NON_TEXT.has(el.type) ? null : el;
    return el.isContentEditable ? el : null;
  };

  const insert = (el, text) => {
    if (document.execCommand && document.execCommand("insertText", false, text)) return;
    if (el.isContentEditable) {
      const sel = getSelection();
      if (!sel || !sel.rangeCount) return;
      const r = sel.getRangeAt(0);
      r.deleteContents();
      const node = document.createTextNode(text);
      r.insertNode(node);
      r.setStartAfter(node);
      r.collapse(true);
      sel.removeAllRanges();
      sel.addRange(r);
    } else {
      try {
        el.setRangeText(text, el.selectionStart, el.selectionEnd, "end");
      } catch (_) {
        el.value += text; // number/email inputs have no caret
      }
    }
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };

  chrome.runtime.onMessage.addListener((msg) => {
    if (!msg || msg.type !== "paste") return;
    const el = focusedField();
    if (!el) return;
    if (typeof msg.text === "string") {
      insert(el, msg.text);
    } else {
      // Background couldn't read the clipboard; ask the page (Chrome may prompt once per site).
      navigator.clipboard.readText().then((t) => insert(el, t)).catch(() => {});
    }
  });
})();
