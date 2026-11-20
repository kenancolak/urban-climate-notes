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
      <h2><a href="./the-shortest-walk-isnt-always-the-coolest/">The Shortest Walk Isn't Always the Coolest</a></h2>
      <p>A paper from Clermont-Ferrand asks whether a longer walk through cooler streets might be worth the detour.</p>
      <a href="./the-shortest-walk-isnt-always-the-coolest/">Read the note →</a>
    </article>
  </section>;
}

export function ClermontPaperArticle() {
  return <article style={{maxWidth:900,margin:'2.5rem auto 6rem'}}>
    <a href="../">← Today's Paper</a>
    <header style={{margin:'2.5rem 0'}}>
      <p className="eyebrow">Reading note 01 · 20 November 2026 · Clermont-Ferrand, France</p>
      <h1>The Shortest Walk Isn't Always the Coolest</h1>
      <p style={{fontSize:'1.15rem',...muted}}>Reading Mansour et al. (2026) on thermal imagery, street trees and pedestrian routes</p>
      <p style={{...muted,fontSize:'.9rem'}}>Kenan Çolak · About 6 minutes</p>
    </header>
    <div style={text}>
      <p>I spend a fair amount of time reading academic papers, usually with more questions than answers by the time I reach the last page. I thought I might keep some of those questions here. Perhaps someone else will find them interesting too.</p>
      <p>Today's paper takes us to Clermont-Ferrand, in central France. It begins with a familiar choice: the shortest walk through a city is not necessarily the one you would choose on a hot afternoon. A detour beneath trees might feel preferable to a quicker route along an exposed street. But can a navigation system make that distinction?</p>
      <p>Saffa Mansour and colleagues try to give that question a practical answer. Their study brings together high-resolution thermal images, street-level photographs and a pedestrian network, then uses the combined information to calculate routes according to different priorities.</p>
      <h2>What did they actually do?</h2>
      <p>The researchers worked in Clermont-Ferrand's historic centre. They used airborne thermal imagery to estimate land surface temperature along streets, and Google Street View images to estimate the amount of tree canopy visible from the street. For the latter, they used SegFormer, an image-segmentation model, to identify tree pixels. Those observations were then attached to segments of a cleaned pedestrian network.</p>
      <p>The resulting network contained 551 nodes and 796 edges. Of those edges, 600 had Street View-derived canopy information and 623 had airborne temperature values. Distance, surface temperature and visible canopy were normalized and combined into an adjustable cost for each segment. Dijkstra's algorithm then found the lowest-cost route under the selected preferences.</p>
      <p>It is a straightforward idea, but the integration matters. A thermal image by itself does not tell someone which way to walk. Nor does a street photograph. Once those measurements become attributes of a connected network, they can inform a route.</p>
    </div>
    <MethodDiagram/>
    <div style={text}>
      <h2>What did they find?</h2>
      <p>For one example journey, the route with the lowest average surface temperature was nearly 5°C cooler than the shortest route, and its visible tree-canopy coverage was almost three times as high. The catch was distance: the cooler route was 72% longer.</p>
      <p>That trade-off is the most interesting part of the paper for me. A routing tool can produce a cooler option. It cannot, from those figures alone, tell us whether a person would prefer it, or whether the longer journey would reduce their total heat exposure.</p>
    </div>
    <RouteComparison/>
    <div style={text}>
      <h2>What stayed with me?</h2>
      <p>There is a distinction worth keeping clear. Land surface temperature is not air temperature, and neither is a direct measure of what a pedestrian experiences. Visible tree canopy is useful information, but it is not the same as shade on the pavement at a particular time of day. The thermal images also represent a particular summer observation period; a route that looks favourable then may not have the same advantage in the morning or in another season.</p>
      <p>None of this makes the model unhelpful. It tells us what the model can support: a comparison of routes using environmental indicators, rather than a demonstrated reduction in physiological heat stress.</p>
      <p>I keep coming back to two possible extensions. One is to compare the model's preferred routes with observed pedestrian movements. Do people actually make the detour when the weather is hot? The other is to look at school journeys, where distance, road safety and shade may point in different directions. A route that looks best on one measure may be quite poor on another.</p>
      <p>For now, the paper leaves me with a useful question: when we describe a walking route as comfortable, whose comfort have we actually measured?</p>
      <h2>The paper</h2>
      <p>Mansour, S., Itair, M., El Meouche, R., Talon, A., &amp; Breul, P. (2026). <em>{paperTitle}</em>. <em>ISPRS International Journal of Geo-Information, 15</em>(7), 313. <a href={paperUrl} target="_blank" rel="noopener noreferrer">https://doi.org/10.3390/ijgi15070313</a>.</p>
      <p style={{...muted,fontSize:'.9rem'}}>Figures on this page are original explanatory graphics based on the cited paper, not reproduced publisher figures. The numerical comparison applies to one example route pair. This is an independent reading note, not a replication of the authors' analysis.</p>
    </div>
  </article>;
}
