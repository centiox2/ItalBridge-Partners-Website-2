# ItalBridge Partners Website

Bilingual (English / Italian) marketing site built with Next.js 16 (App Router) and Tailwind CSS 4.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
src/
  app/[lang]/        # every page lives under the locale segment (/en, /it):
                     #   home, about, services, industries, manufacturers, buyers,
                     #   market-insight, contact, privacy-policy, terms-of-use,
                     #   cookie-policy, data-request
  app/global-not-found.tsx  # bilingual 404 for any unmatched URL (server-rendered)
  app/icon.png, apple-icon.png  # browser-tab and home-screen icons
  app/robots.ts, sitemap.ts     # robots.txt and sitemap.xml
  components/        # Header (top bar, skip link), Footer, LanguageSwitcher, MobileMenu,
                     #   ThemeToggle, shared ui classes, and the site-wide behaviours:
                     #   Motion (scroll-in animations, page fade), ScrollReset
                     #   (new pages open at the top), CountUp (counting figures)
  components/home/   # AudienceHero: the manufacturer / buyer toggle on the home page
  components/page/   # building blocks for the pages (PageHeader, SplitHero, CtaBand,
                     #   EnquiryForm, FormSection, StageTabs, IndustryPicker,
                     #   RequirementChecklist, LegalPage, ...)
  lib/metadata.ts    # per-page title, description, canonical, hreflang and link previews
  dictionaries/      # en.json / it.json: shared and home page copy
                     # en/<page>.json / it/<page>.json: copy for each other page
  site.ts            # site URL, contact details, social links and routes
  theme.ts           # dark mode: storage key and the <head> script that applies it
  i18n.ts            # supported locales and default locale
  proxy.ts           # redirects "/" (and un-prefixed paths) to the visitor's language
```

### Adding or editing copy

All text is in `src/dictionaries/en.json` and `src/dictionaries/it.json`. Keep the
two files in the same shape — the English file defines the `Dictionary` type, so a
missing Italian key is a type error.

### Adding a page

1. Add the route to `routes` in `src/site.ts`.
2. Add `src/dictionaries/en/<page>.json` and `it/<page>.json` (same shape, with a
   `meta` title and description) and register them in `src/dictionaries/index.ts`.
3. Create `src/app/[lang]/<page>/page.tsx`: load copy with `getPage(lang, "<page>")`
   and export `generateMetadata` via `pageMetadata(params, "<page>")`.
4. Link it from `Header.tsx` and/or `Footer.tsx` with `href(lang, "<page>")`.

### Forms

The forms validate inline but do not post to a server yet: submitting opens the
visitor's email app with the message filled in (`EnquiryForm.tsx`). Manufacturer
enquiries go to info@, buyer requirements to sales@. Swap that for a server action
once a mail service is chosen.

### Branding

The site follows the "Corporate Atlas" design, in light and dark mode. Colours
are tokens in `src/app/globals.css`, each defined once per theme:

- `ink` is text, rules and chart marks; it turns light in dark mode. Text greys
  are `body`, `sub`, `faint`.
- `night` is dark surfaces (bands, dark cards, top bar); it stays dark.
- `page`, `paper`, `card`, `chip`, `line` are light surfaces and lines; `btn`
  is the primary button. `mist`, `steel`, `cream`, `panel` are fixed colours
  for use on `night`.

Use the tokens (e.g. `bg-paper`, `text-body`) rather than hex values, so both
themes stay right. The site opens in light mode; the header button switches
to dark and remembers the choice (`src/theme.ts`). The font is Geist
(`font-sans`). Button colours and sizes are combined from `src/components/ui.ts`,
e.g. `` `${buttonInk} ${sizeMd}` ``.

The market figures (home, Manufacturers, Market insight) are copy in the
dictionaries; the chart bar widths are in `src/app/[lang]/market-insight/page.tsx`.

### Images

Photos live in `src/assets/images/` and are imported through `src/images.ts`, so
`next/image` gets their dimensions and a blur placeholder at build time and serves
them with hashed, long-cached URLs. Next.js resizes each photo to the width the
page needs (set `sizes` on every `<Image>` that is not a fixed size) and serves
AVIF or WebP. To add a photo, drop it in `src/assets/images/` and add it to
`src/images.ts`. Load only the first screen's main photo eagerly (`preload`);
leave the rest lazy.

### Motion

Animations live in `src/app/globals.css` and switch off for visitors who prefer
reduced motion. To animate an element in on scroll, give it `reveal` (rise in),
`draw` (top rule draws across), `reveal-img` (photo unveils) or `grow-bar`
(chart bar), and stagger siblings with `style={stagger(i)}`. Motion.tsx marks
elements with a `data-in` attribute, never a class, so React's hydration is not
disturbed.

### Deploying to Cloudflare

The site runs on Cloudflare Workers through the OpenNext adapter
(`open-next.config.ts`, `wrangler.jsonc`). Every page is prerendered, so the
Next.js cache is read from the deployed static assets and nothing else (R2,
KV) needs setting up. Photos are resized through the Workers `IMAGES` binding.

```bash
npm run preview   # build for Workers and run it locally (http://localhost:8787)
npm run deploy    # build and deploy; needs a Cloudflare login (npx wrangler login)
                  # or CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID in the environment
```

To deploy on every push instead, connect the repository in the Cloudflare
dashboard (Workers & Pages → Create → Import a repository) with build command
`npx opennextjs-cloudflare build` and deploy command
`npx opennextjs-cloudflare deploy`.

### Checks before release

`npm run lint` and `npm run build` must pass. The site scores 96-99 for
performance and 100 for accessibility, best practices and SEO in Lighthouse
(mobile).
