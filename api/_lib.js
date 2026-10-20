// Umumiy yordamchilar: Postgres (Neon) ulanishi va admin seansi (imzolangan cookie).
import crypto from 'node:crypto';
import { neon } from '@neondatabase/serverless';

export const SESSION_MS = 12 * 60 * 60 * 1000; // 12 soat
export const COOKIE = 'mq_session';

let _sql = null;
let _ready = false;

export function sql() {
  if (!_sql) {
    const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!url) throw new Error('DATABASE_URL sozlanmagan (Vercel → Storage → Neon ni loyihaga ulang)');
    _sql = neon(url);
  }
  return _sql;
}

export async function ensureTable() {
  if (_ready) return;
  const q = sql();
  await q`create table if not exists app_state (
    id integer primary key,
    version bigint not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  _ready = true;
}

function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) throw new Error('SESSION_SECRET sozlanmagan (kamida 16 belgi)');
  return s;
}

export function sign(payload) {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const mac = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
  return body + '.' + mac;
}

export function verify(token) {
  try {
    const [body, mac] = String(token).split('.');
    const expect = crypto.createHmac('sha256', secret()).update(body).digest('base64url');
    const a = Buffer.from(mac || '');
    const b = Buffer.from(expect);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    const p = JSON.parse(Buffer.from(body, 'base64url').toString());
    return p && p.e > Date.now() ? p : null;
  } catch {
    return null;
  }
}

export function isAdmin(req) {
  const parts = String(req.headers?.cookie || '').split(';').map((s) => s.trim());
  const t = parts.find((x) => x.startsWith(COOKIE + '='));
  return !!(t && verify(t.slice(COOKIE.length + 1)));
}

export function sessionCookie(maxAgeSec, value) {
  return `${COOKIE}=${value}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${maxAgeSec}`;
}

export function samePassword(input, expected) {
  const h = (x) => crypto.createHash('sha256').update(String(x)).digest();
  return crypto.timingSafeEqual(h(input), h(expected));
}
