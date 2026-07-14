'use client'
import { useState } from 'react'

const STRIPE_URL = 'https://buy.stripe.com/28EaEQ5ze1Xi8aL8tjgbm01'
const SPOTS_TAKEN = 0
const SPOTS_TOTAL = 50

const PAIRINGS = {
  '1-1': { score: 72, dynamic: 'Two leaders. Mutual respect, competitive edge.' },
  '1-2': { score: 88, dynamic: 'Leader and supporter. A natural complement.' },
  '1-3': { score: 80, dynamic: 'Ambition meets creativity. Playful and driving.' },
  '1-4': { score: 65, dynamic: 'Vision and execution. Slow to sync, strong once aligned.' },
  '1-5': { score: 78, dynamic: 'Two independents. High energy, needs space.' },
  '1-6': { score: 68, dynamic: 'Ambition meets nurturing. Empire and sanctuary.' },
  '1-7': { score: 74, dynamic: 'Doer and thinker. Mutually respectful.' },
  '1-8': { score: 82, dynamic: 'Two ambitious builders. A power pairing.' },
  '1-9': { score: 85, dynamic: 'Pioneer and humanitarian. Shared vision.' },
  '2-2': { score: 84, dynamic: 'Deep emotional attunement.' },
  '2-3': { score: 77, dynamic: 'Support and expression. Light and warm.' },
  '2-4': { score: 91, dynamic: 'Steady, loyal, grounded.' },
  '2-5': { score: 62, dynamic: 'Homebody and wanderer. High friction.' },
  '2-6': { score: 93, dynamic: 'Deeply harmonious. Both nurturers.' },
  '2-7': { score: 79, dynamic: 'Sensitive and spiritual. Quiet depth.' },
  '2-8': { score: 76, dynamic: 'Emotional and material. Complementary.' },
  '2-9': { score: 88, dynamic: 'Compassion meets service. Gentle and giving.' },
  '3-3': { score: 81, dynamic: 'Creative electricity. Playful and alive.' },
  '3-4': { score: 58, dynamic: 'Free spirit and planner. Difficult but growth-heavy.' },
  '3-5': { score: 90, dynamic: 'Fun-loving, adventurous, magnetic.' },
  '3-6': { score: 86, dynamic: 'Creativity and care. Warm and expressive.' },
  '3-7': { score: 66, dynamic: 'Extrovert and introvert. Opposites that intrigue.' },
  '3-8': { score: 73, dynamic: 'Vision and drive. Entrepreneurial energy.' },
  '3-9': { score: 87, dynamic: 'Artistic and spiritually aligned.' },
  '4-4': { score: 89, dynamic: 'Solid, stable, quietly loyal.' },
  '4-5': { score: 55, dynamic: 'Anchor and wind. High tension.' },
  '4-6': { score: 92, dynamic: 'Foundation-builders. Family-oriented.' },
  '4-7': { score: 83, dynamic: 'Practical and reflective. Mutual respect.' },
  '4-8': { score: 90, dynamic: 'Two builders. Empire-mindset.' },
  '4-9': { score: 71, dynamic: 'Stability and service. Grounded but distant.' },
  '5-5': { score: 78, dynamic: 'Two adventurers. Magnetic and mobile.' },
  '5-6': { score: 60, dynamic: 'Freedom and responsibility. Hard to balance.' },
  '5-7': { score: 82, dynamic: 'Independent thinkers. Respect each other\'s space.' },
  '5-8': { score: 74, dynamic: 'Movement and ambition. Energetic.' },
  '5-9': { score: 89, dynamic: 'Global-minded, adventurous, evolving.' },
  '6-6': { score: 87, dynamic: 'Deeply caring. Family-first.' },
  '6-7': { score: 70, dynamic: 'Nurture and wisdom. Quiet and steady.' },
  '6-8': { score: 84, dynamic: 'Family and provider. Traditional strength.' },
  '6-9': { score: 94, dynamic: 'Both service-oriented. Spiritually aligned.' },
  '7-7': { score: 80, dynamic: 'Two seekers. Intellectually deep.' },
  '7-8': { score: 67, dynamic: 'Thinker and doer. Respectful but distant.' },
  '7-9': { score: 86, dynamic: 'Wisdom and compassion. Philosophical bond.' },
  '8-8': { score: 79, dynamic: 'Two powerhouses. Driven and successful.' },
  '8-9': { score: 75, dynamic: 'Achievement and purpose. Complementary.' },
  '9-9': { score: 88, dynamic: 'Two humanitarians. Wide-open hearts.' },
}

