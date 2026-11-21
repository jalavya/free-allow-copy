# Contributing

Thanks for helping! This is a small extension with no build step: plain JavaScript, no bundler, no dependencies.

## Report a problem

Open an [issue](../../issues) and include:

- the site (the URL, if it is public),
- what is still blocked: selecting, copying, right-click or paste,
- whether the toolbar icon shows the green ON badge on that site,
- your Chrome version (`chrome://version`) and operating system.

## Run it locally

1. Fork and clone the repository.
2. Open `chrome://extensions`, turn on **Developer mode**, click **Load unpacked** and pick the `extension` folder.
3. After editing a file, click the reload icon on the extension's card, then reload the page you are testing.

## Pull requests

- Keep each pull request focused on one fix or feature.
- Do not add permissions unless they are essential, and explain why.
- No analytics, remote code or network requests.
- Add a line to [CHANGELOG.md](CHANGELOG.md).
- Test on a page that blocks the behaviour and on a normal page, to make sure unlocking does not break it.
