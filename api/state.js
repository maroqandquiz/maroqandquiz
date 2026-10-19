
import { createHmac, timingSafeEqual } from 'node:crypto';
import { neon } from '@neondatabase/serverless';

const COOKIE = 'mq_admin';

function isAdmin(req) {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) return false;

  const cookies = (req.headers.cookie || '').split(';');
  const item = cookies.find(c => c.trim().startsWith(COOKIE + '='));
  if (!item) return false;

  let token;
  try {
    token = decodeURIComponent(
      item.trim().slice(COOKIE.length + 1)
    );
  } catch {
    return false;
  }

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [expires, signature] = parts;
  if (!/^\d+$/.test(expires) || Number(expires) < Date.now()) {
    return false;
  }

  const expected = createHmac('sha256', secret)
    .update(expires)
    .digest('hex');

  const a = Buffer.from(signature);
  const b = Buffer.from(expected);

  return a.length === b.length && timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ error: 'DATABASE_URL sozlanmagan' });
  }

  if (req.method !== 'GET' && req.method !== 'PUT') {
    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);

    await sql`
      CREATE TABLE IF NOT EXISTS app_state (
        id INTEGER PRIMARY KEY,
        state JSONB NOT NULL,
        media JSONB NOT NULL DEFAULT '{}'::jsonb,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `;

    await sql`
      ALTER TABLE app_state
      ADD COLUMN IF NOT EXISTS media JSONB NOT NULL DEFAULT '{}'::jsonb
    `;

    if (req.method === 'GET') {
      const rows = await sql`
        SELECT state, media, updated_at
        FROM app_state
        WHERE id = 1
      `;

      return res.status(200).json(
        rows[0] || { state: null, media: {}, updated_at: null }
      );
    }

    if (!isAdmin(req)) {
      return res.status(401).json({ error: 'Admin sifatida kiring' });
    }

    const { state, media = {} } = req.body || {};

    if (
      !state ||
      typeof state !== 'object' ||
      Array.isArray(state) ||
      !media ||
      typeof media !== 'object' ||
      Array.isArray(media)
    ) {
      return res.status(400).json({ error: 'state yoki media noto‘g‘ri' });
    }

    await sql`
      INSERT INTO app_state (id, state, media, updated_at)
      VALUES (1, ${JSON.stringify(state)}::jsonb,
                 ${JSON.stringify(media)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET
        state = EXCLUDED.state,
        media = EXCLUDED.media,
        updated_at = NOW()
    `;

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('State API xatosi:', error.message);
    return res.status(500).json({ error: 'Bazaga murojaatda xatolik' });
  }
}

