import { test, expect } from '@playwright/test';

/**
 * Pruebas de la remasterización: home, catálogo, filtros y carrito visual.
 */

test.describe('Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('carga con title, hero y meta description', async ({ page }) => {
    await expect(page).toHaveTitle(/Shoekos/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText("Sneaker's");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /archivo/i);
  });

  test('renderiza las 6 piezas con badge y precio en USD', async ({ page }) => {
    const cards = page.locator('[data-product-card]');
    await expect(cards).toHaveCount(6);

    await expect(cards.nth(0)).toContainText('Dunk High');
    await expect(cards.nth(0)).toContainText('1.800');
    await expect(cards.nth(5)).toContainText('Old Skool');
    await expect(cards.nth(5)).toContainText('85');

    await expect(page.locator('[data-product-card] .badge--red')).toHaveCount(2);
    await expect(page.locator('[data-product-card] .badge--volt')).toHaveCount(2);
  });

  test('el navbar enlaza a contacto y carrito', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Contáctenos' })).toHaveAttribute('href', './contactenos.html');
    await expect(page.getByRole('link', { name: 'Carrito de compras' })).toHaveAttribute('href', './compras.html');
  });

  test('los filtros reducen el catálogo y actualizan el contador', async ({ page }) => {
    await page.getByRole('button', { name: 'Casual', exact: true }).click();
    await expect(page.locator('[data-product-card]:visible')).toHaveCount(2);
    await expect(page.locator('[data-product-count]')).toHaveText('2');

    await page.getByRole('button', { name: 'Todos', exact: true }).click();
    await expect(page.locator('[data-product-card]:visible')).toHaveCount(6);
    await expect(page.locator('[data-product-count]')).toHaveText('6');
  });

  test('la búsqueda filtra por nombre', async ({ page }) => {
    await page.getByRole('button', { name: 'Buscar' }).click();
    await page.getByRole('searchbox').fill('vans');
    await expect(page.locator('[data-product-card]:visible')).toHaveCount(1);
    await expect(page.locator('[data-product-card]:visible')).toContainText('Old Skool');
  });

  test('añadir al carrito actualiza el contador y muestra confirmación', async ({ page }) => {
    await expect(page.locator('.nav__count')).toBeHidden();
    await page.locator('[data-add-to-cart]').first().click();
    await expect(page.locator('.nav__count')).toHaveText('1');
    await expect(page.locator('[data-toast]')).toContainText('Nike Dunk High Wu Tang');
  });

  test('el selector de tema alterna claro/oscuro y persiste', async ({ page }) => {
    const html = page.locator('html');
    const initial = await html.getAttribute('data-theme');

    await page.locator('[data-theme-toggle]').click();
    const next = initial === 'dark' ? 'light' : 'dark';
    await expect(html).toHaveAttribute('data-theme', next);

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', next);

    await page.evaluate(() => localStorage.removeItem('shoekos-theme'));
  });

  test('el newsletter valida el correo sin enviar', async ({ page }) => {
    await page.locator('#newsletter-email').fill('no-es-correo');
    await page.getByRole('button', { name: 'Suscribirme' }).click();
    await expect(page.locator('[data-newsletter-status]')).toContainText('correo válido');

    await page.locator('#newsletter-email').fill('ana@example.com');
    await page.getByRole('button', { name: 'Suscribirme' }).click();
    await expect(page.locator('[data-newsletter-status]')).toContainText('demo');
  });
});

test.describe('Navegación', () => {
  test('desde Home se llega a Contáctenos', async ({ page }) => {
    await page.goto('/index.html');
    await page.getByRole('link', { name: 'Contáctenos' }).click();
    await expect(page).toHaveURL(/contactenos\.html$/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hablemos');
  });

  test('desde Contáctenos se vuelve a la colección', async ({ page }) => {
    await page.goto('/contactenos.html');
    await page.getByRole('link', { name: 'Colección', exact: true }).click();
    await expect(page).toHaveURL(/index\.html$/);
  });
});
