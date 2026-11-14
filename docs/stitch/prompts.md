# Prompts de generación — Shoekos Remaster

Orden de ejecución. Cada pantalla es independiente: no se usan variantes automáticas, así el layout no se desvía.

**Modelo:** `GEMINI_3_8_FLASH` (mejor calidad). Si va lento, `GEMINI_3_5_FLASH_LITE` para las de modo claro.

**Design systems:** `Shoekos Dark` y `Shoekos Light` (mismos tokens, distinto `colorMode`). Se genera primero el proyecto, luego los DS, luego las pantallas con `designSystem: <id>` fijo.

---

## Fase 0 — Proyecto y design system

1. `create_project` → título `Shoekos — Remaster`, `background_theme: DARK`.
2. `upload_design_md` con `docs/stitch/DESIGN.md`.
3. `create_design_system_from_design_md` → genera `Shoekos Dark`.
4. `create_design_system` (LIGHT) con los mismos tokens y fuentes → `Shoekos Light`.

---

## Fase 1 — Validación (1 pantalla)

### 1. Home · Desktop · Dark

```
Design a premium streetwear sneaker store homepage for "SHOEKOS", desktop web 1440px, DARK MODE.
Follow the design system exactly: near-black #0A0A0A background, surfaces #121212/#1A1A1A, 1px #2A2A2A borders, text #F5F5F3, volt accent #DFFF4F, signal red #FF3B30. Fonts: Anton for display (uppercase, tight), Inter for UI, JetBrains Mono for prices and micro-labels. Cards radius 12, buttons pill.

Structure top to bottom:
1) Sticky navbar 72px: wordmark "SHOEKOS" in Anton, links Colección / Archivo / Contáctenos, sun icon theme toggle, search icon, cart icon with volt count badge "2".
2) Thin marquee strip on #050505: "ENVÍO GRATIS DESDE 500.000 · AUTENTICIDAD GARANTIZADA · CAMBIOS EN 30 DÍAS".
3) Hero 60vh, full-bleed photo of a single sneaker floating on dark concrete, dark scrim. Eyebrow in volt mono: "DROP 014 — ARCHIVO 1999/2022". H1 stacked in Anton, 112px: "SNEAKER'S" / "EDICIÓN" / "LIMITADA" with LIMITADA in volt. Two CTAs: pill "EXPLORAR DROP" (volt, black text) and outline "VER ARCHIVO". Bottom right "01 / 06" in mono.
4) Filter row: pills Todos (active volt) / Basquetbol / Casual / Running / Deportivo; right side "6 PIEZAS" and "ORDENAR: DESTACADOS".
5) Product grid, 3 columns × 2 rows, 24px gap. Each card: 4:5 frame, product photo with padding, badge top-left, heart top-right, brand in mono secondary, title with italic nickname, metadata "US 7.5 · 1999 · CUERO", price in mono "1.800 USD", full-width outline pill "AÑADIR".
   Products in order: NIKE Dunk High "Wu Tang." 1.800; LOUIS VUITTON x NIKE Classic 6.500; ADIDAS Superstar "Vintage" 350; PUMA RS-X "Modern" 110; NEW BALANCE 990 "Classic" 180; VANS Old Skool "Retro" 85.
6) Editorial band: left oversized Anton quote "NO VENDEMOS ZAPATOS. ARCHIVAMOS CULTURA.", right short paragraph and link "CONOCE EL ARCHIVO →".
7) Newsletter block "ENTRA AL DROP LIST" with email input and pill button "SUSCRIBIRME".
8) Footer: 4 columns (brand claim, Tienda, Ayuda, Síguenos), payment marks, legal bar.

Real Spanish copy, no lorem ipsum, no emoji, no gradients, no shadows.
```

---

## Fase 2 — Resto en oscuro (5 pantallas)

### 2. Home · Mobile · Dark

```
Same SHOEKOS streetwear identity and the same DARK design system, but mobile web 390×844.
Navbar 60px: wordmark left, cart icon with badge and hamburger right.
Hero 52vh with the sneaker photo, eyebrow mono volt, H1 Anton 56px stacked "SNEAKER'S / EDICIÓN / LIMITADA", primary pill "EXPLORAR DROP", outline "VER ARCHIVO".
Horizontal scroll filter chips with Todos active in volt, first and part of second chip visible.
Product list as a horizontal peek carousel: first card 88% width, next card peeking 12%, 4:5 image, same metadata and "AÑADIR" pill. Show Nike Dunk High "Wu Tang." 1.800 first.
Then a full-width editorial card with the Anton quote on #121212, the drop list email block, and a compact footer with the SHOEKOS wordmark and three link rows.
Sticky bottom bar is NOT used. Keep 16px gutters, 64px section spacing, real Spanish copy.
```

### 3. Compras · Desktop · Dark

