'use client'
import { useState } from 'react'

const STEPS = [
  { id: 'gender', question: "Let's start simple — what's your gender?", sub: 'We use this to personalise your numerology readings.', type: 'cards', options: ['Female', 'Male', 'Non-binary', 'Prefer not to say'] },
  { id: 'age', question: 'How old are you?', sub: 'Your birth year shapes your Personal Year cycle.', type: 'cards', options: ['Under 18', '18–24', '25–34', '35–44', '45+'] },
  { id: 'goal', question: 'What do you want NUMRA to help you with?', sub: "We'll prioritise what matters most to you.", type: 'cards', options: ['Understand myself better', 'Check compatibility with someone', 'Make better decisions', 'Business & money timing', 'All of the above'] },
  { id: 'decision', question: 'Are you currently facing a big decision?', sub: 'NUMRA is built for moments that actually matter.', type: 'cards', options: ['Yes — career or business', 'Yes — relationship', 'Yes — financial', 'Not right now, just exploring'] },
  { id: 'email', question: 'Last step — where should we send your early access?', sub: 'No spam. Unsubscribe anytime. Your data stays yours.', type: 'email' },
]

export default function SignupForm({ source = 'homepage' }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const current = STEPS[step]
  const progress = (step / STEPS.length) * 100

  const choose = (val) => {
    setAnswers(a => ({ ...a, [current.id]: val }))
    setTimeout(() => setStep(s => s + 1), 280)
  }

  const submit = async () => {
    if (!email.includes('@')) { setError('Please enter a valid email address.'); return }
    setSubmitting(true); setError('')
    try {
      const res = await fetch('https://formspree.io/f/xgojdavg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...answers, email, source }),
      })
      if (!res.ok) throw new Error()
      if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'Lead')
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
    <div style={S.formWrap}>
      <div style={S.progressTrack}><div style={{ ...S.progressFill, width: `${progress}%` }} /></div>
      <div style={S.stepCount}>{step + 1} of {STEPS.length}</div>
      <div style={S.question}>{current.question}</div>
      <div style={S.questionSub}>{current.sub}</div>

      {current.type === 'cards' && (
        <div style={S.optionsGrid}>
          {current.options.map(opt => (
            <button key={opt}
              style={{ ...S.optionBtn, ...(answers[current.id] === opt ? S.optionBtnActive : {}) }}
              onClick={() => choose(opt)}>{opt}</button>
          ))}
        </div>
      )}

      {current.type === 'email' && (
        <div style={S.emailWrap}>
          <input type="email" placeholder="your@email.com" value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            style={S.emailInput} autoFocus />
          {error && <div style={S.errorMsg}>{error}</div>}
          <button onClick={submit} disabled={submitting}
            style={{ ...S.submitBtn, ...(submitting ? S.submitBtnDisabled : {}) }}>
            {submitting ? 'Sending...' : 'Get early access →'}
          </button>
          <div style={S.privacyNote}>🔒 No spam. Unsubscribe anytime.</div>
        </div>
      )}

      {step > 0 && <button onClick={() => setStep(s => s - 1)} style={S.backBtn}>← Back</button>}
    </div>
  )
}

const S = {
  formWrap: { width: '100%', background: '#1A1A1E', borderRadius: 20, border: '0.5px solid rgba(255,255,255,0.08)', padding: 32 },
  progressTrack: { height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 6, overflow: 'hidden' },
  progressFill: { height: '100%', background: '#C9A96E', borderRadius: 2, transition: 'width 0.4s ease' },
  stepCount: { fontSize: 11, color: '#7A7870', fontWeight: 500, letterSpacing: '0.05em', marginBottom: 24, textAlign: 'right' },
  question: { fontFamily: "'DM Serif Display', serif", fontSize: 22, color: '#F5F3EE', lineHeight: 1.3, marginBottom: 8 },
  questionSub: { fontSize: 13, color: '#7A7870', marginBottom: 24, lineHeight: 1.5 },
  optionsGrid: { display: 'flex', flexDirection: 'column', gap: 10 },
  optionBtn: { background: '#26262C', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 18px', color: '#F5F3EE', fontSize: 15, textAlign: 'left', cursor: 'pointer', fontFamily: "'Inter', sans-serif", transition: 'background 0.15s, border-color 0.15s, color 0.15s' },
  optionBtnActive: { background: 'rgba(201,169,110,0.15)', borderColor: '#C9A96E', color: '#C9A96E' },
  emailWrap: { display: 'flex', flexDirection: 'column', gap: 12 },
  emailInput: { background: '#26262C', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '14px 18px', color: '#F5F3EE', fontSize: 16, outline: 'none', fontFamily: "'Inter', sans-serif", width: '100%' },
  errorMsg: { fontSize: 13, color: '#E05252' },
  submitBtn: { background: '#C9A96E', color: '#0D0D0F', borderRadius: 12, padding: '16px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Inter', sans-serif", border: 'none', transition: 'opacity 0.15s' },
  submitBtnDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  privacyNote: { fontSize: 12, color: '#7A7870', textAlign: 'center' },
  backBtn: { background: 'transparent', border: 'none', color: '#7A7870', fontSize: 13, cursor: 'pointer', marginTop: 16, padding: 0, fontFamily: "'Inter', sans-serif" },
  successBox: { textAlign: 'center', padding: '48px 32px', background: '#1A1A1E', borderRadius: 20, border: '0.5px solid rgba(201,169,110,0.3)' },
  successIcon: { fontSize: 32, color: '#C9A96E', marginBottom: 16 },
  successTitle: { fontFamily: "'DM Serif Display', serif", fontSize: 28, color: '#F5F3EE', marginBottom: 12 },
  successSub: { fontSize: 15, color: '#7A7870', lineHeight: 1.6 },
}
