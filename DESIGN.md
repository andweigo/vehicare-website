# VehiCare Design System (`DESIGN.md`)

**Product:** VehiCare — Multi-Vehicle Diagnostics, Maintenance & Garage Intelligence  
**Design Philosophy:** Modern iOS & Automotive Product Architecture (Mobbin, Apple Product Presentation, Linear)  
**Core Directive:** No cards-inside-cards, no artificial neon radial gradients, no boxy containers around phone hardware. Minimalist physical hardware silhouettes floating on deep charcoal canvas with natural ambient depth, generous negative space, refined typography, and purposeful subtle motion.

---

## 1. Minimalist Showcase Principles

1. **Hardware Silhouette Breathing on Canvas**
   - Application screenshots and renders (`mockup-duo-hero.png`, `mockup-maintenance.png`, `mockup-trio-showcase.png`) stand directly on the section canvas without artificial card borders or container boxes.
   - Natural ambient multi-layer drop shadows provide depth:
     ```css
     filter: drop-shadow(0 28px 56px rgba(0, 0, 0, 0.52)) drop-shadow(0 4px 14px rgba(0, 0, 0, 0.3));
     ```
   - On interactive hover, devices gently lift (`transform: translateY(-6px)`) with smooth easing (`cubic-bezier(0.16, 1, 0.3, 1)`).

2. **Negative Space over Heavy Containers**
   - Minimalist product design uses generous whitespace, typographical scale, and hairline dividers (`1px solid var(--border-subtle)`) rather than wrapping every paragraph into nested card boxes.

3. **Restrained Strategic Accent Palette**
   - **Signal International Orange (`#F5501C`)** and secondary orange (`#FF8152`) are reserved strictly for high-signal moments: primary calls to action, active navigation indicator lines, and critical urgency badges.
   - Dark theme uses deep charcoal canvas (`#0A0A0A`) with `#151515` elevated surfaces; Light theme uses clean white (`#FFFFFF`) with soft neutral sections (`#F8F9FA`).

4. **Interactive Walkthrough (Editorial Switcher)**
   - Left-rail editorial list with an active accent border line (`border-left: 2px solid var(--accent)`), smooth opacity transitions (`0.55` → `1.0`), and 300ms crossfade between high-resolution screenshots.

---

## 2. Color System & Semantic Roles

| Token | Dark Mode (`Obsidian`) | Light Mode (`Daylight`) | Semantic Role |
| :--- | :--- | :--- | :--- |
| `--bg-canvas` | `#0A0A0A` | `#FFFFFF` | Main document canvas |
| `--bg-subtle` | `#111113` | `#F8F9FA` | Recessed sections (Alternating rhythm) |
| `--bg-surface` | `#151515` | `#FFFFFF` | Elevated interactive controls & cards |
| `--bg-elevated` | `#1E1E22` | `#F1F2F4` | Toolbars, hover states, and drawer |
| `--bg-glass` | `rgba(10, 10, 10, 0.85)` | `rgba(255, 255, 255, 0.90)` | Sticky header with 14px blur |
| `--text-primary` | `#F8F9FA` | `#0A0A0A` | Headlines, active labels, key metrics |
| `--text-secondary` | `#9CA3AF` | `#4A4D55` | Body copy, technical descriptions |
| `--text-muted` | `#6B7280` | `#6E7381` | Telemetry specs, metadata, labels |
| `--border-subtle` | `rgba(255, 255, 255, 0.07)` | `rgba(0, 0, 0, 0.07)` | Hairline dividers between sections/columns |
| `--border-default` | `rgba(255, 255, 255, 0.12)` | `rgba(0, 0, 0, 0.12)` | Form inputs & button borders |
| `--accent` | `#F5501C` | `#F5501C` | Primary brand CTA & active line |
| `--accent-hover` | `#FF6230` | `#DC4313` | Primary button hover state |
| `--accent-secondary` | `#FF8152` | `#FF8152` | Warm secondary brand accent |
| `--accent-text` | `#FF7A4D` | `#DC4313` | Accent kickers & inline links |
| `--accent-soft` | `rgba(245, 80, 28, 0.08)` | `rgba(245, 80, 28, 0.07)` | Subtle active pill washes |

---

## 3. Typography System — Google Fonts

Official Google Fonts pairing:
- **Primary Display Font (`--font-display`):** `'Manrope'`, sans-serif. Geometric, modern, highly refined.
  - Used for: Hero headline, main section headings, capability titles, large numerical highlights, and brand typography.
- **Secondary UI Font (`--font-body`):** `'Inter'`, system-ui, sans-serif. Neutral, exceptional legibility.
  - Used for: Navigation links, body copy, descriptions, form inputs, buttons, and pricing details.
- **Telemetry & Technical Monospace (`--font-mono`):** `'JetBrains Mono'`, monospace with tabular numbers.
  - Used for: Kickers, APK version tags, hardware specs, and code snippets.

### Typographic Scale

