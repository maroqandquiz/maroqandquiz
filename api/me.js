// GET /api/me — joriy foydalanuvchi admin ekanini bildiradi
import { isAdmin } from './_lib.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({ admin: isAdmin(req) });
}
