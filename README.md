# Shoekos

Landing de e-commerce para un archivo curado de sneakers de colección. Sitio estático (HTML, CSS y JavaScript sin dependencias), pensado para publicarse en GitHub Pages.

![Shoekos](assets/img/og-shoekos.jpg)

## Estado

Remaster completo del sitio original: mismo dominio conceptual (catálogo de 6 piezas, carrito y contacto), nuevo sistema visual, nueva estructura y suite de pruebas reescrita.

## Demo local

```bash
npm install                      # solo para los tests (Playwright)
npm run serve                    # http://127.0.0.1:8080
```

También sirve cualquier servidor estático:

```bash
python3 -m http.server 8080
```

> No hay build ni paso de compilación: los archivos se publican tal cual.

## Estructura

```
.
├── index.html              # Home: hero, filtros, catálogo, manifiesto, newsletter
├── compras.html            # Carrito (demo visual) + piezas relacionadas
├── contactenos.html        # Soporte, formulario validado y FAQ
├── assets/
│   ├── css/site.css        # Tokens + todos los componentes (único CSS)
│   ├── js/site.js          # Tema, filtros, búsqueda, carrito demo, validaciones
│   └── img/                # Imágenes del hero y producto (.webp) + og-image
├── docs/stitch/
│   ├── DESIGN.md           # Design system: tokens, tipografía, componentes, páginas
│   └── prompts.md          # Prompts usados para generar los mockups en Stitch
├── tests/                  # Playwright: smoke, carrito, contacto
├── legacy/                 # Versión anterior (Bootstrap + jQuery), no referenciada
└── playwright.config.ts
```

## Qué hace

| Función | Detalle |
| --- | --- |
| Catálogo | 6 piezas con marca, modelo, talla, año, material y precio en USD |
| Filtros | Por tipo (basquetbol, casual, running, deportivo) con contador en vivo |
| Búsqueda | Filtra el catálogo por marca, modelo o nickname |
| Orden | Destacados, precio asc/desc, año |
| Carrito demo | Añadir desde el home actualiza el badge y muestra un toast; en `compras.html` se pueden cambiar cantidades, eliminar piezas y ver el total recalcularse |
| Estado vacío | Aparece al eliminar todas las piezas del carrito |
| Tema | Oscuro por defecto, claro opcional; respeta `prefers-color-scheme` y persiste en `localStorage` |
| Contacto | Validación de campos, email y política de datos; FAQ desplegable |
| Newsletter | Validación de correo en cliente |
| Responsive | 3 columnas → 2 → 1, navbar con menú móvil y barra de compra fija en el carrito |
| Accesibilidad | Foco visible, etiquetas asociadas, `aria-*` en controles, contraste AA, `prefers-reduced-motion` |

## Qué NO hace

Estas limitaciones son intencionales para un sitio estático en GitHub Pages:

- **No procesa pagos.** El botón “Finalizar compra” solo muestra un aviso de demo.
- **No envía correos.** El formulario valida y confirma en pantalla, pero no hay backend ni servicio conectado.
- **El carrito no persiste entre páginas.** Vive en memoria: al navegar se reinicia con las dos piezas de ejemplo de `compras.html`.
- **No hay cuentas, login ni stock real.** Los productos están escritos en el HTML.
- **No hay panel de administración ni base de datos.**
- **Búsqueda y filtros son del lado del cliente**, sobre las 6 piezas presentes en la página.
- **Sin analítica ni cookies de terceros.**

Para convertirlo en tienda real habría que añadir pasarela de pago (Stripe/Wompi/Mercado Pago), un backend de pedidos e inventario, y un servicio de correo (Formspree, Resend, etc.).

## Diseño

El sistema visual se generó con **Google Stitch** y luego se tradujo a CSS propio.

- Proyecto en Stitch: `https://stitch.withgoogle.com/projects/8336219123257505995`
- Design system documentado: [`docs/stitch/DESIGN.md`](docs/stitch/DESIGN.md)
- Prompts de las 12 pantallas (3 páginas × desktop/mobile × dark/light): [`docs/stitch/prompts.md`](docs/stitch/prompts.md)

Decisiones clave:

- **Paleta:** negro `#0A0A0A`, superficies `#121212` / `#1A1A1A`, volt `#DFFF4F`, rojo señal `#FF3B30`; modo claro sobre papel cálido `#F5F4F0`.
- **Tipografía:** Anton (display), Inter (UI), JetBrains Mono (precios, tallas, micro-labels).
- **Forma:** cards de 12 px, inputs de 8 px, botones tipo pill, badges de 4 px. Sin sombras ni gradientes.
- **Modo claro:** el volt solo se usa como relleno; los CTAs primarios pasan a negro sólido.

## Tecnologías

- **HTML5** semántico, sin framework.
- **CSS** con custom properties (tokens), Grid y Flexbox; un solo archivo.
- **JavaScript** ES5-compatible en sintaxis, sin dependencias ni bundler.
- **Google Fonts** (Anton, Inter, JetBrains Mono) con `preconnect` y `display=swap`.
- **Playwright** para pruebas end-to-end.
- **GitHub Pages** como hosting.

## Pruebas

```bash
npm test              # suite completa (levanta el servidor solo)
npm run test:headed   # navegador visible
npm run test:ui       # modo interactivo
npm run test:report   # reporte HTML del último run
```

Cobertura actual: 23 pruebas en Chromium.

- `tests/smoke.spec.ts` — home, catálogo, badges, filtros, búsqueda, carrito, tema, newsletter y navegación.
- `tests/carrito.spec.ts` — totales, cantidades, eliminación, estado vacío y barra móvil.
- `tests/contacto.spec.ts` — validaciones, política de datos y FAQ.

## Publicar en GitHub Pages

1. Sube los cambios a `main`.
2. En el repositorio: **Settings → Pages**.
3. En *Source* elige **Deploy from a branch**.
4. Branch: **main**, carpeta: **/ (root)**. Guarda.
5. En 1–2 minutos el sitio queda en `https://<usuario>.github.io/Shoekos/`.

El archivo `.nojekyll` desactiva el procesamiento de Jekyll para que los archivos se sirvan sin filtros.

## Imágenes

Las fotos de producto y el hero fueron generadas con Stitch/Gemini para el mockup y se incluyen como material de demostración. Son imágenes sintéticas con siluetas de modelos reales: si publicas el proyecto de forma comercial, reemplázalas por fotografía propia o licenciada.

## Legacy

`legacy/` conserva la versión anterior del sitio (Bootstrap 5 + jQuery, CSS duplicado, carrito con `alert`). No se referencia desde las páginas actuales y se mantiene solo como referencia histórica.
