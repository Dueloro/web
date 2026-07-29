import { useEffect, useRef, useState, type ReactNode } from 'react'
import { GradientField } from './GradientField'
import { Reveal } from './Reveal'

/** Pitch deck PDF, served from /public. Large file — hint the size on links. */
const PITCH_DECK_URL = '/MoneyMatch Deck.pdf'
const PITCH_DECK_TITLE = 'Opens the pitch deck PDF (~9 MB) in a new tab'
const MVP_URL = 'https://moneymatch-beta.vercel.app/'

/* ---------- Tiny History-API router (no dependency) ---------- */
const ROUTES = [
  '/',
  '/about',
  '/beta',
  '/demo',
  '/terms',
  '/privacy',
  '/responsible-gaming',
] as const

function useRoute() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

function navigate(to: string) {
  if (to === window.location.pathname) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.history.pushState({}, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function RouteLink({
  to,
  className,
  children,
  onClick,
}: {
  to: string
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        e.preventDefault()
        navigate(to)
        onClick?.()
      }}
    >
      {children}
    </a>
  )
}

/* ---------- Icons ---------- */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.2 9h3.6v11.5H3.2zM9.3 9h3.45v1.57h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.33 2.4 4.33 5.53v6.25h-3.6v-5.54c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92v5.64H9.3z" />
    </svg>
  )
}

/* ---------- Game logos (custom marks; swap for official press-kit SVGs) ---------- */
function GameLogo({ id }: { id: string }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 22,
    height: 22,
    'aria-hidden': true as const,
  }
  switch (id) {
    case 'cs2':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="7" />
          <path strokeLinecap="round" d="M12 1.5v4.5M12 18v4.5M1.5 12H6M18 12h4.5" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'pubg':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="10" cy="14" r="6.5" />
          <path strokeLinecap="round" d="M15 9.5l6.5-4.5" />
        </svg>
      )
    case 'dota':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3.5 3.5l9 9M20.5 3.5l-9 9" />
          <path d="M12.5 12.5l3.2 3.2 2-2-3.2-3.2M11.5 12.5l-3.2 3.2-2-2 3.2-3.2" />
        </svg>
      )
    case 'chess':
      return (
        <svg {...common} fill="currentColor">
          <path d="M6 3v3.2H4.8v3l2 1.9v5.7H5.6V21h12.8v-4.2h-1.2v-5.7l2-1.9v-3H18V3h-3v2h-3V3H9v2H6z" />
        </svg>
      )
    default:
      return (
        <svg {...common} fill="currentColor">
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      )
  }
}

/**
 * Loops 0..n-1 every `ms`, but only while the returned ref is on screen and
 * motion is allowed. Keeps the page calm: off-screen and reduced-motion mocks
 * hold still instead of all animating at once.
 */
function useInViewTick(n: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let timer: number | undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && timer === undefined) {
          timer = window.setInterval(() => setI((v) => v + 1), ms)
        } else if (!entry.isIntersecting && timer !== undefined) {
          window.clearInterval(timer)
          timer = undefined
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (timer !== undefined) window.clearInterval(timer)
    }
  }, [ms])
  return { ref, i: i % n }
}

function Eyebrow({ parts }: { parts: string[] }) {
  return (
    <div className="eyebrow">
      {parts.map((p, i) => (
        <span key={p}>
          {p}
          {i < parts.length - 1 && <span className="dot">·</span>}
        </span>
      ))}
    </div>
  )
}

function LiveChip() {
  return (
    <span className="live-chip">
      <span className="live-square" />
      LIVE
    </span>
  )
}

function BetaChip() {
  return <span className="beta-chip">BETA</span>
}

