import { access, mkdir } from 'node:fs/promises';
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
  ['03/01_Urban_Climate_Notes_Cover.png', '03_Urban_Climate_Notes_Cover.webp'],
  ['03/02_Shade_Is_Not_Cooling.png', '02_Shade_Is_Not_Cooling.webp'],
  ['03/03_Urban_Geometry_SVF.png', '03_Urban_Geometry_SVF.webp'],
  ['03/04_Thermal_Influence.png', '04_Thermal_Influence.webp'],
  ['04/01_Urban_Climate_Notes_Cover.png', '04_Urban_Climate_Notes_Cover.webp'],
  ['04/02_ECOSTRESS_Burn_Risk.png', '04_ECOSTRESS_Burn_Risk.webp'],
  ['04/03_Glendale_Stadium_Surface_Context.png', '04_Glendale_Stadium_Surface_Context.webp'],
  ['04/04_Phoenix_Neighborhood_Thermal_Context.png', '04_Phoenix_Neighborhood_Thermal_Context.webp'],
  ['04/05_VIIRS_Night_LST.png', '04_VIIRS_Night_LST.webp'],

];

await mkdir(outputDirectory, { recursive: true });

for (const [source, output] of images) {
  const outputPath = path.join(outputDirectory, output);
  const expectedPath = path.join(sourceDirectory, source);
  let sourcePath = expectedPath;
  try {
    await access(expectedPath);
  } catch (error) {
    if (!source.startsWith('04/')) throw error;
    sourcePath = path.resolve(path.basename(source));
    await access(sourcePath);
    console.log(`Using root-level upload for ${source}; move it into images/notes/04 when convenient.`);
  }
  await sharp(sourcePath)
    .rotate()
    .resize({ width: 2200, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(outputPath);
  console.log(`Optimized ${source} -> ${output}`);
}