function calculateLifePath(dateStr) {
  // dateStr expected as YYYY-MM-DD
  if (!dateStr || dateStr.length < 10) return null
  const digits = dateStr.replace(/-/g, '').split('').map(Number)
  let sum = digits.reduce((a, b) => a + b, 0)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0)
  }
  // For pairing lookup we reduce master numbers to single digits
  return sum > 9 ? String(sum).split('').map(Number).reduce((a, b) => a + b, 0) : sum
}

function getPairing(a, b) {
  const [low, high] = a <= b ? [a, b] : [b, a]
  return PAIRINGS[`${low}-${high}`]
}

export default function CompatibilityReportPage() {
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [result, setResult] = useState(null)
  const spotsLeft = SPOTS_TOTAL - SPOTS_TAKEN

  const goToCheckout = () => {
    if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'InitiateCheckout')
    window.location.href = STRIPE_URL
  }

  const checkCompatibility = () => {
    const lp1 = calculateLifePath(date1)
    const lp2 = calculateLifePath(date2)
    if (!lp1 || !lp2) return
    const pairing = getPairing(lp1, lp2)
    setResult({ lp1, lp2, ...pairing })
    if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'ViewContent')
    setTimeout(() => document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <>
      <nav style={S.nav}>
        <div style={S.navInner}>
          <a href="/" style={S.navLogo}>NUMRA</a>
          <button style={S.navCta} onClick={goToCheckout}>Get my full report</button>
        </div>
      </nav>

      <section style={S.hero}>
        <div style={S.heroInner}>
          <div style={S.heroEyebrow}>Free instant compatibility check · No signup</div>
          <h1 style={S.heroHeadline}>Find out if you're actually compatible.</h1>
          <p style={S.heroSub}>
            Enter both birthdates. Get your compatibility score and the essence of your dynamic — in 5 seconds, free. Unlock the full report (friction map, peak window, action) for SGD $7.
          </p>

          <div style={S.calcCard}>
            <div style={S.calcRow}>
              <div style={S.calcField}>
                <label style={S.calcLabel}>Your birthdate</label>
                <input type="date" value={date1} onChange={e => setDate1(e.target.value)} style={S.calcInput} />
              </div>
              <div style={S.calcField}>
                <label style={S.calcLabel}>Their birthdate</label>
                <input type="date" value={date2} onChange={e => setDate2(e.target.value)} style={S.calcInput} />
              </div>
            </div>
            <button
              onClick={checkCompatibility}
              disabled={!date1 || !date2}
              style={{ ...S.calcBtn, ...((!date1 || !date2) ? S.calcBtnDisabled : {}) }}
            >
              Check our compatibility →
            </button>
          </div>

          {result && (
            <div id="result" style={S.resultCard}>
              <div style={S.resultLabel}>Your compatibility</div>
              <div style={S.resultScore}>{result.score}</div>
              <div style={S.resultDynamic}>{result.dynamic}</div>
              <div style={S.resultPaths}>Life Path {result.lp1} × Life Path {result.lp2}</div>
              <div style={S.resultDivider} />
              <div style={S.resultUnlock}>
                <div style={S.resultUnlockLabel}>Want the full picture?</div>
                <div style={S.resultUnlockBody}>
                  Get the 3-5 page report with: where your friction actually lives, your peak 90-day window together, and one specific action to take this week. Delivered to your inbox within 24 hours.
                </div>
                <div style={S.resultPriceRow}>
                  <span style={S.resultPriceOld}>SGD $27</span>
                  <span style={S.resultPriceNew}>SGD $7</span>
                </div>
                <button style={S.resultCta} onClick={goToCheckout}>
                  Get the full report — SGD $7 →
                </button>
                <div style={S.resultProof}>{spotsLeft} of {SPOTS_TOTAL} founding spots left</div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section style={S.howSection}>
        <div style={S.howInner}>
          <h2 style={S.sectionHeadline}>How it works</h2>
          <div style={S.howSteps}>
            <div style={S.howStep}>
              <div style={S.howNum}>1</div>
              <div style={S.howTitle}>Pay SGD $7</div>
              <div style={S.howBody}>Secure checkout via Stripe. Takes 30 seconds.</div>
            </div>
            <div style={S.howStep}>
              <div style={S.howNum}>2</div>
              <div style={S.howTitle}>Confirm your birthdates</div>
              <div style={S.howBody}>You'll get an email within 1 hour confirming both birthdates before I write the report.</div>
            </div>
            <div style={S.howStep}>
              <div style={S.howNum}>3</div>
              <div style={S.howTitle}>Get your report in 24h</div>
              <div style={S.howBody}>Personalized 3-5 page PDF delivered to your inbox. Save it, share it, act on it.</div>
            </div>
          </div>
        </div>
      </section>

      <section style={S.faqSection}>
        <div style={S.faqInner}>
          <h2 style={S.sectionHeadline}>Common questions</h2>
          <div style={S.faqList}>
            <div style={S.faqItem}>
              <div style={S.faqQ}>Why only SGD $7?</div>
              <div style={S.faqA}>NUMRA launches in 2026 as an app. The first 50 reports help me refine the compatibility framework before it ships. You get the full report at a fraction of the regular price.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>What if my report is late?</div>
              <div style={S.faqA}>Full refund. If it doesn't arrive in your inbox within 24 hours of you confirming birthdates, reply to the receipt email and I'll refund you.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>Is this AI-generated?</div>
              <div style={S.faqA}>No. Every report is written personally by the founder based on your specific numbers.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>What if my partner doesn't know I'm getting this?</div>
              <div style={S.faqA}>They don't need to. The report is yours — read it, use it, share it if you want to.</div>
            </div>
          </div>
        </div>
      </section>

      <footer style={S.footer}>
        <div style={S.footerInner}>
          <div style={S.footerLogo}>NUMRA</div>
          <div style={S.footerTag}>A compass, not a mirror.</div>
          <div style={S.footerCopy}>© 2026 NUMRA. All rights reserved.</div>
        </div>
      </footer>
    </>
  )
}

const S = {
  nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 24px', background: 'rgba(13,13,15,0.92)', backdropFilter: 'blur(12px)', borderBottom: '0.5px solid rgba(255,255,255,0.08)' },
  navInner: { maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 },
  navLogo: { fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#C9A96E', letterSpacing: '0.05em', textDecoration: 'none' },
  navCta: { background: '#C9A96E', border: 'none', color: '#0D0D0F', borderRadius: 100, padding: '8px 20px', fontSize: 13, fontWeight: 600, fontFamily: "'Inter', sans-serif", cursor: 'pointer' },

  hero: { minHeight: '100vh', padding: '120px 24px 60px' },
  heroInner: { maxWidth: 700, margin: '0 auto', textAlign: 'center' },
  heroEyebrow: { display: 'inline-block', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A96E', background: 'rgba(201,169,110,0.1)', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: 100, padding: '4px 12px', marginBottom: 24 },
  heroHeadline: { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(36px, 6vw, 60px)', lineHeight: 1.15, color: '#F5F3EE', marginBottom: 20, letterSpacing: '-0.02em' },
  heroSub: { fontSize: 16, color: '#7A7870', lineHeight: 1.7, marginBottom: 40, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' },

  calcCard: { background: '#1A1A1E', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: 20, padding: 32, textAlign: 'left', marginBottom: 24 },
  calcRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 20 },
  calcField: { display: 'flex', flexDirection: 'column', gap: 8 },
  calcLabel: { fontSize: 12, fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#7A7870' },
  calcInput: { background: '#26262C', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '12px 14px', color: '#F5F3EE', fontSize: 15, outline: 'none', fontFamily: "'Inter', sans-serif", colorScheme: 'dark' },
  calcBtn: { width: '100%', background: '#C9A96E', color: '#0D0D0F', border: 'none', borderRadius: 12, padding: 16, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  calcBtnDisabled: { opacity: 0.4, cursor: 'not-allowed' },

  resultCard: { background: 'linear-gradient(180deg, #1A1A1E 0%, #221E14 100%)', border: '0.5px solid rgba(201,169,110,0.4)', borderRadius: 20, padding: 40, textAlign: 'center', marginTop: 24 },
  resultLabel: { fontSize: 11, fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A96E', marginBottom: 12 },
  resultScore: { fontFamily: "'DM Serif Display', serif", fontSize: 96, color: '#C9A96E', lineHeight: 1, marginBottom: 16 },
  resultDynamic: { fontFamily: "'DM Serif Display', serif", fontSize: 22, color: '#F5F3EE', lineHeight: 1.4, marginBottom: 12, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' },
  resultPaths: { fontSize: 13, color: '#7A7870', fontFamily: "'DM Mono', monospace", marginBottom: 32 },
  resultDivider: { height: 1, background: 'rgba(201,169,110,0.2)', margin: '0 auto 32px', maxWidth: 200 },
  resultUnlock: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  resultUnlockLabel: { fontFamily: "'DM Serif Display', serif", fontSize: 24, color: '#F5F3EE', marginBottom: 12 },
  resultUnlockBody: { fontSize: 14, color: '#7A7870', lineHeight: 1.7, maxWidth: 460, marginBottom: 20 },
  resultPriceRow: { display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 },
  resultPriceOld: { fontSize: 15, color: '#7A7870', textDecoration: 'line-through' },
  resultPriceNew: { fontFamily: "'DM Serif Display', serif", fontSize: 36, color: '#C9A96E' },
  resultCta: { background: '#C9A96E', color: '#0D0D0F', border: 'none', borderRadius: 100, padding: '16px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif", marginBottom: 12 },
  resultProof: { fontSize: 12, color: '#7A7870' },

  sectionHeadline: { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', color: '#F5F3EE', lineHeight: 1.15, marginBottom: 32, textAlign: 'center' },

  howSection: { padding: '80px 24px', background: 'linear-gradient(180deg, #0D0D0F 0%, #181410 50%, #0D0D0F 100%)', borderTop: '0.5px solid rgba(201,169,110,0.1)' },
  howInner: { maxWidth: 900, margin: '0 auto' },
  howSteps: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 },
  howStep: { textAlign: 'center' },
  howNum: { fontFamily: "'DM Serif Display', serif", fontSize: 48, color: '#C9A96E', marginBottom: 12, lineHeight: 1 },
  howTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 22, color: '#F5F3EE', marginBottom: 8 },
  howBody: { fontSize: 14, color: '#7A7870', lineHeight: 1.6, maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' },

  faqSection: { padding: '80px 24px', background: '#0D0D0F', borderTop: '0.5px solid rgba(255,255,255,0.04)' },
  faqInner: { maxWidth: 700, margin: '0 auto' },
  faqList: { display: 'flex', flexDirection: 'column', gap: 20 },
  faqItem: { background: '#1A1A1E', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 24 },
  faqQ: { fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#F5F3EE', marginBottom: 8, lineHeight: 1.3 },
  faqA: { fontSize: 14, color: '#7A7870', lineHeight: 1.6 },

  footer: { padding: '48px 24px', borderTop: '0.5px solid rgba(255,255,255,0.06)' },
  footerInner: { maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  footerLogo: { fontFamily: "'DM Serif Display', serif", fontSize: 24, color: '#C9A96E', letterSpacing: '0.05em', marginBottom: 4 },
  footerTag: { fontSize: 13, color: '#7A7870', fontStyle: 'italic' },
  footerCopy: { fontSize: 11, color: '#26262C', marginTop: 8 },
}
