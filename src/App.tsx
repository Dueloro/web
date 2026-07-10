import { useEffect, useState } from 'react'
import { GradientField } from './GradientField'
import { Reveal } from './Reveal'

/** Loops 0..n-1 every `ms`. Frozen under reduced motion. */
function useTick(n: number, ms: number) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setI((v) => v + 1), ms)
    return () => window.clearInterval(id)
  }, [ms])
  return i % n
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

/* ---------- Nav ---------- */
function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="nav-brand">
          <span className="mark" aria-hidden="true" />
          DUELORO
        </a>
        <div className="nav-links">
          <a href="#how">HOW IT WORKS</a>
          <a href="#games">GAMES</a>
          <a href="#fairness">FAIRNESS</a>
          <a href="#team">TEAM</a>
          <a href="#faq">FAQ</a>
        </div>
        <a href="#cta" className="btn btn-primary">
          JOIN THE BETA
        </a>
      </div>
    </nav>
  )
}

/* ---------- S1: Hero ---------- */
const TICKER_ITEMS = [
  { game: 'CHESS', tone: 'tk-lime', pot: '$10', live: false },
  { game: 'CS2', tone: 'tk-amber', pot: '$25', live: true },
  { game: 'DOTA 2', tone: 'tk-crimson', pot: '$40', live: false },
  { game: 'CHESS', tone: 'tk-lime', pot: '$15', live: true },
  { game: 'CS2', tone: 'tk-amber', pot: '$20', live: false },
  { game: 'DOTA 2', tone: 'tk-crimson', pot: '$30', live: true },
  { game: 'CHESS', tone: 'tk-lime', pot: '$50', live: false },
  { game: 'CS2', tone: 'tk-amber', pot: '$25', live: false },
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
          <span className="sticker">OPEN BETA — SEASON 01</span>
        </div>
        <Eyebrow parts={['SKILL-BASED', 'PEER-TO-PEER', 'FLAT RAKE']} />
        <h1>
          Put your <span className="hl">skill</span> on the line.
        </h1>
        <p className="hero-sub">
          Real stakes on your own matches. We hold the pot. Winner takes it.
        </p>
        <div className="hero-ctas">
          <a href="#cta" className="btn btn-primary">
            JOIN THE BETA
          </a>
          <a href="#how" className="btn btn-ghost">
            HOW IT WORKS
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
              <span className="k">FLAT RAKE ONLY</span>
              No odds. No edge.
            </div>
            <div className="trust-line">
              <span className="k">THE INVARIANT</span>
              <code>payouts + rake = entries</code>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- S3: How it works ---------- */
const STEPS = [
  { num: '01', name: 'LINK', copy: 'Connect Lichess, FACEIT, or OpenDota.' },
  { num: '02', name: 'MATCH', copy: 'Same skill band. Pot locks in escrow.' },
  { num: '03', name: 'PLAY', copy: 'Your usual game. We watch the feed.' },
  { num: '04', name: 'GET PAID', copy: 'Winner takes the pot.' },
]

function HowItWorks() {
  return (
    <section className="band" id="how">
      <div className="container">
        <Reveal>
          <Eyebrow parts={['LINK', 'MATCH', 'PLAY', 'GET PAID']} />
          <h2 className="section-title">Four steps. No fine print.</h2>
        </Reveal>
        <div className="steps">
          <div className="steps-sweep" aria-hidden="true" />
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
          DRAW → <span className="lime">FULL REFUND, ZERO RAKE.</span>
        </p>
      </div>
    </section>
  )
}

/* ---------- S4: Games ---------- */
const GAMES = [
  { tile: '♞', tone: 'tile-lime', name: 'CHESS', source: 'LICHESS', live: true },
  { tile: '⌖', tone: 'tile-amber', name: 'COUNTER-STRIKE 2', source: 'FACEIT', live: true },
  { tile: '⚔', tone: 'tile-crimson', name: 'DOTA 2', source: 'OPENDOTA', live: true },
  { tile: '♛', tone: '', name: 'CLASH ROYALE', source: '—', live: false },
  { tile: '◉', tone: '', name: 'ROCKET LEAGUE', source: '—', live: false },
]

function Games() {
  return (
    <section className="band" id="games">
      <div className="container">
        <Reveal>
          <Eyebrow parts={['GAME-AGNOSTIC', 'ADAPTER-BASED']} />
          <h2 className="section-title">Pick your battleground.</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="games-table">
            {GAMES.map((g) => (
              <div key={g.name} className={`game-row${g.live ? '' : ' soon'}`}>
                <div className={`game-tile ${g.tone}`}>{g.tile}</div>
                <div className="game-name">{g.name}</div>
                <div className="game-source mono">{g.source}</div>
                <div className="game-status">
                  {g.live ? <LiveChip /> : <span className="chip-soon">SOON</span>}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- S5: Product tour (four distinct live mocks) ---------- */
const ROW_STATES = [
  { label: 'MATCHING', cls: 'pending' },
  { label: 'LIVE', cls: 'live' },
  { label: 'SETTLED ✓', cls: 'done' },
]

/* Lobby: a stakeable contest list — OPEN rows grow a lime STAKE button */
function LobbyMock() {
  const t = useTick(4, 1600)
  const rows = [
    { tile: 'K9', who: 'knight_or_flight', sub: '1842 · LICHESS', amt: '$10', offset: 0 },
    { tile: 'VX', who: 'vexal', sub: 'LVL 7 · FACEIT', amt: '$25', offset: 1 },
    { tile: 'MR', who: 'mid_or_feed', sub: 'DIVINE · DOTA 2', amt: '$40', offset: 2 },
  ]
  return (
    <div>
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
  const t = useTick(4, 1900)
  return (
    <div>
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

/* Friends: a challenge thread — incoming and outgoing callouts */
function FriendsMock() {
  const t = useTick(2, 2400)
  return (
    <div className="chat">
      <div className="msg in">
        dkarov · CHESS BLITZ · <b>$15</b>
        <span className="meta">"you're not beating me twice"</span>
        <span className="msg-actions">
          <span className="chip-btn yes">ACCEPT</span>
          <span className="chip-btn">DECLINE</span>
        </span>
      </div>
      <div className="msg out">
        YOU → sbeve · CS2 ADR DUEL · <b>$20</b>
        <span className="meta lime">ACCEPTED ✓ — POT LOCKED</span>
      </div>
      <div className="msg in">
        tenz_fan_99 · DOTA 2 KDA · <b>$10</b>
        <span className="meta pending pop" key={`p${t}`}>
          {t === 0 ? 'WAITING FOR YOU…' : 'EXPIRES IN 12:00'}
        </span>
      </div>
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
  const t = useTick(LEDGER.length, 2200)
  const rows = [0, 1, 2, 3].map((i) => LEDGER[(t + i) % LEDGER.length])
  return (
    <div className="mock-ledger">
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
    label: 'LOBBY',
    tone: 'shot-lime',
    title: 'One click. Pot locked.',
    copy: 'Open contests at your level.',
    mock: <LobbyMock />,
  },
  {
    label: 'SOLO POOLS',
    tone: 'shot-amber',
    title: 'You vs the stat line.',
    copy: 'Clear it, split the pot. Miss, full refund.',
    mock: <SoloMock />,
    flip: true,
  },
  {
    label: 'FRIENDS',
    tone: 'shot-crimson',
    title: 'Call out a friend.',
    copy: 'Escrow settles it — not the group chat.',
    mock: <FriendsMock />,
  },
  {
    label: 'WALLET',
    tone: 'shot-lime',
    title: 'Every cent, on the record.',
    copy: 'payouts + rake = entries. Always.',
    mock: <WalletMock />,
    flip: true,
  },
]

function Tour() {
  return (
    <section className="band">
      <div className="container">
        <Reveal>
          <Eyebrow parts={['QUEUE UP', 'CASH OUT']} />
          <h2 className="section-title">Queue up. Cash out.</h2>
        </Reveal>
        {TOUR.map((t) => (
          <Reveal key={t.label}>
            <div className={`tour-row${t.flip ? ' flip' : ''}`}>
              <div className={`tour-shot ${t.tone}`}>
                <div className="shot-label">
                  {t.label}
                  <LiveChip />
                </div>
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

/* ---------- S6: Overlay (live stat race) ---------- */
const KILLFEED = [
  'vexal ⌖ r1ftw4lker',
  'YOU ⌖ vexal',
  'd0ppler ⌖ nadeking',
  'YOU ⌖ d0ppler',
  'nadeking ⌖ vexal',
]
const YOU_KILLS = [18, 19, 19, 20, 21, 22]
const VEX_KILLS = [16, 16, 17, 17, 18, 18]

function Overlay() {
  const t = useTick(6, 1800)
  return (
    <section className="overlay-band">
      <div className="container">
        <div className="overlay-grid">
          <Reveal>
            <div className="overlay-stage" aria-label="In-game overlay preview">
              <span className="hud" style={{ top: 18, left: 20 }}>
                DE_ANCIENT · 21/24
              </span>
              <span className="hud" style={{ bottom: 18, left: 20 }}>
                14 : 7
              </span>
              <span className="hud" style={{ bottom: 18, right: 20 }}>
                3v2
              </span>
              <div className="killfeed">
                {[0, 1, 2].map((i) => {
                  const line = KILLFEED[(t + i) % KILLFEED.length]
                  return (
                    <span
                      key={line + t}
                      className={`pop${line.startsWith('YOU') ? ' you' : ''}`}
                    >
                      {line}
                    </span>
                  )
                })}
              </div>
              <div className="overlay-card">
                <div className="oc-head">
                  <span
                    className="mono"
                    style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--text-faint)' }}
                  >
                    CS2 STAT DUEL
                  </span>
                  <LiveChip />
                </div>
                <div className="oc-body">
                  <div className="oc-row">
                    <span>POT</span>
                    <span className="v lime">$25.00</span>
                  </div>
                  <div className="oc-row">
                    <span>YOU</span>
                    <span className="v pop" key={`y${t}`}>
                      {YOU_KILLS[t]}
                    </span>
                  </div>
                  <div className="oc-row">
                    <span>VEXAL</span>
                    <span className="v pop" key={`v${t}`}>
                      {VEX_KILLS[t]}
                    </span>
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

/* ---------- S7: Fairness ---------- */
const FAIRNESS = [
  { k: 'SKILL BANDS, NOT ODDS', p: 'Matched at your rating.' },
  { k: 'HOST-VERIFIED RESULTS', p: 'Official APIs. No screenshots.' },
  { k: 'ESCROW + FLAT RAKE', p: 'Locked pots. One fixed cut.' },
  { k: 'VERIFIED IDENTITY', p: 'One person, one account.' },
  { k: 'GEO-FENCED & 18+', p: 'Only where legal.' },
  { k: 'RESPONSIBLE GAMING', p: 'Limits and self-exclusion, built in.' },
]

function Fairness() {
  return (
    <section className="band" id="fairness">
      <div className="container">
        <Reveal>
          <Eyebrow parts={['FAIRNESS', 'IN PLAIN SIGHT']} />
          <h2 className="section-title">The boring parts, done right.</h2>
        </Reveal>
        <div className="fair-grid">
          {FAIRNESS.map((f, i) => (
            <Reveal key={f.k} delay={(i % 3) * 80}>
              <div className="fair-cell">
                <span className="k">{f.k}</span>
                <p>{f.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- S8: Why us ---------- */
const COMPARE_ROWS: [string, string, string, string, string][] = [
  ['Bet against a house line', '✓', '—', '—', '✕'],
  ['Bet on other people', '✓', '✓', '—', '✕'],
  ['Play in-house minigames', '—', '—', '✓', '✕'],
  ['Wager on your own real match', '—', '—', '—', '✓'],
]

function WhyUs() {
  return (
    <section className="band">
      <div className="container">
        <Reveal>
          <Eyebrow parts={['WHY US']} />
          <h2 className="section-title">The category we're actually in.</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="compare">
            <table>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">SPORTSBOOK</th>
                  <th scope="col">FANTASY</th>
                  <th scope="col">SKILLZ-STYLE</th>
                  <th scope="col" className="us">
                    DUELORO
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map(([label, a, b, c, us]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{a}</td>
                    <td>{b}</td>
                    <td>{c}</td>
                    <td className={us === '✓' ? 'us' : 'us-dim'}>{us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Team ---------- */
const TEAM = [
  {
    initials: 'MW',
    tone: 'tile-lime',
    name: 'Mazlowe Wood',
    role: 'FOUNDER',
  },
  {
    initials: 'TV',
    tone: 'tile-amber',
    name: 'Thomas Veasy',
    role: 'FOUNDER',
  },
  {
    initials: 'SM',
    tone: 'tile-crimson',
    name: 'Shreyansh Misra',
    role: 'ENGINEERING',
  },
  {
    initials: 'SZ',
    tone: 'tile-lime',
    name: 'Sonny Zhang',
    role: 'ENGINEERING',
  },
]

function Team() {
  return (
    <section className="band" id="team">
      <div className="container">
        <Reveal>
          <Eyebrow parts={['THE TEAM', 'REAL NAMES', 'ACCOUNTABLE']} />
          <h2 className="section-title">The people holding the pot.</h2>
        </Reveal>
        <div className="team-grid">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 80}>
              <div className="team-cell">
                <div className={`team-avatar ${m.tone}`}>{m.initials}</div>
                <div className="team-name">{m.name}</div>
                <div className="team-role">{m.role}</div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={320}>
            <a href="#cta" className="team-cell hiring">
              <div className="team-avatar">+1</div>
              <div className="team-name">You?</div>
              <div className="team-role">WE'RE HIRING</div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------- S9: FAQ ---------- */
const FAQS = [
  {
    q: 'Is this gambling?',
    a: 'No. No house line, no odds, no games of chance — skill contests on your own matches, only where legal.',
  },
  {
    q: 'How do you make money?',
    a: "One flat rake on settled pots. That's it.",
  },
  {
    q: 'How are results verified?',
    a: 'Official feeds from Lichess, FACEIT, and OpenDota. No screenshots, no disputes.',
  },
  {
    q: 'Where is it available?',
    a: 'Only where skill contests are permitted. 18+.',
  },
  {
    q: 'Is it real money?',
    a: 'Play-money at launch. Real money rolls out region by region.',
  },
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="band" id="faq">
      <div className="container">
        <Reveal>
          <Eyebrow parts={['FAQ']} />
          <h2 className="section-title">Asked, answered.</h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="faq">
            {FAQS.map((f, i) => (
              <div className="faq-item" key={f.q}>
                <button
                  className="faq-q"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {f.q}
                  <span className="plus">{open === i ? '−' : '+'}</span>
                </button>
                {open === i && <p className="faq-a">{f.a}</p>}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- S10: Final CTA + footer ---------- */
function FinalCta() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
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
            {sent ? (
              <p
                className="mono"
                style={{ color: 'var(--accent)', fontSize: 13, letterSpacing: '0.1em' }}
              >
                YOU'RE ON THE LIST.
              </p>
            ) : (
              <form
                className="cta-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (email.trim()) setSent(true)
                }}
              >
                <input
                  type="email"
                  required
                  placeholder="YOU@DOMAIN.COM"
                  aria-label="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  GET EARLY ACCESS
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#top" className="nav-brand">
              <span className="mark" aria-hidden="true" />
              DUELORO
            </a>
            <p
              className="mono"
              style={{ color: 'var(--text-faint)', fontSize: 12, letterSpacing: '0.06em', marginTop: 20, maxWidth: 300 }}
            >
              Skill contests on the games you already play.
            </p>
          </div>
          <div>
            <h4>PRODUCT</h4>
            <ul>
              <li><a href="#how">HOW IT WORKS</a></li>
              <li><a href="#games">GAMES</a></li>
              <li><a href="#fairness">FAIRNESS</a></li>
            </ul>
          </div>
          <div>
            <h4>COMPANY</h4>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#cta">JOIN THE BETA</a></li>
              <li><a href="#top">CONTACT</a></li>
            </ul>
          </div>
          <div>
            <h4>LEGAL</h4>
            <ul>
              <li><a href="#top">TERMS</a></li>
              <li><a href="#top">PRIVACY</a></li>
              <li><a href="#top">RESPONSIBLE GAMING</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-compliance">
          18+ · SKILL CONTESTS ONLY WHERE PERMITTED · PLAY-MONEY AT LAUNCH
          <br />© {new Date().getFullYear()} DUELORO
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Trust />
        <HowItWorks />
        <Games />
        <Tour />
        <Overlay />
        <Fairness />
        <WhyUs />
        <Team />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
