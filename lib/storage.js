const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appRk06DZaAlkOrPn'
const AIRTABLE_TABLE_ID = 'tblc88VHK3QM0bfB9'
const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`
const headers = () => ({ 'Authorization': `Bearer ${AIRTABLE_TOKEN}`, 'Content-Type': 'application/json' })

export async function saveSubmission(submission) {
  const record = { id: `sub_${Date.now()}`, timestamp: new Date().toISOString(), ...submission }
  const res = await fetch(AIRTABLE_URL, { method: 'POST', headers: headers(), body: JSON.stringify({ records: [{ fields: { email: record.email || '', gender: record.gender || '', age: record.age || '', goal: record.goal || '', decision: record.decision || '', timestamp: record.timestamp, source: record.source || 'direct' } }] }) })
  if (!res.ok) throw new Error(`Airtable error: ${await res.text()}`)
  const data = await res.json()
  return { ...record, airtable_id: data.records?.[0]?.id }
}

export async function getAllSubmissions() {
  const res = await fetch(`${AIRTABLE_URL}?sort[0][field]=timestamp&sort[0][direction]=desc`, { headers: headers() })
  if (!res.ok) return []
  const data = await res.json()
  return (data.records || []).map(r => ({ id: r.id, ...r.fields }))
}