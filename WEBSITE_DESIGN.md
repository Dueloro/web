# Money Match — Website Design Document

> Instruction doc for building the public marketing site. It extends the brand in
> `WEBSITE_BRIEF.md` (which is the source of truth for copy, facts, and guardrails)
> and specifies the visual design, the WebGL treatment, and how each section is
> built. Working name "Money Match"; swap globally when the final name is chosen.

---

## 1. The design thesis: a terminal window onto deep space

The app is a trading-terminal for skill: near-black, hairline borders, zero
radius, mono labels, one lime accent. Flat and precise. A full-page animated
shader would fight that and, worse, would read "casino."

So the site is built on one idea: **the entire page is a flat, disciplined
terminal — except for one aperture of depth.** The ShaderGradient (the
"Interstellar"-style flowing plane, recolored to our palette) lives behind the
hero as a slow, dark, ambient field, seen through the sharp UI as if the
terminal chrome were a window onto something vast and calm. Everything else on
the page is completely flat. One living element, everything around it quiet.

Why this works for us and not against us:

- **It says "signal," not "jackpot."** Slow-moving, grain-textured, mostly-dark
  fluid reads as data, atmosphere, depth — the opposite of slot-machine motion.
  No pulsing neon, no particle confetti, no gold.
- **It makes the brand's flatness a choice, not a limitation.** When one region
  has depth, the flatness everywhere else reads as intentional discipline.
- **It's the one aesthetic risk, spent in one place.** The gradient is the
  signature. Nothing else on the page competes with it.

The vibe target in three words: **calm, verified, alive.** Never: glowing,
spinning, "WIN BIG."

---

## 2. Design tokens (inherited from the app — do not invent new ones)

Use the app's tokens exactly. The site must look like the app's older sibling.

| Token | Value | Site usage |
|---|---|---|
| `--bg` | `#0c0c0c` | Page background everywhere |
| `--surface` | `#141414` | Cards, panels |
| `--surface-raised` | `#1a1a1a` | Section header bars, nav |
| `--border` | `#262626` | Hairline dividers (1px, everywhere) |
| `--border-strong` | `#3a3a3a` | Buttons, emphasized frames |
| `--accent` | `#c9f227` | THE accent: CTAs, live dots, money, key words |
| `--crimson` | `#ff4242` | Sparingly: the "never" words, blocked states |
| `--amber` | `#d8c84a` | Pending/medal accents in product shots only |
| `--text` | `#f2f2ef` | Headlines, body |
| `--text-muted` | `#9c9c94` | Secondary copy |
| `--text-faint` | `#6d6d66` | Eyebrows, labels, footnotes |

Rules that keep it brutalist:
- **Zero border radius. Everywhere. No exceptions.** Buttons, cards, inputs,
  images, the shader viewport frame — all sharp.
- **No decorative shadows or glows.** Depth comes from the shader aperture and
  from hairline borders, never from box-shadow. (A 1px lime top-border is the
  "accent panel" motif, as in the app.)
- **Lime is scarce.** If lime exceeds roughly 5% of any viewport, remove some.
  Its power is scarcity.
- Section rhythm: generous vertical space (~140–180px between sections on
  desktop), content max-width ~1200px, 12-col grid, hairline column rules
  where tables/grids appear.

**Typography** (same pairing as the app):
- **Inter** — headlines and product names. Bold (700–800), tight tracking
  (-0.02em), large sizes (hero ~clamp(48px, 7vw, 96px)).
- **JetBrains Mono** — everything systematic: eyebrows, labels, numbers, CTAs,
  nav, stats, FAQ questions. Uppercase with wide tracking (+0.12em) for
  eyebrows/labels; tabular figures for every number.
- The signature type move: mono uppercase eyebrows above every section, e.g.
  `SKILL-BASED · P2P POOLS · FLAT RAKE`, in `--text-faint` with lime middots.

---

## 3. The WebGL stack and how each library is used

### 3.1 ShaderGradient (the core visual — design the site around this)

