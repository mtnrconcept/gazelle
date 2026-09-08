import test from 'node:test';
import assert from 'node:assert/strict';
import { siteConfig } from '../src/lib/site';
import {
  absoluteUrl,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildRestaurantJsonLd,
} from '../src/lib/seo';

test('uses lagazelledor.ch as the only canonical origin', () => {
  assert.equal(siteConfig.url, 'https://lagazelledor.ch');
  assert.equal(absoluteUrl('/menu'), 'https://lagazelledor.ch/menu');
});

test('builds canonical and Open Graph URLs for a route', () => {
  const metadata = buildPageMetadata({
    title: 'Menu érythréen & éthiopien à Genève',
    description: 'Menu test',
    path: '/menu',
  });

  assert.equal(metadata.alternates?.canonical, 'https://lagazelledor.ch/menu');
  assert.equal(metadata.openGraph?.url, 'https://lagazelledor.ch/menu');
});

test('restaurant structured data contains only verified core business facts', () => {
  const data = buildRestaurantJsonLd();

  assert.equal(data['@type'], 'Restaurant');
  assert.equal(data.url, 'https://lagazelledor.ch');
  assert.equal(data.telephone, '+41223403350');
  assert.equal(data.address.streetAddress, 'Rue de Lyon 55');
  assert.equal(data.address.postalCode, '1203');
  assert.equal(data.address.addressLocality, 'Genève');
  assert.equal(data.hasMenu, 'https://lagazelledor.ch/menu');
  assert.ok(!('menu' in data));
  assert.ok(!('aggregateRating' in data));
});

test('breadcrumb structured data resolves relative paths to canonical URLs', () => {
  const data = buildBreadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Menu', path: '/menu' },
  ]);

  assert.equal(data.itemListElement[1].item, 'https://lagazelledor.ch/menu');
});

test('robots allows pages, excludes APIs and advertises the canonical sitemap', async () => {
  const { default: robots } = await import('../src/app/robots');
  const value = robots();
  const rules = Array.isArray(value.rules) ? value.rules[0] : value.rules;

  assert.equal(rules.userAgent, '*');
  assert.equal(rules.allow, '/');
  assert.deepEqual(rules.disallow, ['/api/']);
  assert.equal(value.sitemap, 'https://lagazelledor.ch/sitemap.xml');
  assert.equal(value.host, 'https://lagazelledor.ch');
});

test('sitemap contains every public canonical route and no private route', async () => {
  const { default: sitemap } = await import('../src/app/sitemap');
  const urls = sitemap().map((entry) => entry.url);

  assert.deepEqual(urls, [
    'https://lagazelledor.ch',
    'https://lagazelledor.ch/menu',
    'https://lagazelledor.ch/histoire',
    'https://lagazelledor.ch/evenements',
    'https://lagazelledor.ch/contact',
  ]);
  assert.ok(urls.every((url) => !url.includes('/admin') && !url.includes('/api')));
});