/* ---------- Nav ---------- */
function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <RouteLink to="/" className="nav-brand" onClick={onClick}>
      <span className="mark" aria-hidden="true" />
      <span className="brand-lockup">
        <span className="brand-name">MONEY MATCH</span>
        <span className="brand-by">by Dueloro</span>
      </span>
    </RouteLink>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Brand onClick={close} />
        <div className="nav-links">
          <RouteLink to="/">HOME</RouteLink>
          <RouteLink to="/about">ABOUT</RouteLink>
          <RouteLink to="/demo">DEMO</RouteLink>
          <a href={PITCH_DECK_URL} title={PITCH_DECK_TITLE} target="_blank" rel="noopener noreferrer">
            PITCH DECK
          </a>
        </div>
        <div className="nav-actions">
          <RouteLink to="/beta" className="btn btn-primary nav-cta">
            JOIN THE BETA
          </RouteLink>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`nav-burger${open ? ' open' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>
      {open && (
        <div className="nav-mobile">
          <RouteLink to="/" onClick={close}>HOME</RouteLink>
          <RouteLink to="/about" onClick={close}>ABOUT</RouteLink>
          <RouteLink to="/demo" onClick={close}>DEMO</RouteLink>
          <a href={PITCH_DECK_URL} title={PITCH_DECK_TITLE} target="_blank" rel="noopener noreferrer" onClick={close}>
            PITCH DECK
          </a>
          <RouteLink to="/beta" className="btn btn-primary" onClick={close}>
            JOIN THE BETA
          </RouteLink>
        </div>
      )}
    </nav>
  )
}

/* ---------- S1: Hero ---------- */
const TICKER_ITEMS = [
  { game: 'CS2', tone: 'tk-amber', pot: '$25', live: true },
  { game: 'PUBG', tone: 'tk-lime', pot: '$15', live: false },
  { game: 'DOTA 2', tone: 'tk-crimson', pot: '$40', live: false },
  { game: 'CHESS', tone: 'tk-lime', pot: '$10', live: true },
  { game: 'CS2', tone: 'tk-amber', pot: '$20', live: false },
  { game: 'DOTA 2', tone: 'tk-crimson', pot: '$30', live: true },
  { game: 'PUBG', tone: 'tk-lime', pot: '$50', live: false },
  { game: 'CHESS', tone: 'tk-lime', pot: '$15', live: false },
]

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className={t.tone}>{t.game}</span>
            <span className="pot">{t.pot}</span>
            {t.live ? <LiveChip /> : <span className="settled">✓</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

function VsCard() {
  return (
    <aside className="vs-card" aria-hidden="true">
      <div className="vs-head">
        CHESS · BLITZ
        <LiveChip />
      </div>
      <div className="vs-body">
        <div className="vs-player">
          <div className="tile">YO</div>
          <div className="name">YOU</div>
          <div className="rating">1842</div>
        </div>
        <div className="vs-mid">VS</div>
        <div className="vs-player">
          <div className="tile">K9</div>
          <div className="name">knight_or_flight</div>
          <div className="rating">1855</div>
        </div>
      </div>
      <div className="vs-pot">
        <span>POT</span>
        <span className="amt">$20.00</span>
      </div>
    </aside>
  )
}

function Hero() {
  return (
    <header className="hero" id="top">
      <GradientField className="hero-field" />
      <div className="hero-scrim" />
      <VsCard />
      <div className="hero-content">
        <div className="hero-badges">
          <span className="mark mark-hero" aria-hidden="true" />
          <span className="brand-lockup hero-lockup">
            <span className="brand-name">MONEY MATCH</span>
            <span className="brand-by">by Dueloro</span>
          </span>
        </div>
        <Eyebrow parts={['SKILL-BASED', 'PEER-TO-PEER', 'ESCROWED']} />
        <h1>
          Put your <span className="hl">skill</span> on the line.
        </h1>
        <p className="hero-sub">
          Real stakes on your own matches. We hold the pot. Winner takes it.
        </p>
        <div className="hero-ctas">
          <RouteLink to="/beta" className="btn btn-primary">
            JOIN THE BETA
          </RouteLink>
          <a
            href={PITCH_DECK_URL}
            title={PITCH_DECK_TITLE}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            PITCH DECK
          </a>
        </div>
      </div>
      <Ticker />
    </header>
  )
}

/* ---------- S2: Trust anchor ---------- */
function Trust() {
  return (
    <section className="band">
      <div className="container">
        <Reveal>
          <h2 className="trust-statement">
            We hold the pot. We <span className="never">never</span> take a
            side.
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="trust-lines">
            <div className="trust-line">
              <span className="k">ESCROWED POT</span>
              Locked before play.
            </div>
            <div className="trust-line">
              <span className="k">NO HOUSE LINE</span>
              No odds. No edge.
            </div>
            <div className="trust-line">
              <span className="k">THE INVARIANT</span>
              <code>entries → escrow → payout</code>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- S3: How it works ---------- */
const STEPS = [
  {
    num: '01',
    name: 'LINK',
    copy: 'Connect to your favorite competitive video game.',
  },
  {
    num: '02',
    name: 'MATCH',
    copy: 'Match into your skill band. Pot locks in escrow.',
  },
  { num: '03', name: 'PLAY', copy: 'Play your usual game. We watch the feed.' },
  { num: '04', name: 'GET PAID', copy: 'Winner takes the pot.' },
]

function HowItWorks() {
  return (
    <section className="band" id="how">
      <div className="container">
        <Reveal>
          <Eyebrow parts={['HOW IT WORKS']} />
          <h2 className="section-title">Four steps. No fine print.</h2>
        </Reveal>
        <div className="steps">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 80} as="article">
              <div className="step">
                <div className="step-head">{s.name}</div>
                <div className="step-num" aria-hidden="true">
                  {s.num}
                </div>
                <div className="step-body">{s.copy}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="steps-footnote">
          DRAW → <span className="lime">FULL REFUND. EVERYONE WHOLE.</span>
        </p>
      </div>
    </section>
  )
}

/* ---------- S4: Games ---------- */
const GAMES = [
  { logo: 'cs2', tone: 'tile-amber', name: 'COUNTER-STRIKE 2', source: 'CS2 API', live: true },
  { logo: 'pubg', tone: 'tile-lime', name: 'PUBG: BATTLEGROUNDS', source: 'PUBG API', live: true },
  { logo: 'dota', tone: 'tile-crimson', name: 'DOTA 2', source: 'OPENDOTA', live: true },
  { logo: 'chess', tone: 'tile-lime', name: 'CHESS', source: 'LICHESS', live: true },
  { logo: 'more', tone: '', name: 'MORE COMING SOON', source: '—', live: false, placeholder: true },
]

function Games() {
  return (
    <section className="band" id="games">
      <div className="container">
        <Reveal>
          <Eyebrow parts={['WORKS WITH THE ACCOUNTS YOU ALREADY HAVE']} />
          <h2 className="section-title">Pick your battleground.</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="games-table">
            {GAMES.map((g) => (
              <div key={g.name} className={`game-row${g.live ? '' : ' soon'}`}>
                <div className={`game-tile ${g.tone}`}>
                  <GameLogo id={g.logo} />
                </div>
                <div className="game-name">{g.name}</div>
                <div className="game-source mono">{g.source}</div>
                <div className="game-status">
                  {g.live ? <BetaChip /> : g.placeholder ? null : <span className="chip-soon">SOON</span>}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- S5: Product tour — the three game modes + payout ---------- */
const ROW_STATES = [
  { label: 'MATCHING', cls: 'pending' },
  { label: 'LIVE', cls: 'live' },
  { label: 'SETTLED ✓', cls: 'done' },
]

/* Head-to-head: a matchmaking list — OPEN rows grow a lime STAKE button */
function HeadToHeadMock() {
  const { ref, i: t } = useInViewTick(4, 2600)
  const rows = [
    { tile: 'K9', who: 'knight_or_flight', sub: '1842 · CHESS', amt: '$10', offset: 0 },
    { tile: 'VX', who: 'vexal', sub: 'LVL 7 · CS2', amt: '$25', offset: 1 },
    { tile: 'MR', who: 'mid_or_feed', sub: 'DIVINE · DOTA 2', amt: '$40', offset: 2 },
  ]
  return (
    <div ref={ref}>
      {rows.map((r) => {
        const phase = (t + r.offset) % 4
        const open = phase === 0
        const s = open ? null : ROW_STATES[phase - 1]
        return (
          <div className={`mockline${open ? ' hot' : ''}`} key={r.tile}>
            <span className="tile">{r.tile}</span>
            <span className="who">
              {r.who}
              <span>{r.sub}</span>
            </span>
            <span className="amt">{r.amt}</span>
            {open ? (
              <span className="stake-chip pop" key={`stake${r.tile}${t}`}>
                STAKE {r.amt}
              </span>
            ) : (
              <span className={`state pop ${s!.cls}`} key={s!.label + r.tile}>
                {s!.label}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* Solo pools: stat-line progress bars racing a target marker */
const POOLS = [
  { name: 'BEAT 24 KILLS', sub: '8 × $5 · $40 POT', target: 70, fills: [22, 48, 64, 92], offset: 0 },
  { name: 'WIN 3 IN A ROW', sub: '12 × $2 · $24 POT', target: 75, fills: [30, 55, 80, 100], offset: 2 },
  { name: '80 LAST HITS BY 10:00', sub: '5 × $10 · $50 POT', target: 65, fills: [15, 40, 58, 84], offset: 1 },
]

function SoloMock() {
  const { ref, i: t } = useInViewTick(4, 2800)
  return (
    <div ref={ref}>
      {POOLS.map((p) => {
        const fill = p.fills[(t + p.offset) % 4]
        const cleared = fill >= p.target
        return (
          <div className="pool" key={p.name}>
            <div className="pool-top">
              <span>{p.name}</span>
              {cleared ? (
                <span className="cleared pop" key={`c${t}`}>
                  CLEARED ✓
                </span>
              ) : (
                <span className="chasing">IN PLAY</span>
              )}
            </div>
            <div className="pool-bar">
              <div
                className={`pool-fill${cleared ? ' over' : ''}`}
                style={{ width: `${Math.min(fill, 100)}%` }}
              />
              <div className="pool-target" style={{ left: `${p.target}%` }} />
            </div>
            <div className="pool-sub">
              <span>{p.sub}</span>
              <span>TARGET</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* Tournament: a static bracket leaderboard with prize splits */
const TOURNEY = [
  { rank: '1', who: 'vexal', pts: '2,450', cut: '50%' },
  { rank: '2', who: 'YOU', pts: '2,210', cut: '30%', you: true },
  { rank: '3', who: 'd0ppler', pts: '1,980', cut: '20%' },
  { rank: '4', who: 'nadeking', pts: '1,760', cut: '—' },
]

function TournamentMock() {
  return (
    <div className="tourney">
      <div className="tourney-head">
        <span>PLATINUM BRACKET · 32 PLAYERS</span>
        <span className="amt">$320 POT</span>
      </div>
      {TOURNEY.map((r) => (
        <div className={`tourney-row${r.you ? ' you' : ''}`} key={r.rank}>
          <span className="tr-rank">{r.rank}</span>
          <span className="tr-who">{r.who}</span>
          <span className="tr-pts">{r.pts}</span>
          <span className={`tr-cut${r.cut === '—' ? ' out' : ''}`}>{r.cut}</span>
        </div>
      ))}
    </div>
  )
}

/* Wallet: live balance readout over a streaming ledger */
const LEDGER = [
  { label: 'WIN · CHESS', amt: '+ $28.50', dir: 'in' },
  { label: 'ENTRY · CS2', amt: '− $25.00', dir: 'out' },
  { label: 'REFUND · DRAW', amt: '+ $15.00', dir: 'in' },
  { label: 'ENTRY · SOLO POOL', amt: '− $10.00', dir: 'out' },
  { label: 'WIN · DOTA 2', amt: '+ $19.00', dir: 'in' },
  { label: 'WIN · CS2 DUEL', amt: '+ $47.50', dir: 'in' },
]
const BALANCES = ['$128.50', '$103.50', '$118.50', '$108.50', '$127.50', '$175.00']

function WalletMock() {
  const { ref, i: t } = useInViewTick(LEDGER.length, 3000)
  const rows = [0, 1, 2, 3].map((i) => LEDGER[(t + i) % LEDGER.length])
  return (
    <div className="mock-ledger" ref={ref}>
      <div className="wallet-balance">
        <span className="k">BALANCE</span>
        <span className="v pop" key={`b${t}`}>
          {BALANCES[t]}
        </span>
      </div>
      {rows.map((r, i) => (
        <div className={`lrow${i === 0 ? ' new' : ''}`} key={r.label + t}>
          <span>{r.label}</span>
          <span className={r.dir}>{r.amt}</span>
        </div>
      ))}
    </div>
  )
}

const TOUR = [
  {
    label: 'HEAD-TO-HEAD',
    tone: 'shot-lime',
    title: 'Challenge a friend, or get matched.',
    copy: 'Same skill band, both stake, pot locks in escrow.',
    mock: <HeadToHeadMock />,
  },
  {
    label: 'SOLO POOLS',
    tone: 'shot-amber',
    title: 'You vs. the stat line.',
    copy: 'Clear the target, split the pot. Miss it, full refund.',
    mock: <SoloMock />,
    flip: true,
  },
  {
    label: 'TOURNAMENTS',
    tone: 'shot-crimson',
    title: 'Your whole bracket, one pot.',
    copy: 'Anyone at your level joins. Top finishers take the biggest share.',
    mock: <TournamentMock />,
  },
  {
    label: 'WALLET',
    tone: 'shot-lime',
    title: 'Every cent, on the record.',
    copy: 'Every entry and payout, always accounted for.',
    mock: <WalletMock />,
    flip: true,
  },
]

function Tour() {
  return (
    <section className="band">
      <div className="container">
        <Reveal>
          <Eyebrow parts={['HEAD-TO-HEAD', 'SOLO POOLS', 'TOURNAMENTS']} />
          <h2 className="section-title">Three ways to play. One way to get paid.</h2>
        </Reveal>
        {TOUR.map((t) => (
          <Reveal key={t.label}>
            <div className={`tour-row${t.flip ? ' flip' : ''}`}>
              <div className={`tour-shot ${t.tone}`} aria-hidden="true">
                <div className="shot-label">{t.label}</div>
                <div className="shot-body">{t.mock}</div>
              </div>
              <div className="tour-copy">
                <h3>{t.title}</h3>
                <p>{t.copy}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- S6: Overlay (static preview) ---------- */
const KILLFEED = ['YOU ⌖ vexal', 'd0ppler ⌖ nadeking', 'YOU ⌖ d0ppler']

function Overlay() {
  return (
    <section className="overlay-band">
      <div className="container">
        <div className="overlay-grid">
          <Reveal>
            <div className="overlay-stage" aria-label="In-game overlay preview">
              <span className="hud" style={{ top: 18, left: 20 }}>
                DE_ANCIENT · 22/24
              </span>
              <span className="hud" style={{ bottom: 18, left: 20 }}>
                14 : 7
              </span>
              <span className="hud" style={{ bottom: 18, right: 20 }}>
                3v2
              </span>
              <div className="killfeed">
                {KILLFEED.map((line) => (
                  <span key={line} className={line.startsWith('YOU') ? 'you' : ''}>
                    {line}
                  </span>
                ))}
              </div>
              <div className="overlay-card">
                <div className="oc-head">
                  <span className="oc-title mono">CS2 STAT DUEL</span>
                  <LiveChip />
                </div>
                <div className="oc-body">
                  <div className="oc-row">
                    <span>POT</span>
                    <span className="v lime">$25.00</span>
                  </div>
                  <div className="oc-row">
                    <span>YOU</span>
                    <span className="v">22</span>
                  </div>
                  <div className="oc-row">
                    <span>VEXAL</span>
                    <span className="v">18</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="overlay-caption">DESKTOP OVERLAY · WINDOWS</p>
          </Reveal>
          <Reveal delay={120}>
            <Eyebrow parts={['THE OVERLAY']} />
            <h2 className="section-title">Your wager, on top of your game.</h2>
            <p className="section-sub">One key. Never leave the match.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- Straight answers (objection handling) ---------- */
const ANSWERS = [
  {
    q: 'Is this gambling?',
    a: 'No house, no odds, no games of chance. You wager on your own skill in games you already play, only where skill contests are legal.',
  },
  {
    q: 'Is it real money?',
    a: 'Yes. Real stakes on real matches. Every pot is escrowed before play and paid to the winner.',
  },
  {
    q: 'How do I get paid?',
    a: 'Winner takes the pot. It lands in your wallet the moment results verify. Then cash out.',
  },
  {
    q: 'How are results verified?',
    a: 'Straight from each game’s official feed: CS2, PUBG, Dota 2, Lichess. No screenshots, no self-reporting, no disputes.',
  },
  {
    q: 'Where can I play?',
    a: 'Only where skill-based wagering is permitted, and only if you’re 18 or older (or the local legal age).',
  },
  {
    q: 'How do you make money?',
    a: 'A small, disclosed fee on settled contests. We never take a side and never profit from you losing.',
  },
]

function StraightAnswers() {
  return (
    <section className="band" id="answers">
      <div className="container">
        <Reveal>
          <Eyebrow parts={['NO HOUSE', 'NO ODDS', 'NO MYSTERY']} />
          <h2 className="section-title">Straight answers.</h2>
        </Reveal>
        <div className="fair-grid">
          {ANSWERS.map((f, i) => (
            <Reveal key={f.q} delay={(i % 3) * 80}>
              <div className="fair-cell">
                <span className="k">{f.q}</span>
                <p>{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Team ---------- */
const TEAM = [
  { initials: 'MW', tone: 'tile-lime', name: 'Mazlowe Wood', role: 'CEO', url: 'https://www.linkedin.com/in/elliot-wood-985741269/' },
  { initials: 'TV', tone: 'tile-amber', name: 'Thomas Veasy', role: 'COO', url: 'https://www.linkedin.com/in/thomasveasy/' },
  { initials: 'SM', tone: 'tile-crimson', name: 'Shreyansh Misra', role: 'CTO · PRODUCT', url: 'https://www.linkedin.com/in/shreyanshmisra/' },
  { initials: 'SZ', tone: 'tile-lime', name: 'Sonny Zhang', role: 'CTO · INFRA', url: 'https://www.linkedin.com/in/fumingzhang1/' },
  { initials: 'SG', tone: 'tile-amber', name: 'Steve Gorson', role: 'GTM', url: 'https://www.linkedin.com/in/stevegorson/' },
]

function TeamGrid() {
  return (
    <div className="team-grid">
      {TEAM.map((m, i) => (
        <Reveal key={m.name} delay={(i % 5) * 80}>
          <a
            className="team-cell"
            href={m.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${m.name}, ${m.role}, on LinkedIn`}
          >
            <div className={`team-avatar ${m.tone}`}>{m.initials}</div>
            <div className="team-name">{m.name}</div>
            <div className="team-role">{m.role}</div>
            <span className="team-linkedin" aria-hidden="true">
              <LinkedInIcon />
            </span>
          </a>
        </Reveal>
      ))}
    </div>
  )
}

