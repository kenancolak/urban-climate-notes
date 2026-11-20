import type { CSSProperties } from 'react';

const paperUrl = 'https://doi.org/10.3390/ijgi15070313';
const paperTitle = 'User-Comfort Pathfinding: Integrating Thermal Imagery and Street-Level Vegetation Analysis into Multi-Criteria Pedestrian Routing';
const panel: CSSProperties = { background: 'var(--surface, #f5f6f4)', border: '1px solid #d9dfdc', borderRadius: 12, padding: '1.25rem', margin: '1.6rem 0' };
const text: CSSProperties = { maxWidth: '72ch', lineHeight: 1.85 };
const muted: CSSProperties = { color: 'var(--text-muted, #64716d)' };

function RouteComparison() {
  return <figure style={panel}>
    <svg viewBox="0 0 720 240" role="img" aria-labelledby="route-chart-title route-chart-desc" style={{width:'100%',height:'auto'}}>
      <title id="route-chart-title">Illustrative comparison of route lengths</title>
      <desc id="route-chart-desc">The shortest route is indexed to 100 and the cooler route to 172, representing a 72 percent longer distance. These are not actual distances.</desc>
      <text x="16" y="32" fontSize="18" fill="currentColor">Relative route length</text>
      <text x="16" y="80" fontSize="15" fill="currentColor">Shortest</text>
      <rect x="155" y="58" width="300" height="36" rx="5" fill="#7b9b96"/>
      <text x="465" y="82" fontSize="16" fill="currentColor">100</text>
      <text x="16" y="148" fontSize="15" fill="currentColor">Coolest</text>
      <rect x="155" y="126" width="516" height="36" rx="5" fill="#bb8555"/>
      <text x="620" y="150" fontSize="16" fill="#fff">172</text>
      <text x="16" y="209" fontSize="14" fill="currentColor">+72% distance for the example origin–destination pair</text>
    </svg>
    <figcaption style={{...muted,fontSize:'.88rem'}}>Original visualization based on the relative distance difference reported by Mansour et al. (2026). The shortest route is indexed to 100; these are not measured metres.</figcaption>
  </figure>;
}

function MethodDiagram() {
  const nodes = ['Airborne thermal imagery → surface temperature', 'Street View imagery → visible tree canopy', 'Pedestrian network → distance and connectivity', 'Normalized edge costs → Dijkstra routing'];
  return <figure style={panel}>
    <p style={{fontWeight:650,marginTop:0}}>How the routing model works</p>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:10}}>
      {nodes.map((n,i)=><div key={n} style={{padding:'1rem',background:'var(--background, #fff)',border:'1px solid #cad2ce',borderRadius:8}}><span style={{...muted,fontSize:'.75rem'}}>STEP {i+1}</span><p style={{margin:'.4rem 0 0'}}>{n}</p></div>)}
    </div>
    <figcaption style={{...muted,fontSize:'.88rem',marginTop:12}}>Original explanatory diagram, adapted conceptually from the workflow in Mansour et al. (2026); not a reproduction of a figure from the article.</figcaption>
  </figure>;
}

export function TodaysPaperArchive() {
  return <section style={{maxWidth:950,margin:'2.5rem auto 5rem'}}>
    <p className="eyebrow">A personal research reading journal</p>
    <h1>Today's Paper</h1>
    <div style={text}>
      <p>I read academic papers almost every day. Some are directly related to my research. Others simply make me curious.</p>
      <p>I have been meaning to keep a record of the ones that stay with me. Not formal reviews, and not a summary of everything the authors wrote. Just a place to think about what they did, what they found, and what questions their work leaves behind.</p>
      <p>I don't know how many people will read these notes. Hopefully, at least a few besides me.</p>
    </div>
    <article style={{...panel,marginTop:'2.5rem'}}>
      <p className="eyebrow">20 November 2026 · Urban climate / Mobility · Reading note 01</p>
      <h2><a href={`${import.meta.env.BASE_URL}papers/the-shortest-walk-isnt-always-the-coolest/`}>The Shortest Walk Isn't Always the Coolest</a></h2>
      <p>A paper from Clermont-Ferrand asks whether a longer walk through cooler streets might be worth the detour.</p>
      <a href={`${import.meta.env.BASE_URL}papers/the-shortest-walk-isnt-always-the-coolest/`}>Read the note →</a>
    </article>
  </section>;
}

