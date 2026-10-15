import noteOneSource from '../notes/01-is-the-planet-really-warming.qmd?raw';
import noteTwoSource from '../notes/02-when-the-city-refuses-to-cool.qmd?raw';
import noteThreeSource from '../notes/03-how-much-does-urban-form-matter-for-heat.qmd?raw';

const optimizedImage = (filename: string) =>
  `${import.meta.env.BASE_URL}images/optimized/${filename}.webp`;

const noteOneCover = optimizedImage('01_Urban_Climate_Notes_Cover');
const noteOneGlobal = optimizedImage('02_Global_Warming_Trend');
const noteOneReno = optimizedImage('03_Reno_Satellite_Context');
const noteOneCity = optimizedImage('04_Reno_City_Context');
const noteTwoCover = optimizedImage('02_Urban_Climate_Notes_Cover');
const noteTwoTokyo = optimizedImage('02_Tokyo_Temperature_Trends');
const noteTwoNight = optimizedImage('03_Tokyo_After_Sunset');
const noteTwoGarden = optimizedImage('04_Uchimizu_Imperial_Gardens');
const noteThreeCover = optimizedImage('03_Urban_Climate_Notes_Cover');
const noteThreeDayNight = optimizedImage('02_Shade_Is_Not_Cooling');
const noteThreeSVF = optimizedImage('03_Urban_Geometry_SVF');
const noteThreeContext = optimizedImage('04_Thermal_Influence');

export type Note = {
  number: string;
  slug: string;
  title: string;
  subtitle: string;
  city: string;
  date: string;
  categories: string[];
  cover: string;
  source: string;
  imageFiles: Record<string, string>;
};

export const notes: Note[] = [
  {
    number: '01',
    slug: 'is-the-planet-really-warming',
    title: 'Is the Planet Really Getting Warmer?',
    subtitle: 'Reno, urban climate, and the fading art of reading a place',
    city: 'Reno, Nevada',
    date: 'October 1, 2026',
    categories: ['Urban Climate', 'Climate Change', 'Urban Planning', 'Urban Morphology'],
    cover: noteOneCover,
    source: noteOneSource,
    imageFiles: {
      'notes/01/01_Urban_Climate_Notes_Cover.jpg': noteOneCover,
      'notes/01/02_Global_Warming_Trend.jpg': noteOneGlobal,
      'notes/01/03_Reno_Satellite_Context.jpg': noteOneReno,
      'notes/01/04_Reno_City_Context.jpg': noteOneCity,
    },
  },
  {
    number: '02',
    slug: 'when-the-city-refuses-to-cool',
    title: 'When the City Refuses to Cool',
    subtitle: 'Tokyo, tropical nights, and the wisdom of waiting for relief',
    city: 'Tokyo, Japan',
    date: 'October 7, 2026',
    categories: ['Urban Climate', 'Urban Heat Island', 'Tokyo', 'Urban Planning'],
    cover: noteTwoCover,
    source: noteTwoSource,
    imageFiles: {
      'notes/02/01_Urban_Climate_Notes_Cover.png': noteTwoCover,
      'notes/02/02_Tokyo_Temperature_Trends.png': noteTwoTokyo,
      'notes/02/03_Tokyo_After_Sunset.png': noteTwoNight,
      'notes/02/04_Uchimizu_Imperial_Gardens.png': noteTwoGarden,
    },
  },

{
  number: '03',
  slug: 'how-much-does-urban-form-matter-for-heat',
  title: 'How Much Does Urban Form Matter for Heat?',
  subtitle: 'Hong Kong, street canyons, and the geometry of cooling',
  city: 'Hong Kong',
  date: 'October 12, 2026',
  categories: [
    'Urban Climate',
    'Urban Morphology',
    'Hong Kong',
    'Urban Planning'
  ],
  cover: noteThreeCover,
  source: noteThreeSource,
  imageFiles: {
    'notes/03/01_Urban_Climate_Notes_Cover.png': noteThreeCover,
    'notes/03/02_Shade_Is_Not_Cooling.png': noteThreeDayNight,
    'notes/03/03_Urban_Geometry_SVF.png': noteThreeSVF,
    'notes/03/04_Thermal_Influence.png': noteThreeContext,
  },
},
];