function Team() {
  return (
    <section className="band" id="team">
      <div className="container">
        <Reveal>
          <h2 className="section-title">The team behind Money Match.</h2>
        </Reveal>
        <TeamGrid />
      </div>
    </section>
  )
}

/* ---------- Beta signup — real email collection ---------- */
/**
 * Collects a beta email. Persists every signup to localStorage so submissions
 * are captured locally, and POSTs to VITE_BETA_SIGNUP_ENDPOINT when configured
 * (e.g. a Formspree/Buttondown/API URL) for real off-device collection.
 */
async function submitBetaSignup(email: string) {
  const clean = email.trim()
  try {
    const key = 'dueloro_beta_signups'
    const list: { email: string; ts: string }[] = JSON.parse(
      localStorage.getItem(key) || '[]',
    )
    if (!list.some((s) => s.email.toLowerCase() === clean.toLowerCase())) {
      list.push({ email: clean, ts: new Date().toISOString() })
      localStorage.setItem(key, JSON.stringify(list))
    }
  } catch {
    /* ignore storage failures */
  }

  const endpoint = (import.meta.env as Record<string, string | undefined>)
    .VITE_BETA_SIGNUP_ENDPOINT
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email: clean, source: 'money-match-web' }),
    })
    if (!res.ok) throw new Error('Signup request failed')
  }
}

