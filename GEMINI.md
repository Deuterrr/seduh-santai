# GEMINI.md — Seduh Santai

This rule file guides Gemini and Antigravity agents when working in the **Seduh Santai** codebase.

---

## 1. Project Context & Stack

- **Framework**: Vue 3 (Composition API `<script setup lang="ts">`) + Vite + TypeScript.
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite` 4.x) with `@theme` block in `src/index.css`.
- **Motion**: `lenis` smooth inertial scrolling in `src/App.vue`.
- **Icons**: `lucide-vue-next`.
- **Backend Service**: Express `server.js` with Nodemailer on `http://localhost:5000/send`.

### Common Commands:
- `npm run dev`: Start Vite dev server.
- `npm run build`: Type-check (`vue-tsc -b`) and build for production.

---

## 2. Design Approach: Artisanal Warm Minimalism & Neo-Editorial

Seduh Santai follows an **Awwwards Site of the Day** design approach characterized by warmth, restraint, editorial elegance, and unhurried calm.

### Key Rules & Constraints:
1. **Zero Clutter & Restraint Over Badges**:
   - **Do NOT add badge bloat**: Avoid cluttered chips, coordinates tickers, elevation stamps (MASL), roast meters, or live ticking clocks.
   - **NEVER use bracketed eyebrow text**: NEVER add eyebrow labels or alt-text with square brackets (e.g. `[ TAG ]`, `[ UNBIASED TRUTH ]`, `[ SINGLE ORIGIN ]`) above headers and titles. Keep headlines clean, bold, and direct.
   - Communicate quality through large bold typography, high-res photography, and ample negative space.
2. **Generous Negative Space**:
   - Section padding: `py-20 sm:py-28`.
   - Max width: `max-w-[1440px] mx-auto`.
   - Fluid horizontal gutters: `px-6 sm:px-10 md:px-16 lg:px-20`. Never use rigid hardcoded paddings (e.g. `px-40`).
3. **Native Cursor & Zero Audio**:
   - Respect the user's native mouse cursor. Do NOT inject custom follower dots or magnetic rings.
   - Do NOT add audio players, background loops, or sound toggles.
4. **Tactile Canvas & Smooth Scrolling**:
   - The warm cream background (`#FBF8F3`) has an ultra-subtle persistent SVG film grain overlay (`opacity-30 mix-blend-overlay` in `src/App.vue`).
   - Smooth inertial scroll is provided by `lenis`.

---

## 3. Typography Hierarchy

Imported via Google Fonts in `index.html`:
- **`font-serif`**: `Cormorant Garamond` — Poetic display headlines and italicized accents (`italic font-normal text-[#C86D3B]`).
- **`font-sans`**: `Plus Jakarta Sans` — Clean, geometric humanist body, buttons, and UI text.
- **`font-mono`**: `Space Mono` — Spared strictly for year toggles and prices.

### Standard Headline Rhythm:
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

## 4. Color System

- **Background Canvas & Footer**: `#FBF8F3` (Warm oat-milk cream throughout, seamless from top to bottom)
- **Navbar Surface**: `#483227` (Full-width edge-to-edge warm tinted coffee brown with warm cream text)
- **Surfaces & Cards**: `#FAF6F0` / `#ECE2D4` (Warm sand & toned solid surfaces)
- **Text Primary**: `#14110F` (Espresso black)
- **Text Secondary**: `#756C65` / `#A39992` (Muted warm clay)
- **Accent Primary**: `#C86D3B` (Caramelized amber)
- **Accent Hover**: `#A85427` (Terracotta)
- **Zero Dividing Lines**: Do NOT place horizontal dividing border lines (`border-t` / `border-b`) between sections. Let generous negative space establish section separation naturally.

---

## 5. Section Structure

The single-page layout follows a clean, rhythmic order:
1. **Navbar (`src/components/Navbar.vue`)**: Full-width edge-to-edge warm tinted coffee brown bar (`#483227`), warm cream text, clean links, contact action.
2. **Hero (`src/pages/Home/components/Welcome.vue`)**: Editorial headline, concise subtext, clean photo card, scroll cue.
3. **Why Us Hooks (`src/pages/Home/components/WhyUsHooks.vue`)**: 3 solid-toned cards highlighting bold, cheeky reasons to choose us over others.
4. **Our Story (`src/pages/Home/components/YearShowcase.vue`)**: Authentic 2-paragraph narrative with sticky photo transition.
5. **Our Café (`src/pages/Home/components/CafeShowcase.vue`)**: Location list on the left, photo + story on the right, compact auto-rotate countdown bar.
6. **Our Lineup (`src/pages/Home/components/ProductCarousel.vue`)**: Bento Grid using solid toned sections (`#ECE2D4`) and exactly 1 outline section. Category & signature tags float on the top-right corner with accent background (`bg-[#C86D3B] text-white`).
7. **Footer (`src/components/Footer.vue`)**: Warm cream background matching the rest of the canvas (`#FBF8F3`), clean social links, and working contact form.

---

## 6. Verification Requirements

Before completing any UI or code edits:
- Run `npm run build` to confirm zero TypeScript compilation errors and clean Tailwind v4 bundling.
