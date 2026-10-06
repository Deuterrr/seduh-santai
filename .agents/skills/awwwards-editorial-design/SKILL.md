---
name: awwwards-editorial-design
description: >-
  Guidelines and specifications for designing and maintaining the Artisanal Warm Minimalist
  Brutalism & Neo-Editorial design system in Seduh Santai. Use this skill whenever building,
  styling, or modifying UI components, layouts, typography, and interactions to ensure award-winning
  visual quality without clutter.
---

# Awwwards Editorial Design System: Seduh Santai

This skill defines the visual identity, typography rules, color tokens, and layout guidelines for **Seduh Santai**, an artisanal Indonesian specialty coffee experience.

## 1. Aesthetic Thesis: Artisanal Warm Minimalism & Neo-Editorial

The design bridges Japanese kissaten/Nordic coffee culture with warm editorial brutalism. The key to this aesthetic is **extreme restraint, ample negative space, and typographic tension**.

### Golden Rules (Learned & Enforced):
- **Resist Data Clutter & Badge Bloat**: Do NOT crowd cards or heroes with micro-metrics, coordinates tickers, elevation stamps, ticking clocks, or multiple chip tags. If a single clean title and 1-sentence note can tell the story, keep it minimal.
- **NEVER Use Bracketed Eyebrow Text Above Headlines**: Never add eyebrow labels or tags with square brackets (e.g. `[ TAG ]`, `[ UNBIASED TRUTH ]`, `[ ORIGIN ]`) above section headers or hero headlines. Keep headlines bold, clean, and unencumbered.
- **Ample Breathing Room**: Use generous vertical section padding (`py-20 sm:py-28`), large container gutters (`px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1440px] mx-auto`), and spacious gaps between elements.
- **Native Browser Cursor**: Respect the user's native cursor. Do not inject trailing mouse dots or magnetic rings.
- **Zero Audio**: Never introduce background audio players, sound loops, or sound toggle widgets.
- **Tactile Paper Feel**: A subtle persistent SVG film grain overlay (`opacity-30 mix-blend-overlay pointer-events-none`) gives the canvas a tactile, print-like paper finish.

---

## 2. Typography System

The interface pairs three distinct Google Fonts loaded via `index.html`:

| Role | Font Family | Tailwind Class | Usage Guidelines |
| :--- | :--- | :--- | :--- |
| **Editorial Serif** | `Cormorant Garamond` | `font-serif` | Poetic headlines, emotional italic accents (`italic font-normal text-[#C86D3B]`), large title cards. |
| **Primary Sans** | `Plus Jakarta Sans` | `font-sans` | Body text, UI labels, buttons, navigation links. Crisp, geometric, humanist. |
| **Technical Mono** | `Space Mono` | `font-mono` | Spared strictly for year indicators, prices, and minimal uppercase date stamps. |

### Headline Formula:
Always create visual rhythm by contrasting bold sans with italic serif:
```html
<h1 class="text-5xl sm:text-7xl font-bold tracking-tight text-[#14110F]">
  One cup.
  <br />
  <span class="font-serif italic font-normal text-[#C86D3B]">
    Countless stories.
  </span>
</h1>
```

---

## 3. Color Tokens (`@theme` in `src/index.css`)

* **Canvas Base & Footer**: `#FBF8F3` (Warm oat-milk cream throughout)
* **Navbar Surface**: `#483227` (Full-width edge-to-edge warm tinted coffee brown with warm cream text)
* **Card & Surface**: `#ECE2D4` / `#FAF6F0` (Solid toned sand surfaces)
* **Text Primary**: `#14110F` (Espresso black)
* **Text Secondary**: `#756C65` (Muted warm clay)
* **Accent Primary**: `#C86D3B` (Roasted caramel amber)
* **Accent Hover**: `#A85427` (Terracotta)
* **Zero Dividing Lines**: Do NOT place horizontal dividing border lines (`border-t` / `border-b`) between sections. Let generous negative space and typography establish natural cadence.

---

## 4. Component Patterns

### A. Navigation
- Full-width edge-to-edge warm tinted coffee brown bar (`bg-[#483227]`) with warm cream text (`text-[#FBF8F3]`), logo, clean links, and contact button.

### B. Why Us Hooks
- 3 solid-toned cards (`bg-[#ECE2D4]`) with floating accent tags (`bg-[#C86D3B] text-white`) delivering bold, memorable reasons to choose the sanctuary.

### C. Bento Grid Lineup
- Sections are strictly either **solid** (using toned background `#ECE2D4`) or **outline** (used only 1 time for House Specials).
- Floating top-right tags: Category, Favorite, and Signature tags float on the top-right corner with accent background (`bg-[#C86D3B] text-white`).

### D. Footer
- Seamless warm cream background (`#FBF8F3`) matching the canvas, clean dark text (`#14110F`), understated form inputs, and zero horizontal divider lines.

---

## 5. Verification Checklist

Whenever updating pages or adding components:
1. `npm run build` must compile cleanly with `vue-tsc -b && vite build`.
2. Ensure fluid responsiveness on mobile (`sm:`), tablet (`md:`), and desktop (`lg:`). Never use hardcoded paddings like `px-40`.
3. Check for clutter: Ask *"Can this information be communicated with fewer badges or simpler copy?"*
