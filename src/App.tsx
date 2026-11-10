import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { GradientField } from "./GradientField";
import { Reveal } from "./Reveal";

const APP_URL = "https://play.dueloro.com/";
const DECK_URL = "/MoneyMatch Deck.pdf";

function usePath() {
  const [path, setPath] = useState(location.pathname.replace(/\/$/, "") || "/");
  useEffect(() => {
    const update = () => setPath(location.pathname.replace(/\/$/, "") || "/");
    addEventListener("popstate", update);
    return () => removeEventListener("popstate", update);
  }, []);
  return path;
}

function Link({
  to,
  children,
  className,
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        history.pushState({}, "", to);
        dispatchEvent(new PopStateEvent("popstate"));
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}

function Mark() {
  return <span className="mark" aria-hidden="true" />;
}
function Brand() {
  return (
    <Link to="/" className="brand">
      <Mark />
      <span>DUELORO</span>
    </Link>
  );
}
function Eye({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", close);
    return () => removeEventListener("keydown", close);
  }, []);
  const links = [
    ["/products/money-match", "PRODUCT"],
    ["/about", "COMPANY"],
    ["/team", "TEAM"],
    ["/contact", "CONTACT"],
  ];
  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Primary">
        <Brand />
        <div className="nav-links">
          {links.map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </div>
        <div className="nav-actions">
          <a className="waitlist-link" href="/#real-money-waitlist">
            REAL-MONEY WAITLIST
          </a>
          <a className="btn primary small" href={APP_URL}>
            PLAY MONEY MATCH ↗
          </a>
          <button
            className="menu"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
            <i>Menu</i>
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-nav" className="mobile-nav">
          {links.map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <a href="/#real-money-waitlist" onClick={() => setOpen(false)}>
            REAL-MONEY WAITLIST
          </a>
          <a className="btn primary" href={APP_URL}>
            PLAY MONEY MATCH ↗
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <GradientField className="hero-field" />
      <div className="hero-scrim" />
      <div className="container hero-inner">
        <Reveal>
          <div className="hero-brand">
            <Mark />
            <b>DUELORO</b>
          </div>
          <Eye>SOFTWARE FOR SKILL-BASED COMPETITION</Eye>
          <h1>Competition deserves better software.</h1>
          <p className="lead">
            Dueloro builds trusted software for skill-based competitions. Our
            first product, Money Match, lets you wager on the skill-based video
            games you already play.
          </p>
          <div className="actions">
            <a className="btn primary" href={APP_URL}>
              PLAY MONEY MATCH ↗
            </a>
            <Link className="btn ghost" to="/products/money-match">
              EXPLORE THE PRODUCT
            </Link>
          </div>
          <p className="note">
            SKILL-BASED MATCHMAKING · API RESULT VERIFICATION · INSTANT PAYOUTS
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const principles = [
  [
    "IDENTITY",
    "Every match begins with real, eligible players. Connect your account, verify your age and location, then compete under one identity.",
  ],
  [
    "MATCHING",
    "Compete against players in a similar skill bracket. Better matchmaking creates fairer contests and more meaningful wins.",
  ],
  [
    "VERIFICATION",
    "Results come directly from supported game APIs. No screenshots, gameplay streams, or manual review.",
  ],
  [
    "PAYOUTS",
    "Winnings move through familiar payment providers with simple, fast settlement.",
  ],
];

function Product() {
  return (
    <>
      <section className="section">
        <div className="container split">
          <Reveal>
            <Eye>01 · PRODUCT LAUNCH</Eye>
            <h2>Money Match</h2>
            <p className="lead">
              Connect to your video game of choice, match with players near
              your level, wager on the games you already know, and let verified
              results settle the contest.
            </p>
            <div className="actions">
              <a className="btn primary" href={APP_URL}>
                PLAY MONEY MATCH ↗
              </a>
              <Link className="text-link" to="/products/money-match">
                HOW IT WORKS →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="terminal skill-contract">
              <div className="contract-glow" aria-hidden="true" />
              <header>
                <span>MONEY MATCH · SKILL CONTRACT</span>
                <b>PRODUCT VISION</b>
              </header>
              <main>
                <div>
                  <small>PLAYER 01</small>
                  <strong>1842</strong>
                  <i>RATING</i>
                </div>
                <em>VS</em>
                <div>
                  <small>PLAYER 02</small>
                  <strong>1855</strong>
                  <i>RATING</i>
                </div>
              </main>
              <div className="contract-stake">
                <span>CONTRACT VALUE</span>
                <strong>$25.00</strong>
                <span>RESULT FEED <b>CONNECTED</b></span>
              </div>
              <footer>
                <span>API RESULT VERIFICATION</span>
                <span>AUTOMATED SETTLEMENT</span>
              </footer>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section ruled">
        <div className="container">
          <Reveal>
            <Eye>02 · THE STANDARD</Eye>
            <h2>Trust is our core product.</h2>
          </Reveal>
          <div className="principles">
            {principles.map(([title, copy], i) => (
              <Reveal key={title} delay={i * 50}>
                <article>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

type State = "idle" | "sending" | "survey" | "saving" | "done" | "error";
function Waitlist() {
  const [state, setState] = useState<State>("idle"),
    [email, setEmail] = useState(""),
    [name, setName] = useState(""),
    [consent, setConsent] = useState(false),
    [id, setId] = useState("");
  const [wager, setWager] = useState(""),
    [playersLounge, setPlayersLounge] = useState(""),
    [triumph, setTriumph] = useState(""),
    [priorities, setPriorities] = useState<string[]>([]);
  async function join(e: FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const r = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "join",
          email,
          firstName: name,
          consent,
          source: "dueloro-site",
        }),
      });
      const d = await r.json();
      if (!r.ok || !d.id) throw 0;
      setId(d.id);
      setState("survey");
    } catch {
      setState("error");
    }
  }
  async function survey(e: FormEvent) {
    e.preventDefault();
    setState("saving");
    try {
      const r = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "survey",
          id,
          wagerFrequency: wager,
          platforms: { playersLounge, triumph },
          priorities,
        }),
      });
      if (!r.ok) throw 0;
      setState("done");
    } catch {
      setState("survey");
    }
  }
  return (
    <section className="waitlist" id="real-money-waitlist">
      <div className="container">
        <div className="waitlist-card">
          <div>
            <Eye>REAL-MONEY LAUNCH</Eye>
            <h2>Know when it becomes available.</h2>
            <p>
              Real-money contests are not currently available. Join for launch
              updates and potential early access, subject to eligibility and
              location.
            </p>
          </div>
          {state === "survey" || state === "saving" ? (
            <form className="survey" onSubmit={survey}>
              <header>
                <div>
                  <b>YOU’RE ON THE LIST.</b>
                  <span>Three optional questions · about 30 seconds</span>
                </div>
                <button type="button" onClick={() => setState("done")}>
                  SKIP
                </button>
              </header>
              <fieldset>
                <legend>Do you wager on competitive video games?</legend>
                {[
                  ["regularly", "Regularly"],
                  ["occasionally", "Occasionally"],
                  ["previously", "Previously, but not now"],
                  ["never", "Never"],
                ].map(([v, l]) => (
                  <label key={v}>
                    <input
                      type="radio"
                      name="wager"
                      checked={wager === v}
                      onChange={() => setWager(v)}
                    />
                    {l}
                  </label>
                ))}
              </fieldset>
              <fieldset>
                <legend>Are you familiar with these platforms?</legend>
                <label className="select">
                  <span>Players’ Lounge</span>
                  <select
                    value={playersLounge}
                    onChange={(e) => setPlayersLounge(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="used">Used it</option>
                    <option value="heard">Heard of it</option>
                    <option value="unfamiliar">Not familiar</option>
                  </select>
                </label>
                <label className="select">
                  <span>Triumph</span>
                  <select
                    value={triumph}
                    onChange={(e) => setTriumph(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="used">Used it</option>
                    <option value="heard">Heard of it</option>
                    <option value="unfamiliar">Not familiar</option>
                  </select>
                </label>
              </fieldset>
              <fieldset>
                <legend>
                  What matters most? <small>Choose up to two.</small>
                </legend>
                {[
                  "Fair matchmaking",
                  "Trustworthy verification",
                  "Fast payouts",
                  "Low fees",
                  "Playing with friends",
                  "Anti-cheat protection",
                ].map((p) => (
                  <label key={p}>
                    <input
                      type="checkbox"
                      checked={priorities.includes(p)}
                      disabled={
                        !priorities.includes(p) && priorities.length === 2
                      }
                      onChange={() =>
                        setPriorities((x) =>
                          x.includes(p) ? x.filter((y) => y !== p) : [...x, p],
                        )
                      }
                    />
                    {p}
                  </label>
                ))}
              </fieldset>
              <button className="btn primary">
                {state === "saving" ? "SAVING…" : "SAVE ANSWERS"}
              </button>
            </form>
          ) : state === "done" ? (
            <div className="complete" role="status">
              <b>YOU’RE ON THE LIST.</b>
              <span>You can explore the Money Match demo today.</span>
              <a className="text-link" href={APP_URL}>
                PLAY MONEY MATCH →
              </a>
            </div>
          ) : (
            <form className="signup" onSubmit={join}>
              <div className="fields">
                <label>
                  <span>EMAIL</span>
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  <span>
                    FIRST NAME <i>OPTIONAL</i>
                  </span>
                  <input
                    type="text"
                    autoComplete="given-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>
              </div>
              <label className="consent">
                <input
                  required
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                I agree to receive launch updates. I can unsubscribe at any
                time.
              </label>
              <div className="form-action">
                <button className="btn primary" disabled={state === "sending"}>
                  {state === "sending" ? "JOINING…" : "JOIN WAITLIST"}
                </button>
                <small>
                  See our <Link to="/privacy">Privacy Policy</Link>.
                </small>
              </div>
              {state === "error" && (
                <p className="error" role="alert">
                  We couldn’t save your signup. Please try again shortly.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Product />
      <Waitlist />
    </>
  );
}
function Intro({
  eye,
  title,
  children,
}: {
  eye: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Reveal>
      <div className="intro">
        <Eye>{eye}</Eye>
        <h1>{title}</h1>
        <div className="page-lead">{children}</div>
      </div>
    </Reveal>
  );
}
function Basic({
  eye,
  title,
  children,
}: {
  eye: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="page compact-page container">
      <Intro eye={eye} title={title}>
        {children}
      </Intro>
    </div>
  );
}

function Contact() {
  return (
    <div className="page compact-page contact-page container">
      <Intro eye="CONTACT" title="Talk to the right person.">
        <p>
          Questions, ideas, product help, and partnership conversations are all
          welcome. Choose the address that best fits what you need.
        </p>
      </Intro>
      <div className="contact-grid">
        <a href="mailto:hello@dueloro.com">
          <span>GENERAL</span>
          <h2>hello@dueloro.com</h2>
          <p>Company questions, partnerships, press, and careers.</p>
          <b>WRITE TO US ↗</b>
        </a>
        <a href="mailto:support@dueloro.com">
          <span>PRODUCT SUPPORT</span>
          <h2>support@dueloro.com</h2>
          <p>Money Match, account questions, and security reports.</p>
          <b>GET SUPPORT ↗</b>
        </a>
      </div>
      <section className="quick-answers">
        <Eye>QUICK ANSWERS</Eye>
        <div>
          <article>
            <h2>When will real-money contests be available?</h2>
            <p>
              Timing will depend on eligibility, location, final product rules,
              and regulatory readiness. Join the waitlist for launch updates.
            </p>
          </article>
          <article>
            <h2>How do I report a product or account issue?</h2>
            <p>
              Email support@dueloro.com with the account email and a concise
              description of what happened.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="copy-field">
      <div>
        <span>{label}</span>
        <code>{value}</code>
      </div>
      <button type="button" onClick={copy} aria-label={`Copy ${label}`}>
        {copied ? "COPIED" : "COPY"}
      </button>
    </div>
  );
}

const careerTracks = [
  {
    id: "engineering",
    name: "Engineering",
    summary: "Product engineering, infrastructure, and data systems.",
    subject: "Engineering application | Your name",
  },
  {
    id: "strategy",
    name: "Strategy and Insights",
    summary: "Market research, partnerships, operations, and company strategy.",
    subject: "Strategy and Insights application | Your name",
  },
  {
    id: "general",
    name: "General Application",
    summary: "For contributions that do not fit neatly into one track.",
    subject: "General application | Your name",
  },
];

function Careers() {
  const [open, setOpen] = useState<string | null>("engineering");
  return (
    <div className="page compact-page careers-page container">
      <Intro eye="CAREERS" title="Join the team.">
        <p>
          If you are excited about the future of skill-based competition and
          care deeply about fintech, AI, or video games, learn more about our{" "}
          <Link className="text-link" to="/team">
            team
          </Link>{" "}
          and explore a track below.
        </p>
      </Intro>
      <div className="career-tracks">
        {careerTracks.map((track) => {
          const expanded = open === track.id;
          return (
            <article
              className={`career-track${expanded ? " open" : ""}`}
              key={track.id}
            >
              <button
                type="button"
                className="career-trigger"
                aria-expanded={expanded}
                aria-controls={`${track.id}-application`}
                onClick={() => setOpen(expanded ? null : track.id)}
              >
                <span>
                  <small>REMOTE</small>
                  <strong>{track.name}</strong>
                  <i>{track.summary}</i>
                </span>
                <b aria-hidden="true">{expanded ? "−" : "+"}</b>
              </button>
              {expanded && (
                <div className="career-panel" id={`${track.id}-application`}>
                  <p>
                    We are a very small team, and we are glad you want to join
                    us. Send your resume and a few thoughtful words about why
                    Dueloro and this track interest you.
                  </p>
                  <div
                    className="email-sheet"
                    aria-label={`${track.name} application details`}
                  >
                    <CopyField label="EMAIL" value="hello@dueloro.com" />
                    <CopyField label="SUBJECT" value={track.subject} />
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Blog() {
  return (
    <div className="page compact-page blog-page container">
      <Intro eye="COMPANY" title="Blog.">
        <p>
          Notes on products, skill-based competition, trust, and what we learn
          while building Dueloro.
        </p>
      </Intro>
      <div className="blog-coming">
        <span>COMING SOON</span>
        <p>Our first field notes are in progress.</p>
      </div>
    </div>
  );
}

function MoneyMatch() {
  return (
    <div className="page product-page container">
      <Intro
        eye="PRODUCT · MONEY MATCH"
        title="Skill contracts for the games you already play."
      >
        <p>
          Money Match is a platform for player-to-player skill contests in the
          video games people already play. Connect your game account, find a
          fair matchup, set the terms, and let verified game data settle the
          result.
        </p>
        <div className="actions">
          <a className="btn primary" href={APP_URL}>
            PLAY MONEY MATCH ↗
          </a>
          <a
            className="btn ghost"
            href={DECK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW PITCH DECK
          </a>
        </div>
      </Intro>
      <Waitlist />
    </div>
  );
}

type Person = {
  slug: string;
  firstName: string;
  name: string;
  galleryRole: string;
  title: string;
  initials: string;
  linkedin: string;
  short: string;
  story?: string[];
  quote?: string;
};

const people: Person[] = [
  {
    slug: "mazlowe-wood",
    firstName: "Maz",
    name: "Mazlowe Wood",
    galleryRole: "Operations",
    title: "Co-founder & CEO",
    initials: "MW",
    linkedin: "https://www.linkedin.com/in/elliot-wood-985741269/",
    short:
      "Keeps the product, partnerships, and company moving in the same direction. Usually thinking three steps ahead.",
    story: [
      "Dueloro began with a straightforward observation: competitive players already put enormous value on skill, but the software around that competition rarely earns the same level of trust.",
      "Maz leads the company across strategy, operations, and product direction. His work is focused on turning a promising category into something durable—clear rules, aligned incentives, and partnerships that make verified competition possible.",
      "At Dueloro, that means building carefully before building loudly. Every product decision starts with the same question: what would make a player, partner, or regulator trust the outcome?",
    ],
    quote: "Trust has to be designed into the product before the first contest begins.",
  },
  {
    slug: "shreyansh-misra",
    firstName: "Shrey",
    name: "Shreyansh Misra",
    galleryRole: "Engineering",
    title: "Co-founder & CTO",
    initials: "SM",
    linkedin: "https://www.linkedin.com/in/shreyanshmisra/",
    short:
      "Builds the product and the systems behind it. Deeply suspicious of anything that cannot be verified.",
    story: [
      "The hardest part of competitive software is not drawing the match screen. It is making every state change legible, defensible, and reliable when the result matters.",
      "Shrey leads product engineering at Dueloro. He works across the full system—from the player experience to the infrastructure that connects identity, matchmaking, game data, and settlement.",
      "His approach is to make trust observable. A player should understand what is happening, a partner should be able to verify it, and the system should preserve a clear record from match creation through final outcome.",
    ],
    quote: "The system should make the correct outcome easy to see and difficult to dispute.",
  },
  {
    slug: "steve-gorson",
    firstName: "Steve",
    name: "Steve Gorson",
    galleryRole: "Marketing",
    title: "CMO",
    initials: "SG",
    linkedin: "https://www.linkedin.com/in/stevegorson/",
    short:
      "Turns difficult ideas into stories people remember. Keeps us from sounding like a database manual.",
  },
  {
    slug: "sonny-zhang",
    firstName: "Sonny",
    name: "Sonny Zhang",
    galleryRole: "Advisor",
    title: "Engineering Advisor",
    initials: "SZ",
    linkedin: "https://www.linkedin.com/in/fumingzhang1/",
    short:
      "Pressure-tests the technical foundation. Finds infrastructure problems before they become exciting.",
  },
  {
    slug: "thomas-veasy",
    firstName: "Thomas",
    name: "Thomas Veasy",
    galleryRole: "Advisor",
    title: "Operations Advisor",
    initials: "TV",
    linkedin: "https://www.linkedin.com/in/thomasveasy/",
    short:
      "Brings an operator’s eye to the company. Good at turning ambitious plans into executable ones.",
  },
];

function TeamCard({ person }: { person: Person }) {
  const boardClass = `board-${person.firstName.toLowerCase()}`;
  const content = (
    <>
      <div className="team-portrait">
        <div
          className="portrait-placeholder"
          aria-label={`${person.name} portrait placeholder`}
        >
          <b>{person.initials}</b>
          <small>PHOTO INCOMING</small>
        </div>
      </div>
      <div className="team-card-copy">
        <p>{person.galleryRole}</p>
        <h2 className="team-name">{person.firstName}</h2>
        {person.story && (
          <h2 className="team-story-title">Read {person.firstName}’s story →</h2>
        )}
        <div className="team-reveal">
          <p>{person.short}</p>
        </div>
      </div>
    </>
  );
  return person.story ? (
    <Link
      className={`team-card has-story ${boardClass}`}
      to={`/team/${person.slug}`}
    >
      {content}
    </Link>
  ) : (
    <article className={`team-card ${boardClass}`} tabIndex={0}>
      {content}
    </article>
  );
}

function Team() {
  return (
    <div className="team-page container">
      <Reveal>
        <header className="team-intro">
          <Eye>OUR TEAM</Eye>
          <p>Five people building a better way to compete.</p>
        </header>
      </Reveal>
      <div className="team-board">
        <svg
          className="board-connections"
          viewBox="0 0 1000 820"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M168 292 C300 210 365 195 498 175" />
          <path d="M498 175 C650 175 735 242 858 314" />
          <path d="M168 292 C205 470 220 560 294 682" />
          <path d="M294 682 C420 620 500 615 600 665" />
          <path d="M600 665 C720 560 790 445 858 314" />
          <path className="board-crosslink" d="M498 175 C515 360 545 510 600 665" />
          <circle cx="168" cy="292" r="5" />
          <circle cx="498" cy="175" r="5" />
          <circle cx="858" cy="314" r="5" />
          <circle cx="294" cy="682" r="5" />
          <circle cx="600" cy="665" r="5" />
        </svg>
        <span className="board-note note-alpha">SIGNAL MAP // TEAM</span>
        <span className="board-note note-beta">FIVE SPECIALTIES · ONE SYSTEM</span>
        <span className="board-note note-gamma">STATUS: BUILDING</span>
        {people.map((person) => (
          <TeamCard key={person.slug} person={person} />
        ))}
      </div>
    </div>
  );
}

function TeamProfile({ person }: { person: Person }) {
  return (
    <article className="profile-page container">
      <Link className="profile-back" to="/team">
        ← ALL TEAM
      </Link>
      <header className="profile-hero">
        <div>
          <Eye>FOUNDER STORY</Eye>
          <h1>{person.name}</h1>
          <p>{person.title}</p>
          <a
            className="text-link"
            href={person.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LINKEDIN ↗
          </a>
        </div>
        <div
          className="profile-placeholder"
          aria-label={`${person.name} portrait placeholder`}
        >
          <b>{person.initials}</b>
          <span>PORTRAIT FORTHCOMING</span>
        </div>
      </header>
      <div className="profile-story">
        <blockquote>“{person.quote}”</blockquote>
        <div>
          {person.story?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
      <nav className="profile-next" aria-label="Team stories">
        <Link to="/team">MEET THE FULL TEAM</Link>
        <Link
          to={
            person.slug === "mazlowe-wood"
              ? "/team/shreyansh-misra"
              : "/team/mazlowe-wood"
          }
        >
          NEXT FOUNDER STORY →
        </Link>
      </nav>
    </article>
  );
}

function Legal({ type }: { type: "privacy" | "terms" | "regulatory" }) {
  const content =
    type === "privacy"
      ? [
          [
            "Information we collect",
            "Waitlist email, optional name, consent record, source, and optional survey answers.",
          ],
          [
            "How we use it",
            "To manage the waitlist, send requested launch updates, prevent abuse, and improve our products.",
          ],
          [
            "Sharing and retention",
            "We use hosting, storage, and email providers. We do not sell waitlist data.",
          ],
          [
            "Your choices",
            "Unsubscribe from any email or contact hello@dueloro.com to access or delete your information.",
          ],
        ]
      : type === "terms"
        ? [
            [
              "Website use",
              "Use this site lawfully and do not interfere with it or submit abusive information.",
            ],
            [
              "Waitlist",
              "Joining does not create an account, reserve a place, guarantee access, or confirm future eligibility.",
            ],
            [
              "Product terms",
              "Money Match is governed by the terms presented inside that product.",
            ],
            ["Contact", "Questions may be sent to hello@dueloro.com."],
          ]
        : [
            [
              "Product demo",
              "The current public Money Match experience does not support deposits, withdrawals, or cash prizes.",
            ],
            [
              "Real-money features",
              "Real-money contests, deposits, and withdrawals are not currently available.",
            ],
            [
              "Future availability",
              "Any future access will depend on law, location, age, identity verification, and final product rules.",
            ],
          ];
  const title =
    type === "privacy"
      ? "Privacy Policy"
      : type === "terms"
        ? "Website Terms"
        : "Current product availability";
  return (
    <div className="page compact-page container legal">
      <Intro eye={type === "regulatory" ? "REGULATORY" : "LEGAL"} title={title}>
        <p>Plain-language information for the Dueloro website and waitlist.</p>
      </Intro>
      <div className="legal-copy">
        {content.map(([h, p]) => (
          <section key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </section>
        ))}
        <p className="note">LAST UPDATED NOVEMBER 10, 2026</p>
      </div>
    </div>
  );
}

const meta: Record<string, [string, string]> = {
  "/": [
    "Dueloro — Software for skill-based competition",
    "Dueloro builds trusted software for skill-based competition.",
  ],
  "/products/money-match": [
    "Money Match — Dueloro",
    "Skill contracts for the competitive video games you already play.",
  ],
  "/about": [
    "About — Dueloro",
    "Why Dueloro builds trusted competitive software.",
  ],
  "/team": ["Team — Dueloro", "Meet the people building Dueloro."],
  "/team/mazlowe-wood": [
    "Mazlowe Wood — Dueloro",
    "Meet Dueloro co-founder and CEO Mazlowe Wood.",
  ],
  "/team/shreyansh-misra": [
    "Shreyansh Misra — Dueloro",
    "Meet Dueloro co-founder and CTO Shreyansh Misra.",
  ],
  "/careers": ["Careers — Dueloro", "Work at Dueloro."],
  "/blog": ["Blog — Dueloro", "Notes and company updates from Dueloro."],
  "/updates": ["Blog — Dueloro", "Notes and company updates from Dueloro."],
  "/contact": ["Contact — Dueloro", "Contact Dueloro."],
  "/help": ["Contact — Dueloro", "Contact Dueloro."],
  "/regulatory": ["Regulatory — Dueloro", "Current product availability."],
  "/privacy": ["Privacy — Dueloro", "Dueloro website privacy policy."],
  "/terms": ["Terms — Dueloro", "Dueloro website terms."],
  "/security": ["Security — Dueloro", "Report security issues."],
};

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>Trusted software for skill-based competition.</p>
            <a href="mailto:hello@dueloro.com">CONTACT ↗</a>
          </div>
          <div>
            <h2>PRODUCT</h2>
            <Link to="/products/money-match">Money Match</Link>
            <a href={APP_URL}>Play Money Match ↗</a>
            <a href={DECK_URL} target="_blank" rel="noopener noreferrer">
              Pitch deck ↗
            </a>
          </div>
          <div>
            <h2>COMPANY</h2>
            <Link to="/about">About</Link>
            <Link to="/team">Team</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/blog">Blog</Link>
          </div>
          <div>
            <h2>HELP</h2>
            <Link to="/contact">Help & FAQ</Link>
            <Link to="/regulatory">Regulatory</Link>
            <Link to="/security">Security</Link>
          </div>
        </div>
        <div className="footer-word">DUELORO</div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DUELORO</span>
          <div>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <a href="/#real-money-waitlist">Real-money waitlist</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const path = usePath();
  useEffect(() => {
    scrollTo(0, 0);
    const m = meta[path] || ["Page not found — Dueloro", meta["/"][1]];
    const canonicalPath =
      path === "/help" ? "/contact" : path === "/updates" ? "/blog" : path;
    document.title = m[0];
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", m[1]);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute(
        "href",
        "https://dueloro.com" +
          (canonicalPath === "/" ? "" : canonicalPath),
      );
  }, [path]);
  let page: ReactNode;
  switch (path) {
    case "/":
      page = <Home />;
      break;
    case "/products/money-match":
      page = <MoneyMatch />;
      break;
    case "/about":
      page = (
        <Basic
          eye="COMPANY"
          title="Building the trusted layer for skill-based competition."
        >
          <p>
            Dueloro is focused on identity, fair competition, and results that
            can be verified—not argued over.
          </p>
        </Basic>
      );
      break;
    case "/team":
      page = <Team />;
      break;
    case "/team/mazlowe-wood":
      page = <TeamProfile person={people[0]} />;
      break;
    case "/team/shreyansh-misra":
      page = <TeamProfile person={people[1]} />;
      break;
    case "/careers":
      page = <Careers />;
      break;
    case "/blog":
    case "/updates":
      page = <Blog />;
      break;
    case "/contact":
    case "/help":
      page = <Contact />;
      break;
    case "/security":
      page = (
        <Basic eye="SECURITY" title="Report security issues responsibly.">
          <p>
            Send reports with reproduction steps and impact to{" "}
            <a className="text-link" href="mailto:support@dueloro.com">
              support@dueloro.com
            </a>
            .
          </p>
        </Basic>
      );
      break;
    case "/privacy":
      page = <Legal type="privacy" />;
      break;
    case "/terms":
      page = <Legal type="terms" />;
      break;
    case "/regulatory":
      page = <Legal type="regulatory" />;
      break;
    default:
      page = (
        <Basic eye="404" title="Nothing here.">
          <Link className="btn primary" to="/">
            BACK TO DUELORO
          </Link>
        </Basic>
      );
  }
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">{page}</main>
      <Footer />
    </>
  );
}
