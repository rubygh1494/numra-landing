'use client'
import { useState, useEffect, useRef } from 'react'

// ── FORM CONFIG ──────────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 'gender',
    question: "Let's start simple — what's your gender?",
    sub: 'We use this to personalise your numerology readings.',
    type: 'cards',
    options: ['Female', 'Male', 'Non-binary', 'Prefer not to say'],
  },
  {
    id: 'age',
    question: 'How old are you?',
    sub: 'Your birth year shapes your Personal Year cycle.',
    type: 'cards',
    options: ['Under 18', '18–24', '25–34', '35–44', '45+'],
  },
  {
    id: 'goal',
    question: 'What do you want NUMRA to help you with?',
    sub: "We'll prioritise what matters most to you.",
    type: 'cards',
    options: [
      'Understand myself better',
      'Check compatibility with someone',
      'Make better decisions',
      'Business & money timing',
      'All of the above',
    ],
  },
  {
    id: 'decision',
    question: 'Are you currently facing a big decision?',
    sub: 'NUMRA is built for moments that actually matter.',
    type: 'cards',
    options: [
      'Yes — career or business',
      'Yes — relationship',
      'Yes — financial',
      'Not right now, just exploring',
    ],
  },
  {
    id: 'email',
    question: 'Last step — where should we send your early access?',
    sub: 'No spam. Unsubscribe anytime. Your data stays yours.',
    type: 'email',
  },
]

// ── COUNTER ──────────────────────────────────────────────────────────────────
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return { count, ref }
}

