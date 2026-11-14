# Shoekos — Design System (Remaster)

## 1. Brand identity

**Shoekos** is a curated sneaker boutique for limited drops and archive pairs (1999–2022).
Positioning: *hype archive / drop culture*, not a generic sports store.

- **Personality:** confident, editorial, high-contrast, collector-grade.
- **Audience:** 18–35, sneakerheads, streetwear, resale culture.
- **Tone of voice:** short, declarative, Spanish (Colombia). No exclamation marks, no corporate filler.
- **Writing rules:** uppercase for micro-labels, italic only for model nicknames, prices always as `1.800 USD`.

> Brand house is **Shoekos**. The legacy copy says *"Calzado Ilimitado"* — replace it with Shoekos everywhere.

## 2. Color tokens

The system ships **two themes with identical structure** (same token names, different values).
Accent volt and signal red are brand constants and must not be recolored per theme.

### Dark (primary theme)

| Token | Value | Use |
| --- | --- | --- |
| `bg/base` | `#0A0A0A` | page background |
| `bg/sunken` | `#050505` | footer, marquee strip |
| `surface/1` | `#121212` | cards, navbar |
| `surface/2` | `#1A1A1A` | inputs, chips, hover |
| `surface/3` | `#242424` | pressed state |
| `border/subtle` | `#2A2A2A` | dividers, card outline |
| `border/strong` | `#3D3D3D` | focused/hovered outline |
| `text/primary` | `#F5F5F3` | headings, body |
| `text/secondary` | `#A1A1A1` | metadata, helper |
| `text/disabled` | `#5C5C5C` | disabled |
| `accent/volt` | `#DFFF4F` | primary CTA, active state, highlights |
| `accent/volt-ink` | `#0A0A0A` | text on volt |
| `accent/red` | `#FF3B30` | "LIMITADA" badge, errors |
| `accent/red-ink` | `#FFFFFF` | text on red |

### Light (secondary theme)

| Token | Value | Use |
| --- | --- | --- |
| `bg/base` | `#F5F4F0` | warm paper background |
| `bg/sunken` | `#EDEBE5` | footer, marquee strip |
| `surface/1` | `#FFFFFF` | cards, navbar |
| `surface/2` | `#F0EEE8` | inputs, chips |
| `surface/3` | `#E4E1D8` | pressed state |
| `border/subtle` | `#DAD6CC` | dividers |
| `border/strong` | `#0A0A0A` | hover outline |
| `text/primary` | `#0A0A0A` | headings, body |
| `text/secondary` | `#5A574F` | metadata |
| `text/disabled` | `#A8A49A` | disabled |
| `accent/volt` | `#DFFF4F` | highlight fill, price marker |
| `accent/volt-ink` | `#0A0A0A` | text on volt |
| `accent/red` | `#FF3B30` | badge, errors |
| `accent/red-ink` | `#FFFFFF` | text on red |

**Light-mode rule:** the *primary CTA* becomes `text/primary` (`#0A0A0A`) with white text; volt is used only as an accent fill/marker. Never use volt text on light backgrounds (contrast fails).

## 3. Typography

Fonts available in Stitch and chosen for this system:

- **Display / headlines:** `Anton` — uppercase, tight tracking, 48–112px. Always uppercase.
- **Body / UI:** `Inter` — 400/500/600.
- **Labels / prices / SKU:** `JetBrains Mono` — 500, tabular numerals, uppercase.

| Level | Font | Size (desktop / mobile) | Weight | Tracking | Line height |
| --- | --- | --- | --- | --- | --- |
| display-xl | Anton | 112 / 56 px | 400 | -0.02em | 0.92 |
| display-lg | Anton | 72 / 44 px | 400 | -0.01em | 0.95 |
| heading-lg | Anton | 40 / 32 px | 400 | 0 | 1.0 |
| heading-md | Inter | 24 / 20 px | 600 | -0.01em | 1.25 |
| body-lg | Inter | 18 / 16 px | 400 | 0 | 1.6 |
| body-md | Inter | 16 / 15 px | 400 | 0 | 1.6 |
| body-sm | Inter | 14 / 13 px | 400 | 0 | 1.5 |
| label | JetBrains Mono | 11 / 11 px | 500 | 0.12em | 1.4 |
| price | JetBrains Mono | 20 / 18 px | 500 | 0 | 1.2 |

