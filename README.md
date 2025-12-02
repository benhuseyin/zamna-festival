# ZAMNA x MO Homecoming 2026

A production-ready Next.js landing page for the ZAMNA x MO Homecoming 2026 festival at Life Park Istanbul.

## Features

- 🎨 **Dark Theme**: Minimalist, techno-inspired design with glassmorphism effects
- 🌍 **Internationalization**: Full TR/EN support with next-intl
- 🛒 **E-commerce Cart**: Complete ticket purchasing flow with localStorage persistence
- 📱 **Responsive Design**: Mobile-first, fully responsive across all devices
- ♿ **Accessible**: Keyboard navigation, ARIA attributes, semantic HTML
- 🎭 **Animations**: Smooth micro-animations with Framer Motion
- 🔍 **SEO Optimized**: Meta tags, Open Graph, semantic structure

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **i18n**: next-intl
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

The default locale is Turkish (TR). To view in English, navigate to `/en`.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
zamna-festival/
├── app/
│   ├── [locale]/
│   │   ├── checkout/
│   │   │   └── page.tsx
│   │   ├── confirmation/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── About.tsx
│   ├── Cart.tsx
│   ├── CheckoutForm.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── LanguageToggle.tsx
│   ├── Map.tsx
│   ├── Tabs.tsx
│   └── TicketSelector.tsx
├── lib/
│   ├── cart-context.tsx
│   ├── types.ts
│   └── utils.ts
├── locales/
│   ├── en.json
│   └── tr.json
├── i18n.ts
├── middleware.ts
├── next.config.js
├── tailwind.config.ts
└── package.json
```

## Sections

1. **Hero**: Full-screen hero with background image and glass card overlay
2. **Tabs**: Four-tab interface with event info, rules, pricing, and artists
3. **Tickets**: Interactive ticket selector with quantity controls
4. **Map**: Embedded Google Maps with venue information
5. **About**: Long-form description of the event
6. **Cart**: Slide-over cart with item management
7. **Checkout**: Form with validation and mock payment
8. **Confirmation**: Order success page with details

## Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  accent: {
    DEFAULT: "#8b5cf6", // Purple accent
    purple: "#8b5cf6",
    blue: "#3b82f6",
  },
}
```

### Content

All content is stored in locale JSON files:
- `locales/tr.json` - Turkish content
- `locales/en.json` - English content

### Ticket Types

Edit `lib/types.ts` to modify ticket categories and prices.

## Deployment

This is a standard Next.js application and can be deployed to:
- Vercel (recommended)
- Netlify
- Any Node.js hosting platform

## License

© 2026 ZAMNA x MO Homecoming. All rights reserved.