| Element | Desktop | Mobile | Responsive Rule |
| :--- | :--- | :--- | :--- |
| **Hero headline** | 64–76px | 40–48px | `clamp(2.5rem, 4.5vw + 1rem, 4.75rem)` / line-height: `1.08` / letter-spacing: `-0.03em` |
| **Section headings** | 44–54px | 32–38px | `clamp(2rem, 3.2vw + 0.5rem, 3.25rem)` / line-height: `1.12` / letter-spacing: `-0.025em` |
| **Section subheadings** | 22–26px | 19–22px | `clamp(1.15rem, 0.5vw + 1rem, 1.35rem)` / line-height: `1.5` |
| **Feature / Capability titles** | 20–24px | 18–21px | `clamp(1.125rem, 0.4vw + 1rem, 1.375rem)` / line-height: `1.25` |
| **Body paragraphs** | 16–18px | 15–16px | `clamp(0.9375rem, 0.25vw + 0.9rem, 1.0625rem)` / line-height: `1.6` |
| **Navigation & Buttons** | 14px | 14px | `14px` / font-weight: `600` |
| **Captions & Metadata** | 12–14px | 12–13px | `clamp(0.75rem, 0.1vw + 0.75rem, 0.8125rem)` |

---

## 4. Motion & Animation Timing

| Interaction | Duration | Easing | Implementation |
| :--- | :--- | :--- | :--- |
| **Hero staggered entrance** | 650–800ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Keyframe `heroFadeRise` staggered across copy, CTA, and phone mockup |
| **Scroll reveal** | 550ms | `cubic-bezier(0.16, 1, 0.3, 1)` | 20px subtle rise triggered once via `IntersectionObserver` |
| **Button hover / active** | 160ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Smooth background transition; `transform: scale(0.98)` on press |
| **Navigation active state** | 180ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Subtle color & indicator bar transition |
| **Walkthrough tab crossfade** | 300ms | `cubic-bezier(0.16, 1, 0.3, 1)` | 140ms fade-out, swap image source, fade-in |
| **Modal dialog open / close** | 280–300ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Backdrop fade + 16px upward rise (`modalRise`) |
| **Accordion expand / collapse** | 240ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Details/summary native transition with rotating icon |
| **Reduced motion** | 0.001ms | Instant | `@media (prefers-reduced-motion: reduce)` disables all animations |

---

## 5. Architectural Capabilities Suite

1. **AI Vehicle Diagnosis & Repair Assistance**
   - Editorial 2-column split with real-world technical consultation example (Yamaha Sniper 150 valve clearances & 10W-40 4T JASO MA2 oil).
   - Clear educational boundary notice clarifying that VehiCare prepares owners for repair conversations and does not replace physical inspection by certified mechanics.
2. **Maintenance Tracking & Smart Recommendations**
   - Asymmetric dual-card spotlight presenting the Urgent Health Center gauge (25% health rating, 8 overdue items) and proactive preventive reminders.
3. **Multi-Vehicle Garage Engineering**
   - 3-column specification comparison: Motorcycles & Scooters (wet clutch & chain slack), Cars & SUVs (OBD-II & 12V drain), Bicycles & MTBs (hydraulic mineral oil & chain stretch).
   - Triple-phone hardware showcase (`mockup-trio-showcase.png`) showing instant fleet context switching for up to 5 protected profiles.
4. **Repair Shop Locator & Searchable History**
   - Horizon split showcasing nearby workshop discovery and 20+ session activity logs with AI summaries.
5. **Garage Capacity & Pricing**
   - 2-column SaaS comparison: Free Starter Plan (&#8369;0 free forever &bull; 1 active vehicle) vs. Premium Garage (&#8369;149/month or &#8369;1,490/year &bull; 5 protected profiles).
   - Interactive card selectability with `.is-selected`, active indicator dots, and dynamic CTA elevation.
6. **AI Diagnostics Engine Configuration**
   - Standalone settings modal allowing users to configure and test a personal Google Gemini API key stored securely in `localStorage`.

---

## 6. Full-Stack System Architecture & Domain Model

1. **Client Tier (`/src` & `/android`)**: React Native 0.76+ with Android SDK 34, Firebase Authentication, and custom native theme controllers.
2. **Backend API Tier (`/backend`)**: Laravel 12 REST API with Laravel Sanctum, MySQL relational migrations, seeders, and legal consent enforcement.
3. **AI Microservice Tier (`/vehicare-ai-service`)**: Node.js & Express microservice powered by **Google Gemini 3.8 Flash**, featuring an acoustic vehicle sound validation engine, image category mismatch verification, SHA-256 deduplication, and response caching.
4. **Relational Database (`/database`)**: MySQL 8.0 schema featuring 22 normalized entity tables:
   - Core: `users`, `vehicles`, `diagnostics`, `maintenance_records`, `repair_shops`, `chat_sessions`, `chat_messages`
   - Extended: `diagnostic_media`, `ai_usage_logs`, `ai_diagnosis_caches`, `ai_runtime_settings`, `vehicle_types`, `vehicle_brands`, `vehicle_models`, `vehicle_years`

