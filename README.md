# GoT Corpus v2

**Lagarrue's GoT Cantonese Online Corpus** — a static site presenting a digitized
late-19th-century Cantonese corpus from the Gulf of Tonkin region, in which Cantonese is
transcribed using the Vietnamese alphabet.

Live at <https://got.jyutdict.org>.

## Stack

- [Astro](https://astro.build/) v7, static output — one HTML file per route
- Self-hosted `woff2` fonts: Fraunces, Literata, IBM Plex Mono
- `sharp` image optimisation via `astro:assets`
- No client framework on shipped pages; the few enhancement scripts are inlined

## Layout

| Path                | Contents                                                        |
| ------------------- | --------------------------------------------------------------- |
| `src/data/`         | Corpus JSON, one file per dataset, plus `llm-translations.json` |
| `src/lib/corpus.ts` | Column definitions and cell accessors                           |
| `src/components/`   | `Layout`, `CorpusTable`, `DataPage`, `AboutPage`                |
| `src/i18n/`         | `en` and `yue` message catalogues                               |
| `src/pages/`        | English routes; `src/pages/yue/` mirrors them                   |
| `docs/design/`      | Design and review screenshots                                   |

## Data

Five datasets, loaded at build time:

| Dataset                    | Entries |
| -------------------------- | ------- |
| `vocabulary.json`          | 2,490   |
| `sentences.json`           | 194     |
| `idioms.json`              | 45      |
| `phoneme_description.json` | 77      |
| `introduction.json`        | 34      |

Columns carry a provenance marker: Google Translate, DeepL, DeepSeek, or human-corrected.
Bibliographic columns (`Index`, `PDF Page`, `Original Page`) and the machine-translation
columns are collapsed by default and can be enabled from the column picker.

## Translations

`src/data/llm-translations.json` holds French → English and French → Cantonese glosses for
the four datasets whose French text is the source: `introduction`,
`phoneme_description`, `sentences` and `idioms`. 700 entries.

The vocabulary table has no machine-translation column, because its "Corresponding
Characters" column already gives the answer for every entry.

`meta.reviewed` is `false`: these translations have **not** been checked by a human.

## Commands

```bash
npm install
npm run dev # dev server
npm run build # static output in dist/
npm run preview # serve the built output
```

Quality gates, also run by CI:

```bash
npm run format:check
npm run lint
npm run check # astro check (types)
npm run verify # all of the above plus build
```

Requires Node >= 22.12.

## Deployment

Netlify, configured by `netlify.toml`: build `npm run build`, publish `dist/`.

## Known issues

See [`docs/known-issues.md`](https://github.com/JyutdictEB/GoTCorpus/blob/main/docs/known-issues.md)
in the `GoTCorpus` repository for the issue register (SEO / DATA / UI / ENG).
