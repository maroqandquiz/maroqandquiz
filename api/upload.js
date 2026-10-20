// POST /api/upload — Vercel Blob'ga to'g'ridan-to'g'ri yuklash uchun token beradi (faqat admin)
import { handleUpload } from '@vercel/blob/client';
import { isAdmin } from './_lib.js';

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method not allowed' });
  }
  try {
    const body = req.body || {};
    // Token berish so'rovi admin cookie'si bilan keladi; yuklash tugagani haqidagi chaqiruvni Vercel Blob o'zi yuboradi.
    if (body.type === 'blob.generate-client-token' && !isAdmin(req)) {
      return res.status(401).json({ error: 'unauthorized' });
    }
    const json = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ['image/*', 'audio/*', 'video/*'],
        maximumSizeInBytes: 250 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {},
    });
    return res.status(200).json(json);
  } catch (e) {
    return res.status(400).json({ error: String((e && e.message) || e) });
  }
}
