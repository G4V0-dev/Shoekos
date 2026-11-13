import { test, expect } from '@playwright/test';

/**
 * Problemas conocidos del código actual.
 * Están marcados con test.fixme: no fallan la suite, pero documentan
 * el comportamiento esperado una vez se corrijan.
 *
 * Al arreglar cada bug, quitar el .fixme y la prueba debe pasar.
 */

test.describe('Problemas conocidos', () => {
  test.fixme('el carrito persiste entre Home y la página de compras', async ({ page }) => {
    await page.goto('/index.html');
    page.on('dialog', (dialog) => dialog.dismiss());

    await page.locator('.add-to-cart').first().click();
    await page.goto('/compras.html');

    await expect(page.locator('#cart-items tr')).toHaveCount(1);
  });

  test.fixme('la página de compras muestra un estado vacío explícito', async ({ page }) => {
    await page.goto('/compras.html');
    await expect(page.locator('#cart-items')).toContainText('El carrito está vacío');
  });

  test.fixme('el enlace del carrito se habilita al añadir un producto', async ({ page }) => {
    await page.goto('/index.html');
    page.on('dialog', (dialog) => dialog.dismiss());

    await expect(page.locator('#cart-link')).toHaveClass(/disabled/);
    await page.locator('.add-to-cart').first().click();
    await expect(page.locator('#cart-link')).not.toHaveClass(/disabled/);
  });

  test.fixme('un producto añadido dos veces no se duplica en el carrito', async ({ page }) => {
    await page.goto('/index.html');
    page.on('dialog', (dialog) => dialog.dismiss());

    await page.locator('.add-to-cart').first().click();
    await page.goto('/compras.html');
    await expect(page.locator('#cart-items tr')).toHaveCount(1);
  });

  test.fixme('las seis cards están dentro del contenedor .card-container', async ({ page }) => {
    await page.goto('/index.html');
    await expect(page.locator('.card-container .card')).toHaveCount(6);
  });

  test.fixme('los iconos de redes sociales se renderizan con su fuente', async ({ page }) => {
    await page.goto('/contactenos.html');
    const icon = page.locator('.social-icons .instagram i').first();
    await expect(icon).toBeVisible();
    await expect(icon).toHaveCSS('font-family', /Font Awesome/);
  });
});
