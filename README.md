# Restaurant Catalog Lite

A demo of a restaurant with a cart, menu, promo codes, taxes/fees calculations, and a clean Tailwind UI. Built with React + React-router v6.4 + Redux + Tailwind. The goal is to look and feel like a real feature slice you’d ship at work.

**Live demo:** https://ya-sushi2.netlify.app/

---

## ✨ Features

- Menu list with images, prices, and add‑to‑cart
- Cart with increment/decrement, remove, empty state
- **Promo code** application with validation and success/error toasts
- Derived totals: **subtotal, discount, tax, convenience fee, grand total**
- UX niceties: toasts, disabled states, empty states
- Responsive layout (mobile‑first); keyboard focus states

> Roadmap (optional): search in menu, categories, PWA offline cache, mock API (JSON Server / Supabase), unit tests (Vitest + RTL)

---

## 🧱 Tech Stack

- **React 18 + Vite**
- **TypeScript**
- **Tailwind CSS**
- **Redux Toolkit** (cart/promo state & selectors)
- **react-hot-toast** for notifications

---

## 📸 Screenshots

<p>
  <img src="./public/screens/image1.png" alt="Home" width="420">
</p>
<p>
  <img src="./public/screens/image2.png" alt="Home" width="420">
</p>
<p>
  <img src="../public/screens/image3.png" alt="Home" width="420">
</p>
<p>
  <img src="./public/screens/image.png" alt="Home" width="420">
</p>

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+

### Install

```bash
pnpm i
# or
npm i
```

### Run Dev

```bash
pnpm dev
# or
npm run dev
```

### Build & Preview

```bash
pnpm build && pnpm preview
# or
npm run build && npm run preview
```

---

## 🧮 App Structure (high‑level)

```
src/
  assets/
  features/
    cart/
      cartSlice.ts        # add/remove/increment/decrement
      cart.selectors.ts   # subtotal, discount, tax, total
    promo/
      promoSlice.ts       # code, discount, applied flags
  shared/
    lib/money.ts          # cents→dollars helpers
    ui/                   # presentational components
  pages/
    Menu.tsx              # main screen
  app/
    store.ts
    hooks.ts
```

- **State**: Redux Toolkit slices for `cart` and `promo`, selectors for derived totals
- **Types**: strict TypeScript types for items & cart lines
- **UI**: Tailwind utility classes; accessible buttons/inputs

---

## ♿ Accessibility & UX

- Visible focus states for interactive elements
- ARIA labels for buttons (e.g., "Add to cart")
- Toast feedback for success/error
- Keyboard friendly (tab/enter/space)

---
