const $ = (id) => document.getElementById(id);
const siteSw = $("site"), allSw = $("all"), hostEl = $("host"), hint = $("siteHint");

let host = "";
let state = { all: false, sites: {} };

function render() {
  allSw.checked = state.all;
  if (!host) return;
  siteSw.checked = state.sites[host] ?? state.all;
  hint.textContent = siteSw.checked
    ? "Selecting, right-click, copy and cut work here."
    : "Off. This site’s own rules apply.";
}

(async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const u = new URL(tab.url);
    if (u.protocol === "http:" || u.protocol === "https:") host = u.hostname;
  } catch (_) {}
  state = await chrome.storage.local.get({ all: false, sites: {} });
  if (host) {
    hostEl.textContent = host;
  } else {
    siteSw.disabled = true;
    hint.textContent = "Chrome doesn’t allow extensions on this page.";
  }
  render();
})();

siteSw.addEventListener("change", async () => {
  state.sites[host] = siteSw.checked;
  await chrome.storage.local.set({ sites: state.sites });
  render();
});

allSw.addEventListener("change", async () => {
  state.all = allSw.checked;
  await chrome.storage.local.set({ all: state.all });
  render();
});

// Paste shortcut: show whichever key Chrome actually assigned.
const pasteHint = $("pasteHint");
chrome.commands.getAll().then((cmds) => {
  const c = cmds.find((x) => x.name === "paste-text");
  if (c && c.shortcut) {
    const k = document.createElement("kbd");
    k.textContent = c.shortcut;
    pasteHint.textContent = "";
    pasteHint.append("Click into the field, then press ", k);
  } else {
    pasteHint.textContent = "No shortcut is set. Pick one with Change.";
  }
}).catch(() => {});
$("change").addEventListener("click", () => chrome.tabs.create({ url: "chrome://extensions/shortcuts" }));
