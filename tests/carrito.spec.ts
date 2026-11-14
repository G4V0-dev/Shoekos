import { test, expect } from '@playwright/test';

/**
 * El carrito es de demostración: vive en memoria y no persiste entre páginas.
 * Estas pruebas cubren los cálculos y estados dentro de compras.html.
 */

test.describe('Carrito', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/compras.html');
  });

  test('muestra dos piezas y el total correcto', async ({ page }) => {
    await expect(page).toHaveTitle(/carrito/i);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tu carrito');
    await expect(page.locator('[data-cart-row]')).toHaveCount(2);
    await expect(page.locator('.summary__total output')).toHaveText('1.885 USD');
    await expect(page.locator('.nav__count')).toHaveText('2');
  });

  test('sumar unidades recalcula total, piezas y badge', async ({ page }) => {
    await page.locator('[data-qty-plus]').first().click();
    await expect(page.locator('[data-qty]').first()).toHaveText('2');
    await expect(page.locator('.summary__total output')).toHaveText('3.685 USD');
    await expect(page.locator('[data-pieces]').first()).toHaveText('3');
    await expect(page.locator('.nav__count')).toHaveText('3');
  });

  test('quitar una unidad no baja de 1', async ({ page }) => {
    await page.locator('[data-qty-minus]').first().click();
    await expect(page.locator('[data-qty]').first()).toHaveText('1');
    await expect(page.locator('.summary__total output')).toHaveText('1.885 USD');
  });

  test('eliminar piezas deja el estado vacío', async ({ page }) => {
    await page.locator('[data-remove]').first().click();
    await expect(page.locator('[data-cart-row]')).toHaveCount(1);
    await expect(page.locator('.summary__total output')).toHaveText('85 USD');

    await page.locator('[data-remove]').first().click();
    await expect(page.locator('[data-cart-row]')).toHaveCount(0);
    await expect(page.locator('[data-cart-empty]')).toBeVisible();
    await expect(page.locator('[data-cart-content]')).toBeHidden();
  });

  test('finalizar compra avisa que es un demo', async ({ page }) => {
    await page.locator('.summary [data-checkout]').click();
    await expect(page.locator('[data-toast]')).toContainText('Demo');
  });

  test('en móvil aparece la barra inferior con el total', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('[data-cart-bar]')).toBeVisible();
    await expect(page.locator('[data-cart-bar] output')).toHaveText('1.885 USD');
  });

  test('en escritorio la barra inferior está oculta', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(page.locator('[data-cart-bar]')).toBeHidden();
  });
});