export function getArticleMarkdown(source: string) {
  return source
    .replace(/^---\s*[\s\S]*?---\s*/, '')
    .replace(/^!\[[^\]]*\]\(\.\.\/images\/notes\/[^)]+\)\{[^}]+\}\s*/, '')
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)\{([^}]+)\}/g,
      (_match, altText: string, imagePath: string, attributes: string) => {
        const figureAlt = attributes.match(/fig-alt="([^"]*)"/)?.[1] ?? altText;
        return `![${figureAlt}](${imagePath})`;
      },
    )
    .replace(
      /<div class="image-caption">\s*([\s\S]*?)\s*<\/div>/g,
      (_match, caption: string) => `*${caption.trim()}*`,
    );
}

export function getHeadings(markdown: string) {
  return markdown
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const title = line.slice(3).trim();
      return { title, id: slugify(title) };
    });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export const sectionSearchContent = [
  {
    title: 'Methods',
    href: '/methods',
    description: 'Land surface temperature, air temperature, urban heat islands, remote sensing, GIS and morphology.',
    content:
      'Satellite-derived land surface temperature measures the thermal state of the Earth surface and is not the same as air temperature. Meteorological observations measure atmospheric conditions close to the surface and are essential for human thermal exposure. Urban heat island describes the temperature difference between urban environments and less urbanized surroundings. Remote sensing sources include Landsat, Sentinel-2, MODIS and ECOSTRESS. Google Earth Engine processes large satellite archives. Urban form influences solar exposure, shading, ventilation, heat storage, surface properties and vegetation. Long-term comparisons require stable, comparable areas.',
  },
  {
    title: 'Research',
    href: '/research',
    description: 'Urban climate, urban morphology, remote sensing and climate-responsive planning.',
    content:
      'Urban Climate Notes examines how global climate processes interact with local urban environments, how physical city structure influences thermal conditions, and how Earth observation monitors urban surfaces and thermal change. Research connects environmental measurements with urban form, land use and planning, translating evidence into questions for policy, design and adaptation. Current work examines long-term urban thermal change, stability and comparability of urban and reference areas, and whether remotely sensed temperature changes reflect climate or urban form.',
  },
  {
    title: 'About',
    href: '/about',
    description: 'About the independent research and science communication project and its creator, Kenan Çolak.',
    content:
      'Kenan Çolak is an urban planner and researcher with more than twelve years of professional planning experience. His PhD research examined urban morphology and surface urban heat in Antalya, Türkiye, using Landsat, Sentinel-2, GIS, Google Earth Engine and a stability-based analytical framework. Interests include urban climate, heat islands, morphology, land surface temperature, remote sensing, climate adaptation, long-term urban change and comparative urban analysis.',
  },
];

export function getSeoForRoute(route: string) {
  const article = notes.find((note) => route === `/notes/${note.slug}`);
  if (article) {
    return {
      title: article.title,
      description: `${article.subtitle}. An evidence-based urban climate note from ${article.city}.`,
      image: article.cover,
      type: 'article',
      publishedTime: new Date(article.date).toISOString(),
      author: 'Kenan Çolak',
      keywords: article.categories,
    };
  }

  const page = sectionSearchContent.find((item) => item.href === route);
  if (page) {
    return {
      title: page.title,
      description: page.description,
      image: '',
      type: 'website',
      publishedTime: '',
      author: 'Kenan Çolak',
      keywords: ['urban climate', 'urban planning', 'climate research'],
    };
  }

  if (route === '/notes') {
    return {
      title: 'Published Notes',
      description: 'Evidence-based urban climate stories about cities, data and scientific literature.',
      image: '',
      type: 'website',
      publishedTime: '',
      author: 'Kenan Çolak',
      keywords: ['urban climate', 'climate change', 'urban heat', 'cities'],
    };
  }

  if (route === '/') {
    return {
      title: 'From climate evidence to urban decisions.',
      description: 'Urban Climate Notes explores how climate change is experienced, measured and shaped in cities.',
      image: '',
      type: 'website',
      publishedTime: '',
      author: 'Kenan Çolak',
      keywords: ['urban climate', 'urban planning', 'climate research', 'remote sensing'],
    };
  }

  return {
    title: 'Page not found',
    description: 'The requested page could not be found.',
    image: '',
    type: 'website',
    publishedTime: '',
    author: 'Kenan Çolak',
    keywords: ['urban climate'],
  };
}