```
SHOEKOS cart page, desktop web 1440px, DARK design system (same tokens and fonts as the homepage).
Navbar identical to the homepage. Breadcrumb "INICIO / CARRITO" in mono secondary.
Header row: "TU CARRITO" in Anton 72px and "2 PIEZAS" in mono volt.
Two columns: 8-col items list, 4-col sticky summary card.
Items, each separated by a 1px #2A2A2A divider, 72px thumbnail on #1A1A1A:
- NIKE Dunk High "Wu Tang." — chip "US 7.5" — qty stepper 1 — 1.800 USD.
- VANS Old Skool "Retro" — chip "US 7" — qty stepper 1 — 85 USD.
Each with "ELIMINAR" ghost link and qty stepper with − / + 32px square buttons.
Summary card on #121212, radius 12, 1px border, padding 24: rows "SUBTOTAL 1.885 USD", "ENVÍO GRATIS" in volt, divider, "TOTAL 1.885 USD" in mono 28, promo code input, primary pill "FINALIZAR COMPRA" full width, note "Pago seguro · Contraentrega disponible".
Below the grid, section "COMPLETA EL DROP" with 3 smaller product cards: LOUIS VUITTON x NIKE 6.500, ADIDAS Superstar "Vintage" 350, PUMA RS-X "Modern" 110.
Footer identical to homepage. Real Spanish copy, no lorem.
```

### 4. Compras · Mobile · Dark

```
SHOEKOS cart page, mobile web 390×844, DARK design system, same identity as the desktop cart.
Compact navbar with cart badge. Breadcrumb "INICIO / CARRITO". Title "TU CARRITO" Anton 44px, "2 PIEZAS" mono volt.
Two stacked line items, full width, 64px thumbnail, title + size chip, qty stepper, price in mono; "ELIMINAR" below each.
Then a summary block on #121212: SUBTOTAL, ENVÍO, TOTAL in mono 24, promo input, primary volt pill "FINALIZAR COMPRA".
Sticky bottom purchase bar: total on the left in mono, volt pill "FINALIZAR" on the right, 1px top border.
Then "COMPLETA EL DROP" as a horizontal peek carousel of 3 cards.
Compact footer. Real Spanish copy, 16px gutters, 44px minimum touch targets.
```

### 5. Contáctenos · Desktop · Dark

```
SHOEKOS contact page, desktop web 1440px, DARK design system, same navbar, marquee and footer.
Page header: eyebrow "SOPORTE" in mono volt, H1 "HABLEMOS" in Anton 72px, one-line intro in Inter secondary.
Split layout 5/7 with 48px gap.
Left column: short editorial paragraph about authenticity and service; block with "LUN–SÁB 10:00–19:00" in mono; three contact rows with line icons and mono labels: WhatsApp +57 300 000 0000, hola@shoekos.co, @shoekos; address "Bogotá, Colombia"; small note "Respuesta en menos de 24 h hábiles".
Right column: form card on #121212, radius 12, 1px border, padding 32. Fields: Nombre, Email, Asunto (select: Pedido / Talla y stock / Devolución / Prensa), Mensaje (textarea 5 rows), checkbox "Acepto la política de datos", full-width volt pill "ENVIAR MENSAJE". Visible labels above every field in mono 11px uppercase, inputs #1A1A1A radius 8.
Below: FAQ accordion with 3 collapsed rows: "¿Cómo verifico la autenticidad?", "¿Hacen envíos nacionales?", "¿Puedo cambiar la talla?".
Real Spanish copy, no lorem, no emoji, no gradients.
```

### 6. Contáctenos · Mobile · Dark

```
SHOEKOS contact page, mobile web 390×844, DARK design system.
Compact navbar. Eyebrow "SOPORTE", H1 "HABLEMOS" Anton 44px, one-line intro.
Stacked contact rows with icons (WhatsApp, email, Instagram, address), mono labels, separated by 1px borders.
Form card on #121212 with stacked fields, visible uppercase mono labels, 52px inputs, select, 4-row textarea, checkbox, full-width volt pill "ENVIAR MENSAJE".
FAQ accordion with 3 rows below.
Compact footer. Real Spanish copy, 16px gutters, 44px targets.
```

---

## Fase 3 — Modo claro (6 pantallas)

Repetir las 6 pantallas anteriores con `Shoekos Light` y `LIGHT MODE`, con este bloque añadido al inicio del prompt:

```
Render the exact same layout, hierarchy, spacing and component structure, but in LIGHT MODE using the Shoekos Light tokens: background #F5F4F0, cards #FFFFFF, sunken bands #EDEBE5, borders #DAD6CC, text #0A0A0A, secondary #5A574F. Volt #DFFF4F stays as an accent fill only; primary buttons become solid #0A0A0A with white text. Keep Anton, Inter and JetBrains Mono. Do not invert images or photography; keep the same dark sneaker photos on light surfaces with 1px borders.
```

Nombres de pantalla: `Home · Desktop · Light`, `Home · Mobile · Light`, `Carrito · Desktop · Light`, `Carrito · Mobile · Light`, `Contacto · Desktop · Light`, `Contacto · Mobile · Light`.

---

## Lista negra (incluir al final de cada prompt si algo se desvía)

```
Avoid: Bootstrap default blue, drop shadows, gradients, glassmorphism, neon glow, rounded-square cards, carousel dots, centered body text, stock office photos, emoji, lorem ipsum, more than two display sizes per screen.
```
