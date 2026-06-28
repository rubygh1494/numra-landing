import { NextResponse } from 'next/server'
import { getAllSubmissions } from '../../../lib/storage'

const PASSWORD = process.env.DASHBOARD_PASSWORD || 'NUMRA2026'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  if (searchParams.get('pw') !== PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const submissions = getAllSubmissions()
  return NextResponse.json(submissions)
}
