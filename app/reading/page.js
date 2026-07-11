'use client'
import { useState } from 'react'

const STRIPE_LINK = 'https://buy.stripe.com/cNiaEQbXC6dyfDd10Rgbm00'
const SPOTS_TAKEN = 0
const SPOTS_TOTAL = 10

export default function ReadingPage() {
  const spotsLeft = SPOTS_TOTAL - SPOTS_TAKEN

  const goToStripe = () => {
    if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'InitiateCheckout')
    window.location.href = STRIPE_LINK
  }

  return (
    <>
      <nav style={S.nav}>
        <div style={S.navInner}>
          <a href="/" style={S.navLogo}>NUMRA</a>
          <button style={S.navCta} onClick={goToStripe}>Book my reading</button>
        </div>
      </nav>

      <section style={S.hero}>
        <div style={S.heroInner}>
          <div style={S.heroText}>
            <div style={S.heroEyebrow}>Founding Member Price · {spotsLeft} spots left</div>
            <h1 style={S.heroHeadline}>Get your compatibility read — before NUMRA launches.</h1>
            <p style={S.heroSub}>
              A 30-minute compatibility reading with the founder, live over Zoom. Your numbers, your partner's numbers, where the friction lives, and your peak window together. Actionable, specific, no fluff.
            </p>
            <div style={S.priceBox}>
              <div style={S.priceOld}>Regular price SGD $67</div>
              <div style={S.priceNew}>SGD $27</div>
              <div style={S.priceNote}>Founding member price · First {SPOTS_TOTAL} bookings only</div>
            </div>
            <button style={S.heroCta} onClick={goToStripe}>
              Secure my spot — SGD $27 →
            </button>
            <div style={S.heroProof}>Pay securely via Stripe. Pick your time next.</div>
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
              <div style={S.whatBody}>The next 90-day window when your cycles align — best time for big decisions, conversations, or moves.</div>
            </div>
            <div style={S.whatCard}>
              <div style={S.whatIcon}>④</div>
              <div style={S.whatTitle}>One action to take this week</div>
              <div style={S.whatBody}>Specific, numbered, based on your reading — not generic advice.</div>
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
              <div style={S.howText}>
                <div style={S.howTitle}>Secure your spot</div>
                <div style={S.howBody}>SGD $27 via Stripe. Takes 30 seconds.</div>
              </div>
            </div>
            <div style={S.howStep}>
              <div style={S.howNum}>2</div>
              <div style={S.howText}>
                <div style={S.howTitle}>Pick your time</div>
                <div style={S.howBody}>Calendly opens after payment. Evenings and weekends available.</div>
              </div>
            </div>
            <div style={S.howStep}>
              <div style={S.howNum}>3</div>
              <div style={S.howText}>
                <div style={S.howTitle}>Bring both birthdates</div>
                <div style={S.howBody}>Yours and your partner's. That's all you need.</div>
              </div>
            </div>
            <div style={S.howStep}>
              <div style={S.howNum}>4</div>
              <div style={S.howText}>
                <div style={S.howTitle}>Get your reading</div>
                <div style={S.howBody}>30 minutes over Zoom. Recorded, so you can rewatch.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={S.faqSection}>
        <div style={S.faqInner}>
          <h2 style={S.sectionHeadline}>Common questions</h2>
          <div style={S.faqList}>
            <div style={S.faqItem}>
              <div style={S.faqQ}>Do I need to know numerology?</div>
              <div style={S.faqA}>No. Bring both birthdates. Everything is explained live in plain language.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>What if my partner doesn't want to join?</div>
              <div style={S.faqA}>They don't need to. Just bring their birthdate. Solo attendance is normal — most bookings are one person wanting clarity.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>What if the reading isn't useful?</div>
              <div style={S.faqA}>Full refund within 24 hours of your call, no questions asked. Just reply to the confirmation email.</div>
            </div>
            <div style={S.faqItem}>
              <div style={S.faqQ}>Why SGD $27?</div>
              <div style={S.faqA}>Founding member price for the first 10 bookings. Full price is SGD $67 after that. The trade: you get in early, I get real feedback while I build the app.</div>
            </div>
          </div>
        </div>
      </section>

      <section style={S.finalCta}>
        <div style={S.finalCtaInner}>
          <div style={S.finalEyebrow}>{spotsLeft} spots left at SGD $27</div>
          <h2 style={S.finalHeadline}>Ready?</h2>
          <button style={S.heroCta} onClick={goToStripe}>
            Secure my spot — SGD $27 →
          </button>
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

  sectionHeadline: { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(28px, 4vw, 40px)', color: '#F5F3EE', lineHeight: 1.2, marginBottom: 40, textAlign: 'center' },

  whatSection: { padding: '80px 24px', background: '#1A1A1E', borderTop: '0.5px solid rgba(255,255,255,0.04)' },
  whatInner: { maxWidth: 1000, margin: '0 auto' },
  whatGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 },
  whatCard: { background: '#0D0D0F', borderRadius: 16, border: '0.5px solid rgba(255,255,255,0.06)', padding: 28 },
  whatIcon: { fontFamily: "'DM Serif Display', serif", fontSize: 32, color: '#C9A96E', marginBottom: 12 },
  whatTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#F5F3EE', marginBottom: 10, lineHeight: 1.3 },
  whatBody: { fontSize: 14, color: '#7A7870', lineHeight: 1.6 },

  howSection: { padding: '80px 24px' },
  howInner: { maxWidth: 700, margin: '0 auto' },
  howSteps: { display: 'flex', flexDirection: 'column', gap: 24 },
  howStep: { display: 'flex', gap: 24, alignItems: 'flex-start' },
  howNum: { fontFamily: "'DM Serif Display', serif", fontSize: 32, color: '#C9A96E', lineHeight: 1, flex: '0 0 40px' },
  howText: { flex: 1 },
  howTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#F5F3EE', marginBottom: 6 },
  howBody: { fontSize: 14, color: '#7A7870', lineHeight: 1.6 },

  faqSection: { padding: '80px 24px', background: '#1A1A1E' },
  faqInner: { maxWidth: 700, margin: '0 auto' },
  faqList: { display: 'flex', flexDirection: 'column', gap: 20 },
  faqItem: { background: '#0D0D0F', borderRadius: 12, border: '0.5px solid rgba(255,255,255,0.06)', padding: 24 },
  faqQ: { fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#F5F3EE', marginBottom: 8 },
  faqA: { fontSize: 14, color: '#7A7870', lineHeight: 1.6 },

  finalCta: { padding: '100px 24px', background: 'linear-gradient(180deg, #0D0D0F 0%, #181410 50%, #0D0D0F 100%)', borderTop: '0.5px solid rgba(201,169,110,0.1)', textAlign: 'center' },
  finalCtaInner: { maxWidth: 600, margin: '0 auto' },
  finalEyebrow: { display: 'inline-block', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A96E', background: 'rgba(201,169,110,0.1)', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: 100, padding: '4px 14px', marginBottom: 20 },
  finalHeadline: { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(40px, 6vw, 60px)', color: '#F5F3EE', lineHeight: 1.15, marginBottom: 32 },

  footer: { padding: '48px 24px', borderTop: '0.5px solid rgba(255,255,255,0.06)' },
  footerInner: { maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  footerLogo: { fontFamily: "'DM Serif Display', serif", fontSize: 24, color: '#C9A96E', letterSpacing: '0.05em', marginBottom: 4 },
  footerTag: { fontSize: 13, color: '#7A7870', fontStyle: 'italic' },
  footerCopy: { fontSize: 11, color: '#26262C', marginTop: 8 },
}
