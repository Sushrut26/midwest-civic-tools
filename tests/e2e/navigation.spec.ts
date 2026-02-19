import { expect, test } from '@playwright/test';

const navbarLinks = [
  { label: 'Benefits Cliff', path: '/tools/benefits-cliff', heading: /Benefits Cliff/i },
  { label: 'SNAP Checker', path: '/tools/snap-checker', heading: /SNAP Eligibility Checker/i },
  { label: 'Scholarships', path: '/tools/scholarship-calc', heading: /Choice Scholarship Calculator/i },
  { label: 'Min Wage', path: '/tools/min-wage', heading: /Minimum Wage Timeline/i },
  { label: 'Data Rights', path: '/tools/data-rights', heading: /Data Rights Letter Generator/i },
];

const cardLinks = [
  { name: 'Open Benefits Cliff Visualizer tool', path: '/tools/benefits-cliff' },
  { name: 'Open SNAP Eligibility Checker tool', path: '/tools/snap-checker' },
  { name: 'Open Choice Scholarship Calculator tool', path: '/tools/scholarship-calc' },
  { name: 'Open Minimum Wage Timeline tool', path: '/tools/min-wage' },
  { name: 'Open Data Rights Letter Generator tool', path: '/tools/data-rights' },
];

test('home page loads and hero CTA navigates to tools section', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('Navigate Indiana');
  await page.getByRole('link', { name: 'Explore Tools' }).click();
  await expect(page).toHaveURL(/\/#tools$/);
  await expect(page.locator('#tools')).toBeVisible();
});

test('navbar links navigate to each tool page', async ({ page }) => {
  for (const link of navbarLinks) {
    await page.goto('/');
    await page.locator('header').getByRole('link', { name: link.label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${link.path}$`));
    await expect(page.getByRole('heading', { level: 1 })).toContainText(link.heading);
  }
});

test('tool cards open the expected routes', async ({ page }) => {
  for (const card of cardLinks) {
    await page.goto('/');
    await page.getByRole('link', { name: card.name }).click();
    await expect(page).toHaveURL(new RegExp(`${card.path}$`));
  }
});
