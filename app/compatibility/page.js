'use client'
import SignupForm from '../components/SignupForm'

export default function CompatibilityPage() {
  const scrollToForm = () => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <nav style={S.nav}>
        <div style={S.navInner}>
          <a href="/" style={S.navLogo}>NUMRA</a>
          <button style={S.navCta} onClick={scrollToForm}>Get free reading</button>
        </div>
      </nav>

      <section style={S.hero}>
        <div style={S.heroInner}>
          <div style={S.heroText}>
            <div style={S.heroEyebrow}>Free Compatibility Reading · 60 Seconds</div>
            <h1 style={S.heroHeadline}>Are you actually compatible — or just comfortable?</h1>
            <p style={S.heroSub}>
              Enter both birthdates. NUMRA scores your compatibility, tells you where your friction actually lives, and shows your peak window together. Free, no signup.
            </p>
            <button style={S.heroCta} onClick={scrollToForm}>Check our compatibility →</button>
            <div style={S.heroProof}>Free. No signup. Instant result.</div>
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

      <section id="signup" style={S.signupSection}>
        <div style={S.signupInner}>
          <div style={S.signupHeadlineWrap}>
            <div style={S.signupEyebrow}>Free · 60 seconds</div>
            <h2 style={S.signupHeadline}>Check your compatibility.</h2>
            <p style={S.signupSub}>Get your compatibility score, friction map, and peak window.</p>
          </div>
          <SignupForm source="ad_compatibility" />
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
  navCta: { background: 'transparent', border: '0.5px solid #C9A96E', color: '#C9A96E', borderRadius: 100, padding: '8px 20px', fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif", cursor: 'pointer' },
  hero: { minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '120px 24px 60px', position: 'relative' },
  heroInner: { maxWidth: 1100, margin: '0 auto', width: '100%', display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap' },
  heroText: { flex: '1 1 380px', minWidth: 0 },
  heroPhone: { flex: '0 0 260px', display: 'flex', justifyContent: 'center' },
  heroEyebrow: { display: 'inline-block', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A96E', background: 'rgba(201,169,110,0.1)', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: 100, padding: '4px 12px', marginBottom: 24 },
  heroHeadline: { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(36px, 6vw, 60px)', lineHeight: 1.15, color: '#F5F3EE', marginBottom: 24, letterSpacing: '-0.02em' },
  heroSub: { fontSize: 17, color: '#7A7870', lineHeight: 1.7, maxWidth: 480, marginBottom: 36 },
  heroCta: { background: '#C9A96E', color: '#0D0D0F', border: 'none', borderRadius: 100, padding: '16px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', marginBottom: 20, fontFamily: "'Inter', sans-serif" },
  heroProof: { fontSize: 13, color: '#7A7870' },
  phoneWrap: { display: 'inline-block', filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.6))', transform: 'rotate(-3deg)' },
  phoneFrame: { width: 220, background: '#1A1A1E', borderRadius: 36, border: '1.5px solid rgba(255,255,255,0.12)', overflow: 'hidden', paddingTop: 14 },
  phoneDynamic: { width: 72, height: 8, background: '#0D0D0F', borderRadius: 10, margin: '0 auto 8px' },
  phoneScreen: { width: '100%', display: 'block', borderRadius: '0 0 34px 34px' },
  signupSection: { padding: '80px 24px', background: 'linear-gradient(180deg, #0D0D0F 0%, #181410 50%, #0D0D0F 100%)', borderTop: '0.5px solid rgba(201,169,110,0.1)' },
  signupInner: { maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 },
  signupHeadlineWrap: { textAlign: 'center' },
  signupEyebrow: { display: 'inline-block', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A96E', background: 'rgba(201,169,110,0.1)', border: '0.5px solid rgba(201,169,110,0.3)', borderRadius: 100, padding: '4px 14px', marginBottom: 20 },
  signupHeadline: { fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', color: '#F5F3EE', lineHeight: 1.15, marginBottom: 16 },
  signupSub: { fontSize: 15, color: '#7A7870' },
  footer: { padding: '48px 24px', borderTop: '0.5px solid rgba(255,255,255,0.06)' },
  footerInner: { maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  footerLogo: { fontFamily: "'DM Serif Display', serif", fontSize: 24, color: '#C9A96E', letterSpacing: '0.05em', marginBottom: 4 },
  footerTag: { fontSize: 13, color: '#7A7870', fontStyle: 'italic' },
  footerCopy: { fontSize: 11, color: '#26262C', marginTop: 8 },
}
