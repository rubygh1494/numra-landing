import { NextResponse } from 'next/server'
import { saveSubmission } from '../../../lib/storage'

export async function POST(request) {
  try {
    const body = await request.json()
    const { gender, age, goal, decision, email } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const record = await saveSubmission({
      gender: gender || '',
      age: age || '',
      goal: goal || '',
      decision: decision || '',
      email: email.toLowerCase().trim(),
      source: request.headers.get('referer') || 'direct',
    })

    return NextResponse.json({ success: true, id: record.id })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