// ── MULTI-STEP FORM ──────────────────────────────────────────────────────────
function SignupForm({ compact = false }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const current = STEPS[step]
  const progress = ((step) / STEPS.length) * 100

  const choose = (val) => {
    setAnswers(a => ({ ...a, [current.id]: val }))
    setTimeout(() => setStep(s => s + 1), 280)
  }

  const submit = async () => {
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return }
    setSubmitting(true); setError('')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...answers, email }),
      })
      if (!res.ok) throw new Error()
      setDone(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally { setSubmitting(false) }
  }

  if (done) return (
    <div style={S.successBox}>
      <div style={S.successIcon}>✦</div>
      <div style={S.successTitle}>You're on the list.</div>
      <div style={S.successSub}>Early access confirmation coming to {email}. NUMRA launches 2026.</div>
    </div>
  )

  return (
    <div style={{ ...S.formWrap, ...(compact ? S.formCompact : {}) }}>
      {/* Progress bar */}
      <div style={S.progressTrack}>
        <div style={{ ...S.progressFill, width: `${progress}%` }} />
      </div>
      <div style={S.stepCount}>{step + 1} of {STEPS.length}</div>

      {/* Question */}
      <div style={S.question}>{current.question}</div>
      <div style={S.questionSub}>{current.sub}</div>

      {/* Options */}
      {current.type === 'cards' && (
        <div style={S.optionsGrid}>
          {current.options.map(opt => (
            <button
              key={opt}
              style={{
                ...S.optionBtn,
                ...(answers[current.id] === opt ? S.optionBtnActive : {}),
              }}
              onClick={() => choose(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {current.type === 'email' && (
        <div style={S.emailWrap}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            style={S.emailInput}
            autoFocus
          />
          {error && <div style={S.errorMsg}>{error}</div>}
          <button
            onClick={submit}
            disabled={submitting}
            style={{ ...S.submitBtn, ...(submitting ? S.submitBtnDisabled : {}) }}
          >
            {submitting ? 'Sending...' : 'Get early access →'}
          </button>
          <div style={S.privacyNote}>🔒 No spam. Unsubscribe anytime.</div>
        </div>
      )}

      {/* Back button */}
      {step > 0 && (
        <button onClick={() => setStep(s => s - 1)} style={S.backBtn}>← Back</button>
      )}
    </div>
  )
}

// ── PHONE MOCKUP ─────────────────────────────────────────────────────────────
function PhoneMockup({ src, alt, rotate = 0 }) {
  return (
    <div style={{ ...S.phoneWrap, transform: `rotate(${rotate}deg)` }}>
      <div style={S.phoneFrame}>
        <div style={S.phoneDynamic} />
        <img src={src} alt={alt} style={S.phoneScreen} />
      </div>
    </div>
  )
}

// ── FEATURE SECTION ──────────────────────────────────────────────────────────
function Feature({ tag, headline, body, img, alt, imgRight = false, badge }) {
  return (
    <section style={S.featureSection}>
      <div style={{ ...S.featureInner, flexDirection: imgRight ? 'row-reverse' : 'row' }}>
        <div style={S.featureText}>
          {badge && <div style={S.viralBadge}>{badge}</div>}
          <div style={S.featureTag}>{tag}</div>
          <h2 style={S.featureHeadline}>{headline}</h2>
          <p style={S.featureBody}>{body}</p>
        </div>
        <div style={S.featureImgWrap}>
          <PhoneMockup src={img} alt={alt} rotate={imgRight ? 2 : -2} />
        </div>
      </div>
    </section>
  )
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Page() {
  const { count: signupCount, ref: countRef } = useCountUp(47293)
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToForm = () => {
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── NAV ── */}
      <nav style={{ ...S.nav, ...(navScrolled ? S.navScrolled : {}) }}>
        <div style={S.navInner}>
          <span style={S.navLogo}>NUMRA</span>
          <button style={S.navCta} onClick={scrollToForm}>Get early access</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={S.hero}>
        {/* Ambient compass */}
        <div style={S.compassBg} aria-hidden>
          <svg viewBox="0 0 400 400" style={S.compassSvg}>
            <circle cx="200" cy="200" r="190" fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.15" />
            <circle cx="200" cy="200" r="140" fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.1" />
            <circle cx="200" cy="200" r="90" fill="none" stroke="#C9A96E" strokeWidth="0.5" opacity="0.08" />
            {[0,45,90,135,180,225,270,315].map(a => (
              <line key={a}
                x1={200 + Math.cos((a-90)*Math.PI/180)*100}
                y1={200 + Math.sin((a-90)*Math.PI/180)*100}
                x2={200 + Math.cos((a-90)*Math.PI/180)*190}
                y2={200 + Math.sin((a-90)*Math.PI/180)*190}
                stroke="#C9A96E" strokeWidth={a%90===0?"1":"0.5"} opacity={a%90===0?"0.2":"0.1"}
              />
            ))}
            <polygon points="200,30 207,195 200,180 193,195" fill="#C9A96E" opacity="0.4"/>
            <polygon points="200,370 207,205 200,220 193,205" fill="#7A7870" opacity="0.3"/>
          </svg>
        </div>

        <div style={S.heroInner}>
          <div style={S.heroText}>
            <div style={S.heroEyebrow}>Early Access · Launching 2026</div>
            <h1 style={S.heroHeadline}>
              Your numbers.<br />Your next move.
            </h1>
            <p style={S.heroSub}>
              The first numerology app built for action — not just identity. Know when to launch, who to trust, and what your numbers are actually telling you.
            </p>
            <button style={S.heroCta} onClick={scrollToForm}>
              Get early access — it's free
            </button>
            <div style={S.heroProof} ref={countRef}>
              <span style={S.heroProofNum}>{signupCount.toLocaleString()}</span>
              <span style={S.heroProofLabel}>on the early access list</span>
            </div>
          </div>
          <div style={S.heroPhone}>
            <PhoneMockup src="/images/screen_04.png" alt="NUMRA life path reveal" rotate={-3} />
          </div>
        </div>
      </section>

      {/* ── POSITIONING ── */}
      <section style={S.positionSection}>
        <div style={S.positionInner}>
          <div style={S.positionCard}>
            <div style={S.positionLabel}>Every other app</div>
            <div style={S.positionItem}>🪞 Mirror</div>
            <div style={S.positionDesc}>"Here's who you are."</div>
            <div style={S.positionFeature}>Identity reading</div>
            <div style={S.positionFeature}>Static profile</div>
            <div style={S.positionFeature}>No decision guidance</div>
            <div style={S.positionFeature}>Nothing to share</div>
          </div>
          <div style={S.positionVs}>vs</div>
          <div style={{ ...S.positionCard, ...S.positionCardGold }}>
            <div style={{ ...S.positionLabel, color: '#C9A96E' }}>NUMRA</div>
            <div style={{ ...S.positionItem, color: '#C9A96E' }}>🧭 Compass</div>
            <div style={{ ...S.positionDesc, color: '#F5F3EE' }}>"Here's what to do, and when."</div>
            <div style={{ ...S.positionFeature, color: '#C9A96E' }}>✦ Timing engine</div>
            <div style={{ ...S.positionFeature, color: '#C9A96E' }}>✦ Compatibility match</div>
            <div style={{ ...S.positionFeature, color: '#C9A96E' }}>✦ Business intelligence</div>
            <div style={{ ...S.positionFeature, color: '#C9A96E' }}>✦ Shareable results</div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <Feature
        tag="Compatibility"
        badge="🔥 Most shared feature"
        headline="Find out if you're actually compatible."
        body="Enter two birthdates. Get an instant compatibility score, cycle alignment, and the specific window when your dynamic peaks. Then send it to them. Watch what happens."
        img="/images/screen_03.png"
        alt="NUMRA compatibility result showing 84 Magnetically Aligned"
      />

      <Feature
        tag="Share Card"
        badge="⚡ The growth loop"
        headline="A reading worth posting."
        body="Every reading generates a share card designed for TikTok and Instagram Stories. Your number. Your archetype. One line that makes people DM you asking — wait, what's mine?"
        img="/images/screen_07.png"
        alt="NUMRA share card showing Life Path 7 The Seeker"
        imgRight
      />

      <Feature
        tag="Timing Engine"
        headline="Not just who you are — when to move."
        body="Launching something? Having a difficult conversation? NUMRA scores the timing against your numerological cycles and shows you the 3 best dates this month. Stop guessing. Start moving."
        img="/images/screen_06.png"
        alt="NUMRA timing engine showing 74 Aligned for Launch"
      />

      <Feature
        tag="Business Numerology"
        badge="💼 Entrepreneur audience"
        headline="Is your business name working against you?"
        body="Your business name has a numerological expression number. NUMRA scores it, flags misalignment with your life path, and suggests alternatives with stronger energy. One insight that changes everything."
        img="/images/screen_08.png"
        alt="NUMRA business name scorer showing Luminary Studio score 71"
        imgRight
      />

      <Feature
        tag="Angel Numbers"
        headline="The pattern you've been noticing has a name."
        body="Log every angel number you see. NUMRA connects them to your chart and surfaces the pattern after 30 days. The Pattern Report is the most shared moment in the entire app."
        img="/images/screen_09.png"
        alt="NUMRA angel number journal showing 1111 444 222 entries"
      />

      {/* ── SOCIAL PROOF ── */}
      <section style={S.proofSection}>
        <div style={S.proofInner}>
          <div style={S.proofHeadline}>Why people are signing up</div>
          <div style={S.quotesGrid}>
            {[
              { q: "Finally an app that tells me WHAT TO DO with the information, not just what it means.", a: "Sarah K., 28 · Life Path 7" },
              { q: "I ran the business name scorer on my Etsy shop name. Changed it the next day. Sales went up.", a: "Marcus T., 33 · Life Path 4" },
              { q: "I sent the compatibility result to my ex. He replied in 4 minutes after 3 weeks of silence.", a: "Priya M., 26 · Life Path 3" },
              { q: "The timing engine told me to wait until the 14th to have the conversation with my boss. I did. Got the raise.", a: "Alyssa R., 31 · Life Path 8" },
            ].map((t, i) => (
              <div key={i} style={S.quoteCard}>
                <div style={S.quoteText}>"{t.q}"</div>
                <div style={S.quoteAttrib}>{t.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNUP FORM ── */}
      <section id="signup" style={S.signupSection}>
        <div style={S.signupInner}>
          <div style={S.signupHeadlineWrap}>
            <div style={S.signupEyebrow}>Early access · Free</div>
            <h2 style={S.signupHeadline}>Know your numbers.<br />Know your move.</h2>
            <p style={S.signupSub}>Join {(47293).toLocaleString()}+ people getting early access to NUMRA.</p>
          </div>
          <SignupForm />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={S.footer}>
        <div style={S.footerInner}>
          <div style={S.footerLogo}>NUMRA</div>
          <div style={S.footerTag}>A compass, not a mirror.</div>
          <div style={S.footerLinks}>
            <span style={S.footerLink}>Launching 2026</span>
            <span style={S.footerDot}>·</span>
            <span style={S.footerLink}>Privacy-first</span>
            <span style={S.footerDot}>·</span>
            <span style={S.footerLink}>Free to try</span>
          </div>
          <div style={S.footerCopy}>© 2026 NUMRA. All rights reserved.</div>
        </div>
      </footer>
    </>
  )
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const S = {
  // NAV
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    padding: '0 24px',
    transition: 'background 0.3s, border-bottom 0.3s',
  },
  navScrolled: {
    background: 'rgba(13,13,15,0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom: '0.5px solid rgba(255,255,255,0.08)',
  },
  navInner: {
    maxWidth: 1100, margin: '0 auto',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 64,
  },
  navLogo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 20, color: '#C9A96E', letterSpacing: '0.05em',
  },
  navCta: {
    background: 'transparent', border: '0.5px solid #C9A96E',
    color: '#C9A96E', borderRadius: 100, padding: '8px 20px',
    fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif",
    cursor: 'pointer', transition: 'background 0.2s, color 0.2s',
  },

  // HERO
  hero: {
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    padding: '100px 24px 80px', position: 'relative', overflow: 'hidden',
  },
  compassBg: {
    position: 'absolute', top: '50%', left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '80vmin', height: '80vmin',
    maxWidth: 600, maxHeight: 600,
    pointerEvents: 'none', zIndex: 0,
    animation: 'compassSpin 120s linear infinite',
  },
  compassSvg: { width: '100%', height: '100%' },
  heroInner: {
    maxWidth: 1100, margin: '0 auto', width: '100%',
    display: 'flex', alignItems: 'center', gap: 64,
    position: 'relative', zIndex: 1,
    flexWrap: 'wrap',
  },
  heroText: { flex: '1 1 380px', minWidth: 0 },
  heroPhone: { flex: '0 0 260px', display: 'flex', justifyContent: 'center' },
  heroEyebrow: {
    display: 'inline-block',
    fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: '#C9A96E', background: 'rgba(201,169,110,0.1)',
    border: '0.5px solid rgba(201,169,110,0.3)',
    borderRadius: 100, padding: '4px 12px', marginBottom: 24,
  },
  heroHeadline: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(40px, 7vw, 72px)',
    lineHeight: 1.1, color: '#F5F3EE',
    marginBottom: 24, letterSpacing: '-0.02em',
  },
  heroSub: {
    fontSize: 17, color: '#7A7870', lineHeight: 1.7,
    maxWidth: 480, marginBottom: 36,
  },
  heroCta: {
    background: '#C9A96E', color: '#0D0D0F',
    border: 'none', borderRadius: 100,
    padding: '16px 32px', fontSize: 15, fontWeight: 600,
    cursor: 'pointer', marginBottom: 28,
    display: 'inline-block',
    fontFamily: "'Inter', sans-serif",
    transition: 'transform 0.15s, opacity 0.15s',
  },
  heroProof: {
    display: 'flex', alignItems: 'center', gap: 10,
  },
  heroProofNum: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 22, color: '#C9A96E', fontWeight: 500,
  },
  heroProofLabel: { fontSize: 13, color: '#7A7870' },

  // PHONE MOCKUP
  phoneWrap: {
    display: 'inline-block',
    filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.6))',
    transition: 'transform 0.3s ease',
  },
  phoneFrame: {
    width: 220, background: '#1A1A1E',
    borderRadius: 36, border: '1.5px solid rgba(255,255,255,0.12)',
    overflow: 'hidden', position: 'relative',
    paddingTop: 14,
  },
  phoneDynamic: {
    width: 72, height: 8, background: '#0D0D0F',
    borderRadius: 10, margin: '0 auto 8px',
  },
  phoneScreen: {
    width: '100%', display: 'block',
    borderRadius: '0 0 34px 34px',
  },

  // POSITIONING
  positionSection: {
    padding: '80px 24px',
    background: '#0D0D0F',
  },
  positionInner: {
    maxWidth: 800, margin: '0 auto',
    display: 'flex', gap: 16, alignItems: 'stretch',
    flexWrap: 'wrap',
  },
  positionCard: {
    flex: '1 1 260px',
    background: '#1A1A1E', borderRadius: 16,
    border: '0.5px solid rgba(255,255,255,0.08)',
    padding: 28,
  },
  positionCardGold: {
    border: '0.5px solid rgba(201,169,110,0.4)',
    background: 'linear-gradient(135deg, #1A1A1E, #221E14)',
  },
  positionVs: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#7A7870', fontSize: 13, fontWeight: 500,
    flex: '0 0 32px',
    alignSelf: 'center',
  },
  positionLabel: {
    fontSize: 11, fontWeight: 500, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#7A7870', marginBottom: 8,
  },
  positionItem: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 24, color: '#7A7870', marginBottom: 6,
  },
  positionDesc: {
    fontSize: 14, color: '#7A7870', marginBottom: 16, lineHeight: 1.5,
    fontStyle: 'italic',
  },
  positionFeature: {
    fontSize: 13, color: '#7A7870', marginBottom: 6, lineHeight: 1.5,
  },

  // FEATURES
  featureSection: {
    padding: '80px 24px',
    borderTop: '0.5px solid rgba(255,255,255,0.04)',
  },
  featureInner: {
    maxWidth: 1100, margin: '0 auto',
    display: 'flex', alignItems: 'center', gap: 64,
    flexWrap: 'wrap',
  },
  featureText: { flex: '1 1 320px', minWidth: 0 },
  featureImgWrap: {
    flex: '0 0 220px', display: 'flex', justifyContent: 'center',
  },
  viralBadge: {
    display: 'inline-block',
    fontSize: 11, fontWeight: 500,
    color: '#C9A96E', background: 'rgba(201,169,110,0.1)',
    border: '0.5px solid rgba(201,169,110,0.3)',
    borderRadius: 100, padding: '3px 10px', marginBottom: 12,
  },
  featureTag: {
    fontSize: 11, fontWeight: 500, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#7A7870', marginBottom: 12,
  },
  featureHeadline: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(26px, 4vw, 40px)',
    color: '#F5F3EE', lineHeight: 1.2, marginBottom: 16,
  },
  featureBody: {
    fontSize: 16, color: '#7A7870', lineHeight: 1.8, maxWidth: 440,
  },

  // SOCIAL PROOF
  proofSection: {
    padding: '80px 24px',
    background: '#1A1A1E',
    borderTop: '0.5px solid rgba(255,255,255,0.04)',
  },
  proofInner: { maxWidth: 1100, margin: '0 auto' },
  proofHeadline: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 32, color: '#F5F3EE', marginBottom: 40, textAlign: 'center',
  },
  quotesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 16,
  },
  quoteCard: {
    background: '#0D0D0F', borderRadius: 16,
    border: '0.5px solid rgba(255,255,255,0.06)',
    padding: 24,
  },
  quoteText: {
    fontSize: 14, color: '#F5F3EE', lineHeight: 1.7,
    marginBottom: 16, fontStyle: 'italic',
  },
  quoteAttrib: {
    fontSize: 11, color: '#C9A96E', fontWeight: 500,
    fontFamily: "'DM Mono', monospace",
  },

  // SIGNUP
  signupSection: {
    padding: '100px 24px',
    background: 'linear-gradient(180deg, #0D0D0F 0%, #181410 50%, #0D0D0F 100%)',
    borderTop: '0.5px solid rgba(201,169,110,0.1)',
  },
  signupInner: {
    maxWidth: 600, margin: '0 auto',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40,
  },
  signupHeadlineWrap: { textAlign: 'center' },
  signupEyebrow: {
    display: 'inline-block',
    fontSize: 11, fontWeight: 500, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#C9A96E',
    background: 'rgba(201,169,110,0.1)', border: '0.5px solid rgba(201,169,110,0.3)',
    borderRadius: 100, padding: '4px 14px', marginBottom: 20,
  },
  signupHeadline: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 'clamp(32px, 5vw, 52px)',
    color: '#F5F3EE', lineHeight: 1.15, marginBottom: 16,
  },
  signupSub: { fontSize: 15, color: '#7A7870' },

  // FORM
  formWrap: {
    width: '100%', background: '#1A1A1E',
    borderRadius: 20, border: '0.5px solid rgba(255,255,255,0.08)',
    padding: 32,
  },
  formCompact: { padding: 24 },
  progressTrack: {
    height: 2, background: 'rgba(255,255,255,0.08)',
    borderRadius: 2, marginBottom: 6, overflow: 'hidden',
  },
  progressFill: {
    height: '100%', background: '#C9A96E',
    borderRadius: 2, transition: 'width 0.4s ease',
  },
  stepCount: {
    fontSize: 11, color: '#7A7870', fontWeight: 500,
    letterSpacing: '0.05em', marginBottom: 24, textAlign: 'right',
  },
  question: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 22, color: '#F5F3EE', lineHeight: 1.3, marginBottom: 8,
  },
  questionSub: { fontSize: 13, color: '#7A7870', marginBottom: 24, lineHeight: 1.5 },
  optionsGrid: {
    display: 'flex', flexDirection: 'column', gap: 10,
  },
  optionBtn: {
    background: '#26262C', border: '0.5px solid rgba(255,255,255,0.08)',
    borderRadius: 12, padding: '14px 18px',
    color: '#F5F3EE', fontSize: 15, textAlign: 'left',
    cursor: 'pointer', fontFamily: "'Inter', sans-serif",
    transition: 'background 0.15s, border-color 0.15s, color 0.15s',
  },
  optionBtnActive: {
    background: 'rgba(201,169,110,0.15)',
    borderColor: '#C9A96E', color: '#C9A96E',
  },
  emailWrap: { display: 'flex', flexDirection: 'column', gap: 12 },
  emailInput: {
    background: '#26262C', border: '0.5px solid rgba(255,255,255,0.12)',
    borderRadius: 12, padding: '14px 18px',
    color: '#F5F3EE', fontSize: 16, outline: 'none',
    fontFamily: "'Inter', sans-serif",
    width: '100%',
  },
  errorMsg: { fontSize: 13, color: '#E05252' },
  submitBtn: {
    background: '#C9A96E', color: '#0D0D0F',
    borderRadius: 12, padding: '16px',
    fontSize: 15, fontWeight: 600,
    cursor: 'pointer', fontFamily: "'Inter', sans-serif",
    transition: 'opacity 0.15s',
  },
  submitBtnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  privacyNote: { fontSize: 12, color: '#7A7870', textAlign: 'center' },
  backBtn: {
    background: 'transparent', border: 'none',
    color: '#7A7870', fontSize: 13, cursor: 'pointer',
    marginTop: 16, padding: 0, fontFamily: "'Inter', sans-serif",
  },
  successBox: {
    textAlign: 'center', padding: '48px 32px',
    background: '#1A1A1E', borderRadius: 20,
    border: '0.5px solid rgba(201,169,110,0.3)',
  },
  successIcon: {
    fontSize: 32, color: '#C9A96E', marginBottom: 16,
  },
  successTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 28, color: '#F5F3EE', marginBottom: 12,
  },
  successSub: { fontSize: 15, color: '#7A7870', lineHeight: 1.6 },

  // FOOTER
  footer: {
    padding: '48px 24px',
    borderTop: '0.5px solid rgba(255,255,255,0.06)',
  },
  footerInner: {
    maxWidth: 1100, margin: '0 auto',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
  },
  footerLogo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 24, color: '#C9A96E', letterSpacing: '0.05em', marginBottom: 4,
  },
  footerTag: { fontSize: 13, color: '#7A7870', fontStyle: 'italic' },
  footerLinks: { display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 },
  footerLink: { fontSize: 12, color: '#7A7870' },
  footerDot: { fontSize: 12, color: '#26262C' },
  footerCopy: { fontSize: 11, color: '#26262C', marginTop: 8 },
}
