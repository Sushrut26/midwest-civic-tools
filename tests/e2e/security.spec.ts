import { expect, test } from '@playwright/test';

const ROUTES = [
  '/',
  '/tools/min-wage',
  '/tools/benefits-cliff',
  '/tools/snap-checker',
  '/tools/scholarship-calc',
  '/tools/data-rights',
];

function assertSecurityHeaders(headers: Record<string, string>) {
  expect(headers['x-powered-by']).toBeUndefined();
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(headers['permissions-policy']).toContain('camera=()');
  expect(headers['strict-transport-security']).toContain('max-age=');
  expect(headers['cross-origin-opener-policy']).toBe('same-origin');
  expect(headers['cross-origin-resource-policy']).toBe('same-origin');
  expect(headers['origin-agent-cluster']).toBe('?1');
  expect(headers['content-security-policy']).toContain("default-src 'self'");
  expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");
}

for (const route of ROUTES) {
  test(`security headers are present on ${route}`, async ({ request }) => {
    const response = await request.get(route);
    expect(response.ok()).toBeTruthy();
    assertSecurityHeaders(response.headers());
  });
}
