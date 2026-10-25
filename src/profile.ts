// Content supplied by Kenan Çolak. Doctorate completion and the identity wording
// were explicitly confirmed during the academic-profile-v1 review.
export const identity = 'I am an urban and regional planner and urban climate researcher studying how urban form and its change shape urban heat, using satellite remote sensing and spatial analysis. My work builds comparison designs that separate the effect of morphological change from background climate, and connects the findings to planning and legal instruments.';
export const availability = 'Open to postdoctoral research and academic collaboration in urban climate, urban morphology and planning.';
export const biography = 'Kenan Çolak is an urban and regional planner and urban climate researcher. He holds a PhD from Akdeniz University and also holds a law degree. He has more than eleven years of institutional experience in Türkiye in cultural heritage conservation, conservation-oriented zoning planning and the management of urban development. His research examines how urban morphology and its change relate to land surface temperature, using Landsat and Sentinel imagery, land cover classification, spatial statistics and temporal change analysis. His doctoral research in Antalya develops a controlled comparison approach built on areas whose physical characteristics remain stable, and a current project examines redevelopment around SkyTrain stations in Metro Vancouver. He is interested in translating urban climate evidence into concrete planning decisions and is open to postdoctoral collaboration.';
export type ResearchStatus = 'Published' | 'Under Review' | 'In Progress' | 'In Preparation' | 'Planned';
export const projects: { id: string; title: string; question: string; area: string; methods: string; status: string; category: ResearchStatus }[] = [
  { id: 'antalya', title: 'Urban morphology and surface urban heat in Antalya', question: 'How are urban morphology and surface urban heat island intensity related when areas whose physical characteristics remain unchanged are used as controls?', area: 'Antalya, Türkiye', methods: 'Landsat-based land surface temperature, morphological indicators and a stable reference area design (see Methods).', status: 'Under review', category: 'Under Review' },
  { id: 'metro-vancouver', title: 'Redevelopment around SkyTrain stations in Metro Vancouver', question: 'Does redevelopment around SkyTrain stations change surface temperature relative to comparable areas that remained unchanged?', area: 'Metro Vancouver, Canada', methods: 'Satellite-derived surface temperature and a comparison between redeveloped and similar unchanged areas.', status: 'In progress', category: 'In Progress' },
  { id: 'europe', title: 'Frozen morphology and thermal trajectories in protected European urban areas', question: 'How do surface temperature trajectories differ in heritage-protected areas whose morphology stays largely unchanged across European cities?', area: 'A set of European cities (to be selected)', methods: 'Landsat 8/9 surface temperature, 2013–2026, with a multi-city comparison design.', status: 'Planned', category: 'Planned' },
];
// Add only owner-approved public destinations. Undefined values render plain text.
export const profileLinks: { label: string; url?: string }[] = [
  { label: 'ORCID' }, { label: 'Google Scholar' },
  { label: 'GitHub', url: 'https://github.com/kenancolak' }, { label: 'LinkedIn' },
];
export const cvUrl: string | undefined = undefined;
export const contactEmail: string | undefined = undefined;
