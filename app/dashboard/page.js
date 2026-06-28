'use client'
import { useState, useEffect } from 'react'

const PASSWORD = 'NUMRA2026'

function StatCard({ label, value, sub }) {
  return (
    <div style={D.statCard}>
      <div style={D.statValue}>{value}</div>
      <div style={D.statLabel}>{label}</div>
      {sub && <div style={D.statSub}>{sub}</div>}
    </div>
  )
}

function BarChart({ data, title }) {
  const max = Math.max(...data.map(d => d.count), 1)
  return (
    <div style={D.chartWrap}>
      <div style={D.chartTitle}>{title}</div>
      <div style={D.chartBars}>
        {data.map((d, i) => (
          <div key={i} style={D.barRow}>
            <div style={D.barLabel}>{d.label}</div>
            <div style={D.barTrack}>
              <div style={{ ...D.barFill, width: `${(d.count / max) * 100}%` }} />
            </div>
            <div style={D.barCount}>{d.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function exportCSV(submissions) {
  if (!submissions.length) return
  const headers = Object.keys(submissions[0])
  const rows = submissions.map(s => headers.map(h => `"${(s[h] || '').toString().replace(/"/g, '""')}"`).join(','))
  const csv = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url
  a.download = `numra-submissions-${new Date().toISOString().slice(0,10)}.csv`
  a.click(); URL.revokeObjectURL(url)
}

function count(items, key) {
  return items.reduce((acc, item) => {
    const v = item[key] || 'Unknown'
    acc[v] = (acc[v] || 0) + 1
    return acc
  }, {})
}

function toBarData(obj) {
  return Object.entries(obj).map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
}

export default function Dashboard() {
  const [pw, setPw] = useState('')
  const [authed, setAuthed] = useState(false)
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState('timestamp')
  const [sortDir, setSortDir] = useState('desc')

  const login = async () => {
    if (!pw.trim()) return
    setLoading(true); setError('')
    try {
      const res = await fetch(`/api/submissions?pw=${encodeURIComponent(pw)}`)
      if (res.status === 401) { setError('Incorrect password.'); return }
      const data = await res.json()
      setSubmissions(data)
      setAuthed(true)
    } catch {
      setError('Could not connect. Try again.')
    } finally { setLoading(false) }
  }

  const refresh = async () => {
    const res = await fetch(`/api/submissions?pw=${encodeURIComponent(pw)}`)
    if (res.ok) setSubmissions(await res.json())
  }

  // Auto-refresh every 30s
  useEffect(() => {
    if (!authed) return
    const t = setInterval(refresh, 30000)
    return () => clearInterval(t)
  }, [authed, pw])

  const sorted = [...submissions]
    .filter(s => !search || JSON.stringify(s).toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const va = a[sortField] || '', vb = b[sortField] || ''
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
    })

  if (!authed) return (
    <div style={D.loginPage}>
      <div style={D.loginBox}>
        <div style={D.loginLogo}>NUMRA</div>
        <div style={D.loginTitle}>Dashboard</div>
        <div style={D.loginSub}>Enter your dashboard password to continue.</div>
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={D.loginInput}
          autoFocus
        />
        {error && <div style={D.loginError}>{error}</div>}
        <button onClick={login} disabled={loading} style={D.loginBtn}>
          {loading ? 'Checking...' : 'Enter dashboard →'}
        </button>
        <div style={D.loginHint}>Default password: NUMRA2026</div>
        <div style={D.loginHint}>Set DASHBOARD_PASSWORD env var to change.</div>
      </div>
    </div>
  )

  const total = submissions.length
  const today = submissions.filter(s => s.timestamp?.startsWith(new Date().toISOString().slice(0,10))).length
  const thisWeek = submissions.filter(s => {
    const d = new Date(s.timestamp); const now = new Date()
    return (now - d) < 7 * 86400000
  }).length

  return (
    <div style={D.page}>
      {/* Header */}
      <div style={D.header}>
        <div style={D.headerInner}>
          <div>
            <div style={D.headerLogo}>NUMRA</div>
            <div style={D.headerSub}>Signup Dashboard</div>
          </div>
          <div style={D.headerActions}>
            <button onClick={refresh} style={D.refreshBtn}>↻ Refresh</button>
            <button onClick={() => exportCSV(submissions)} style={D.exportBtn}>↓ Export CSV</button>
          </div>
        </div>
      </div>

      <div style={D.body}>

        {/* Stats row */}
        <div style={D.statsRow}>
          <StatCard label="Total signups" value={total.toLocaleString()} />
          <StatCard label="Today" value={today.toLocaleString()} />
          <StatCard label="This week" value={thisWeek.toLocaleString()} />
          <StatCard label="Completion rate" value={total > 0 ? `${Math.round((total/Math.max(total,1))*100)}%` : '—'} sub="All steps completed" />
        </div>

        {/* Charts */}
        {total > 0 && (
          <div style={D.chartsGrid}>
            <BarChart title="Gender" data={toBarData(count(submissions, 'gender'))} />
            <BarChart title="Age range" data={toBarData(count(submissions, 'age'))} />
            <BarChart title="Primary goal" data={toBarData(count(submissions, 'goal'))} />
            <BarChart title="Current decision" data={toBarData(count(submissions, 'decision'))} />
          </div>
        )}

        {/* Table */}
        <div style={D.tableSection}>
          <div style={D.tableTitleRow}>
            <div style={D.tableTitle}>All submissions</div>
            <input
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={D.searchInput}
            />
          </div>

          {total === 0 ? (
            <div style={D.emptyState}>
              No submissions yet. Share your landing page to start collecting signups.
            </div>
          ) : (
            <div style={D.tableWrap}>
              <table style={D.table}>
                <thead>
                  <tr>
                    {['timestamp','email','gender','age','goal','decision'].map(col => (
                      <th key={col} style={D.th}
                        onClick={() => { setSortField(col); setSortDir(d => d === 'asc' ? 'desc' : 'asc') }}>
                        {col} {sortField === col ? (sortDir === 'asc' ? '↑' : '↓') : ''}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((s, i) => (
                    <tr key={s.id} style={i % 2 === 0 ? D.trEven : D.trOdd}>
                      <td style={D.td}>{new Date(s.timestamp).toLocaleString()}</td>
                      <td style={D.td}>{s.email}</td>
                      <td style={D.td}>{s.gender}</td>
                      <td style={D.td}>{s.age}</td>
                      <td style={D.td}>{s.goal}</td>
                      <td style={D.td}>{s.decision}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const D = {
  // LOGIN
  loginPage: {
    minHeight: '100vh', background: '#0D0D0F',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 24, fontFamily: "'Inter', sans-serif",
  },
  loginBox: {
    width: '100%', maxWidth: 380,
    background: '#1A1A1E', borderRadius: 20,
    border: '0.5px solid rgba(255,255,255,0.08)',
    padding: 40, textAlign: 'center',
  },
  loginLogo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 28, color: '#C9A96E', marginBottom: 6,
  },
  loginTitle: { fontSize: 18, color: '#F5F3EE', fontWeight: 500, marginBottom: 8 },
  loginSub: { fontSize: 13, color: '#7A7870', marginBottom: 28, lineHeight: 1.5 },
  loginInput: {
    width: '100%', background: '#26262C',
    border: '0.5px solid rgba(255,255,255,0.12)',
    borderRadius: 10, padding: '12px 16px',
    color: '#F5F3EE', fontSize: 15, outline: 'none',
    fontFamily: "'Inter', sans-serif", marginBottom: 10,
  },
  loginError: { fontSize: 13, color: '#E05252', marginBottom: 10 },
  loginBtn: {
    width: '100%', background: '#C9A96E', color: '#0D0D0F',
    border: 'none', borderRadius: 10, padding: '13px',
    fontSize: 14, fontWeight: 600, cursor: 'pointer',
    fontFamily: "'Inter', sans-serif", marginBottom: 16,
  },
  loginHint: { fontSize: 11, color: '#26262C', marginTop: 4 },

  // DASHBOARD
  page: { minHeight: '100vh', background: '#0D0D0F', fontFamily: "'Inter', sans-serif" },
  header: {
    background: '#1A1A1E', borderBottom: '0.5px solid rgba(255,255,255,0.08)',
    padding: '0 24px', position: 'sticky', top: 0, zIndex: 10,
  },
  headerInner: {
    maxWidth: 1200, margin: '0 auto', height: 60,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  headerLogo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 18, color: '#C9A96E',
  },
  headerSub: { fontSize: 11, color: '#7A7870', marginTop: 1 },
  headerActions: { display: 'flex', gap: 10 },
  refreshBtn: {
    background: 'transparent', border: '0.5px solid rgba(255,255,255,0.12)',
    color: '#7A7870', borderRadius: 8, padding: '7px 14px',
    fontSize: 12, cursor: 'pointer', fontFamily: "'Inter', sans-serif",
  },
  exportBtn: {
    background: 'transparent', border: '0.5px solid #C9A96E',
    color: '#C9A96E', borderRadius: 8, padding: '7px 14px',
    fontSize: 12, cursor: 'pointer', fontFamily: "'Inter', sans-serif",
  },
  body: { maxWidth: 1200, margin: '0 auto', padding: '28px 24px' },

  // STATS
  statsRow: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: 12, marginBottom: 28,
  },
  statCard: {
    background: '#1A1A1E', borderRadius: 12,
    border: '0.5px solid rgba(255,255,255,0.06)', padding: '20px 20px',
  },
  statValue: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 30, color: '#C9A96E', fontWeight: 500, marginBottom: 4,
  },
  statLabel: { fontSize: 12, color: '#7A7870', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' },
  statSub: { fontSize: 11, color: '#26262C', marginTop: 2 },

  // CHARTS
  chartsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 12, marginBottom: 28,
  },
  chartWrap: {
    background: '#1A1A1E', borderRadius: 12,
    border: '0.5px solid rgba(255,255,255,0.06)', padding: 20,
  },
  chartTitle: {
    fontSize: 11, color: '#7A7870', fontWeight: 500,
    textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16,
  },
  chartBars: { display: 'flex', flexDirection: 'column', gap: 10 },
  barRow: { display: 'flex', alignItems: 'center', gap: 10 },
  barLabel: { fontSize: 12, color: '#F5F3EE', width: 140, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  barTrack: { flex: 1, height: 6, background: '#26262C', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: '100%', background: '#C9A96E', borderRadius: 3, transition: 'width 0.5s ease' },
  barCount: { fontSize: 12, color: '#7A7870', width: 28, textAlign: 'right', fontFamily: "'DM Mono', monospace" },

  // TABLE
  tableSection: {
    background: '#1A1A1E', borderRadius: 12,
    border: '0.5px solid rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  tableTitleRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 20px', borderBottom: '0.5px solid rgba(255,255,255,0.06)',
    flexWrap: 'wrap', gap: 10,
  },
  tableTitle: { fontSize: 13, color: '#F5F3EE', fontWeight: 500 },
  searchInput: {
    background: '#26262C', border: '0.5px solid rgba(255,255,255,0.08)',
    borderRadius: 8, padding: '7px 12px',
    color: '#F5F3EE', fontSize: 13, outline: 'none',
    fontFamily: "'Inter', sans-serif", width: 200,
  },
  tableWrap: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 12 },
  th: {
    padding: '10px 16px', textAlign: 'left',
    color: '#7A7870', fontWeight: 500, fontSize: 11,
    textTransform: 'uppercase', letterSpacing: '0.05em',
    borderBottom: '0.5px solid rgba(255,255,255,0.06)',
    cursor: 'pointer', whiteSpace: 'nowrap',
    background: '#1A1A1E',
    userSelect: 'none',
  },
  td: {
    padding: '10px 16px', color: '#F5F3EE',
    borderBottom: '0.5px solid rgba(255,255,255,0.04)',
    maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  },
  trEven: { background: 'transparent' },
  trOdd:  { background: 'rgba(255,255,255,0.015)' },
  emptyState: {
    padding: '48px 24px', textAlign: 'center',
    color: '#7A7870', fontSize: 14, lineHeight: 1.6,
  },
}
