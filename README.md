# Kaizuna Nexus — Marketing Landing Page

> **"Where Connections Become Opportunities"**
>
> A premium marketing + storytelling landing page for Kaizuna Nexus by Kaizuna Technologies.

---

## Project Structure

```
kaizuna/
├── client/                          # Vite + React + TypeScript frontend
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/              # All React components
│   │   │   ├── Hero/                # Hero + HeroCanvas (interactive network)
│   │   │   ├── UseCases/            # Use case cards + PersonaTabs + MiniCanvas
│   │   │   ├── WhyKaizuna/          # Why section + WhyCanvas (network diagram)
│   │   │   ├── Navbar.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Principles.tsx
│   │   │   ├── FutureVision.tsx
│   │   │   ├── WaitlistCTA.tsx       # Waitlist with email confirmation flow
│   │   │   ├── ContactForm.tsx
│   │   │   ├── BlogSection.tsx       # Placeholder blog listing
│   │   │   ├── Footer.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── GradientDivider.tsx
│   │   ├── hooks/
│   │   │   ├── useScrollAnimation.ts # IntersectionObserver scroll reveals
│   │   │   ├── useCounterAnimation.ts# Animated counting numbers
│   │   │   └── useAnalytics.ts       # Section view + CTA click tracking
│   │   ├── lib/
│   │   │   └── api.ts                # Fetch wrappers for /api/*
│   │   ├── styles/
│   │   │   ├── globals.css            # Design tokens, reset, noise overlay
│   │   │   └── components/            # CSS modules per component
│   │   ├── data/                      # Static content data files
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts                 # Proxy /api -> localhost:2000
│   ├── tsconfig.json
│   └── package.json
│
├── server/                            # Express.js backend (TypeScript)
│   ├── src/
│   │   ├── controllers/               # Route handlers
│   │   │   ├── waitlist.controller.ts
│   │   │   ├── contact.controller.ts
│   │   │   ├── analytics.controller.ts
│   │   │   └── health.controller.ts
│   │   ├── routes/                    # Express routers
│   │   ├── middleware/                # Rate limiter, body validation
│   │   ├── store/                     # In-memory data store
│   │   ├── utils/                     # Logger
│   │   └── index.ts                   # App entry point
│   ├── tsconfig.json
│   ├── .env                           # PORT=2000, FRONTEND_URL, NODE_ENV
│   └── package.json
│
├── .gitignore
├── .env.example
└── README.md
```

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### 1. Start the backend (port 2000)

```bash
cd server
npm install
npm run dev
```

### 2. Start the frontend (port 5173)

```bash
cd client
npm install
npm run dev
```

### 3. Open in browser

```
http://localhost:5173
```

The Vite dev server proxies all `/api/*` requests to the Express backend on port 2000.

---

## API Endpoints

All endpoints are prefixed with `/api`.

| Method | Endpoint              | Description                              |
| ------ | --------------------- | ---------------------------------------- |
| POST   | `/api/waitlist`       | Submit email, receive confirmation code  |
| POST   | `/api/waitlist/confirm` | Confirm email with 6-digit code        |
| GET    | `/api/waitlist/count` | Get count of confirmed signups           |
| POST   | `/api/contact`        | Submit contact form (name, email, msg)   |
| POST   | `/api/analytics/event`| Track a frontend event                   |
| GET    | `/api/analytics/summary` | Get aggregated event counts           |
| GET    | `/api/health`         | Server health check                      |

### Example: Join Waitlist

```bash
# Submit email
curl -X POST http://localhost:2000/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'

# Response
{
  "success": true,
  "message": "Check your inbox for a confirmation code.",
  "code": "123456"
}

# Confirm with code
curl -X POST http://localhost:2000/api/waitlist/confirm \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "code": "123456"}'
```

> In development, the confirmation code is returned in the response.
> In production, it would be sent via email (plug in SendGrid, Resend, etc.).

---

## Design System

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

**Typography:**
- Display / Headings: **Syne** (Google Fonts) — 700-800 weight
- Body / UI: **DM Sans** (Google Fonts) — 300-500 weight

---

## Features

- **Interactive Canvas Networks** — Hero, Why section, and Use Cases use animated node graphs
- **Mouse Repulsion** — Hero canvas nodes react to cursor position
- **Scroll Animations** — Elements fade/slide in as they enter viewport (IntersectionObserver)
- **Counter Animation** — Stats count up with eased timing when visible
- **Glassmorphism Navbar** — Blurred backdrop, opacity shift on scroll
- **Persona Tabs** — Interactive tab switching with fade animations on Use Cases
- **Email Confirmation Flow** — Waitlist uses 6-digit code verification
- **Contact Form** — Name, email, message with validation and API submission
- **Blog Placeholder** — 4 "Coming Soon" blog post cards
- **Analytics Tracking** — Section views and CTA clicks sent to backend
- **Rate Limiting** — 30 requests per 60 seconds per IP
- **Toast Notifications** — Animated success messages
- **Responsive Design** — Breakpoints at 900px and 600px
- **Graceful Degradation** — Frontend works even if backend is unreachable

---

## Environment Variables

### Server (`server/.env`)

```bash
PORT=2000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Client (`client/.env`)

```bash
# Vite proxy handles API routing — no override needed in dev
# VITE_API_URL=http://localhost:2000
```

---

## Production Build

### Frontend

```bash
cd client
npm run build
# Output in client/dist/
```

### Backend

```bash
cd server
npm run build
npm start
```

---

## Replacing In-Memory Storage

The server uses in-memory Maps/Sets (`server/src/store/memory.ts`).
For production, swap with your preferred database:

**Supabase:**
```typescript
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
```

**MongoDB:**
```typescript
import { MongoClient } from 'mongodb'
const client = new MongoClient(process.env.MONGO_URI!)
```

---

Built with care for Kaizuna Technologies.
