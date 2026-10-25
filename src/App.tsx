import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import logo from '../images/urban-climate-notes-logo.jpg';
import { AcademicHero, AcademicAbout, CVPage, ContactPage, ProjectCards, ThemeToggle } from './AcademicProfile';
import { getArticleMarkdown, getHeadings, getSeoForRoute, notes, publicationDate, sectionSearchContent, slugify } from './content';
import type { Note } from './content';

const baseUrl = import.meta.env.BASE_URL;

const navigation = [
  { label: 'Home', route: '/' },
  { label: 'Research', route: '/research' },
  { label: 'Notes', route: '/notes' },
  { label: 'Methods', route: '/methods' },
  { label: 'About', route: '/about' },
  { label: 'CV', route: '/cv' },
  { label: 'Contact', route: '/contact' },
];

function getBrowserRoute() {
  const hashRoute = window.location.hash.startsWith('#/')
    ? window.location.hash.slice(1)
    : undefined;
  if (hashRoute) return hashRoute;

  const pathname = window.location.pathname;
  const route = pathname.startsWith(baseUrl)
    ? pathname.slice(baseUrl.length)
    : pathname.replace(/^\/+/, '');
  return route ? `/${route.replace(/\/+$/, '')}` : '/';
}

function useRoute(initialRoute?: string) {
  const [route, setRoute] = useState(() => initialRoute ?? getBrowserRoute());

  useEffect(() => {
    const updateRoute = () => setRoute(getBrowserRoute());
    window.addEventListener('hashchange', updateRoute);
    window.addEventListener('popstate', updateRoute);
    return () => {
      window.removeEventListener('hashchange', updateRoute);
      window.removeEventListener('popstate', updateRoute);
    };
  }, []);
  return route;
}

function routeHref(route: string) {
  const path = route === '/' ? '' : `${route.replace(/^\/+|\/+$/g, '')}/`;
  return `${baseUrl}${path}`;
}

type AppProps = {
  initialRoute?: string;
};