Library: `shadergradient` with `@react-three/fiber` (`ShaderGradientCanvas` +
`ShaderGradient` components; the R3F dependency is exactly why R3F is in the
stack). Workflow: design the gradient in the ShaderGradient web editor starting
from the **Interstellar** preset, then export the URL string into the
`ShaderGradient` component config.

**Recolor it — this is mandatory.** The stock Interstellar preset is
blue/violet; on our site it must be re-parameterized into the brand:

- `color1`: `#0c0c0c` (the field is mostly page-black; the gradient should feel
  like it *emerges from* the background, no visible rectangle edges)
- `color2`: a dark moss/olive around `#22300f` (the midtone that gives the fluid
  its body)
- `color3`: `#c9f227` (lime, appearing only as thin crests/edges of the waves)
- Keep the preset's **grain on** — grain is what makes it feel printed/technical
  rather than glossy/casino.
- **Slow it down.** Animation speed low (uSpeed in the ~0.1–0.25 range in the
  editor); the motion target is "slow interstellar dust," a full visual cycle
  feeling like ~20–30s. Nothing should ever move fast on this site.
- Brightness/intensity low: the lime crests should sit well below the intensity
  of UI lime so the CTA still wins the eye. If a screenshot of the hero draws
  attention to the background before the headline, dim it further.
- Camera/zoom: framed so the plane reads as a horizon-less field (no visible
  plane edges), slightly low contrast.

**Where it appears (and nowhere else):**
1. **Hero background** — full-bleed behind the hero content, `position: fixed`
   canvas or absolutely-positioned container, `pointer-events: none`. A subtle
   black gradient scrim (`linear-gradient(180deg, transparent 40%, #0c0c0c
   100%)`) blends it into the flat page as you scroll; by the second section the
   page is pure `#0c0c0c`.
2. **Final CTA band** — the same gradient config reappears, cropped inside a
   hairline-bordered panel (the "window" again), bookending the page. Same
   instance re-used or a second small canvas; never a third.

Do not tile it behind cards, do not put it behind text-dense sections, do not
use it as a hover effect.

### 3.2 React Three Fiber

R3F is the substrate ShaderGradientCanvas runs on — that is its primary job
here. Do not add extra 3D scenes, floating meshes, or camera scroll-hijacking;
that would break the flat discipline. One optional, restrained use: the
Overlay section's device mock may be a simple R3F plane with the overlay
screenshot, given a ≤3° parallax tilt on pointer move. If it reads gimmicky,
cut it — plain screenshots with hairline frames are fully on-brand.

### 3.3 liquid-logo (the brand mark moment)

Reference: collidingScopes/liquid-logo (WebGL liquid-metal treatment applied to
a logo image; Apple-event style).

Use it in exactly one place: the **hero brand mark** — the lime square with the
dark `▲` glyph — rendered through the liquid effect so the mark looks like it
was poured in liquid metal/chrome with a lime tint, settling into the solid
square. It's a small canvas (~96–128px), sits above the H1, and is the only
"wow" micro-moment besides the gradient.

Constraints: static SVG mark as the loading state and the permanent fallback
(no-WebGL, reduced-motion, mobile if perf demands); the effect must settle to a
near-still state after ~3s, not churn forever. **Per the project owner's own
instruction: if the liquid treatment clashes with the flat brutalist system in
practice, drop it and use the static mark — the ShaderGradient is the design;
liquid-logo is an accent.** Everywhere else (nav, footer, favicon) the mark is
the plain flat SVG.

### 3.4 Performance and fallbacks (non-negotiable)

- Lazy-mount both canvases; hero gradient loads after first paint with a plain
  `#0c0c0c` background as the placeholder (the page must look intentional with
  WebGL off).
- `prefers-reduced-motion: reduce` → render a static frame of the gradient (a
  pre-exported dark PNG/AVIF of the same composition) and the static logo mark.
- Mobile: gradient at reduced resolution/pixel-ratio cap (~1.5) or the static
  frame if FPS drops; never let the hero stutter.
- Pause rendering when the canvas is off-screen (both canvases).
- Budget: hero LCP unaffected by WebGL (text renders first); total JS for the
  3D stack code-split behind the hero.

