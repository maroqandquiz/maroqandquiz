// GET  /api/state  — ma'lumotlarni o'qish (hamma uchun ochiq)
// PUT  /api/state  — ma'lumotlarni yozish (faqat admin; versiya bo'yicha to'qnashuv tekshiriladi)
import { sql, ensureTable, isAdmin } from './_lib.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  try {
    await ensureTable();
    const q = sql();

    if (req.method === 'GET') {
      const r = await q`select version, data from app_state where id = 1`;
      if (!r.length) return res.status(200).json({ server: true, version: 0, data: null });
      return res.status(200).json({ server: true, version: Number(r[0].version), data: r[0].data });
    }

    if (req.method === 'PUT') {
      if (!isAdmin(req)) return res.status(401).json({ server: true, error: 'unauthorized' });
      const body = req.body || {};
      const data = body.data;
      const base = Number(body.base) || 0;
      if (!data || typeof data !== 'object' || !Array.isArray(data.rounds)) {
        return res.status(400).json({ server: true, error: 'noto\u2018g\u2018ri ma\u2019lumot' });
      }
      const json = JSON.stringify(data);
      if (json.length > 3_500_000) return res.status(413).json({ server: true, error: 'juda katta' });

      let r;
      if (base === 0) {
        r = await q`insert into app_state (id, version, data) values (1, 1, ${json}::jsonb)
                    on conflict (id) do nothing returning version`;
      } else {
        r = await q`update app_state set data = ${json}::jsonb, version = version + 1, updated_at = now()
                    where id = 1 and version = ${base} returning version`;
      }
      if (!r.length) return res.status(409).json({ server: true, error: 'conflict' });
      return res.status(200).json({ server: true, version: Number(r[0].version) });
    }

    res.setHeader('Allow', 'GET, PUT');
    return res.status(405).json({ server: true, error: 'method not allowed' });
  } catch (e) {
    return res.status(500).json({ server: true, error: String((e && e.message) || e) });
  }
}
