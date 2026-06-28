// lib/storage.js
// LOCAL: stores submissions in ./data/submissions.json
// VERCEL: swap this module for Vercel KV — see migration comment below

import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'submissions.json')

function readAll() {
  try {
    if (!fs.existsSync(DATA_FILE)) return []
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'))
  } catch { return [] }
}

function writeAll(data) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true })
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

export function saveSubmission(submission) {
  const all = readAll()
  const record = {
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,
    timestamp: new Date().toISOString(),
    ...submission,
  }
  all.push(record)
  writeAll(all)
  return record
}

export function getAllSubmissions() {
  return readAll()
}

/*
─── VERCEL MIGRATION ────────────────────────────────────────────
To deploy persistently on Vercel:
1. Add Vercel KV to your project (vercel.com/dashboard → Storage)
2. npm install @vercel/kv
3. Replace this file with:

import { kv } from '@vercel/kv'

export async function saveSubmission(submission) {
  const record = { id: `sub_${Date.now()}`, timestamp: new Date().toISOString(), ...submission }
  await kv.lpush('numra:submissions', JSON.stringify(record))
  return record
}

export async function getAllSubmissions() {
  const raw = await kv.lrange('numra:submissions', 0, -1)
  return raw.map(r => JSON.parse(r))
}
─────────────────────────────────────────────────────────────────
*/
