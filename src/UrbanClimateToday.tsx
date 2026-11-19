const articlePath = '/today/cop31-urban-climate-finance/';

export function UrbanClimateTodayHomeTeaser() {
  return (
    <section className="uct-home" aria-labelledby="uct-home-heading">
      <div>
        <p className="eyebrow">New editorial series · Urban Climate Today</p>
        <h2 id="uct-home-heading">When climate commitments reach the city</h2>
        <p>COP31 in Antalya brings the question of urban climate finance into focus. A closer look at what the announcements mean, and what remains untested.</p>
        <a className="text-link" href={articlePath}>Read the analysis <span aria-hidden="true">→</span></a>
      </div>
      <div className="uct-home-index" aria-hidden="true">
        <span>19</span>
        <small>November<br />2026</small>
      </div>
    </section>
  );
}

export function UrbanClimateTodayArchive() {
  return (
    <div className="uct-archive">
      <header className="uct-intro">
        <p className="eyebrow">Independent analysis · Evidence and urban policy</p>
        <h1>Urban Climate Today<span className="uct-period">.</span></h1>
        <p>Developments in cities and climate, examined through the evidence behind the headlines. A record of what has been announced, what can be measured, and what remains unanswered.</p>
      </header>
      <div className="uct-archive-rule"><span>Latest analysis</span><span>01 article</span></div>
      <article className="uct-feature">
        <a href={articlePath} className="uct-feature-link">
          <div className="uct-feature-meta"><time dateTime="2026-11-19">19 November 2026</time><span>Antalya, Türkiye</span><span>Climate policy &amp; finance</span></div>
          <h2>COP31 in Antalya: How Will Climate Finance Reach Cities?</h2>
          <p>The Antalya Compact sets an ambition for building energy performance. SURFF aims to help cities prepare investment-ready projects. Their real value will be determined by what gets implemented, and for whom.</p>
          <span className="uct-read">Read analysis <span aria-hidden="true">↗</span></span>
        </a>
      </article>
      <p className="uct-archive-footnote">This series offers independent commentary on published evidence and public decisions. It does not treat announcements as completed outcomes.</p>
    </div>
  );
}

