# GoT Corpus v2 (Astro)

**Lagarrue's GoT Cantonese Online Corpus** — static-site rebuild of
[GoTCorpus](https://github.com/JyutdictEB/GoTCorpus).

Presents a digitized late-19th-century Cantonese corpus (Gulf of Tonkin region, recorded
in the Vietnamese alphabet) as **build-time rendered HTML**, so the content is indexable
by search engines. The original Quasar SPA ships an empty \`<div id="q-app">\` shell and
requires JavaScript to show anything.

## Why a rewrite

|                        | original (Quasar SPA) | this repo                                |
| ---------------------- | --------------------- | ---------------------------------------- |
| HTML content           | empty shell           | full static HTML                         |
| JavaScript required    | yes                   | no (enhancement script inlined, ~1.4 KB) |
| \`/yue/\` locale route | 404                   | supported                                |
| \`sitemap-index.xml\`  | 404                   | generated                                |
| Locales                | \`en-US\`, \`zh-HK\`  | \`en\`, \`yue\` (written Cantonese)      |

## Stack

- [Astro](https://astro.build/) v7 — static output, one HTML file per route
- Vue integration present but unused by shipped pages (no framework JS on data pages)
- Self-hosted `woff2` fonts (Fraunces / Literata / IBM Plex Mono, latin + latin-ext + vietnamese subsets)
- `sharp` image optimisation via `astro:assets`

## Layout

- \`src/data/\` — corpus JSON (per dataset) plus `llm-translations.json`
- \`src/lib/corpus.ts\` — column definitions and cell accessors
- \`src/components/\` — `Layout`, `CorpusTable`, `DataPage`, `AboutPage`
- \`src/i18n/\` — `en` and `yue` message catalogues
- \`src/pages/\` — English routes; \`src/pages/yue/\` mirrors them
- \`docs/design/\` — design and review screenshots

## Translation overlay

\`src/data/llm-translations.json\` holds French → English and French → Cantonese glosses
for the four datasets whose **French text is the source** (\`introduction\`,
\`phoneme_description\`, \`sentences\`, \`idioms\`), 700 entries in total.

The vocabulary table is deliberately **not** translated: its "Corresponding Characters"
column already gives the answer, and measurement showed ~60% of machine glosses merely
repeated it.

\`meta.reviewed\` is currently \`false\` — **these translations have not been checked by a
human**.

## Deployment

Deployed as a **Workers static-assets site** — Cloudflare serves `dist/` straight from the
asset store and does not invoke a script for asset hits. The site remains build-time
rendered HTML; the Worker is only the delivery mechanism.

```bash
npm run build     # astro build -> dist/
npm run deploy    # wrangler deploy
```

`wrangler.jsonc` declares `assets.directory` with **no `main`** (static assets only) and binds
the custom domain `got.jyutjam.org`.

> `netlify.toml` was removed: the project is no longer deployed on Netlify.
>
> `cf` (the beta Cloudflare CLI) cannot currently build this project — its Astro
> autoconfig injects the `@astrojs/cloudflare` SSR adapter and then fails with
> `Build Output Specification: no root config found`. `wrangler` is the working path and
> is a dependency of `cf` anyway.

## Commands

\`\`\`bash
npm install
npm run dev # dev server
npm run build # static output in dist/
npm run preview # serve the built output
\`\`\`

Requires Node >= 22.12.

## Known issues

See \`GoTCorpus/docs/known-issues.md\` for the full register (SEO / DATA / UI / ENG items).