type SignupState = 'idle' | 'submitting' | 'done' | 'error'

function BetaSignupForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<SignupState>('idle')

  if (state === 'done') {
    return <p className="mono signup-done">YOU'RE ON THE LIST. WE'LL BE IN TOUCH.</p>
  }

  return (
    <form
      className="cta-form"
      onSubmit={async (e) => {
        e.preventDefault()
        if (!email.trim() || state === 'submitting') return
        setState('submitting')
        try {
          await submitBetaSignup(email)
          setState('done')
        } catch {
          setState('error')
        }
      }}
    >
      <input
        type="email"
        required
        placeholder="you@domain.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          if (state === 'error') setState('idle')
        }}
      />
      <button type="submit" className="btn btn-primary" disabled={state === 'submitting'}>
        {state === 'submitting' ? 'SENDING…' : 'GET EARLY ACCESS'}
      </button>
      {state === 'error' && (
        <span className="mono signup-error">SOMETHING WENT WRONG. TRY AGAIN.</span>
      )}
    </form>
  )
}

/* ---------- Home closing CTA (inline signup) ---------- */
function HomeCta() {
  return (
    <section id="cta">
      <div className="container">
        <div className="cta-window">
          <GradientField className="cta-field" />
          <div className="cta-inner">
            <Eyebrow parts={['READY WHEN YOU ARE']} />
            <h2>
              Stake. <span className="w-it">Play.</span>{' '}
              <span className="hl">Get paid.</span>
            </h2>
            <BetaSignupForm />
            <p className="cta-reassure mono">One email when your invite's ready.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <RouteLink to="/" className="nav-brand">
              <span className="mark" aria-hidden="true" />
              <span className="brand-lockup">
                <span className="brand-name">MONEY MATCH</span>
                <span className="brand-by">by Dueloro</span>
              </span>
            </RouteLink>
            <p className="footer-tagline mono">
              Skill contests on the games you already play.
            </p>
          </div>
          <div>
            <h4>COMPANY</h4>
            <ul>
              <li><RouteLink to="/about">ABOUT</RouteLink></li>
              <li><RouteLink to="/demo">DEMO</RouteLink></li>
              <li><RouteLink to="/beta">JOIN THE BETA</RouteLink></li>
              <li>
                <a href={PITCH_DECK_URL} title={PITCH_DECK_TITLE} target="_blank" rel="noopener noreferrer">
                  PITCH DECK
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>LEGAL</h4>
            <ul>
              <li><RouteLink to="/terms">TERMS</RouteLink></li>
              <li><RouteLink to="/privacy">PRIVACY</RouteLink></li>
              <li><RouteLink to="/responsible-gaming">RESPONSIBLE GAMING</RouteLink></li>
            </ul>
          </div>
        </div>
        <div className="footer-compliance">
          18+ · SKILL CONTESTS ONLY WHERE PERMITTED
          <br />© {new Date().getFullYear()} DUELORO
        </div>
      </div>
    </footer>
  )
}

