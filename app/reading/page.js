'use client'
import { useState } from 'react'

const CALENDLY_URL = 'https://cal.com/numra-svqp6h/compatibility-reading'
const SPOTS_TAKEN = 0
const SPOTS_TOTAL = 10

export default function ReadingPage() {
  const [showBooking, setShowBooking] = useState(false)
  const spotsLeft = SPOTS_TOTAL - SPOTS_TAKEN

  const scrollToBooking = () => {
    setShowBooking(true)
    setTimeout(() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <>
      <nav style={S.nav}>
        <div style={S.navInner}>
          <a href="/" style={S.navLogo}>NUMRA</a>
          <button style={S.navCta} onClick={scrollToBooking}>Book my reading</button>
        </div>
      </nav>

      <section style={S.hero}>
        <div style={S.heroInner}>
          <div style={S.heroText}>
            <div style={S.heroEyebrow}>Founding Member Price · {spotsLeft} spots left</div>
            <h1 style={S.heroHeadline}>Get your compatibility read — before NUMRA launches.</h1>
            <p style={S.heroSub}>
              A 30-minute compatibility reading with the founder, live over Zoom. Your numbers, your partner's numbers, where the friction lives, and your peak window together. Specific, actionable, no fluff.
            </p>
            <div style={S.priceBox}>
              <div style={S.priceOld}>Regular price SGD $67</div>
              <div style={S.priceNew}>SGD $27</div>
              <div style={S.priceNote}>Founding member price · First {SPOTS_TOTAL} bookings only</div>
            </div>
            <button style={S.heroCta} onClick={scrollToBooking}>
              Secure my spot →
            </button>
            <div style={S.heroProof}>Instant booking · 30-day money-back guarantee</div>
          </div>
          <div style={S.heroPhone}>
            <div style={S.phoneWrap}>
              <div style={S.phoneFrame}>
                <div style={S.phoneDynamic} />
                <img src="/images/screen_03.png" alt="NUMRA compatibility result" style={S.phoneScreen} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={S.whatSection}>
        <div style={S.whatInner}>
          <h2 style={S.sectionHeadline}>What you'll walk away with</h2>
          <div style={S.whatGrid}>
            <div style={S.whatCard}>
              <div style={S.whatIcon}>①</div>
              <div style={S.whatTitle}>Your compatibility score</div>
              <div style={S.whatBody}>How you and your partner align on life path, personal year, and soul urge.</div>
            </div>
            <div style={S.whatCard}>
              <div style={S.whatIcon}>②</div>
              <div style={S.whatTitle}>Where your friction lives</div>
              <div style={S.whatBody}>The specific dynamic that creates tension — and whether it's growth-friction or drain-friction.</div>
            </div>
            <div style={S.whatCard}>
              <div style={S.whatIcon}>③</div>
              <div style={S.whatTitle}>Your peak window together</div>
              <div style={S.whatBody}>The next 90-day window when your cycles align — best time for big decisions or moves.</div>
            </div>
            <div style={S.whatCard}>
              <div style={S.whatIcon}>④</div>
              <div style={S.whatTitle}>One action to take this week</div>
              <div style={S.whatBody}>Specific, numbered, based on your reading — not generic advice.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" style={S.bookingSection}>
        <div style={S.bookingInner}>
          <div style={S.bookingEyebrow}>Book your slot · {spotsLeft} left</div>
          <h2 style={S.sectionHeadline}>Pick a time that works.</h2>
          <p style={S.bookingSub}>
            30 minutes over Zoom. Bring both birthdates. SGD $27 charged at booking — founding member price.
          </p>
          {showBooking ? (
            <div style={S.calendlyEmbed}>
              <iframe
                src={CALENDLY_URL}
                width="100%"
                height="700"
                frameBorder="0"
                title="Book your reading"
              />
            </div>
          ) : (
            <button style={S.bookingCta} onClick={() => setShowBooking(true)}>
              Show available times →
            </button>
          )}
        </div>
      </section>

      <section style={S.faqSection}>
        <div style={S.faqInner}>
          <h2 style={S.sectionHeadline}>Common questions</h2>
          <div style={S.faqList}>
            <div style={S.faqItem}>
              <div style={S.faqQ}>Do I need to know numerology?</div>
              <div style={S.faqA}>No. Bring both birthdates. Everything is explained live.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>What if my partner doesn't want to join?</div>
              <div style={S.faqA}>They don't need to. Just bring their birthdate. Solo attendance is normal — most bookings are one person wanting clarity.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>What if the reading isn't useful?</div>
              <div style={S.faqA}>30-day money-back guarantee. If you finish the call and feel it wasn't worth SGD $27, reply to the receipt email and I'll refund you. No questions.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>Why founding member price?</div>
              <div style={S.faqA}>NUMRA launches in 2026 as an app. The first 10 readings help me refine the compatibility framework before it ships. You get the same reading at a fraction of the regular price.</div>
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

  bookingSection: { padding: '80px 24px', background: 'linear-gradient(180deg, #0D0D0F 0%, #181410 50%, #0D0D0F 100%)', borderTop: '0.5px solid rgba(201,169,110,0.1)' },
  bookingInner: { maxWidth: 800, margin: '0 auto', textAlign: 'center' },
  bookingEyebrow: { display: 'inline-block', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A96E', background: 'rgba(201,169,110,0.1)', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: 100, padding: '4px 14px', marginBottom: 20 },
  bookingSub: { fontSize: 15, color: '#7A7870', lineHeight: 1.6, marginBottom: 32, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' },
  bookingCta: { background: '#C9A96E', color: '#0D0D0F', border: 'none', borderRadius: 100, padding: '16px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif" },
  calendlyEmbed: { background: '#1A1A1E', borderRadius: 16, overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.06)' },

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
