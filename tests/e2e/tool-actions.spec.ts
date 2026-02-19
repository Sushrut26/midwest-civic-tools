import { expect, test } from '@playwright/test';

test('minimum wage tool controls toggle correctly', async ({ page }) => {
  await page.goto('/tools/min-wage');

  const tippedSwitch = page.getByRole('switch', { name: 'Toggle tipped wage display' });
  const before = await tippedSwitch.getAttribute('aria-checked');
  expect(before).toBeTruthy();
  await tippedSwitch.click();
  await expect.poll(async () => tippedSwitch.getAttribute('aria-checked')).not.toBe(before);

  const indianaButton = page.getByRole('button', { name: 'Indiana' });
  await expect(indianaButton).toHaveAttribute('aria-pressed', 'true');
  await indianaButton.click();
  await expect(indianaButton).toHaveAttribute('aria-pressed', 'false');
});

test('benefits cliff values react to income changes', async ({ page }) => {
  await page.goto('/tools/benefits-cliff');
  await page.getByLabel('Monthly gross income in dollars').fill('6000');
  await expect(page.getByText(/SNAP not available/i)).toBeVisible();
});

test('snap checker search and status filters work', async ({ page }) => {
  await page.goto('/tools/snap-checker');

  await page.getByLabel('Search SNAP items').fill('Snickers');
  await expect(page.getByText('Snickers Bar')).toBeVisible();
  await expect(page.getByText('✗ NOT ELIGIBLE').first()).toBeVisible();

  await page.getByRole('button', { name: '✅ Eligible' }).click();
  await expect(page.getByText('Snickers Bar')).toHaveCount(0);
});

test('scholarship calculator shows estimate after selecting county and corporation', async ({ page }) => {
  await page.goto('/tools/scholarship-calc');

  const countySelect = page.locator('#county-select');
  await expect.poll(async () => countySelect.locator('option').count()).toBeGreaterThan(1);
  await countySelect.selectOption({ index: 1 });

  const corpSelect = page.locator('#corp-select');
  await expect(corpSelect).toBeEnabled();
  await expect.poll(async () => corpSelect.locator('option').count()).toBeGreaterThan(1);
  await corpSelect.selectOption({ index: 1 });

  await expect(page.getByText('Estimated Scholarship')).toBeVisible();
  await expect(page.getByText('/year per student')).toBeVisible();
});

test('data rights tool generates a request letter', async ({ page }) => {
  await page.goto('/tools/data-rights');

  await page.locator('#your-name').fill('Jane Example');
  await page.locator('#your-email').fill('jane@example.com');
  await page.locator('#your-address').fill('123 Main St, Indianapolis, IN 46201');
  await page.locator('#company-name').fill('Acme Corp');
  await page.getByRole('button', { name: 'Generate letter' }).click();

  await expect(page.locator('#letter-output')).toBeVisible();
  await expect(page.locator('#letter-output')).toContainText('Subject:');
  await expect(page.locator('#letter-output')).toContainText('Indiana Consumer Data Protection Act');
});
