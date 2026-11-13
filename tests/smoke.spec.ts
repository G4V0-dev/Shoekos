import { test, expect } from '@playwright/test';

/**
 * Pruebas de humo sobre el comportamiento ACTUAL del sitio.
 * Sirven como línea base antes de refactorizar.
 */

test.describe('Home (index.html)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('carga con título y encabezado correctos', async ({ page }) => {
    await expect(page).toHaveTitle('Shoekos');
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Sneaker's");
  });

  test('renderiza las 6 cards de productos', async ({ page }) => {
    await expect(page.locator('.card')).toHaveCount(6);
    await expect(page.locator('.card-title')).toHaveCount(6);
  });

  test('el navbar enlaza a contactenos y al carrito', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Contáctenos' })).toHaveAttribute(
      'href',
      './contactenos.html',
    );
    await expect(page.getByRole('link', { name: 'Carrito de Compras' })).toHaveAttribute(
      'href',
      './compras.html',
    );
  });

  test('añadir al carrito desde la primera card muestra confirmación', async ({ page }) => {
    let message = '';
    page.once('dialog', async (dialog) => {
      message = dialog.message();
      await dialog.dismiss();
    });

    await page.locator('.add-to-cart').first().click();
    expect(message).toContain('Producto añadido');
  });

  test('los precios de las cards se muestran en formato local', async ({ page }) => {
    const prices = page.locator('.card h3');
    await expect(prices).toHaveCount(6);
    await expect(prices.first()).toContainText('27.500 USD');
  });
});

test.describe('Carrito (compras.html)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/compras.html');
  });

  test('carga con la tabla vacía y total en cero', async ({ page }) => {
    await expect(page).toHaveTitle('Carrito de Compras - Shoekos');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Carrito de Compras');
    await expect(page.locator('#cart-items tr')).toHaveCount(0);
    await expect(page.locator('#total-price')).toHaveText('0.00');
  });

  test('proceder al pago muestra el total actual', async ({ page }) => {
    let message = '';
    page.once('dialog', async (dialog) => {
      message = dialog.message();
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Proceder al Pago' }).click();
    expect(message).toContain('Total a pagar: 0.00 USD');
  });
});

test.describe('Contacto (contactenos.html)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contactenos.html');
  });

  test('muestra el formulario de contacto completo', async ({ page }) => {
    await expect(page).toHaveTitle('Contáctenos - Shoekos');
    await expect(page.getByPlaceholder('Nombre')).toBeVisible();
    await expect(page.getByPlaceholder('Correo Electrónico')).toBeVisible();
    await expect(page.getByPlaceholder('Mensaje')).toBeVisible();
  });

  test('enviar el formulario saluda al remitente', async ({ page }) => {
    await page.getByPlaceholder('Nombre').fill('Ana');
    await page.getByPlaceholder('Correo Electrónico').fill('ana@example.com');
    await page.getByPlaceholder('Mensaje').fill('Consulta de prueba');

    let message = '';
    page.once('dialog', async (dialog) => {
      message = dialog.message();
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Enviar' }).click();
    expect(message).toContain('Gracias por contactarnos, Ana');
  });

  test('muestra los tres accesos a redes sociales', async ({ page }) => {
    await expect(page.locator('.social-icons a')).toHaveCount(3);
  });
});

test.describe('Navegación entre páginas', () => {
  test('desde Home se llega a Contáctenos', async ({ page }) => {
    await page.goto('/index.html');
    await page.getByRole('link', { name: 'Contáctenos' }).click();
    await expect(page).toHaveURL(/contactenos\.html$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Contáctenos');
  });

  test('desde Contáctenos se vuelve a Home', async ({ page }) => {
    await page.goto('/contactenos.html');
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(/index\.html$/);
  });
});