/* ---------- Pages ---------- */
function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <HowItWorks />
      <Games />
      <Tour />
      <Overlay />
      <StraightAnswers />
      <Team />
      <HomeCta />
    </>
  )
}

function BetaPage() {
  return (
    <section className="page">
      <div className="container page-inner">
        <Reveal>
          <Eyebrow parts={['JOIN THE BETA']} />
          <h1 className="page-title">
            Get in <span className="hl">early.</span>
          </h1>
          <p className="page-sub">
            Money Match is opening in waves. Drop your email and we'll pull you
            in, with the earliest access and first pots.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="beta-form-wrap">
            <BetaSignupForm />
            <p className="beta-reassure mono">
              One email when your invite's ready. Your address stays with us.
            </p>
          </div>
        </Reveal>
        <Reveal delay={160}>
          <div className="beta-mvp">
            <a href={MVP_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Access the MVP →
            </a>
            <span className="beta-mvp-note mono">For approved testers only.</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function DemoPage() {
  return (
    <section className="page">
      <div className="container page-inner">
        <Reveal>
          <Eyebrow parts={['DEMO']} />
          <h1 className="page-title">See it in motion.</h1>
          <p className="page-sub">
            A full product walkthrough is on the way. Check back soon.
          </p>
        </Reveal>
        <Reveal delay={80}>
          <div className="demo-frame">
            <span className="demo-placeholder mono">DEMO VIDEO COMING SOON</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function LegalStub({ title }: { title: string }) {
  return (
    <section className="page">
      <div className="container page-inner">
        <Reveal>
          <Eyebrow parts={['LEGAL']} />
          <h1 className="page-title">{title}</h1>
          <p className="page-sub">
            This page is being drafted and will be published before Money Match
            opens more broadly. Check back soon.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function ResponsibleGamingPage() {
  return (
    <section className="page">
      <div className="container page-inner">
        <Reveal>
          <Eyebrow parts={['RESPONSIBLE GAMING']} />
          <h1 className="page-title">Play within your limits.</h1>
          <p className="page-sub">
            Money Match is built for skill, not for chasing losses. Wagering
            should stay fun, deliberate, and affordable. Here's how we keep it
            that way, and how to get help if it stops being a game.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="legal-body">
            <h2>Our commitment</h2>
            <p>
              We never take a side and we never profit from you losing control.
              Pots are escrowed, results are host-verified, and our only revenue
              comes from a small, disclosed fee on settled contests, not from
              your losses. We design against compulsive play, not for it.
            </p>

            <h2>Eligibility</h2>
            <ul>
              <li>You must be 18 or older (or the legal age in your region, whichever is higher).</li>
              <li>Real-money contests are offered only where skill-based wagering is permitted.</li>
              <li>One verified identity per person. No duplicate or shared accounts.</li>
            </ul>

            <h2>Tools to stay in control</h2>
            <p>These controls are built into your account settings:</p>
            <ul>
              <li><strong>Deposit &amp; wager limits.</strong> Set daily, weekly, or monthly caps. Lowering a limit takes effect immediately.</li>
              <li><strong>Session reminders.</strong> Get a nudge after a set amount of time in the app.</li>
              <li><strong>Cool-off.</strong> Pause staking for 24 hours up to 6 weeks, any time.</li>
              <li><strong>Self-exclusion.</strong> Lock yourself out for 6 months or more. We honor it across every account tied to your identity.</li>
            </ul>

            <h2>Know the warning signs</h2>
            <p>It may be time to step back if you:</p>
            <ul>
              <li>Wager more than you can comfortably afford to lose.</li>
              <li>Play to win back money you've already lost.</li>
              <li>Borrow money or neglect work, school, or relationships to play.</li>
              <li>Feel anxious, irritable, or secretive about how much you play.</li>
            </ul>

            <h2>Getting help</h2>
            <p>
              If gambling is affecting you or someone you know, confidential help
              is available 24/7 and it's free:
            </p>
            <ul>
              <li><strong>National Problem Gambling Helpline:</strong> call or text <a href="tel:1-800-522-4700">1-800-522-4700</a>. Visit <a href="https://www.ncpgambling.org/" target="_blank" rel="noopener noreferrer">ncpgambling.org</a>.</li>
              <li><strong>Gamblers Anonymous:</strong> <a href="https://www.gamblersanonymous.org/" target="_blank" rel="noopener noreferrer">gamblersanonymous.org</a></li>
            </ul>

            <h2>Contact us</h2>
            <p>
              To set limits, self-exclude, or ask a question, reach our team at{' '}
              <a href="mailto:support@dueloro.com">support@dueloro.com</a>. We
              respond to responsible-gaming requests first.
            </p>
            <p className="legal-note mono">
              THIS PAGE IS A DRAFT AND WILL BE FINALIZED BEFORE REAL-MONEY LAUNCH.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function AboutPage() {
  return (
    <section className="page">
      <div className="container page-inner">
        <Reveal>
          <Eyebrow parts={['ABOUT', 'MONEY MATCH BY DUELORO']} />
          <h1 className="page-title">
            Make skill <span className="hl">pay.</span>
          </h1>
          <p className="page-sub">
            We're building the first place you can put real stakes on the games
            you already play, and actually trust the result.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="legal-body">
            <h2>The mission</h2>
            <p>
              Competitive players already grind for pride. Money Match makes that
              skill pay, safely: peer-to-peer stakes, escrowed pots, automated
              verification, and instant payouts. No house, no odds, no edge. We
              hold the pot and we never take a side.
            </p>

            <h2>The category we're creating</h2>
            <p>
              Sportsbooks bet against you. Fantasy has you bet on other people.
              Skill-gaming apps drop you into their own minigames. Money Match is
              the only place you wager on your <strong>own real matches</strong>,
              in the games you already love, across three modes: head-to-head,
              solo pools, and tournaments.
            </p>

            <h2>Why now</h2>
            <p>
              Official game APIs (CS2, PUBG, Dota 2, Lichess) make instant,
              tamper-proof result verification possible for the first time. A
              generation raised on esports and instant payments expects to
              compete for real stakes. And skill-based contests are carving out
              clear legal room, distinct from gambling. The rails finally exist.
            </p>

            <h2>How we make money</h2>
            <p>
              A small, transparent fee on settled contests, and nothing else. Our
              incentives point the same direction as yours: more fair matches,
              more trust, more play.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="about-team">
            <h2 className="section-title">The team.</h2>
            <TeamGrid />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="about-cta">
            <a href={PITCH_DECK_URL} title={PITCH_DECK_TITLE} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              SEE THE PITCH DECK
            </a>
            <RouteLink to="/beta" className="btn btn-ghost">
              JOIN THE BETA
            </RouteLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function NotFound() {
  return (
    <section className="page">
      <div className="container page-inner">
        <Eyebrow parts={['404']} />
        <h1 className="page-title">Nothing staked here.</h1>
        <p className="page-sub">That page doesn't exist. Head back to the action.</p>
        <div className="beta-mvp">
          <RouteLink to="/" className="btn btn-primary">
            BACK TO HOME
          </RouteLink>
        </div>
      </div>
    </section>
  )
}

/* ---------- Per-page metadata ---------- */
const PAGE_META: Record<string, { title: string; desc: string }> = {
  '/': {
    title: 'Money Match — Put your skill on the line',
    desc: 'Money Match, by Dueloro. Real stakes on your own matches. We hold the pot, verify the result, and pay out the winner. We never take a side.',
  },
  '/about': {
    title: 'About — Money Match by Dueloro',
    desc: 'Money Match makes competitive skill pay: peer-to-peer stakes, escrowed pots, automated verification. The category, the thesis, and the team.',
  },
  '/beta': {
    title: 'Join the beta — Money Match',
    desc: 'Get early access to Money Match. Drop your email and we will pull you in as the beta opens in waves.',
  },
  '/demo': {
    title: 'Demo — Money Match',
    desc: 'A full product walkthrough of Money Match is on the way.',
  },
  '/terms': {
    title: 'Terms of Service — Money Match',
    desc: 'Money Match terms of service.',
  },
  '/privacy': {
    title: 'Privacy Policy — Money Match',
    desc: 'Money Match privacy policy.',
  },
  '/responsible-gaming': {
    title: 'Responsible Gaming — Money Match',
    desc: 'How Money Match keeps wagering deliberate and affordable, plus tools and help resources.',
  },
}

export default function App() {
  const path = useRoute()

  useEffect(() => {
    window.scrollTo(0, 0)
    const meta = PAGE_META[path] ?? {
      title: 'Page not found — Money Match',
      desc: PAGE_META['/'].desc,
    }
    document.title = meta.title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', meta.desc)
  }, [path])

  let page: ReactNode = <NotFound />
  if (!ROUTES.includes(path as (typeof ROUTES)[number])) page = <NotFound />
  else if (path === '/about') page = <AboutPage />
  else if (path === '/beta') page = <BetaPage />
  else if (path === '/demo') page = <DemoPage />
  else if (path === '/terms') page = <LegalStub title="Terms of Service" />
  else if (path === '/privacy') page = <LegalStub title="Privacy Policy" />
  else if (path === '/responsible-gaming') page = <ResponsibleGamingPage />
  else page = <Home />

  return (
    <>
      <Nav />
      <main>{page}</main>
      <Footer />
    </>
  )
}
