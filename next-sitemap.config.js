/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://civic-tools.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  // All pages are static and should be indexed
  changefreq: 'monthly',
  priority: 0.7,
  // Override priority for specific pages
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/tools/benefits-cliff'),
    await config.transform(config, '/tools/snap-checker'),
    await config.transform(config, '/tools/scholarship-calc'),
    await config.transform(config, '/tools/min-wage'),
    await config.transform(config, '/tools/data-rights'),
  ],
};
