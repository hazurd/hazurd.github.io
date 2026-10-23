# hazurd.github.io

Personal site, published via GitHub Pages at
[https://hazurd.github.io](https://hazurd.github.io).

Plain HTML/CSS. No build step, no frameworks, no dependencies.

## Layout

The home page is a consulting landing page (Kubernetes & GitOps services),
`/work/` lists service packages and pricing, `/about/` is a bio, and
`/notes/` is a stub for future notes.

```text
/               index.html      consulting landing page
/about/         about/index.html
/work/          work/index.html services & pricing
/notes/         notes/index.html
/404            404.html        served by GitHub Pages for unknown paths
/css/main.css   shared stylesheet
```

Paths are absolute (`/about/`, `/css/main.css`), so pages work from any URL.

Adding a page: create `<dir>/index.html`, link it in the nav on every page
(the header is duplicated in `index.html`, `about/`, `notes/`, `404.html`), and
add a nav link.

## Adding a note

A note is a directory with an `index.html`: `notes/<date>-<slug>/index.html`.
Then add a link to it in `notes/index.html`. The notes list currently has no
styles of its own; it uses the browser's default list styling.

## Publishing

GitHub Pages serves the repository root. For a username repository
(`<user>.github.io`) it publishes at `https://<user>.github.io/`, with no
subpath. `.nojekyll` disables Jekyll processing.

## Local preview

```bash
node tools/serve.js      # http://127.0.0.1:8000
```

`tools/serve.js` is a small static file server and is gitignored.
