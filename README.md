# Midwest Civic Tools

**5 free civic tools for Indiana & Midwest residents.**

Built with Next.js 15 and deployed on Vercel. All data is hardcoded or computed client-side — no database and no external APIs.

---

## Tools

| Tool | URL | Description |
|------|-----|-------------|
| Benefits Cliff Visualizer | `/tools/benefits-cliff` | Indiana SNAP & childcare subsidy cliffs by income/household size |
| SNAP Eligibility Checker | `/tools/snap-checker` | 150+ items checked against Indiana's 2026 Smart SNAP rules |
| Choice Scholarship Calculator | `/tools/scholarship-calc` | Estimate Indiana voucher award for all 92 counties |
| Minimum Wage Timeline | `/tools/min-wage` | Indiana, Michigan, Illinois, Ohio wage schedules 2023–2031 |
| Data Rights Letter Generator | `/tools/data-rights` | ICDPA (IC 24-15) letter templates for 5 data rights |

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Install Playwright browser runtime (one time)
npm run test:e2e:install

# Run end-to-end tests
npm run test:e2e
```

---

## End-to-End Testing

Playwright tests cover:
- Core page navigation and route health
- Tool-level key user actions
- Security headers on responses

Tests live in `tests/e2e/`.

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your source repository to Vercel for automatic deployments on push.

Set the `SITE_URL` environment variable in your Vercel project settings:
```
SITE_URL=https://yourdomain.com
```

For Sentry (free tier compatible), set these environment variables in Vercel:
```
NEXT_PUBLIC_SENTRY_DSN=...
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.1
NEXT_PUBLIC_SENTRY_REPLAY_SESSION_SAMPLE_RATE=0.0
NEXT_PUBLIC_SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE=0.1
SENTRY_ENVIRONMENT=production
SENTRY_RELEASE=
```

Optional (only if uploading source maps to Sentry):
```
SENTRY_AUTH_TOKEN=...
SENTRY_ORG=...
SENTRY_PROJECT=...
```

---

## Monitoring

The app is wired for Sentry on client, server, and edge runtimes using:
- `instrumentation.ts`
- `instrumentation-client.ts`
- `sentry.server.config.js`
- `sentry.edge.config.js`
- `app/global-error.tsx`

If `NEXT_PUBLIC_SENTRY_DSN` is unset, Sentry remains disabled.

---

## Security Hardening

Configured protections include:
- Strict security headers (`HSTS`, `CSP`, `X-Frame-Options`, `Permissions-Policy`, `COOP`, `CORP`, etc.)
- `X-Powered-By` disabled
- No server-side database/API attack surface in this app architecture
- E2E assertions that validate key headers remain present

No web app is truly "attack-proof", but this setup is hardened for a static Next.js/Vercel deployment.

---

## How to Update Data

All hardcoded data lives in the `/data` folder:

| File | What it controls |
|------|-----------------|
| `data/benefits-cliff.ts` | FPL monthly amounts, SNAP max benefits, childcare subsidy value |
| `data/snap-items.ts` | 150+ SNAP items with eligibility status and notes |
| `data/scholarship.ts` | All 92 Indiana counties and school corporations with per-pupil funding |
| `data/min-wage.ts` | Indiana, Michigan, Illinois, Ohio wage schedules through 2031 |
| `data/data-rights.ts` | ICDPA rights descriptions and letter templates |

When federal or state data changes (e.g., new FPL figures, updated SNAP benefit amounts):
1. Edit the relevant TypeScript constants in `/data/*.ts`
2. Update any hardcoded year references (search for "2026" or "2025")
3. Run `npm run build` to verify no TypeScript errors
4. Deploy

---

## Project Structure

```
/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Navbar, Footer, Analytics)
│   ├── page.tsx                  # Home page
│   └── tools/
│       ├── benefits-cliff/       # Benefits Cliff Visualizer
│       ├── snap-checker/         # SNAP Eligibility Checker
│       ├── scholarship-calc/     # Choice Scholarship Calculator
│       ├── min-wage/             # Minimum Wage Timeline
│       └── data-rights/          # Data Rights Letter Generator
├── components/                   # Shared React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Badge.tsx
│   ├── ToolCard.tsx
│   ├── Accordion.tsx
│   ├── BenefitsCliffChart.tsx    # Chart.js chart (loaded dynamically)
│   └── MinWageChart.tsx          # Chart.js chart (loaded dynamically)
├── data/                         # All hardcoded civic data
│   ├── benefits-cliff.ts
│   ├── snap-items.ts
│   ├── scholarship.ts
│   ├── min-wage.ts
│   └── data-rights.ts
├── types/                        # TypeScript interfaces
│   └── index.ts
└── public/
    └── og-image.svg              # Open Graph image
```

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b fix/snap-item-correction`
3. Make your changes
4. Run `npm run build` to check for errors
5. Submit a pull request with a clear description

Data corrections are especially welcome. Please cite your source (USDA, Indiana FSSA, etc.) when updating benefit amounts or eligibility rules.

---

## Data Sources

- **SNAP benefits & FPL**: USDA FNS SNAP allotment tables
- **Indiana SNAP waiver**: Indiana FSSA / Indiana Family and Social Services Administration
- **Choice Scholarships**: Indiana Department of Education
- **Michigan minimum wage**: Michigan LEO (Labor and Economic Opportunity)
- **Illinois minimum wage**: Illinois DOL
- **Ohio minimum wage**: Ohio BWC / SERB
- **ICDPA**: Indiana Code IC 24-15

---

## License

MIT License. Free to use, modify, and distribute.