export function ClermontPaperArticle() {
  return <article style={{maxWidth:900,margin:'2.5rem auto 6rem'}}>
    <a href={`${import.meta.env.BASE_URL}papers/`}>← Today's Paper</a>
    <header style={{margin:'2.5rem 0'}}>
      <p className="eyebrow">Reading note 01 · 20 November 2026 · Clermont-Ferrand, France</p>
      <h1>The Shortest Walk Isn't Always the Coolest</h1>
      <p style={{fontSize:'1.15rem',...muted}}>Reading Mansour et al. (2026) on thermal imagery, street trees and pedestrian routes</p>
      <p style={{...muted,fontSize:'.9rem'}}>Kenan Çolak · About 6 minutes</p>
    </header>
    <div style={text}>
      <p>I read academic papers almost every day. Some are closely related to my research. Others catch my attention simply because I'm curious. Quite often, I reach the last page with more questions than I had when I started.</p>
      <p>For a while, I've been thinking about keeping a record of the papers that stay with me. Not to retell every detail, but to note what the researchers did, what they found, and what questions their work left me thinking about.</p>
      <p>Hopefully, a few people besides me will read these notes.</p>
      <p>For the first one, we're heading to Clermont-Ferrand, France. The question is familiar enough: on a hot summer day, would you take the shortest route to your destination, or walk a little further to stay beneath the trees?</p>
      <p>Navigation apps generally try to get us somewhere as quickly as possible. But for someone walking under the August sun, saving a few minutes may not always be the priority.</p>
      <p>Saffa Mansour and colleagues have tried to turn this everyday decision into a pedestrian routing model.</p>
      <h2>What did the researchers do?</h2>
      <p>The study focuses on pedestrian streets in Clermont-Ferrand's historic centre. The researchers brought together three sources of information: airborne thermal imagery, Google Street View photographs, and a pedestrian street network.</p>
      <p>They used the thermal imagery to estimate surface temperatures along the streets. To identify vegetation, they applied an image segmentation model called SegFormer to street-level photographs, measuring how much of each image was occupied by trees.</p>
      <p>They then transferred these measurements to the pedestrian network, which contained 551 nodes and 796 edges.</p>
      <p>Each street segment could now be described not only by its length, but also by its surface temperature and visible tree coverage. Using Dijkstra's algorithm, the researchers calculated alternative routes according to different priorities.</p>
      <p>In other words, the model does more than ask, "What's the shortest way to get there?" It also asks, "What happens if I prefer streets with lower surface temperatures?"</p>
    </div>
    <MethodDiagram/>
    <div style={text}>
      <h2>What did they find?</h2>
      <p>The result that caught my attention was the difference between two routes in the study's example.</p>
      <p>The route selected for lower average surface temperature passed through areas with surfaces approximately 5°C cooler than those along the shortest route. It also had roughly three times as much visible tree coverage.</p>
      <p>There was a trade-off, though: the cooler route was 72% longer.</p>
    </div>
    <RouteComparison/>
    <div style={text}>
      <p>I find this particularly interesting because a cooler route and a better walking experience are not necessarily the same thing.</p>
      <p>A longer route means spending more time walking. Even if its average surface temperature is lower, the person's total exposure to heat could be greater. To understand that, we would need to consider walking time and the environmental conditions experienced along the entire journey, rather than surface temperature alone.</p>
      <p>There is another distinction worth keeping in mind. Land surface temperature is not the air temperature we experience while walking. Similarly, the amount of tree cover visible in a street photograph is not a direct measurement of the shade falling on the pavement at a particular time of day.</p>
      <p>For these reasons, I wouldn't interpret the findings as evidence of a demonstrated improvement in pedestrian thermal comfort. What the study shows is that different routes can be calculated using environmental indicators alongside distance.</p>
      <p>And to me, that is where its contribution lies.</p>
      <h2>The question I was left with</h2>
      <p>I found the approach useful for thinking about pedestrian movement research I've been working on.</p>
      <p>When trying to explain how many people use a particular street, we can examine its length, connectivity, and position within the wider urban network. But those characteristics may not be enough to understand why people choose one route over another.</p>
      <p>Consider two walking routes to the same school. One is shorter but exposed to the sun. The other is longer, with more trees along the way. Their traffic safety conditions might also be quite different.</p>
      <p>Which route should we consider more suitable? More importantly, which one do children and their families actually choose?</p>
      <p>The Clermont-Ferrand study doesn't answer all these questions, nor was it designed to. But it offers a workable way to bring environmental characteristics into pedestrian network analysis.</p>
      <p>The next step I'd like to see is a comparison between these models and observed pedestrian behaviour. Do people actually shift towards cooler streets on hot days? How much of a temperature or shade difference would make someone willing to walk further? And do those decisions change with age, journey purpose, or walking time?</p>
      <p>These questions remain open. They also seem like a good place to continue the research.</p>
      <p>In the end, I keep coming back to one question:</p>
      <p><strong>When we describe a pedestrian route as comfortable, whose comfort are we actually measuring?</strong></p>
      <h2>Paper discussed</h2>
      <p>Mansour, S., Itair, M., El Meouche, R., Talon, A., &amp; Breul, P. (2026). <em>{paperTitle}</em>. <em>ISPRS International Journal of Geo-Information, 15</em>(7), 313. <a href={paperUrl} target="_blank" rel="noopener noreferrer">https://doi.org/10.3390/ijgi15070313</a>.</p>
      <p style={{...muted,fontSize:'.9rem'}}>Both illustrations accompanying this reading note are original explanatory graphics based on the methods and results reported in the paper. They are not reproduced figures from the publication.</p>
    </div>
  </article>;
}
