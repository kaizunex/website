# Kaizuna Nexus - Marketing Landing Page

> **"Where Connections Become Opportunities"**
>
> A premium marketing + storytelling landing page for Kaizuna Nexus by Kaizuna Technologies.

---

## Project Structure

Single Vite + React app at the repo root. Waitlist and contact forms append to Google Sheets using values from `.env`.

```
kaizuna/
├── public/
├── src/
│   ├── lib/
│   │   └── api.ts               # writes to Google Sheets API
│   └── ...
├── index.html
├── vite.config.ts
├── netlify.toml
├── package.json
├── .env.example
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
npm install
npm run dev
```

Set your `.env` file with the 4 Google variables from `.env.example`.

---

## Environment variables

Only these are used in code:

- `GOOGLE_SHEETS_SPREADSHEET_ID`
- `GOOGLE_SHEETS_WAITLIST_RANGE`
- `GOOGLE_SHEETS_CONTACT_RANGE`
- `GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL`
- `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
- `GOOGLE_SERVICE_ACCOUNT_TOKEN_URI`

---

## Production build

```bash
npm run build
```

Output: `dist/`. On Netlify, use `npm run build` and publish `dist` (see `netlify.toml`).

---

## Design system

| Token              | Hex       | Usage                    |
| ------------------ | --------- | ------------------------ |
| `--bg`             | `#0F0F1A` | Page background          |
| `--surface`        | `#1A1A2E` | Section backgrounds      |
| `--surface-light`  | `#252542` | Input fills              |
| `--card`           | `#16162A` | Card backgrounds         |
| `--border`         | `#2D2D4A` | Borders, dividers        |
| `--primary`        | `#8B5CF6` | CTAs, highlights         |
| `--primary-dark`   | `#7C3AED` | Button hover states      |
| `--primary-light`  | `#A78BFA` | Labels, accent text      |
| `--accent`         | `#10B981` | Success, trust signals   |
| `--accent-dark`    | `#059669` | Green hover states       |
| `--text-primary`   | `#F8FAFC` | Headlines, body          |
| `--text-secondary` | `#94A3B8` | Descriptions             |
| `--text-muted`     | `#64748B` | Labels, captions         |

**Typography:** Syne (display), DM Sans (body)—see `index.html` font links.

---

## Features

- Interactive canvas sections, scroll animations, glass navbar, waitlist + contact to Sheets via Apps Script, toasts, responsive layout.

---

Built with care for Kaizuna Technologies.