**Rule:** maximum two display sizes per screen. Section labels are always `label` + uppercase.

## 4. Spacing, grid, shape

- Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128.
- Page max-width **1280px**, gutters **24px desktop**, **16px mobile**.
- Section vertical rhythm: **96px desktop**, **64px mobile**; 48px on mobile between related blocks.
- Grid: 12 columns desktop, 4 columns mobile. Product grid: **3 up desktop**, **2 up tablet**, **1.15 up mobile** (horizontal peek carousel).
- Radius: cards **12px**, inputs **8px**, buttons **999px (pill)**, badges **4px**.
- Shadows: none. Depth comes from borders and surface steps. Only the sticky cart summary gets `0 24px 60px rgba(0,0,0,.45)` in dark / `rgba(10,10,10,.12)` in light.
- 1px hairline borders everywhere; no gradients except a single subtle top-down scrim over hero imagery.

## 5. Components

### Navbar (sticky, 72px desktop / 60px mobile)
- Left: wordmark `SHOEKOS` in Anton, 20px, tracking 0.08em.
- Center: `Colección` · `Archivo` · `Contáctenos` (Inter 14, active = volt underline 2px).
- Right: theme toggle (sun/moon, 44px hit area) · search icon · cart icon with count badge (volt pill, black number).
- Dark: `surface/1` + `border/subtle`. Light: `surface/1` + `border/subtle`.

### Announcement marquee (32px, `bg/sunken`)
`ENVÍO GRATIS DESDE 500.000 · AUTENTICIDAD GARANTIZADA · CAMBIOS EN 30 DÍAS` in `label`, repeated, 6s loop, reduced-motion static.

### Hero
- Full-bleed image (sneaker on concrete / studio), 60vh desktop / 52vh mobile, dark scrim.
- Eyebrow: `DROP 014 — ARCHIVO 1999/2022` in volt `label`.
- H1: `SNEAKER'S` / `EDICIÓN` / `LIMITADA` stacked, Anton display-xl, "LIMITADA" in volt.
- Subcopy: 2 lines max, `text/secondary` (dark) / `text/secondary` (light).
- CTAs: primary pill `EXPLORAR DROP` (volt/dark, black/light), secondary outline `VER ARCHIVO`.
- Bottom-right: `01 / 06` counter in mono.

### Filter bar (below hero, sticky under navbar)
- Pills: `Todos` · `Basquetbol` · `Casual` · `Running` · `Deportivo`; active = volt fill, black text, inverted in light mode to black fill/white text.
- Right: `6 PIEZAS` count in label + `ORDENAR: DESTACADOS` dropdown.

### Product card (the signature component)
- Frame 4:5, `surface/1`, 1px `border/subtle`, radius 12.
- Image fills frame with 8px inner padding (product floats), object-fit contain.
- Top-left badge: `LIMITADA` (red) or `ARCHIVO` (volt), 11px label, uppercase, 4px radius, pill-ish padding 6/10.
- Top-right: wishlist heart, 32px, ghost.
- Body (16px padding): brand line `NIKE` in label `text/secondary`; title `Dunk High "Wu Tang."` heading in Inter 600 18px with nickname italic; metadata row `US 7.5 · 1999 · CUERO` in label; price `1.800 USD` in JetBrains Mono 20 with `USD` at 11px secondary.
- Footer action: full-width outline pill `AÑADIR` that fills volt on hover (dark) / black on hover (light).
- Hover: image scale 1.04, border becomes `border/strong`, action reveals. No lift/shadow.

### Cart line item
- 72px thumb, radius 8, `surface/2` background.
- Title + size chip `US 7.5` + `ELIMINAR` text button (secondary, underline on hover).
- Qty stepper: 32px square buttons `−` / value / `+`, 1px border, mono numerals.
- Price right-aligned mono.

### Buttons
| Variant | Dark | Light |
| --- | --- | --- |
| Primary | volt bg / black text | black bg / white text |
| Secondary | transparent / 1px border / white text | transparent / 1px black border / black text |
| Ghost | text only, underline on hover | same |
All pills, height 48 (44 mobile), `label` 12px tracking 0.08em uppercase, 24px horizontal padding.

### Inputs
Height 52, `surface/2`, 1px `border/subtle`, radius 8, 16px padding, placeholder `text/disabled`.
Focus: 2px volt ring with 2px offset (dark) / 2px black ring (light). Error: 1px `accent/red` + helper text.

