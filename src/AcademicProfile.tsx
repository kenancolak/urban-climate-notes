import { useEffect, useState } from 'react';
import { academicService, availability, biography, contactEmail, cvUrl, identity, legalQualification, profileLinks, projects, publishedArticle } from './profile';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      setTheme(saved === 'dark' || (saved !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');
    } catch { setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); }
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  return <button type="button" className="theme-toggle" aria-label={theme === 'dark' ? 'Use light mode' : 'Use dark mode'} onClick={() => {
    const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next);
    try { localStorage.setItem('theme', next); } catch { /* Theme works without storage. */ }
  }}>{theme === 'dark' ? 'Light' : 'Dark'}</button>;
}

export function ProfileLinks() {
  return <ul className="profile-links" aria-label="Academic profiles">{profileLinks.map(({ label, url }) => <li key={label}>{url ? <a href={url}>{label} <span aria-hidden="true">↗</span></a> : <span className="pending-profile">{label}<small>Awaiting verified link</small></span>}</li>)}</ul>;
}

export function AcademicHero() {
  return <section className="academic-hero" aria-labelledby="profile-name">
    <div className="identity-block">
      <p className="eyebrow">Urban planning · Urban climate · Spatial analysis</p>
      <h1 id="profile-name">Kenan Çolak<span className="name-rule" aria-hidden="true" /></h1>
      <p className="hero-availability"><span className="status-dot" aria-hidden="true" />{availability}</p>
      <p className="research-identity">{identity}</p>
      <div className="profile-actions">
        {cvUrl ? <a className="primary-action" href={cvUrl} download>Download CV</a> : <span className="pending-action">Download CV <small>PDF to be added</small></span>}
        <a className="secondary-action" href="/contact/">Contact <span aria-hidden="true">↗</span></a>
      </div>
      <ProfileLinks />
    </div>
    <aside className="research-focus" aria-label="Research focus and availability">
      <p className="eyebrow">Research focus</p>
      <p className="focus-statement">Urban form.<br />Surface temperature.<br />Change over time.</p>
      <div className="focus-locations"><span>Antalya</span><span>Metro Vancouver</span><span>Europe <small>Planned</small></span></div>
    </aside>
  </section>;
}

export function ProjectCards({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3';
  return <div className="academic-projects">{projects.map((project, index) => <article id={project.id} key={project.id} className="project-card" data-status={project.category}>
    <div className="project-topline"><span className="project-index">0{index + 1}</span><span className="project-status">{project.status}</span></div>
    <Heading><a href={`/research/#${project.id}`}>{project.title}</a></Heading>
    <dl><dt>Question</dt><dd>{project.question}</dd><dt>Study area</dt><dd>{project.area}</dd><dt>Data and methods</dt><dd>{project.id === 'antalya' ? <>{project.methods.replace(' (see Methods).', '')} (<a href="/methods/">see Methods</a>).</> : project.methods}</dd></dl>
  </article>)}</div>;
}

function AcademicCredentials() {
  return <>
    <section aria-labelledby="legal-qualification"><h2 id="legal-qualification">Legal qualification</h2><p>{legalQualification}</p></section>
    <section aria-labelledby="academic-service"><h2 id="academic-service">Academic service and invited contributions</h2><ul>{academicService.map(item => <li key={item}>{item}</li>)}</ul></section>
  </>;
}

export function AcademicAbout() {
  return <><header className="page-intro"><p className="eyebrow">About</p><h1>Kenan Çolak</h1><p>Urban and regional planner and urban climate researcher.</p></header><div className="prose-page"><p>{biography}</p><AcademicCredentials /><h2>Academic collaboration</h2><p>{availability}</p><a className="text-link" href="/contact/">Contact →</a><h2>Urban Climate Notes</h2><p>An independent research and science communication project created by Kenan Çolak.</p><a className="text-link" href="/notes/">Explore the notes →</a></div></>;
}

export function CVPage() {
  return <><header className="page-intro"><p className="eyebrow">Academic profile</p><h1>Curriculum vitae</h1></header><div className="prose-page"><p>{biography}</p>{cvUrl ? <a className="primary-action" href={cvUrl} download>Download CV</a> : <p className="content-pending">The downloadable CV will be added after the current PDF is confirmed.</p>}<AcademicCredentials /><section aria-labelledby="selected-publication"><h2 id="selected-publication">Selected peer-reviewed publication</h2><p>{publishedArticle} <a href="https://doi.org/10.31407/ijees12.428">https://doi.org/10.31407/ijees12.428</a></p></section><h2>Research projects</h2><a className="text-link" href="/research/">Research projects →</a></div></>;
}

export function ContactPage() {
  return <><header className="page-intro"><p className="eyebrow">Contact</p><h1>Academic collaboration</h1><p>{availability}</p></header><div className="prose-page">{contactEmail ? <a className="primary-action" href={`mailto:${contactEmail}`}>{contactEmail}</a> : <p className="content-pending">A direct academic contact address will be added once confirmed.</p>}<h2>Academic profiles</h2><ProfileLinks /></div></>;
}
