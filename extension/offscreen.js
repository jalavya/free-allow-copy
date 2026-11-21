// Hidden helper page: the only place a service worker can read the clipboard from.
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (!msg || msg.target !== "offscreen" || msg.type !== "read-clipboard") return;
  const t = document.getElementById("t");
  t.value = "";
  t.focus();
  let ok = false;
  try { ok = document.execCommand("paste"); } catch (_) {}
  sendResponse({ text: ok ? t.value : null });
});
