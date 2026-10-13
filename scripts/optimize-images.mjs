import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const sourceDirectory = path.resolve('images/notes');
const outputDirectory = path.resolve('public/images/optimized');
const images = [
  ['01/01_Urban_Climate_Notes_Cover.jpg', '01_Urban_Climate_Notes_Cover.webp'],
  ['01/02_Global_Warming_Trend.jpg', '02_Global_Warming_Trend.webp'],
  ['01/03_Reno_Satellite_Context.jpg', '03_Reno_Satellite_Context.webp'],
  ['01/04_Reno_City_Context.jpg', '04_Reno_City_Context.webp'],
  ['02/01_Urban_Climate_Notes_Cover.png', '02_Urban_Climate_Notes_Cover.webp'],
  ['02/02_Tokyo_Temperature_Trends.png', '02_Tokyo_Temperature_Trends.webp'],
  ['02/03_Tokyo_After_Sunset.png', '03_Tokyo_After_Sunset.webp'],
  ['02/04_Uchimizu_Imperial_Gardens.png', '04_Uchimizu_Imperial_Gardens.webp'],
];

await mkdir(outputDirectory, { recursive: true });

for (const [source, output] of images) {
  const outputPath = path.join(outputDirectory, output);
  await sharp(path.join(sourceDirectory, source))
    .rotate()
    .resize({ width: 2200, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath);
  console.log(`Optimized ${source} -> ${output}`);
}
