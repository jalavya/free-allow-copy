<p align="center">
  <img src="extension/icons/128.png" width="112" alt="JKING logo">
</p>

<h1 align="center">Free Allow Copy</h1>

<p align="center">
  Bring back text selection, right-click, copy, cut and paste on websites that block them.<br>
  Free &middot; No account &middot; No tracking &middot; Made by <b>jalavya</b>
</p>

<p align="center">
  <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img alt="Manifest V3" src="https://img.shields.io/badge/Chrome-Manifest%20V3-4285F4.svg">
  <img alt="Chrome 111+" src="https://img.shields.io/badge/Chrome-111%2B-brightgreen.svg">
</p>

<!-- Add a screenshot of the popup here once you have one:
<p align="center"><img src="docs/popup.png" width="320" alt="Free Allow Copy popup"></p>
-->

## What it does

Some websites switch off selecting, copying, right-clicking and pasting. Free Allow Copy switches them back on, only on the sites you choose.

- **Select text** where the page disables it.
- **Right-click** where the context menu is blocked.
- **Copy and cut** where the page cancels them.
- **Paste** where Ctrl+V is blocked. Press **Alt+Shift+V** (**Control+Shift+V** on Mac) to paste your clipboard text into the focused field.
- **Per-site control.** Switch it on for one site, or for every site. A choice for a single site wins over "every site".
- **Green ON badge** on the toolbar icon when it is active on the current site.
- **Private.** No accounts, no analytics, no network requests. See [PRIVACY.md](PRIVACY.md).

## Install

### From the Chrome Web Store

Coming soon.

### From source (works today)

1. Download the latest `free-allow-copy-vX.Y.Z-extension.zip` from [Releases](../../releases), or use **Code > Download ZIP** on this page.
2. Extract it. If you downloaded the whole repository, the extension is the `extension` folder inside.
3. Open `chrome://extensions` and turn on **Developer mode** (top right).
4. Click **Load unpacked** and pick the folder that contains `manifest.json`.
5. Click the puzzle-piece icon in the toolbar and pin **Free Allow Copy**.

Needs Chrome 111 or newer. Edge and Brave work the same way from `edge://extensions` and `brave://extensions`.

## Usage

1. Open a page that blocks copying and click the toolbar icon.
2. Switch on **Unlock this site** (or **Unlock every site**). It applies instantly, no reload needed. Tabs that were already open before you installed the extension need one reload.
3. To paste into a field that blocks Ctrl+V, click into the field and press **Alt+Shift+V**. Change the key any time at `chrome://extensions/shortcuts`, or from the **Change** button in the popup.

## How it works

| File | Role |
| --- | --- |
| `main.js` | Runs in the page's own JavaScript world at `document_start`, so it sees events before any site script. When a site is unlocked it stops copy, cut, paste, select, right-click and drag events from reaching the site's blockers. The browser's normal behaviour then goes ahead. |
| `style.css` | Overrides `user-select: none` while a site is unlocked. |
| `bridge.js` | Reads your settings, marks the page as unlocked, reports the ON badge, and inserts text for the paste shortcut. |
| `background.js` | Handles the paste shortcut and the badge. |
| `offscreen.html`, `offscreen.js` | Hidden helper page used to read the clipboard (a service worker cannot do it directly). |
| `popup.html`, `popup.js` | The toolbar popup. |

## Known limitations

- Text drawn as images or on a canvas (some document viewers, scanned pages) cannot be selected.
- Sites that clear your selection with their own scripts, or cover text with invisible layers, may still resist.
- **Unlock every site** can interfere with web apps that handle copy, paste and shortcuts themselves, such as online editors. Per-site is safer.
- Browser pages (`chrome://...`) and the Chrome Web Store do not allow extensions.

## Permissions

| Permission | Why it is needed |
| --- | --- |
| `storage` | Remember which sites you unlocked. |
| `activeTab` | Let the popup read the current tab's address to show the site name. |
| `clipboardRead` | Read your clipboard only when you press the paste shortcut. |
| `offscreen` | Create the hidden helper page that reads the clipboard. |
| Content scripts on all sites | So it can work on whichever site you choose. It changes nothing on sites you have not unlocked. |

## Responsible use

This tool is for reading, quoting, translating and accessibility on content you are allowed to access. Please do not use it to cheat on exams or assessments, or to break a website's terms or copyright law. You are responsible for how you use it.

This is an independent project and is not affiliated with or endorsed by any other "allow copy" extension.

## Contributing

Bug reports and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

The code is released under the [MIT License](LICENSE). The JKING logo and the name jalavya are &copy; 2026 jalavya and are not covered by that license.

---

Made by **jalavya**