export function UrbanClimateTodayArticle() {
  return (
    <article className="uct-article">
      <a className="back-link" href="/today/">← Urban Climate Today</a>
      <header className="uct-article-header">
        <p className="eyebrow">Urban Climate Today · Policy &amp; evidence</p>
        <h1>COP31 in Antalya: How Will Climate Finance Reach Cities?</h1>
        <p className="uct-deck">Two initiatives put buildings and municipal investment on the agenda. The question is how far they can move from commitments to delivery.</p>
        <div className="uct-byline"><span>Kenan Çolak</span><time dateTime="2026-11-19">19 November 2026</time><span>Antalya, Türkiye</span></div>
      </header>

      <div className="uct-keyfacts" aria-label="Numbers in context">
        <div><strong>25%</strong><span>2035 ambition for reducing the operational energy intensity of the global building stock, relative to 2020</span></div>
        <div><strong>80%</strong><span>of 142 NDCs reviewed by UN-Habitat contained well-developed urban content</span></div>
        <div><strong>19%</strong><span>of those NDCs included urban climate finance content</span></div>
      </div>

      <div className="uct-article-grid">
        <aside className="uct-aside">
          <p className="uct-aside-label">In this analysis</p>
          <a href="#buildings">Buildings and thermal exposure</a>
          <a href="#surff">Preparing investment</a>
          <a href="#finance-gap">The finance gap</a>
          <a href="#what-next">What should be measured?</a>
          <p className="uct-aside-note">Evidence, dates and institutional status are distinguished from the author's interpretation.</p>
        </aside>
        <div className="uct-copy">
          <p className="uct-lead">Antalya is hosting COP31 in November 2026. It is also the city at the centre of my doctoral research on urban surface temperatures. That makes two initiatives advanced around the conference particularly interesting: the Antalya Compact for Energy Efficient Buildings and the Sustainable Urban Resilience Financing Facility (SURFF).</p>
          <p>The first sets a global ambition for building performance. The second seeks to help municipalities connect climate plans to viable investment projects. Neither should be confused with measured improvements in neighbourhood conditions. Those results will take time to establish.</p>

          <h2 id="buildings">A buildings target is not a street-temperature target</h2>
          <p>The <a href="https://globalabc.org/resources/publications/antalya-compact-energy-efficient-buildings" target="_blank" rel="noopener noreferrer">Antalya Compact</a>, developed by the COP31 Presidency and the UNEP-hosted Global Alliance for Buildings and Construction, sets a voluntary ambition to reduce the <em>operational energy intensity</em> of the global building stock by at least 25% by 2035, compared with 2020.</p>
          <p>Operational energy intensity is not the same measure as carbon emissions, land surface temperature or indoor thermal safety. Efficient heating and cooling systems, building regulations and renovations are valuable, but a lower energy bill does not by itself make the surrounding street more comfortable during a heatwave.</p>
          <p>The urban climate question extends beyond the building envelope. Shade, vegetation, surface materials, ventilation and the ability of residents to maintain safe indoor conditions require distinct indicators. An evaluation that reports only energy intensity would miss part of that picture.</p>

          <h2 id="surff">SURFF: From local priorities to investment-ready projects</h2>
          <p>SURFF was <a href="https://cop31.tr/news-detail/cop31-presidency-elevates-finance-and-city-action" target="_blank" rel="noopener noreferrer">announced on 24 September 2026</a>, through İLBANK in partnership with UN-Habitat and the World Bank, before the Antalya conference. It is designed to help national and local authorities develop resilient urban investment pipelines and connect project preparation with potential finance.</p>
          <p>It should not be presented as a newly capitalised fund with a confirmed allocation to every participating city. The official materials reviewed describe an enabling facility and coordination approach. They do not establish a dedicated total SURFF budget, a complete list of funded municipalities or a disbursement timetable.</p>
          <p>The institutional challenge is tangible. A municipality might map heat-exposed neighbourhoods and identify priority interventions without having the technical or financial capacity to prepare an investable project. But some of the most valuable interventions, such as public shade in lower-income neighbourhoods, provide social and health benefits rather than an obvious revenue stream.</p>
          <p>Project preparation matters. So does the question of which projects are selected.</p>

          <h2 id="finance-gap">An urban agenda with a financing gap</h2>
          <p>UN-Habitat's <a href="https://unhabitat.org/sites/default/files/2026/05/urban-content-in-ndc3.0.pdf" target="_blank" rel="noopener noreferrer">assessment of 142 national climate plans (NDCs 3.0)</a> found that 80% contained well-developed urban content, while 27 plans, or 19%, included urban climate finance content. The figures describe the content of national plans. They do not measure the proportion of projects already financed or completed.</p>
          <p>The contrast helps explain why implementation is such an important part of the COP31 discussion. Climate priorities can be described at national level, yet the institutions responsible for local delivery may still need authority, technical support and sustained funding.</p>

          <h2 id="what-next">What would count as progress?</h2>
          <p>For the Antalya Compact, useful evidence would include measured changes in building performance and, where relevant, the safety of indoor environments during extreme heat. For SURFF, it would include projects reaching implementation, finance actually mobilised, local government participation and the distribution of benefits across neighbourhoods.</p>
          <p>Urban heat maps are useful for identifying where exposure differs. They cannot tell us whether a municipality has the legal powers, resources or delivery arrangements needed to act. Connecting spatial evidence to investment choices is the next step.</p>
          <p>As COP31 discussions continue, I will be watching for the projects, neighbourhoods and measurable outcomes behind the institutional announcements.</p>
        </div>
      </div>

      <section className="uct-sources" aria-labelledby="uct-sources-heading">
        <h2 id="uct-sources-heading">Sources and further reading</h2>
        <ol>
          <li><a href="https://globalabc.org/resources/publications/antalya-compact-energy-efficient-buildings" target="_blank" rel="noopener noreferrer">GlobalABC — Antalya Compact for Energy Efficient Buildings</a></li>
          <li><a href="https://cop31.tr/news-detail/cop31-presidency-elevates-finance-and-city-action" target="_blank" rel="noopener noreferrer">COP31 Presidency — Launch of SURFF, 24 September 2026</a></li>
          <li><a href="https://cop31.tr/action-plan/cities" target="_blank" rel="noopener noreferrer">COP31 Presidency — Climate-Resilient Cities action agenda</a></li>
          <li><a href="https://unhabitat.org/sites/default/files/2026/05/urban-content-in-ndc3.0.pdf" target="_blank" rel="noopener noreferrer">UN-Habitat (2026) — Urban Content in NDC 3.0: Cities at the Centre</a></li>
          <li><a href="https://unhabitat.org/media/news/cop31-leaders-to-tackle-the-gap-between-urban-climate-commitments-and-action" target="_blank" rel="noopener noreferrer">UN-Habitat — COP31 leaders to tackle the gap between urban commitments and action</a></li>
        </ol>
      </section>
      <div className="uct-end"><a href="/today/">← Back to Urban Climate Today</a></div>
    </article>
  );
}
