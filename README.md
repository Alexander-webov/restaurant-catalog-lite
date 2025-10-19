# Restaurant Catalog Lite

A lightweight restaurant catalog with categories, images, cart, promo codes, and admin screens for managers and kitchen. Built with **React + TypeScript + Vite + Tailwind + Redux Toolkit** and **Supabase** (Auth & Storage).

**Live:** https://ya-sushi2.netlify.app/  
**Repository:** https://github.com/Alexander-webov/restaurant-catalog-lite

<p>
  <img src="./public/screens/image1.png" alt="Menu" width="420">
  <img src="./public/screens/image2.png" alt="Cart" width="420">
</p>
<p>
  <img src="./public/screens/image3.png" alt="Admin" width="420">
  <img src="./public/screens/image4.png" alt="Kitchen" width="420">
</p>

---

## Features

### Customer

- Menu by categories with images and prices
- Cart: add/remove, increment/decrement, empty state
- Promo codes with validation and toast feedback
- Derived totals: **subtotal → discount → tax → convenience fee → grand total**
- Responsive UI (mobile-first), accessible focus states

### Manager / Kitchen

- Email/password auth via Supabase
- Protected routes for **/manager** and **/kitchen**
- CRUD for **categories** and **items**
- Image uploads to **Supabase Storage** (public bucket) with instant preview
- RLS policies for Storage: `INSERT/UPDATE` (role `authenticated`), `SELECT` (`public`)

---

## Tech Stack

- **React 18**, **TypeScript**, **Vite**
- **Redux Toolkit** (cart/promo slices + selectors)
- **React Router v6**
- **Tailwind CSS**
- **Supabase** (Auth, Storage, PostgREST)
- **react-hot-toast** (notifications)

---

## Project Structure

src/
app/
store.ts # Redux store
hooks.ts # typed hooks
features/
cart/ # cart slice + selectors + UI
promo/ # promo slice
pages/
MenuCategoryPage.tsx
AdminPanel/
Items/
Categories/
Kitchen/
shared/
api/ # Supabase calls (items, categories, storage, auth)
lib/ # utilities (money, formatting, etc.)
ui/ # reusable UI components
types/
item.ts # Item / NewItemInput, etc.
public/
screens/ # screenshots used in README

- **State:** domain-oriented slices, memoized selectors for totals
- **Types:** separate DB row vs. insert payload (`Item` vs `NewItemInput`)
- **Storage:** public-bucket flow (upload → `getPublicUrl` → store `image_url`)

---

## Getting Started

### Requirements

- Node.js 18+

### Install

```bash
npm i
# or
pnpm i
```

## Environment

### Create .env.local:

VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>

## Supabase Setup (quick)

Create a project at https://app.supabase.com

Auth → Email: enable (auto-confirm for demo is fine)

Storage → New bucket: categories (Public ON)

Storage → Policies (bucket: categories)

INSERT/UPDATE → role authenticated, condition: bucket_id = 'categories'

SELECT → role public, condition: bucket_id = 'categories'

Tables

categories: id, name, slug, image_url (text, nullable)

items: id, name, slug, description (text, nullable), image (text, nullable), price_cents (int)

## Development

npm run dev

# or

pnpm dev

## Build & Preview

npm run build && npm run preview

# or

pnpm build && pnpm preview

## Deployment

Deployed on Netlify (SPA):

Build command: tsc -b && vite build

Publish directory: dist/

SPA redirect via netlify.toml:

[[redirects]]
from = "/\*"
to = "/index.html"
status = 200

Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Netlify → Site settings → Build & deploy → Environment.

## Implementation Notes

Route protection: Protected wrapper checks supabase.auth.getSession() and subscribes to onAuthStateChange; unauthenticated users are redirected to /login?redirect=....

Uploads: unique filename → upload to categories bucket → getPublicUrl → save image_url into table → preview from URL.

Error handling: foreign key violations (deleting categories with related items) show human-readable messages; RLS errors hint to sign in or adjust policies.

DX: strict TS, small utilities (money formatting), clean Tailwind classes.

## Roadmap

Search & filters for menu

Role-based access (manager/kitchen) via user_metadata + route checks

PWA offline cache; tests (Vitest + RTL)

Image transformations/thumbnails; private storage using signed URLs

## License

MIT © Alexander Webov
