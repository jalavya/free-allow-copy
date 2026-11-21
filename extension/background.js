// Service worker: handles the paste shortcut and the green ON badge.
// Chrome delivers the shortcut itself, so it doesn't depend on the page's paste event.
const GREEN = "#1a9c4b";

async function readClipboard() {
  try {
    await chrome.offscreen.createDocument({
      url: "offscreen.html",
      reasons: ["CLIPBOARD"],
      justification: "Read clipboard text for the paste shortcut",
    });
  } catch (e) {
    if (!/single offscreen/i.test(String(e))) return null;
  }
  try {
    const res = await chrome.runtime.sendMessage({ target: "offscreen", type: "read-clipboard" });
    return res && typeof res.text === "string" ? res.text : null;
  } catch (_) {
    return null;
  } finally {
    chrome.offscreen.closeDocument().catch(() => {});
  }
}

let busy = false;
chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "paste-text" || busy) return;
  busy = true;
  try {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (!tab || tab.id == null) return;
    const text = await readClipboard();
    await chrome.tabs.sendMessage(tab.id, { type: "paste", text });
  } catch (_) {
    // no content script on this page (chrome:// pages, web store): nothing to do
  } finally {
    busy = false;
  }
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (!msg || msg.type !== "state" || !sender.tab || sender.tab.id == null) return;
  const tabId = sender.tab.id;
  chrome.action.setBadgeText({ tabId, text: msg.on ? "ON" : "" });
  chrome.action.setBadgeBackgroundColor({ tabId, color: GREEN });
});
