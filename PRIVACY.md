# Privacy Policy: Free Allow Copy

_Last updated: November 21, 2026_

Free Allow Copy is made by **jalavya**. The short version: it does not collect, transmit, share or sell any personal data. Everything it does happens inside your browser.

## What the extension stores

Only your settings, in the browser's local extension storage (`chrome.storage.local`):

- whether "Unlock every site" is on, and
- the site names (for example `example.com`) you switched on or off.

This data stays on your device and is removed when you uninstall the extension.

## What the extension reads

- **Pages you visit.** A content script runs on pages so it can change how they handle selecting, copying, cutting, pasting, right-clicking and dragging. It does not read, record or send page content, form data or browsing history.
- **The current site's name.** The popup reads the address of the active tab to show the site name and save your choice for that site.
- **Your clipboard.** Only when you press the paste shortcut (Alt+Shift+V by default). The text is inserted into the field you have focused. It is not stored, logged or sent anywhere.

## What the extension never does

- No analytics, tracking or advertising.
- No accounts or sign-in.
- No remote code and no network requests of any kind.
- No selling or sharing of data with third parties.

## Permissions

| Permission | Purpose |
| --- | --- |
| `storage` | Save your per-site and all-sites settings. |
| `activeTab` | Show the current site's name in the popup. |
| `clipboardRead` | Read the clipboard when you press the paste shortcut. |
| `offscreen` | Create the hidden helper page used to read the clipboard. |
| Content scripts on all sites | Let the extension work on any site you choose to unlock. |

## Changes to this policy

If this policy changes, the new version will be published in this repository with an updated date.

## Contact

Open an issue in this repository: [Issues](../../issues).