---

## 4. Page structure, section by section

Single landing page, sections in this order (mirrors §10 of the brief). Nav is
a slim raised bar (`--surface-raised`, hairline bottom border): flat mark +
wordmark left; mono links (`HOW IT WORKS · GAMES · FAIRNESS · FAQ`) center;
lime `JOIN THE BETA` button right (sharp corners, dark text on lime).

### S1 — Hero (the aperture)
- Full-viewport. ShaderGradient field behind; content on top, left-aligned on
  the grid.
- Liquid-logo mark (small) → mono eyebrow: `SKILL-BASED · PEER-TO-PEER · FLAT
  RAKE` → H1 in Inter, two lines, e.g. **"Put your skill on the line."** with
  "skill" in lime → one-liner sub (from brief §1) in `--text-muted` →
  primary CTA `JOIN THE BETA` (lime) + ghost secondary `SEE HOW IT WORKS`
  (hairline border).
- Bottom edge of hero: a thin mono ticker strip inside a hairline top-border —
  live-feeling contest lines (`CHESS · $10 POT · SETTLED ✓   CS2 STAT DUEL ·
  $25 POT · LIVE`) scrolling slowly. Small pulsing lime square + `LIVE` where
  applicable (the app's live motif). This is the only other motion on screen.

### S2 — The trust anchor ("we never take a side")
- Flat black, no imagery. One huge statement set in Inter across ~10 columns:
  **"We hold the pot. We never take a side."** with "never" in crimson —
  the single crimson use on the page.
- Beneath, three short mono-labeled lines (flat, no cards): `ESCROWED POT ·
  FLAT RAKE ONLY · payouts + rake = entries`. Rendering the invariant as
  literal mono code is on-brand and is the proof, not a slogan.

### S3 — How it works (4 steps)
- Four hairline-bordered panels in a row (stack on mobile), each with a mono
  header bar (`01 LINK`, `02 MATCH`, `03 PLAY`, `04 GET PAID`) — numbering is
  legitimate here because it is a real sequence. Copy from brief §4.
- Lime 1px top border on the active/hovered panel only. Scroll-reveal: panels
  fade/rise 12px, 80ms stagger, once.
- Under step 4, one mono footnote line: `DRAW OR NO-CLEAR → FULL REFUND, ZERO
  RAKE.`

### S4 — Games
- A dense terminal table, not app-store tiles: rows for CHESS / LICHESS · CS2 /
  FACEIT · DOTA 2 / OPENDOTA with status chips `LIVE` (lime square) and CLASH
  ROYALE, ROCKET LEAGUE as `COMING SOON` (faint). Square letter-tile avatars
  per game (the app's avatar motif). One line beneath: "Game-agnostic by
  design — new titles plug in as adapters."

### S5 — Product tour
- Alternating two-column rows: real screenshot (hairline frame, sharp corners,
  captioned with a mono label bar like `MARKETS / LOBBY`) beside 2–3 sentences
  of copy. Cover: Lobby/Quick Match, Solo Pools, Friends & direct challenges,
  Wallet/ledger. Screenshots sit on `--surface` panels; no mockup chrome,
  no perspective tilts here — flat and honest.

### S6 — The overlay (dedicated highlight)
- The most demo-able feature gets its own dark band. Full-width panel with the
  in-game overlay screenshot (the LIVE card over gameplay). Optional restrained
  R3F parallax tilt (§3.2), else static. Copy: "Your wager, on top of your
  game." + the overlay's collapsed-tab → expanded-card story in two sentences.
  Mono caption: `DESKTOP OVERLAY · WINDOWS · BORDERLESS`.

### S7 — Fairness & trust
- Six flat entries in a 3×2 hairline grid (borders only, no card fills): Skill
  bands not odds · Host-verified results · Escrow + flat rake · Verified
  identity & anti-collusion · Geo-fenced & 18+ · Responsible gaming. Each: mono
  label + two lines of copy from brief §8. No icons unless they match the
  square/mono system; text-first is more credible here.

### S8 — Why us (differentiator strip)
- A compact comparison table (mono): rows = "Bet against a house line / Bet on
  other people / Play in-house minigames / Wager on your own real match", columns
  = SPORTSBOOK · FANTASY · SKILLZ-STYLE · **MONEY MATCH**. Our column uses lime
  checks; theirs use faint ✕/—. Keep it factual and dry; the dryness is the
  flex.

### S9 — FAQ
- Hairline accordion, mono uppercase questions, muted answers (from brief §9/§8:
  is this gambling? how do you make money? how are results verified? where is it
  available? is it real money?). Honest, plain answers — including play-money at
  launch and geo-fencing.

### S10 — Final CTA + footer
- The gradient returns inside a hairline-framed band (the closing "window"):
  eyebrow `READY WHEN YOU ARE`, H2 "Stake. Play. Get paid.", email-capture input
  (sharp, mono placeholder) + lime `GET EARLY ACCESS`.
- Footer on `--surface`: flat mark, mono link columns, then the compliance line
  in `--text-faint`: 18+ · skill contests only where permitted · play-money at
  launch · responsible-gaming link. Present but not hidden — honesty is part of
  the brand.

---

## 5. Motion rules (the whole list)

Motion is rationed. The complete set of things allowed to move:
1. The hero ShaderGradient (slow, ambient).
2. The liquid-logo settle (once, ~3s, then near-still).
3. The hero ticker strip (slow marquee).
4. Scroll-reveals: single fade/rise, ≤400ms, small stagger, fire once.
5. Hover: background/border shifts and the lime top-border reveal, ≤150ms.
6. The `LIVE` square pulse (~1.2s loop) wherever a LIVE chip appears.

Nothing else animates. No parallax text, no cursor trails, no count-up numbers,
no confetti. Every animation respects `prefers-reduced-motion`.

---

## 6. Copy and vibe guardrails (design-level)

- Vocabulary per brief §8/§12: contest, entry, pot, rake, stake, skill match,
  prize. Never bet/odds/line/house edge/jackpot. No dice, chips, cards, slots,
  or coin imagery anywhere — not even as icons.
- Numbers are always mono and tabular; money always with the currency formatter
  style used in-app.
- The site must pass this squint test: from three meters away it looks like a
  precision fintech/dev-tools site with one beautiful deep-space moment — not a
  gaming or gambling site.
- Honesty is a design feature: the rake, the refund rule, the geo-fence, and
  play-money status appear in plain sight (S2, S3, S9, footer).

---

## 7. Build notes

- Stack: React + TypeScript (Vite or Next.js — Next.js preferred for the
  marketing site: static generation, image optimization, easy meta/OG),
  Tailwind mapped to the token table in §2, `shadergradient` +
  `@react-three/fiber` + `three` code-split into the hero chunk.
- The site is a separate app from the product; copy the design tokens, don't
  import the app's components.
- OG/social image: a static export of the hero (gradient frame + wordmark) so
  link previews carry the signature.
- Accessibility floor: visible keyboard focus (lime 1px outline offset), all
  text ≥ 4.5:1 against its surface (lime on black passes; never set body text
  in lime), semantic landmarks per section, canvases `aria-hidden`.
- QA checklist: WebGL-off screenshot of every section still looks finished;
  Lighthouse perf ≥ 90 on mobile with the gradient static-framed; zero rounded
  corners anywhere (grep the CSS for `border-radius` and delete).

---

## 8. Acceptance (what "done" looks like)

- The hero opens on the recolored Interstellar field — dark, grainy, slow —
  framed by sharp terminal chrome, with the liquid mark settling once above the
  headline. It feels alive and calm, not flashy.
- Scrolling past the hero lands in a completely flat, hairline, mono-labeled
  page that matches the app's look 1:1, with the crimson "never" statement high
  on the page.
- The gradient reappears exactly once more, in the closing CTA window.
- Reduced-motion and no-WebGL users get a fully designed static site.
- Nobody who lands on it thinks "casino." Everybody remembers the window.
