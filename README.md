# Shoekos

Sitio estático de e-commerce (HTML + Bootstrap 5 + jQuery) con tres páginas:

- `index.html` — catálogo de sneakers
- `compras.html` — carrito de compras
- `contactenos.html` — formulario de contacto y redes sociales

## Entorno local

Requiere Node.js 18+ y Python 3 (para el servidor estático).

```bash
npm install
npx playwright install chromium   # solo la primera vez
```

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run serve` | Sirve el sitio en http://127.0.0.1:8080 |
| `npm test` | Ejecuta la suite E2E de Playwright (levanta el servidor solo) |
| `npm run test:headed` | Igual, con navegador visible |
| `npm run test:ui` | Modo interactivo de Playwright |
| `npm run test:report` | Abre el reporte HTML del último run |

## Estructura de pruebas

- `tests/smoke.spec.ts` — línea base del comportamiento actual (debe pasar siempre).
- `tests/known-issues.spec.ts` — bugs conocidos marcados con `test.fixme`.
  Al corregir un bug, quitar el `.fixme` y la prueba debe pasar.

## Problemas conocidos

1. El carrito no persiste: `script.js` usa memoria y `compras.html` lee de `localStorage`.
2. `toggleCartItem` está duplicada (inline en `index.html` solo lanza un `alert`).
3. Las cards 4–6 están fuera de `.card-container`.
4. `script.js` se carga dos veces.
5. `renderCart()` está definido dos veces en `compras.html`.
6. Los iconos de Font Awesome no cargan el CSS en `contactenos.html`.
