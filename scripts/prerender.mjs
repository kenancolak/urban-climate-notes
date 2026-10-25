import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const siteUrl = 'https://kenancolak.com';
const siteOrigin = 'https://kenancolak.com';
const baseUrl = '/';
const outputDir = path.resolve('dist');
const manifestPath = path.join(outputDir, '.vite', 'manifest.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const vite = await createServer({
  configFile: path.resolve('vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
});

function replaceMeta(html, attribute, key, content) {
  const escaped = content
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
  const matcher = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\\/>`);
  if (!matcher.test(html)) throw new Error(`Missing metadata tag: ${key}`);
  return html.replace(matcher, `<meta ${attribute}="${key}" content="${escaped}" />`);
}

function resolveAssetUrl(assetUrl) {
  if (assetUrl.includes('/images/optimized/')) return assetUrl;
  const sourcePath = assetUrl.replace(baseUrl, '').replace(/^\/+/, '');
  const asset = Object.entries(manifest).find(([key]) =>
    key === sourcePath || key.endsWith(`/${sourcePath}`),
  )?.[1];
  if (!asset || !('file' in asset)) {
    throw new Error(`Could not find the built asset for ${assetUrl}`);
  }
  return `${baseUrl}${asset.file}`;
}

function withPageMetadata(template, seo, route, html, schema) {
  const canonicalUrl = `${siteUrl}${route === '/' ? '/' : `${route}/`}`;
  const imageUrl = new URL(
    resolveAssetUrl(seo.image || `${baseUrl}images/urban-climate-notes-logo.jpg`),
    siteOrigin,
  ).href;
  let document = template
    .replace('<title>Urban Climate Notes</title>', `<title>${escapeHtml(seo.title)} | Kenan Çolak</title>`)
    .replace('<!--app-html-->', html)
    .replace('<meta property="og:type" content="website" />', `<meta property="og:type" content="${seo.type}" />`);

  document = replaceMeta(document, 'name', 'description', seo.description);
  document = replaceMeta(document, 'property', 'og:title', `${seo.title} | Kenan Çolak`);
  document = replaceMeta(document, 'property', 'og:description', seo.description);
  document = replaceMeta(document, 'property', 'og:url', canonicalUrl);
  document = replaceMeta(document, 'property', 'og:image', imageUrl);
  document = replaceMeta(document, 'property', 'og:image:alt', seo.title);
  document = replaceMeta(document, 'name', 'twitter:title', `${seo.title} | Kenan Çolak`);
  document = replaceMeta(document, 'name', 'twitter:description', seo.description);
  document = replaceMeta(document, 'name', 'twitter:image', imageUrl);
  document = document.replace(
    '<link rel="canonical" href="" />',
    `<link rel="canonical" href="${canonicalUrl}" />`,
  );
  if (seo.type === 'article') {
    const articleMetadata = [
      `<meta property="article:published_time" content="${seo.publishedTime}" />`,
      `<meta property="article:author" content="${escapeHtml(seo.author)}" />`,
      ...seo.keywords.map((keyword) => `<meta property="article:tag" content="${escapeHtml(keyword)}" />`),
    ].join('\n    ');
    document = document.replace('</head>', `${articleMetadata}\n  </head>`);
  }
  document = document.replace(
    '</head>',
    `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>\n  </head>`,
  );

  const assetUrls = new Set(document.match(/(?:src|href)="[^"]*\/images\/[^"]+"/g) ?? []);
  for (const attribute of assetUrls) {
    const currentUrl = attribute.slice(attribute.indexOf('"') + 1, -1);
    document = document.replaceAll(attribute, `${attribute.slice(0, attribute.indexOf('"') + 1)}${resolveAssetUrl(currentUrl)}"`);
  }

  return document;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

try {
  const { default: App } = await vite.ssrLoadModule('/src/App.tsx');
  const { notes, sectionSearchContent, getSeoForRoute } = await vite.ssrLoadModule('/src/content.ts');
  const routes = ['/', '/notes', ...sectionSearchContent.map((page) => page.href), ...notes.map((note) => `/notes/${note.slug}`)];
  const template = await readFile(path.join(outputDir, 'index.html'), 'utf8');
  const sitemapEntries = [];

  for (const route of routes) {
    const seo = getSeoForRoute(route);
    const markup = renderToString(React.createElement(App, { initialRoute: route }));
    const schema = route.startsWith('/notes/')
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: seo.title,
          description: seo.description,
          image: new URL(resolveAssetUrl(seo.image), siteOrigin).href,
          datePublished: seo.publishedTime.slice(0, 10),
          author: { '@type': 'Person', name: seo.author },
          publisher: { '@type': 'Organization', name: 'Urban Climate Notes' },
          mainEntityOfPage: `${siteUrl}${route}/`,
          keywords: seo.keywords.join(', '),
        }
      : {
          '@context': 'https://schema.org',
          '@type': route === '/' ? 'WebSite' : 'WebPage',
          name: route === '/' ? 'Kenan Çolak' : seo.title,
          about: { '@type': 'Person', '@id': `${siteUrl}/#person`, name: 'Kenan Çolak', url: `${siteUrl}/`, sameAs: ['https://github.com/kenancolak', 'https://orcid.org/0000-0002-8271-129X', 'https://www.linkedin.com/in/kenancolak/'] },
          headline: seo.title,
          description: seo.description,
          url: `${siteUrl}${route === '/' ? '/' : `${route}/`}`,
          inLanguage: 'en',
        };

    const document = withPageMetadata(template, seo, route, markup, schema);
    const outputPath = route === '/'
      ? path.join(outputDir, 'index.html')
      : path.join(outputDir, route.slice(1), 'index.html');
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, document);
    sitemapEntries.push(`  <url><loc>${siteUrl}${route === '/' ? '/' : `${route}/`}</loc></url>`);
    console.log(`Pre-rendered ${route}`);
  }

  const legacyAliases = [
    { path: '/notes.html', route: '/notes' },
    { path: '/methods.html', route: '/methods' },
    { path: '/research.html', route: '/research' },
    { path: '/about.html', route: '/about' },
    ...notes.map((note) => ({ path: `/notes/${note.slug}.html`, route: `/notes/${note.slug}` })),
  ];
  for (const alias of legacyAliases) {
    const destination = `${siteUrl}${alias.route}/`;
    const redirect = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="robots" content="noindex" />
    <link rel="canonical" href="${destination}" />
    <meta http-equiv="refresh" content="0; url=${destination}" />
    <title>Page moved | Kenan Çolak</title>
  </head>
  <body>
    <p>This page has moved. <a href="${destination}">Continue to the updated page</a>.</p>
    <script>window.location.replace(${JSON.stringify(destination)});</script>
  </body>
</html>
`;
    const outputPath = path.join(outputDir, alias.path.slice(1));
    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, redirect);
  }

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapEntries,
    '</urlset>',
    '',
  ].join('\n');
  await writeFile(path.join(outputDir, 'sitemap.xml'), sitemap);
} finally {
  await vite.close();
}
