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
    ["/help", "HELP"],
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
            first product, Money Match, is being built to let you wager on the
            skill-based video games you already play.
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
            SKILL-BASED MATCHMAKING · API RESULT VERIFICATION · AUTOMATED
            PAYOUTS
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const principles = [
  ["IDENTITY", "Connect the account you actually compete with."],
  ["MATCHING", "Competition structured around comparable skill."],
  ["VERIFICATION", "Results come from the game platform—not screenshots."],
  ["CLARITY", "Rules, state, and outcomes remain visible."],
];

function Product() {
  return (
    <>
      <section className="section">
        <div className="container split">
          <Reveal>
            <Eye>01 · FLAGSHIP PRODUCT</Eye>
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
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <Reveal>
            <Eye>03 · MEET THE FOUNDERS</Eye>
            <h2>Small team. High ownership.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lead">
              A focused team working across product, engineering, operations,
              and the trust problems behind competitive software.
            </p>
            <Link className="text-link" to="/team">
              MEET THE FOUNDERS →
            </Link>
          </Reveal>
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
    <div className="page container">
      <Intro eye={eye} title={title}>
        {children}
      </Intro>
    </div>
  );
}

function MoneyMatch() {
  const steps = [
    ["01 · CONNECT", "Connect a supported game account."],
    ["02 · MATCH", "Find a player near your skill level."],
    ["03 · COMPETE", "Play the game you already know."],
    ["04 · VERIFY", "Settle from the platform result."],
  ];
  return (
    <div className="page container">
      <Intro
        eye="PRODUCT · MONEY MATCH"
        title="Skill contracts for the games you already play."
      >
        <p>
          Money Match is being built to connect your game account, find a fair
          contest, verify the result through an API, and settle the outcome
          without screenshots or arguments.
        </p>
        <div className="actions">
          <a className="btn primary" href={APP_URL}>
            PLAY MONEY MATCH ↗
          </a>
          <a className="btn ghost" href={DECK_URL}>
            VIEW PITCH DECK
          </a>
        </div>
      </Intro>
      <div className="cards">
        {steps.map(([h, p]) => (
          <article key={h}>
            <h2>{h}</h2>
            <p>{p}</p>
          </article>
        ))}
      </div>
      <div className="notice">
        <b>CURRENT AVAILABILITY</b>
        <p>
          The current public experience is a product demo. Deposits,
          withdrawals, and real-money contests are not enabled.
        </p>
      </div>
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
      "Maz turns the company thesis into product direction, partnerships, and an operating plan built around trust. He keeps the product and company moving toward the same standard.",
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
      "Shrey builds the systems that connect player identity, fair matching, result verification, and settlement. He makes trust visible in the product itself.",
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
      "Steve shapes how Dueloro explains a new category to players, partners, and the market. He turns the product thesis into a story people remember.",
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
      "Sonny advises the engineering team on resilient infrastructure and the systems behind verified competition. He helps pressure-test the technical foundation.",
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
      "Thomas advises Dueloro on operations, execution, and the details required to turn a product into a company. He brings an operator’s eye to the work behind the product.",
  },
];

function TeamCard({ person, index }: { person: Person; index: number }) {
  const content = (
    <>
      <div className="team-portrait">
        <div className="portrait-placeholder" aria-label={`${person.name} portrait placeholder`}>
          <b>{person.initials}</b>
          <small>PORTRAIT FORTHCOMING</small>
        </div>
        <span>0{index + 1}</span>
      </div>
      <div className="team-card-copy">
        <p>{person.galleryRole}</p>
        <h2 className="team-name">{person.name}</h2>
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
    <Link className="team-card has-story" to={`/team/${person.slug}`}>
      {content}
    </Link>
  ) : (
    <article className="team-card" tabIndex={0}>
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
          <p>
            We are a small group of builders and operators working on the trust
            layer for skill-based competition. Different disciplines, one
            standard: the result should hold up under pressure.
          </p>
        </header>
      </Reveal>
      <div className="team-gallery">
        {people.map((person, index) => (
          <TeamCard key={person.slug} person={person} index={index} />
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
            "Unsubscribe from any email or contact privacy@dueloro.com to access or delete your information.",
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
            ["Contact", "Questions may be sent to legal@dueloro.com."],
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
    <div className="page container legal">
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
        <p className="note">LAST UPDATED NOVEMBER 9, 2026</p>
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
  "/updates": ["Updates — Dueloro", "Company and product updates."],
  "/help": ["Help — Dueloro", "Get help with Money Match."],
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
              <a href="mailto:support@dueloro.com">CONTACT ↗</a>
          </div>
          <div>
            <h2>PRODUCT</h2>
            <Link to="/products/money-match">Money Match</Link>
            <a href={APP_URL}>Play Money Match ↗</a>
            <a href={DECK_URL}>Pitch deck ↗</a>
          </div>
          <div>
            <h2>COMPANY</h2>
            <Link to="/about">About</Link>
            <Link to="/team">Team</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/updates">Updates</Link>
          </div>
          <div>
            <h2>HELP</h2>
            <Link to="/help">Help & FAQ</Link>
            <a href="mailto:support@dueloro.com">Support</a>
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
    document.title = m[0];
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", m[1]);
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute(
        "href",
        "https://dueloro.com" + (path === "/" ? "" : path),
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
      page = (
        <Basic eye="CAREERS" title="Do work that holds up under pressure.">
          <p>
            We are not listing open roles today. Exceptional builders can
            introduce themselves at{" "}
            <a className="text-link" href="mailto:careers@dueloro.com">
              careers@dueloro.com
            </a>
            .
          </p>
        </Basic>
      );
      break;
    case "/updates":
      page = (
        <Basic eye="UPDATES" title="What we are shipping and learning.">
          <p>
            Product notes and company announcements will live here. Until then,
            the live product is the best view of our progress.
          </p>
          <a className="btn primary" href={APP_URL}>
            PLAY MONEY MATCH ↗
          </a>
        </Basic>
      );
      break;
    case "/help":
      page = (
        <Basic eye="HELP" title="Clear answers, from real people.">
          <p>
            For account, contest, or product help, contact{" "}
            <a className="text-link" href="mailto:support@dueloro.com">
              support@dueloro.com
            </a>
            .
          </p>
        </Basic>
      );
      break;
    case "/security":
      page = (
        <Basic eye="SECURITY" title="Report security issues responsibly.">
          <p>
            Send reports with reproduction steps and impact to{" "}
            <a className="text-link" href="mailto:security@dueloro.com">
              security@dueloro.com
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
