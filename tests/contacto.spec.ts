import { test, expect } from '@playwright/test';

/**
 * Contacto: validación de formulario y FAQ. No hay backend en GitHub Pages,
 * así que el envío es una simulación explícita.
 */

test.describe('Contacto', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contactenos.html');
  });

  test('muestra encabezado, formulario y datos de contacto', async ({ page }) => {
    await expect(page).toHaveTitle(/Hablemos/);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hablemos');
    await expect(page.locator('#nombre')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#mensaje')).toBeVisible();
    await expect(page.getByText('+57 300 000 0000')).toBeVisible();
  });

  test('bloquea el envío con campos vacíos', async ({ page }) => {
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.locator('[data-form-status]')).toContainText('Revisa los campos');
    await expect(page.locator('.hint').first()).toContainText('obligatorio');
  });

  test('valida el formato del correo', async ({ page }) => {
    await page.locator('#nombre').fill('Ana');
    await page.locator('#email').fill('ana-sin-arroba');
    await page.locator('#mensaje').fill('Consulta de prueba');
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.getByText('Correo no válido')).toBeVisible();
  });

  test('exige aceptar la política de datos', async ({ page }) => {
    await page.locator('#nombre').fill('Ana');
    await page.locator('#email').fill('ana@example.com');
    await page.locator('#mensaje').fill('Consulta de prueba');
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.locator('.hint')).toContainText('política de datos');
  });

  test('con datos válidos confirma que es un demo', async ({ page }) => {
    await page.locator('#nombre').fill('Ana');
    await page.locator('#email').fill('ana@example.com');
    await page.locator('#asunto').selectOption('talla');
    await page.locator('#mensaje').fill('Consulta de prueba');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Enviar mensaje' }).click();
    await expect(page.locator('[data-form-status]')).toContainText('no envía correos');
  });

  test('la FAQ se despliega', async ({ page }) => {
    const first = page.locator('.faq details').first();
    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');
    await expect(first).toContainText('luz UV');
  });
});