function App({ initialRoute }: AppProps) {
  const route = useRoute(initialRoute);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fragment = window.location.hash.slice(1);
    const target = fragment && !fragment.startsWith('/') ? document.getElementById(decodeURIComponent(fragment)) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [route]);

  const article = route.startsWith('/notes/')
    ? notes.find((note) => route === `/notes/${note.slug}`)
    : undefined;

  useEffect(() => {
    const seo = getSeoForRoute(route);
    const title = seo.title;
    const description = seo.description;
    const image = seo.image || logo;
    document.title = `${title} | Kenan Çolak`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', `${title} | Kenan Çolak`);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    let imageMeta = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (!imageMeta) {
      imageMeta = document.createElement('meta');
      imageMeta.setAttribute('property', 'og:image');
      document.head.append(imageMeta);
    }
    imageMeta.content = new URL(image, 'https://www.kenancolak.com').href;
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', `https://www.kenancolak.com${route === '/' ? '/' : `${route}/`}`);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://www.kenancolak.com${route === '/' ? '/' : `${route}/`}`);
  }, [article, route]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" onKeyDown={(event) => {
        if (event.key === 'Escape' && mobileMenuOpen) {
          setMobileMenuOpen(false);
          document.getElementById('menu-toggle')?.focus();
        }
      }}>
        <div className="header-inner">
          <a className="brand" href={routeHref('/')} aria-label="Kenan Çolak home">
            <span className="brand-name">Kenan Çolak</span><span className="brand-subtitle">Urban climate and planning</span>
          </a>
          <button
            id="menu-toggle"
            className="menu-toggle"
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="site-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? 'Close menu' : 'Menu'}
          </button>
          <nav
            id="site-navigation"
            className={`site-navigation${mobileMenuOpen ? ' is-open' : ''}`}
            aria-label="Main navigation"
          >
            {navigation.map((item) => (
              <a
                key={item.route}
                className={isActiveRoute(route, item.route) ? 'active' : ''}
                aria-current={isActiveRoute(route, item.route) ? 'page' : undefined}
                href={routeHref(item.route)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Search />
          <ThemeToggle />
        </div>
      </header>

      <main id="main-content" className="page-container">
        {article ? (
          <ArticlePage note={article} />
        ) : route === '/notes' ? (
          <NotesPage />
        ) : route === '/methods' ? (
          <MethodsPage />
        ) : route === '/research' ? (
          <ResearchPage />
        ) : route === '/about' ? (
          <AcademicAbout />
        ) : route === '/cv' ? (
          <CVPage />
        ) : route === '/contact' ? (
          <ContactPage />
        ) : route === '/' ? (
          <HomePage />
        ) : (
          <NotFoundPage />
        )}
      </main>

      <footer className="site-footer">
        <span>© 2026 Kenan Çolak</span>
        <a href={routeHref('/notes')}>Urban Climate Notes · Research & evidence</a>
      </footer>
    </div>
  );
}

function isActiveRoute(route: string, href: string) {
  return route === href || (href !== '/' && route.startsWith(`${href}/`));
}

function Search() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];

    const noteResults = notes
      .map((note) => {
        const markdown = getArticleMarkdown(note.source);
        return {
          title: note.title,
          href: routeHref(`/notes/${note.slug}`),
          description: `${note.city} · ${note.subtitle}`,
          type: 'Field note',
          searchable: `${note.title} ${note.city} ${note.subtitle} ${note.categories.join(' ')} ${markdown}`,
        };
      })
      .filter((item) => terms.every((term) => item.searchable.toLowerCase().includes(term)));
    const pageResults = sectionSearchContent
      .filter((page) => terms.every((term) =>
        `${page.title} ${page.description} ${page.content}`.toLowerCase().includes(term),
      ))
      .map((page) => ({
        title: page.title,
        href: routeHref(page.href),
        description: page.description,
        type: 'Guide',
        searchable: `${page.title} ${page.description}`,
      }));

    return [...noteResults, ...pageResults].slice(0, 6);
  }, [query]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, []);

  useEffect(() => {
    const focusSearchShortcut = (event: KeyboardEvent) => {
      if (
        event.key === '/' &&
        !(event.target instanceof HTMLElement && (
          event.target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)
        ))
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', focusSearchShortcut);
    return () => document.removeEventListener('keydown', focusSearchShortcut);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  function selectResult(index: number) {
    const result = results[index];
    if (result) window.location.assign(result.href);
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === 'ArrowDown' && results.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp' && results.length) {
      event.preventDefault();
      setIsOpen(true);
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    } else if (event.key === 'Enter' && activeIndex >= 0) {
      event.preventDefault();
      selectResult(activeIndex);
    }
  }

  return (
    <div className="search-wrap" ref={searchRef}>
      <form className={`search-form${isOpen ? ' is-open' : ''}`} role="search" onSubmit={(event) => event.preventDefault()}>
        <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.8" cy="10.8" r="6.6" />
          <path d="m16 16 4.1 4.1" />
        </svg>
        <label className="visually-hidden" htmlFor="site-search">Search this site</label>
        <input
          ref={inputRef}
          id="site-search"
          type="search"
          role="combobox"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search the site"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isOpen && Boolean(query.trim())}
          aria-controls={isOpen && query.trim() ? 'search-results' : undefined}
          aria-activedescendant={isOpen && activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
        />
        {query && (
          <button
            className="search-clear"
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery('');
              setIsOpen(true);
              inputRef.current?.focus();
            }}
          >
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 4 8 8m0-8-8 8" /></svg>
          </button>
        )}
        {!query && <kbd className="search-shortcut" aria-hidden="true">/</kbd>}
      </form>
      {isOpen && query.trim() && (
        <div className="search-results" id="search-results">
          <div className="search-results-heading">
            <span>{results.length ? 'Search results' : 'No results'}</span>
            {results.length > 0 && <span>{results.length} {results.length === 1 ? 'match' : 'matches'}</span>}
          </div>
          {results.length ? (
            <ul role="listbox" aria-label="Search results">
              {results.map((result, index) => (
                <li key={result.href} role="presentation">
                  <a
                    id={`search-result-${index}`}
                    role="option"
                    aria-selected={activeIndex === index}
                    className={activeIndex === index ? 'is-active' : ''}
                    href={result.href}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="search-result-type">{result.type}</span>
                    <strong>{result.title}</strong>
                    <span className="search-result-description">{result.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="search-empty">
              <span className="search-empty-icon" aria-hidden="true">⌕</span>
              <p>No pages match “{query.trim()}”.</p>
              <span>Try a topic like Tokyo, heat, or remote sensing.</span>
            </div>
          )}
          {results.length > 0 && (
            <div className="search-results-footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
              <span><kbd>Enter</kbd> to open</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <AcademicHero />
      <section className="featured-research" aria-labelledby="featured-research-title">
        <div className="section-topline"><SectionHeading id="featured-research-title">Featured Research</SectionHeading><a className="text-link" href={routeHref('/research')}>All research →</a></div>
        <ProjectCards headingLevel={3} />
      </section>

      <section aria-labelledby="latest-title">
        <SectionHeading id="latest-title">Recent Research Notes</SectionHeading>
        <div className="notes-grid">
          {[...notes].sort((a, b) => publicationDate(b).localeCompare(publicationDate(a))).map((note) => <NoteCard key={note.slug} note={note} />)}
        </div>
      </section>

      <aside className="question-panel">
        <p className="eyebrow">A question behind the project</p>
        <p>How can climate evidence help us understand, design and plan better cities?</p>
      </aside>

      <section aria-labelledby="explore-title" className="explore-section">
        <SectionHeading id="explore-title">Explore</SectionHeading>
        <div className="explore-grid">
          <ExploreCard title="Cities" href={routeHref('/notes')}>
            Urban climate stories told through real places, observations and long-term change.
          </ExploreCard>
          <ExploreCard title="Methods" href={routeHref('/methods')}>
            How satellites, meteorological observations, GIS and spatial analysis help us measure urban climate.
          </ExploreCard>
          <ExploreCard title="Research" href={routeHref('/research')}>
            Current research on urban morphology, surface urban heat, remote sensing and climate-responsive planning.
          </ExploreCard>
        </div>
      </section>
    </>
  );
}

function NotesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Field notes"
        title="Published Notes"
        description="Cities, data and scientific literature as ways to understand how climate change is experienced in the places where we live."
      />
      <div className="notes-grid notes-grid-list">
        {notes.map((note) => <NoteCard key={note.slug} note={note} />)}
      </div>
      <section className="coming-next">
        <p className="eyebrow">Explore the latest note</p>
        <h2>What Temperature Are We Actually Measuring?</h2>
        <p>Phoenix, satellite heat maps, and the air above the street.</p>
        <a className="text-link" href={routeHref('/notes/what-temperature-are-we-actually-measuring')}>Read Note 04 <span aria-hidden="true">→</span></a>
      </section>
    </>
  );
}

function NoteCard({ note }: { note: Note }) {
  return (
    <article className="note-card">
      <a className="note-image" href={routeHref(`/notes/${note.slug}`)} tabIndex={-1} aria-hidden="true">
        <img src={note.cover} alt="" loading="lazy" />
      </a>
      <div className="note-card-body">
        <p className="note-number">Urban Climate Notes #{note.number} <span>·</span> {note.city}</p>
        <h3><a href={routeHref(`/notes/${note.slug}`)}>{note.title}</a></h3>
        <p>{note.subtitle}.</p>
        <a className="text-link" href={routeHref(`/notes/${note.slug}`)}>Read note <span aria-hidden="true">→</span></a>
      </div>
    </article>
  );
}

function ArticlePage({ note }: { note: Note }) {
  const markdown = useMemo(() => getArticleMarkdown(note.source), [note.source]);
  const headings = useMemo(() => getHeadings(markdown), [markdown]);
  const nextNote = notes.find((item) => Number(item.number) === Number(note.number) + 1);
  const [activeHeading, setActiveHeading] = useState(headings[0]?.id ?? '');

  useEffect(() => {
    let frame = 0;
    const updateActiveHeading = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const atPageBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
        const visibleHeading = [...headings].reverse().find((heading) => {
          const element = document.getElementById(heading.id);
          return element !== null && element.getBoundingClientRect().top <= 160;
        });
        const nextActive = atPageBottom
          ? headings[headings.length - 1]?.id
          : visibleHeading?.id ?? headings[0]?.id;

        if (nextActive) setActiveHeading(nextActive);
      });
    };

    updateActiveHeading();
    window.addEventListener('scroll', updateActiveHeading, { passive: true });
    window.addEventListener('resize', updateActiveHeading);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveHeading);
      window.removeEventListener('resize', updateActiveHeading);
    };
  }, [headings]);

  return (
    <article className="article-page">
      <a className="back-link" href={routeHref('/notes')}>← All notes</a>
      <header className="article-header">
        <p className="eyebrow">Urban Climate Notes #{note.number} · {note.city}</p>
        <h1>{note.title}</h1>
        <p className="article-subtitle">{note.subtitle}</p>
        <div className="article-meta">
          <span>By Kenan Çolak</span>
          <time dateTime={publicationDate(note)}>Published: {note.date}</time>
          {note.modified && <time dateTime={note.modified}>Updated: {new Date(`${note.modified}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</time>}
        </div>
        <div className="category-list" aria-label="Topics">
          {note.categories.map((category) => <span key={category}>{category}</span>)}
        </div>
      </header>
      <img
        className="article-cover"
        src={note.cover}
        alt={`${note.title} cover`}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="article-layout">
        <aside className="table-of-contents">
          <p>In this note</p>
          <nav aria-label="On this page">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={activeHeading === heading.id ? 'active' : ''}
                aria-current={activeHeading === heading.id ? 'location' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveHeading(heading.id);
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
                    block: 'start',
                  });
                }}
              >
                {heading.title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="article-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => <h2 id={slugify(String(children))}>{children}</h2>,
              img: ({ src, alt }) => {
                const assetKey = src?.replace(/^(\.\.\/)?images\//, '');
                const asset = assetKey ? note.imageFiles[assetKey] : undefined;
                return <img src={asset ?? src} alt={alt ?? ''} loading="lazy" />;
              },
              a: ({ href, children }) => (
                <a
                  href={href}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>
      </div>
      <nav className="article-pagination" aria-label="Note navigation">
        {notes.filter((item) => item.number !== note.number).map((other) => (
          <a key={other.slug} href={routeHref(`/notes/${other.slug}`)}>
            <span>{Number(other.number) < Number(note.number) ? 'Previous note' : 'Next note'}</span>
            <strong>{other.title}</strong>
          </a>
        ))}
        {!nextNote && (
          <div className="upcoming-note">
            <span>Coming next</span>
            <strong>More urban climate stories are on the way.</strong>
          </div>
        )}
      </nav>
    </article>
  );
}

function MethodsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Measurement & evidence"
        title="How do we measure urban climate?"
        description="Urban climate can be observed at several spatial and temporal scales. This section explains the methods behind the evidence presented in the articles."
      />
      <div className="prose-page">
        <h2>Stability and Comparability</h2>
        <p>Long-term comparisons of urban thermal change are only meaningful when the areas being compared remain sufficiently stable. Changes in land cover or urban form can otherwise be mistaken for climatic change. My research addresses this by selecting comparison areas whose physical characteristics remain largely unchanged over the study period, and by testing how sensitive the results are to the way those areas are defined. Data sources include Landsat, Sentinel-2 and ERA5-Land, processed with Google Earth Engine.</p>
        <h2>Land Surface Temperature</h2>
        <p>Satellite-derived Land Surface Temperature (LST) measures the thermal state of the Earth’s surface. It is not the same as air temperature.</p>
        <h2>Air Temperature</h2>
        <p>Meteorological observations measure atmospheric conditions close to the surface and are essential for understanding human thermal exposure.</p>
        <h2>Urban Heat Island</h2>
        <p>The Urban Heat Island describes the temperature difference between urban environments and their less urbanized surroundings. Different definitions and measurement approaches can produce different estimates.</p>
        <h2>Remote Sensing</h2>
        <p>Key sources include Landsat, Sentinel-2, MODIS and ECOSTRESS.</p>
        <h2>Google Earth Engine</h2>
        <p>Google Earth Engine allows large satellite archives to be processed consistently across long time periods and large geographic areas.</p>
        <h2>Urban Morphology</h2>
        <p>Urban form can influence solar exposure, shading, ventilation, heat storage, surface properties and vegetation availability.</p>

      </div>
    </>
  );
}

function ResearchPage() {
  return <><PageIntro eyebrow="Research projects" title="Research" description="Urban morphology, surface temperature and change over time." /><ProjectCards /><section className="prose-page" aria-labelledby="research-areas"><h2 id="research-areas">Research areas</h2><ul>{['Urban Climate', 'Urban Morphology', 'Remote Sensing', 'GIS and Spatial Analysis', 'Climate-Responsive Planning'].map(area => <li key={area}>{area}</li>)}</ul></section></>;
}

function NotFoundPage() {
  return (
    <PageIntro
      eyebrow="Page not found"
      title="This page has moved."
      description="Try the notes archive or use the search field to find what you are looking for."
    />
  );
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

function SectionHeading({ id, children }: { id: string; children: string }) {
  return <h2 id={id} className="section-heading">{children}</h2>;
}

function ExploreCard({ title, href, children }: { title: string; href: string; children: string }) {
  return (
    <a className="explore-card" href={href}>
      <h3>{title} <span aria-hidden="true">→</span></h3>
      <p>{children}</p>
    </a>
  );
}

export default App;
