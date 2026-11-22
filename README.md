# breakglass-site

Marketing site for Breakglass Labs, LLC. Built with [Astro](https://astro.build) as a fully static site and hosted on Cloudflare Pages.

```
npm install
npm run dev       # http://localhost:4321
npm run build     # writes dist/
npm run preview   # serves dist/ locally
```

Needs Node 22 or newer (`.nvmrc` pins 22).

## What's in here

| Path | What it is |
|---|---|
| `site.config.mjs` | Name, domain, emails, booking link, LinkedIn, headshot. **Edit this first.** |
| `src/data/services.ts` | The five services: names, lengths, what's tested, deliverables |
| `src/content/research/` | Research posts as Markdown. One file per post |
| `src/pages/` | One file per page. `services/[slug].astro` and `research/[...slug].astro` generate their pages from the data above |
| `src/components/` | Header, footer, CTA band, logo mark, check icon |
| `src/styles/global.css` | Brand tokens (Brand B dark) and every class the site uses |
| `public/_headers` | Security headers and caching for Cloudflare Pages |
| `public/` | Fonts, favicon, Apple touch icon, default social image |

Generated at build time: `sitemap-index.xml`, `rss.xml`, `robots.txt`, `/.well-known/security.txt`.

## After you register the domain

1. **`site.config.mjs`**: set
   - `url` to `https://<your domain>` (no trailing slash)
   - `email` and `securityEmail`
   - `bookingUrl` (Cal.com, Calendly or similar). While it's empty, every "Book a scoping call" button goes to `/contact/`
   - `linkedin` (company page URL). The footer link appears once it's set
   - `headshot`, e.g. `/parker.jpg` after you drop a portrait photo (4:5, about 560×700 or larger) in `public/`. Until then the About page shows the logo mark
2. **`public/_headers`**: nothing to change unless you add third-party scripts (see analytics below).
3. Rebuild and deploy.

## Deploying to Cloudflare Pages

1. Push this folder to a GitHub repo (private is fine).
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick the repo.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
4. Deploy. You get a `*.pages.dev` URL to check before the domain is live.
5. **Custom domain**: in the Pages project → **Custom domains** → add the apex domain and `www`. Easiest if the domain's DNS is on Cloudflare (register it there, or change nameservers at your registrar). Set a redirect from `www` to the apex (or the other way round) so there's one canonical host matching `url` in the config.

Every push to `main` redeploys. Other branches get preview URLs.

## Email for hello@ and security@

The site doesn't send mail. It only shows addresses. Two cheap options:

- **Cloudflare Email Routing** (free): forwards `hello@` and `security@` to your personal inbox. You can receive but not send as those addresses without extra setup.
- **Google Workspace or Fastmail** (paid): real mailboxes you can send from. Worth it once you're emailing clients.

Either way, add SPF, DKIM and DMARC records so your proposals don't land in spam. Check `security@` is monitored: the security policy and `security.txt` both point there.

## Adding a research post

Create `src/content/research/<slug>.md`:

```md
---
title: "Post title"
description: "One or two sentences for the list page, RSS and social previews."
date: 2027-01-14
tags: ["MCP", "Prompt injection"]
draft: false
---

Body in Markdown.
```

The URL is `/research/<slug>/`. `draft: true` keeps it out of the build. The home page shows the newest post.

Code blocks render without syntax colours on purpose: the highlighter writes inline styles, which the CSP blocks. Diagrams can be inline SVG, but use colour attributes with hex values (`stroke="#7FD3FF"`), not `style="..."`.

## Content Security Policy

`public/_headers` allows only the site's own scripts, styles, fonts and images (`'self'`, plus `data:` images). That means:

- No inline `style="..."` attributes or `<style>` blocks in pages. Add classes to `global.css` instead. The build is set to always emit CSS as files (`inlineStylesheets: 'never'`).
- No third-party scripts or embeds until you add their hosts to the policy.

**If you turn on Cloudflare Web Analytics**, add `https://static.cloudflareinsights.com` to `script-src` and `https://cloudflareinsights.com` to `connect-src`. If you embed a booking widget instead of linking out, add that provider's hosts too (and `frame-src`).

After deploying, check the headers at [securityheaders.com](https://securityheaders.com) and open the browser console on a few pages to confirm nothing is blocked.

## Housekeeping

- **security.txt expires** 330 days after each build (RFC 9116 requires an expiry under a year). Any deploy refreshes it, but if the site goes quiet, redeploy at least once a year.
- **Privacy notice** (`src/pages/privacy.astro`) is a plain-language draft dated December 1, 2026. Have your lawyer review it, and update it if you add analytics, forms or a newsletter.
- **Security policy** (`src/pages/security.astro`) follows the Coordinated Vulnerability Disclosure doc (CVD-1.0). Keep the two in step.
- **Sample report**: the home page and Approach page say a sample report is coming in early 2027. When the Glasshouse report is ready, put the PDF in `public/` and link it from the Deliverables sections.
- **Pilot season** text comes from `pilotSeason` in `site.config.mjs`.

## Fonts

JetBrains Mono and Space Grotesk, self-hosted as Latin-subset variable WOFF2 files in `public/fonts/`. Both are licensed under the [SIL Open Font License 1.1](https://openfontlicense.org), which allows bundling and serving them with the site.
