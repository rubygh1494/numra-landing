'use client'

const STRIPE_URL = 'https://buy.stripe.com/28EaEQ5ze1Xi8aL8tjgbm01'
const SPOTS_TAKEN = 0
const SPOTS_TOTAL = 50

export default function CompatibilityReportPage() {
  const spotsLeft = SPOTS_TOTAL - SPOTS_TAKEN

  const goToCheckout = () => {
    if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'InitiateCheckout')
    window.location.href = STRIPE_URL
  }

  return (
    <>
      <nav style={S.nav}>
        <div style={S.navInner}>
          <a href="/" style={S.navLogo}>NUMRA</a>
          <button style={S.navCta} onClick={goToCheckout}>Get my report</button>
        </div>
      </nav>

      <section style={S.hero}>
        <div style={S.heroInner}>
          <div style={S.heroText}>
            <div style={S.heroEyebrow}>SGD $7 · 24-hour delivery · {spotsLeft} spots left</div>
            <h1 style={S.heroHeadline}>Find out if you're actually compatible — for the price of a coffee.</h1>
            <p style={S.heroSub}>
              A personalized 3-5 page compatibility report from NUMRA. Both of your life paths, where the friction actually lives, your peak window together, and one action to take this week. Delivered to your inbox as a PDF within 24 hours.
            </p>
            <div style={S.priceBox}>
              <div style={S.priceOld}>Regular price SGD $27</div>
              <div style={S.priceNew}>SGD $7</div>
              <div style={S.priceNote}>Founding member price · First {SPOTS_TOTAL} reports only</div>
            </div>
            <button style={S.heroCta} onClick={goToCheckout}>
              Get my report — SGD $7 →
            </button>
            <div style={S.heroProof}>Secure payment via Stripe · 24h delivery guarantee</div>
          </div>
          <div style={S.heroPhone}>
            <div style={S.phoneWrap}>
              <div style={S.phoneFrame}>
                <div style={S.phoneDynamic} />
                <img src="/images/screen_03.png" alt="NUMRA compatibility report preview" style={S.phoneScreen} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={S.whatSection}>
        <div style={S.whatInner}>
          <h2 style={S.sectionHeadline}>What's in your report</h2>
          <div style={S.whatGrid}>
            <div style={S.whatCard}>
              <div style={S.whatIcon}>①</div>
              <div style={S.whatTitle}>Your compatibility score</div>
              <div style={S.whatBody}>0-100 score based on your life path pairing, with a one-line dynamic that captures the essence of your match.</div>
            </div>
            <div style={S.whatCard}>
              <div style={S.whatIcon}>②</div>
              <div style={S.whatTitle}>Where your friction lives</div>
              <div style={S.whatBody}>The specific dynamic that creates tension — and whether it's growth-friction or drain-friction.</div>
            </div>
            <div style={S.whatCard}>
              <div style={S.whatIcon}>③</div>
              <div style={S.whatTitle}>Your peak window together</div>
              <div style={S.whatBody}>The next 90-day alignment window — best time for big conversations, decisions, or shared moves.</div>
            </div>
            <div style={S.whatCard}>
              <div style={S.whatIcon}>④</div>
              <div style={S.whatTitle}>One action to take this week</div>
              <div style={S.whatBody}>Specific and numbered, based on your pairing — not generic advice.</div>
            </div>
          </div>
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
              <div style={S.howTitle}>Send your birthdates</div>
              <div style={S.howBody}>You'll get an email within 1 hour asking for both birthdates. Reply with them.</div>
            </div>
            <div style={S.howStep}>
              <div style={S.howNum}>3</div>
              <div style={S.howTitle}>Get your report in 24h</div>
              <div style={S.howBody}>Personalized 3-5 page PDF delivered to your inbox. Save it, share it, act on it.</div>
            </div>
          </div>
        </div>
      </section>

      <section style={S.ctaSection}>
        <div style={S.ctaInner}>
          <div style={S.ctaEyebrow}>{spotsLeft} spots left at SGD $7</div>
          <h2 style={S.sectionHeadline}>Ready to see what's actually there?</h2>
          <button style={S.heroCta} onClick={goToCheckout}>
            Get my report — SGD $7 →
          </button>
          <div style={S.heroProof}>Secure payment via Stripe · 24h delivery guarantee</div>
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
              <div style={S.faqA}>Full refund. If it doesn't arrive in your inbox within 24 hours of you sending both birthdates, reply to the receipt email and I'll refund you.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>Do I need to know numerology?</div>
              <div style={S.faqA}>No. The report explains everything in plain language. Just send both birthdates.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>What if my partner doesn't know I'm getting this?</div>
              <div style={S.faqA}>They don't need to. The report is yours — read it, use it, share it with them if you want to.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>Is this AI-generated?</div>
              <div style={S.faqA}>No. Every report is written personally by the founder based on your specific numbers.</div>
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

  hero: { minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '120px 24px 60px' },
  heroInner: { maxWidth: 1100, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap' },
  heroText: { flex: '1 1 380px', minWidth: 0 },
  heroPhone: { flex: '0 0 260px', display: 'flex', justifyContent: 'center' },
  heroEyebrow: { display: 'inline-block', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A96E', background: 'rgba(201,169,110,0.1)', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: 100, padding: '4px 12px', marginBottom: 24 },
  heroHeadline: { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(36px, 6vw, 60px)', lineHeight: 1.15, color: '#F5F3EE', marginBottom: 24, letterSpacing: '-0.02em' },
  heroSub: { fontSize: 17, color: '#7A7870', lineHeight: 1.7, maxWidth: 480, marginBottom: 32 },
  priceBox: { background: '#1A1A1E', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: 16, padding: 20, marginBottom: 28, maxWidth: 320 },
  priceOld: { fontSize: 13, color: '#7A7870', textDecoration: 'line-through', marginBottom: 4 },
  priceNew: { fontFamily: "'DM Serif Display', serif", fontSize: 40, color: '#C9A96E', lineHeight: 1, marginBottom: 6 },
  priceNote: { fontSize: 12, color: '#7A7870' },
  heroCta: { background: '#C9A96E', color: '#0D0D0F', border: 'none', borderRadius: 100, padding: '16px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 16, fontFamily: "'Inter', sans-serif" },
  heroProof: { fontSize: 13, color: '#7A7870' },

  phoneWrap: { display: 'inline-block', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.6))', transform: 'rotate(-3deg)' },
  phoneFrame: { width: 220, background: '#1A1A1E', borderRadius: 36, border: '1.5px solid rgba(255,255,255,0.12)', overflow: 'hidden', paddingTop: 14 },
  phoneDynamic: { width: 72, height: 8, background: '#0D0D0F', borderRadius: 10, margin: '0 auto 8px' },
  phoneScreen: { width: '100%', display: 'block', borderRadius: '0 0 34px 34px' },

  sectionHeadline: { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', color: '#F5F3EE', lineHeight: 1.15, marginBottom: 32, textAlign: 'center' },

  whatSection: { padding: '80px 24px', background: '#0D0D0F', borderTop: '0.5px solid rgba(255,255,255,0.04)' },
  whatInner: { maxWidth: 1000, margin: '0 auto' },
  whatGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 },
  whatCard: { background: '#1A1A1E', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: 28 },
  whatIcon: { fontFamily: "'DM Serif Display', serif", fontSize: 32, color: '#C9A96E', marginBottom: 12 },
  whatTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#F5F3EE', marginBottom: 8, lineHeight: 1.3 },
  whatBody: { fontSize: 14, color: '#7A7870', lineHeight: 1.6 },

  howSection: { padding: '80px 24px', background: 'linear-gradient(180deg, #0D0D0F 0%, #181410 50%, #0D0D0F 100%)', borderTop: '0.5px solid rgba(201,169,110,0.1)' },
  howInner: { maxWidth: 900, margin: '0 auto' },
  howSteps: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 },
  howStep: { textAlign: 'center' },
  howNum: { fontFamily: "'DM Serif Display', serif", fontSize: 48, color: '#C9A96E', marginBottom: 12, lineHeight: 1 },
  howTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 22, color: '#F5F3EE', marginBottom: 8 },
  howBody: { fontSize: 14, color: '#7A7870', lineHeight: 1.6, maxWidth: 260, marginLeft: 'auto', marginRight: 'auto' },

  ctaSection: { padding: '80px 24px', background: '#0D0D0F', borderTop: '0.5px solid rgba(255,255,255,0.04)', textAlign: 'center' },
  ctaInner: { maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  ctaEyebrow: { display: 'inline-block', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A96E', background: 'rgba(201,169,110,0.1)', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: 100, padding: '4px 14px', marginBottom: 20 },

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
