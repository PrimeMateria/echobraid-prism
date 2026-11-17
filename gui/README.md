# ΞchoBraid GUI

The GUI is a Vite + React application in this directory. Use the committed npm lockfile so local installs resolve the same dependency tree.

## Prerequisites

- Node.js 20 or newer
- npm (bundled with Node.js)

## Run locally

From the repository root:

```sh
cd gui
npm ci
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:3000`). Stop the server with `Ctrl+C`.

If you use features that call Gemini, provide a `GEMINI_API_KEY` in `gui/.env.local` before starting the dev server. Do not commit the file or treat a key used by a browser application as a secret; use a restricted development key.

## Check and build

From `gui/`:

```sh
npm run lint
npm run build
npm run preview
```

`lint` runs the TypeScript compiler without emitting files. `build` creates the Vite production bundle in `gui/dist/`; `preview` serves that bundle locally. `npm ci` installs from `package-lock.json` and should be used instead of `npm install` for reproducible setup.

The repository's `just vv` gate currently validates the Prism model and Rust workspace; it does not run these GUI npm commands. Run the GUI checks explicitly when changing the GUI.