### Footer
4 columns: brand + claim, `Tienda`, `Ayuda`, `Síguenos` (Instagram / TikTok / WhatsApp). Newsletter input + pill button. Bottom bar: `© 2026 Shoekos` + `Términos · Privacidad · Envíos`. Payment marks as 32px monochrome pills.

## 6. Page specifications

### A. Home
1. Navbar + marquee.
2. Hero (as above).
3. Filter bar.
4. Product grid, 6 items (order below).
5. Editorial band: split 50/50 — left oversized quote `"NO VENDEMOS ZAPATOS. ARCHIVAMOS CULTURA."` in Anton, right 3-line paragraph + text link `CONOCE EL ARCHIVO →`.
6. Newsletter block: `ENTRA AL DROP LIST` + email input + `SUSCRIBIRME`.
7. Footer.

### B. Compras (carrito)
1. Navbar + breadcrumb `INICIO / CARRITO`.
2. Title `TU CARRITO` (Anton 72) + `2 PIEZAS` label.
3. Two-column: items list (left, 8 cols) + sticky summary (right, 4 cols, top 96px).
4. Items: Nike Dunk High "Wu Tang." US 7.5 — 1.800 USD ×1; Vans Old Skool "Retro" US 7 — 85 USD ×1.
5. Summary: subtotal `1.885 USD`, envío `GRATIS`, total `1.885 USD` in mono 28, pill CTA `FINALIZAR COMPRA`, note `Pago seguro · Contraentrega disponible`, promo input.
6. Below: `COMPLETA EL DROP` — 3 related cards (Louis Vuitton x Nike, Adidas Superstar, Puma RS-X).
7. Footer.

### C. Contáctenos
1. Navbar.
2. Page header: eyebrow `SOPORTE`, H1 `HABLEMOS`, one-line intro.
3. Split: left (5 cols) — editorial copy, `LUN–SÁB 10:00–19:00`, WhatsApp/email/Instagram rows with icons, Bogotá address; right (7 cols) — form card: Nombre, Email, Asunto (select: Pedido / Talla y stock / Devolución / Prensa), Mensaje, checkbox `Acepto política de datos`, pill `ENVIAR MENSAJE`.
4. FAQ accordion, 3 rows: `¿Cómo verifico autenticidad?`, `¿Hacen envíos nacionales?`, `¿Puedo cambiar la talla?`.
5. Footer.

## 7. Product data (source of truth)

| # | Brand | Model / nickname | Size | Type | Year | Price | Badge |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Nike | Dunk High "Wu Tang." | US 7.5 | Basquetbol | 1999 | 1.800 USD | LIMITADA |
| 2 | Louis Vuitton x Nike | Classic | US 9 | Deportivo | 2022 | 6.500 USD | LIMITADA |
| 3 | Adidas | Superstar "Vintage" | US 8 | Casual | 1980 | 350 USD | ARCHIVO |
| 4 | Puma | RS-X "Modern" | US 10 | Deportivo | 2020 | 110 USD | — |
| 5 | New Balance | 990 "Classic" | US 11 | Running | 2015 | 180 USD | ARCHIVO |
| 6 | Vans | Old Skool "Retro" | US 7 | Casual | 1996 | 85 USD | — |

**Pricing rule:** USD, thousands separated with a dot, no decimals (`1.800 USD`). These six values are the canonical mockup data and must match across every screen; cart total = `1.885 USD` with Nike + Vans.

## 8. Accessibility

- Text contrast ≥ 4.5:1 in both themes; volt is never used for small text on light.
- Focus visible: 2px ring, 2px offset, always volt (dark) or black (light).
- Hit targets ≥ 44×44.
- `prefers-reduced-motion`: disable marquee, hover zoom, fade-ins.
- Form fields always have visible labels, not placeholder-only.

## 9. Do / Don't

**Do**
- Use photography with real sneakers on neutral concrete/studio backgrounds.
- Keep large empty space around display type; let Anton carry the page.
- Use mono for anything numeric (price, size, year).
- Keep exactly one volt element per viewport as focal accent.

**Don't**
- Don't use Bootstrap blue, rounded-square cards with drop shadows, or carousel dots.
- Don't add gradients, glassmorphism, or neon glows.
- Don't center body copy; keep it left-aligned.
- Don't mix more than 3 type sizes in a card.
- Don't use emoji, stock "teamwork" photos, or lorem ipsum.
