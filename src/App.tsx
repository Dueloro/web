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
            LAUNCH MONEY MATCH ↗
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
            LAUNCH MONEY MATCH ↗
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
          <Eye>COMPETITIVE SOFTWARE · VERIFIED RESULTS</Eye>
          <h1>Competition deserves better software.</h1>
          <p className="lead">
            Dueloro builds trusted products for competitive play. Our first
            product, Money Match, turns verified chess games into structured
            competition.
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
            LIVE BETA · CHESS · POINTS-BASED · POWERED BY LICHESS
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
              Connect Lichess, match with players near your level, play the game
              you already know, and let verified results settle the contest.
            </p>
            <div className="actions">
              <a className="btn primary" href={APP_URL}>
                LAUNCH APP ↗
              </a>
              <Link className="text-link" to="/products/money-match">
                HOW IT WORKS →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="terminal">
              <header>
                <span>MONEY MATCH · CHESS</span>
                <b>LIVE BETA</b>
              </header>
              <main>
                <div>
                  <small>YOU</small>
                  <strong>1842</strong>
                </div>
                <em>VS</em>
                <div>
                  <small>OPPONENT</small>
                  <strong>1855</strong>
                </div>
              </main>
              <footer>
                <span>LICHESS VERIFIED</span>
                <span>POINTS CONTEST</span>
              </footer>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section ruled">
        <div className="container">
          <Reveal>
            <Eye>02 · THE STANDARD</Eye>
            <h2>Trust is a product feature.</h2>
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
            <Eye>03 · THE TEAM</Eye>
            <h2>Small team. High ownership.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="lead">
              A focused team working across product, engineering, operations,
              and the trust problems behind competitive software.
            </p>
            <Link className="text-link" to="/team">
              MEET MAZ AND SHREY →
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
              <span>Money Match is live today with points.</span>
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
    ["01 · CONNECT", "Link your Lichess account."],
    ["02 · MATCH", "Create or join a points contest."],
    ["03 · PLAY", "Play on Lichess."],
    ["04 · VERIFY", "Settle from the source."],
  ];
  return (
    <div className="page container">
      <Intro
        eye="PRODUCT · MONEY MATCH"
        title="Verified competition, built around chess."
      >
        <p>
          Money Match is Dueloro’s live points-based beta. Connect Lichess, find
          a fair contest, play, and see the result settle from the source.
        </p>
        <div className="actions">
          <a className="btn primary" href={APP_URL}>
            LAUNCH MONEY MATCH ↗
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
          Money Match uses non-withdrawable points. Deposits, withdrawals, and
          real-money contests are not enabled.
        </p>
      </div>
      <Waitlist />
    </div>
  );
}

const people = [
  [
    "MW",
    "Mazlowe Wood",
    "CEO",
    "Maz leads company strategy, product direction, and the work of turning competitive play into a trusted product category.",
    "https://www.linkedin.com/in/elliot-wood-985741269/",
  ],
  [
    "SM",
    "Shreyansh Misra",
    "CTO · PRODUCT",
    "Shrey leads product engineering and the systems connecting identity, live competition, and verified outcomes.",
    "https://www.linkedin.com/in/shreyanshmisra/",
  ],
];
function Team() {
  return (
    <div className="page container">
      <Intro eye="TEAM" title="The people behind Dueloro.">
        <p>
          A focused team of builders working across product, engineering, and
          the operational details required to make competitive software
          trustworthy.
        </p>
      </Intro>
      <div className="spotlights">
        {people.map(([initials, name, role, copy, url], i) => (
          <article key={name}>
            <div className="portrait">
              <b>{initials}</b>
              <small>SPOTLIGHT 0{i + 1}</small>
            </div>
            <div>
              <span>0{i + 1}</span>
              <h2>{name}</h2>
              <h3>{role}</h3>
              <p>{copy}</p>
              <a className="text-link" href={url}>
                LINKEDIN ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
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
              "Points-based beta",
              "Money Match points have no cash value and cannot be purchased, withdrawn, or redeemed.",
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
    "Dueloro — Competitive software, verified",
    "Dueloro builds trusted software for competitive play.",
  ],
  "/products/money-match": [
    "Money Match — Dueloro",
    "A points-based chess competition beta, verified through Lichess.",
  ],
  "/about": [
    "About — Dueloro",
    "Why Dueloro builds trusted competitive software.",
  ],
  "/team": ["Team — Dueloro", "Meet the people building Dueloro."],
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
            <p>Trusted software for competitive play.</p>
              <a href="mailto:support@dueloro.com">CONTACT ↗</a>
          </div>
          <div>
            <h2>PRODUCT</h2>
            <Link to="/products/money-match">Money Match</Link>
            <a href={APP_URL}>Launch app ↗</a>
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
          title="Building the trusted layer for competitive play."
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
            OPEN MONEY MATCH ↗
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
