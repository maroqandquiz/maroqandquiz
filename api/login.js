// POST /api/login {password} — parolni serverda tekshiradi va admin cookie beradi
import { sign, samePassword, sessionCookie, SESSION_MS } from './_lib.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }
  try {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || expected.length < 8) throw new Error('ADMIN_PASSWORD sozlanmagan (kamida 8 belgi)');
    const given = String((req.body && req.body.password) || '');
    if (!samePassword(given, expected)) {
      await wait(700); // qo'pol kuch bilan terishni sekinlashtirish
      return res.status(401).json({ ok: false });
    }
    const token = sign({ e: Date.now() + SESSION_MS });
    res.setHeader('Set-Cookie', sessionCookie(Math.floor(SESSION_MS / 1000), token));
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
