
import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed'
    });
  }

  if (!process.env.DATABASE_URL) {
    return res.status(500).json({
      ok: false,
      error: 'DATABASE_URL sozlanmagan'
    });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT 1 AS ok`;

    return res.status(200).json({
      ok: true,
      database: rows[0]?.ok === 1
    });
  } catch (error) {
    console.error('Neon database health check failed');

    return res.status(500).json({
      ok: false,
      error: 'Bazaga ulanishda xatolik'
    });
  }
}
