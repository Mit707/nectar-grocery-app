# Nectar – Online Grocery PWA

A modern, mobile-first **Progressive Web App** for online grocery delivery — built with React 19, TypeScript, and Vite. Designed pixel-perfect from a Figma spec, it supports offline browsing, home-screen installation, and a full shopping flow from product discovery to order confirmation.

> Live preview: [https://nectar-grocery-app.vercel.app/](#)

---

## Table of Contents

- [Features](#features)
- [PWA Capabilities](#pwa-capabilities)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Production Build](#production-build)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [App Screens](#app-screens)
- [State Management](#state-management)
- [Author](#author)
- [License](#license)

---

## Features

- **Full shopping flow** — browse, search, filter, add to cart, checkout
- **Favourites / wishlist** — heart-toggle persisted across sessions with Zustand
- **Cart management** — add, remove, update quantities, persisted in localStorage
- **Product detail** — image gallery dots, nutritions accordion, star ratings, reviews row
- **Authentication flow** — phone + OTP (30 s resend timer), email login/signup, social buttons, location selector
- **Search** — live debounced search across 45 products
- **Category & filter** — category pages with price-range and sort filter modal
- **Order states** — success page with delivery partner card; failed page with retry
- **Responsive layout** — mobile-first (`max-w-md`) with desktop shell at `lg` breakpoint
- **Skeleton loading** — shimmer placeholders on all async sections
- **Install banner** — prompts users to add to home screen via `BeforeInstallPromptEvent`

---

## PWA Capabilities

| Capability               | Details                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| **Installable**          | Web App Manifest with `display: standalone`, splash screen, and maskable icons             |
| **Offline support**      | Workbox `generateSW` pre-caches all JS / CSS / HTML / images on first load                 |
| **Auto-update**          | Service worker registered with `autoUpdate` — users always get the latest version silently |
| **App-like UI**          | No browser chrome, portrait lock, `overscroll-behavior: none`, tap highlight removed       |
| **Responsive**           | Mobile-first design, scales gracefully on tablet and desktop                               |
| **Fast loading**         | Static assets served from cache-first strategy after first visit                           |
| **Font caching**         | Google Fonts stylesheets and files cached for 1 year via `CacheFirst`                      |
| **SPA offline fallback** | `navigateFallback: /index.html` serves all routes correctly when offline                   |
| **On-device dev**        | Dev server exposed on LAN (`host: true`) — open on a phone over Wi-Fi with live HMR        |

---

## Screenshots

> _Add screenshots or a screen-recording GIF here._

---

## Tech Stack

| Layer            | Technology                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------ |
| Framework        | [React 19](https://react.dev/)                                                                                     |
| Language         | [TypeScript 6](https://www.typescriptlang.org/)                                                                    |
| Build tool       | [Vite 8](https://vitejs.dev/)                                                                                      |
| PWA              | [vite-plugin-pwa 1.x](https://vite-pwa-org.netlify.app/) + [Workbox 7](https://developer.chrome.com/docs/workbox/) |
| Routing          | [React Router v7](https://reactrouter.com/)                                                                        |
| State management | [Zustand v5](https://zustand-demo.pmnd.rs/) with `persist` middleware                                              |
| Styling          | [Tailwind CSS v3](https://tailwindcss.com/) with custom design tokens                                              |
| Icons            | [Lucide React](https://lucide.dev/) + custom SVG icons                                                             |
| Utility          | `clsx` + `tailwind-merge` via `cn()` helper                                                                        |
| Linting          | ESLint 10 with `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`                                         |

---

## Prerequisites

Ensure the following are installed before getting started:

- **Node.js** `>= 18.x` (v20 LTS recommended)
- **npm** `>= 9.x` — or **pnpm** / **yarn**
- **Git**

Verify your environment:

```bash
node -v
npm -v
```

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/Mit707/nectar-grocery-app
cd PROJECT_NAME

# 2. Install dependencies
npm install
```

---

## Development

```bash
# Start the development server
npm run dev
```

The app will be available at:

- **Local:** `http://localhost:5173`
- **Network (LAN):** `http://<your-local-ip>:5173` — open directly on a mobile device connected to the same Wi-Fi for on-device PWA testing

> The service worker is active in dev mode using a passthrough strategy (no caching). Real Workbox pre-caching only activates after a production build.

### Other dev scripts

```bash
# Lint the entire codebase
npm run lint

# Preview the production build locally
npm run preview

# Expose the preview build via a public Cloudflare tunnel
npm run tunnel
```

---

## Production Build

```bash
# Type-check + bundle for production
npm run build
```

Output is written to the `dist/` folder. The build produces:

- Minified, tree-shaken JS/CSS chunks
- Pre-cache manifest for Workbox
- Generated service worker (`sw.js`)
- Web App Manifest (`manifest.webmanifest`)
- All PWA icons

Preview the production build locally before deploying:

```bash
npm run preview
# Available at http://localhost:4173
```

---

## Deployment

The `dist/` folder is a fully static site and can be deployed to any static hosting provider.

### Vercel (recommended)

```bash
npm i -g vercel
vercel --prod
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Cloudflare Pages

Connect the repository in the Cloudflare Pages dashboard with these settings:

| Setting                   | Value           |
| ------------------------- | --------------- |
| Build command             | `npm run build` |
| Build output directory    | `dist`          |
| Node.js version (env var) | `20`            |

### Manual / Nginx

Copy the `dist/` folder to your server's web root and add this rewrite rule so React Router handles client-side navigation:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

> **HTTPS is required.** Service workers only register on `localhost` or a secure `https://` origin.

---

## Project Structure

```
nectar-grocery-app/
├── public/
│   ├── icons/                      # PWA icons (192px, 512px, maskable variants)
│   ├── images/                     # Static images (banner, onboarding, delivery, etc.)
│   ├── favicon.svg
│   ├── header_bg.png               # Auth screen background gradient image
│   └── splash_logo.png
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx       # Main shell wrapping pages with BottomNav
│   │   │   ├── BottomNav.tsx       # Tab bar: Home, Explore, Cart, Favourites, Account
│   │   │   └── TopBar.tsx          # Back button + share icon header
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── CategoryCard.tsx
│   │       ├── EmptyState.tsx
│   │       ├── Input.tsx
│   │       ├── InstallBanner.tsx   # PWA "Add to Home Screen" install prompt
│   │       ├── NumericKeypad.tsx
│   │       ├── PhoneInput.tsx      # Country-code dropdown + tel number input
│   │       ├── ProductCard.tsx
│   │       └── SkeletonCard.tsx
│   │
│   ├── data/
│   │   ├── categories.json         # 8 product categories
│   │   ├── categories.ts
│   │   ├── products.json           # 45 mock products with nutritions + ratings
│   │   └── products.ts             # Query helpers: getById, byCategory, featured, bestSelling
│   │
│   ├── hooks/
│   │   ├── useDebounce.ts          # Debounce hook for search input
│   │   └── useSimulatedFetch.ts    # Simulates async loading with configurable delay
│   │
│   ├── pages/
│   │   ├── SplashPage.tsx
│   │   ├── auth/
│   │   │   ├── OnboardingPage.tsx
│   │   │   ├── SignInPage.tsx
│   │   │   ├── MobileNumberPage.tsx
│   │   │   ├── VerificationPage.tsx    # OTP input with 30 s countdown resend
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignUpPage.tsx
│   │   │   └── SelectLocationPage.tsx
│   │   ├── home/HomePage.tsx           # Banner, exclusive offers, best sellers, groceries
│   │   ├── explore/ExplorePage.tsx
│   │   ├── search/SearchPage.tsx
│   │   ├── category/
│   │   │   ├── CategoryPage.tsx
│   │   │   └── FiltersModal.tsx        # Price range + sort filter bottom sheet
│   │   ├── product/ProductDetailPage.tsx
│   │   ├── cart/
│   │   │   ├── CartPage.tsx
│   │   │   └── CheckoutModal.tsx
│   │   ├── favorites/FavoritesPage.tsx
│   │   ├── account/AccountPage.tsx
│   │   └── order/
│   │       ├── OrderSuccessPage.tsx    # Confirmation with delivery partner card
│   │       └── OrderFailedPage.tsx
│   │
│   ├── router/index.tsx            # React Router v7 createBrowserRouter config
│   │
│   ├── store/
│   │   ├── authStore.ts            # Current user, zone, area (persisted)
│   │   ├── cartStore.ts            # Cart items and quantities (persisted)
│   │   ├── favoriteStore.ts        # Favourited products list (persisted)
│   │   └── productStore.ts         # Transient product UI state
│   │
│   ├── types/index.ts              # Shared TypeScript interfaces (Product, Category, User…)
│   ├── utils/cn.ts                 # clsx + tailwind-merge utility
│   ├── index.css                   # Tailwind directives + global component styles
│   └── main.tsx                    # React app entry point
│
├── index.html
├── vite.config.ts                  # Vite + PWA plugin configuration
├── tailwind.config.ts              # Design tokens: colors, fonts, shadows, breakpoints
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── package.json
```

---

## App Screens

| Route            | Screen           | Description                                          |
| ---------------- | ---------------- | ---------------------------------------------------- |
| `/`              | Splash           | Animated logo on green background                    |
| `/onboarding`    | Onboarding       | Full-screen delivery hero + Get Started CTA          |
| `/auth/signin`   | Sign In          | Phone row + Google / Facebook social login           |
| `/auth/mobile`   | Mobile Number    | Country-code selector + phone number input           |
| `/auth/verify`   | OTP Verification | 4-digit OTP slots + 30 s resend countdown            |
| `/auth/login`    | Email Login      | Email + password form                                |
| `/auth/signup`   | Sign Up          | Name, email, password registration                   |
| `/auth/location` | Select Location  | Zone and area picker                                 |
| `/home`          | Home             | Banner, exclusive offers, best sellers, grocery grid |
| `/explore`       | Explore          | All categories in a grid                             |
| `/search`        | Search           | Live debounced search results                        |
| `/category/:id`  | Category         | Filtered product list + sort/filter modal            |
| `/product/:id`   | Product Detail   | Gallery, nutritions accordion, add to cart           |
| `/cart`          | Cart             | Item list, totals, checkout modal                    |
| `/favorites`     | Favourites       | Saved products with remove action                    |
| `/account`       | Account          | User profile and settings                            |
| `/order/success` | Order Success    | Confirmation + delivery partner info                 |
| `/order/failed`  | Order Failed     | Error state with retry button                        |

---

## State Management

All global state is managed with **Zustand v5** and persisted to `localStorage` via the built-in `persist` middleware. State survives page reloads and is shared across browser tabs automatically.

| Store           | Persisted | Responsibility                                |
| --------------- | --------- | --------------------------------------------- |
| `authStore`     | Yes       | Authenticated user, delivery zone and area    |
| `cartStore`     | Yes       | Cart items, quantities, add / remove / update |
| `favoriteStore` | Yes       | Favourited product IDs and objects            |
| `productStore`  | No        | Transient in-page product UI state            |

---

## Author

**Mitul Vala**

- GitHub: [https://github.com/Mit707/nectar-grocery-app](REPOSITORY URL)

---

## License

This project is for educational / assignment purposes. All rights reserved &copy; 2025 Mitul Vala.
