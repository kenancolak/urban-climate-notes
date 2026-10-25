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
 assert.match(html,/<link rel="canonical" href="https:\/\/kenancolak.com\//);
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
