# personal site

Static site served by GitHub Pages. No build step, no frameworks, no dependencies.

## Structure

```
index.html          home
about/index.html    /about/
notes/index.html    /notes/
404.html            GitHub Pages uses this automatically
css/main.css        one stylesheet, no CDNs
robots.txt          allow all crawlers
.nojekyll           disables Jekyll processing
tools/serve.js      optional local preview server
```

## Preview locally

```bash
node tools/serve.js        # http://127.0.0.1:8000
```

It binds to `127.0.0.1` only, so nothing is exposed while you are editing.

## Publishing

Push to `main`. GitHub Pages serves the branch root. Deployments show up in the
repo's **Insights → Pages** tab.

## Adding a note

Create `notes/<date>-<slug>/index.html` and add a link in `notes/index.html`.
Push — it is live on the next deploy.

## Notes on safety

- No analytics, cookies, or external scripts.
- Nothing from this machine is exposed to the internet; GitHub serves the files.
- Keep secrets, `.env`, and private keys out of the repo (see `.gitignore`).
