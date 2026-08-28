## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Cursor Cloud specific instructions

This is a static Astro marketing site (a Karachi legal-services firm). There is no backend, database, or external service to run — the dev server is the only service, and no environment variables or secrets are required.

- Package manager is npm (`package-lock.json`); Node `>=22.12.0`. The `npm ci` output includes a harmless `EBADENGINE` warning for the transitive `undici` package — it does not affect builds or the dev server.
- Dev server: use `astro dev --background` (see Development above); it serves at `http://localhost:4321`.
- Build: `npm run build` (`astro build`) writes to `dist/` and also validates Astro/TS templates, so use it as the compile/verification step.
- No lint or automated test suite is configured. `astro check` is NOT set up: running it prompts interactively to install `@astrojs/check` + `typescript` (not in `package.json`), so avoid it unless you intentionally add those dev deps.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
