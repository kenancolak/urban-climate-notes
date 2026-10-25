import { readFile, readdir, stat } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import assert from 'node:assert/strict';
const dist = path.resolve('dist');
async function files(dir) { const entries = await readdir(dir, { withFileTypes: true }); return (await Promise.all(entries.map(e => e.isDirectory() ? files(path.join(dir,e.name)) : path.join(dir,e.name)))).flat(); }
const htmlFiles = (await files(dist)).filter(p => p.endsWith('/index.html'));
assert.equal(htmlFiles.length, 11, 'Expected 11 statically rendered routes');
let links = 0, images = 0;
for (const file of htmlFiles) {
 const html = await readFile(file,'utf8');
 assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`One h1: ${file}`);
 assert.match(html,/<html lang="en">/);
 assert.match(html,/<link rel="canonical" href="https:\/\/www.kenancolak.com\//);
 assert.match(html,/<meta name="description" content="[^"]+"/);
 JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);
 assert(!html.includes('<!--app-html-->'), 'SSR content exists');
 for (const m of html.matchAll(/<(a|img|script|link)\b[^>]*?(?:href|src)="([^"]*)"[^>]*>/g)) {
  const [tag, type, raw] = m; const url = raw.replaceAll('&amp;','&');
  if (type==='img') { images++; assert.match(tag,/\balt="[^"]*"/,'Images have alt attributes'); }
  if (!url.startsWith('/') || url.startsWith('//')) continue;
  const targetUrl = new URL(url,'https://kenancolak.com');
  let target = path.join(dist,decodeURIComponent(targetUrl.pathname));
  if ((await stat(target)).isDirectory()) target=path.join(target,'index.html');
  const targetContent=await readFile(target);
  if(type==='a') links++;
  if(targetUrl.hash) assert(targetContent.toString().includes(`id="${targetUrl.hash.slice(1)}"`), `Fragment exists: ${url}`);
 }
}
const preserved=execFileSync('git',['diff','--name-only','cd3eb17','--','notes','images'],{encoding:'utf8'}).trim();
assert.equal(preserved,'','Existing notes and source images remain unchanged');
console.log(`PASS: ${htmlFiles.length} static routes; ${links} internal links; ${images} images with alt attributes; canonical, metadata, JSON-LD and fragment targets; original notes/images unchanged.`);

// Prevent partial academic-site deployments: every pre-rendered route shares one shell.
const expectedNavigation = ['Home', 'Research', 'Notes', 'Methods', 'About', 'CV', 'Contact'];
const bundles = new Set();
for (const file of htmlFiles) {
 const html = await readFile(file, 'utf8');
 const nav = html.match(/<nav\b[^>]*id="site-navigation"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
 assert(nav, `Shared navigation: ${file}`);
 assert.deepEqual([...nav.matchAll(/<a\b[^>]*>([^<]+)<\/a>/g)].map(m => m[1]), expectedNavigation);
 assert.match(html, /aria-label="Kenan Çolak home"/);
 assert.match(html, /aria-label="Use dark mode"/);
 assert(!html.includes('Awaiting verified link'));
 const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
 assert.equal(html.match(/property="og:url" content="([^"]+)"/)[1], canonical);
 assert.match(canonical, /^https:\/\/www\.kenancolak\.com\//);
 bundles.add(html.match(/type="module"[^>]*src="([^"]+)"/)[1]);
 const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);
 if (schema['@type'] === 'Article') {
  const slug = path.basename(path.dirname(file));
  const sourceFile = (await readdir('notes')).find(name => name.endsWith(`${slug}.qmd`));
  assert(sourceFile, `Source note exists: ${slug}`);
  const sourceDate = (await readFile(path.join('notes', sourceFile), 'utf8')).match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m)[1];
  assert.equal(schema.datePublished, sourceDate, 'Publication dates match editorial sources regardless of time zone');
  assert.equal(schema.mainEntityOfPage, canonical);
  if (schema.dateModified) assert(schema.dateModified >= schema.datePublished);
 } else {
  assert.equal(schema.about['@type'], 'Person');
  assert(schema.about.jobTitle && schema.about.identifier.value === '0000-0002-8271-129X');
  assert.equal(schema.about.sameAs.length, 3);
 }
}
assert.equal(bundles.size, 1, 'Every route references the same application bundle');
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
assert.equal((sitemap.match(/<loc>https:\/\/www\.kenancolak\.com\//g) || []).length, 11);
const cv = await readFile(path.join(dist, 'cv/index.html'), 'utf8');
const cvSections = JSON.parse(await readFile('src/cv-content.json', 'utf8'));
const headings = [...cv.matchAll(/<h2\b[^>]*>([^<]+)<\/h2>/g)].map(m => m[1]);
assert.deepEqual(headings, cvSections.map(s => s.title));
assert.match(cv, /Last updated: October 2026/);
const methods = await readFile(path.join(dist, 'methods/index.html'), 'utf8');
assert.equal(methods.match(/<h2\b[^>]*>([^<]+)<\/h2>/)[1], 'Stability and Comparability');
const research = await readFile(path.join(dist, 'research/index.html'), 'utf8');
assert.equal((research.match(/class="project-card"/g) || []).length, 3);
assert(!research.includes('<img'), 'Research projects contain no results maps/figures');
const redirects = JSON.parse(await readFile('vercel.json', 'utf8')).redirects;
assert(redirects.every(r => r.permanent === true));
for (const redirect of redirects.filter(r => !r.has)) {
 assert.match(await readFile(path.join(dist, redirect.source), 'utf8'), /http-equiv="refresh"/);
}
console.log('PASS: shared shell/bundle on every route, www canonical/Open Graph/sitemap, CV section order, Methods priority, project cards, date metadata and legacy aliases. Hosting redirects still require deployment verification.');
