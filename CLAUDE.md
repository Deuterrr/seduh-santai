# CLAUDE.md — Seduh Santai

This document guides Claude when working on the **Seduh Santai** repository.

---

## 1. Project Overview & Commands

**Seduh Santai** is an Indonesian specialty coffee website built with Vue 3, Vite, TypeScript, and Tailwind CSS v4.

### Common Commands:
- **Development Server**: `npm run dev`
- **Typecheck & Production Build**: `npm run build` (`vue-tsc -b && vite build`)
- **Preview Production Build**: `npm run preview`
- **Backend Contact Form Server**: `node server.js` (Express endpoint at `http://localhost:5000/send`)

---

## 2. Design Philosophy & Approach: Artisanal Warm Minimalism & Neo-Editorial

The site adheres to an Awwwards-winning **"Artisanal Warm Minimalist Brutalism & Neo-Editorial"** aesthetic inspired by Japanese kissaten culture, Nordic slow coffee, and high-end print magazines (Kinfolk, Aesop).

### Core Aesthetic Principles:
1. **Extreme Restraint & Negative Space**:
   - **NO DATA CLUTTER / BADGE BLOAT**: Never crowd heroes, cards, or galleries with tiny chip tags, micro-metrics (e.g. MASL elevations, roast gauges, coordinates tickers), or live ticking clocks.
   - **NEVER USE BRACKETED EYEBROW TEXT**: Never place alt-text, tags, or eyebrow labels wrapped in square brackets (e.g. `[ TAG ]`, `[ THE TRUTH ]`) above section headers or hero headlines. Let the headline speak for itself.
   - Let generous spacing (`py-20 sm:py-28`, `max-w-[1440px] mx-auto`) and large editorial typography carry the weight.
2. **Native Cursor & Zero Audio**:
   - Always retain the native browser cursor. Never inject fake custom cursor dots or magnetic trailing followers.
   - Do not add ambient audio, lo-fi player toggles, or sound effects.
3. **Tactile Paper Canvas**:
   - The body canvas has a subtle, persistent SVG film grain overlay (`opacity-30 mix-blend-overlay pointer-events-none` in `src/App.vue`) to give a warm print paper tactile finish.
   - Smooth inertial scrolling is handled globally via `lenis`.

---

## 3. Typography System

Fonts are loaded from Google Fonts in `index.html`:
- **Editorial Serif**: `Cormorant Garamond` (`font-serif`) — Used for poetic headlines, italic accents, and emotional quotes.
- **Humanist Sans**: `Plus Jakarta Sans` (`font-sans`) — Used for primary headings, body copy, and UI buttons.
- **Micro Mono**: `Space Mono` (`font-mono`) — Used sparingly for prices, year toggles, and metadata.

### Typographic Contrast Pattern:
```html
<h1 class="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#14110F]">
  One cup.
  <br />
  <span class="font-serif italic font-normal text-[#C86D3B]">
    Countless stories.
  </span>
</h1>
```

---

## 4. Color Palette & Tokens (Tailwind CSS v4 `@theme`)

Defined in `src/index.css`:
- `var(--color-cream)` / `#FBF8F3`: Primary body canvas & footer background (seamless warmth throughout).
- Navbar Surface: `#483227` (Full-width edge-to-edge warm tinted coffee brown with warm cream text).
- `var(--color-sand)` / `#ECE2D4`, `#FAF6F0`: Solid toned cards.
- `var(--color-espresso)` / `#14110F`: Primary text and dark elements.
- `var(--color-clay)` / `#756C65`, `#A39992`: Muted secondary text and labels.
- `var(--color-amber-accent)` / `#C86D3B`: Warm crema accent color for highlights, buttons, and floating tags.
- `var(--color-terracotta)` / `#A85427`: Button hover states.
- **Zero Dividing Lines**: Do NOT place horizontal dividing border lines between sections. Sections are separated purely by generous negative space and rhythmic typography.

---

## 5. Layout & Component Guidelines

- **Navbar (`src/components/Navbar.vue`)**: Full-width edge-to-edge warm tinted coffee brown bar (`#483227`) with warm cream text, clean links, and contact button.
- **Hero (`src/pages/Home/components/Welcome.vue`)**: Editorial headline, concise subtext, focused photography, clean scroll indicator.
- **Why Us Hooks (`src/pages/Home/components/WhyUsHooks.vue`)**: 3 solid-toned cards highlighting bold reasons to choose us over others.
- **Our Story (`src/pages/Home/components/YearShowcase.vue`)**: Authentic 2-paragraph narrative with sticky photo transition.
- **Our Café (`src/pages/Home/components/CafeShowcase.vue`)**: Location list on the left, photo and short story on the right, compact auto-rotate countdown bar.
- **Our Lineup (`src/pages/Home/components/ProductCarousel.vue`)**: Bento Grid using solid toned sections (`#ECE2D4`) and exactly 1 outline section. Category & signature tags float on the top-right corner with accent background (`bg-[#C86D3B] text-white`).
- **Footer (`src/components/Footer.vue`)**: Warm cream background (`#FBF8F3`) matching the canvas, clean social links, and minimal contact form.
- **Responsiveness**: Always use fluid paddings (`px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1440px] mx-auto`). Never use rigid hardcoded paddings like `px-40`.

---

## 6. Development Rules

1. Always run `npm run build` to verify type safety and bundle compilation after modifying Vue files.
2. Maintain clean separation of components under `src/pages/Home/components/`.
3. Preserve the working POST `/send` endpoint in the contact form.
