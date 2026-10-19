// MaroqAndQuiz — production "build" (statik sayt): public/index.html ni tekshiradi.
// Xato topilsa, 1 kodi bilan tugaydi (Vercel deploy to'xtaydi).
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const file = path.join(root, 'public', 'index.html');
const errors = [];
const fail = (m) => errors.push(m);

if (!fs.existsSync(file)) { console.error('public/index.html topilmadi'); process.exit(1); }
const html = fs.readFileSync(file, 'utf8');
const m = html.match(/<script>([\s\S]*)<\/script>/);
if (!m) fail('Asosiy <script> topilmadi');
else {
  try { new vm.Script(m[1], { filename: 'index.html' }); }
  catch (e) { fail('JavaScript sintaksis xatosi: ' + e.message); }
}
for (const need of ['<html lang="uz">', 'viewport-fit=cover', '<title>MaroqAndQuiz</title>', 'id="app"'])
  if (!html.includes(need)) fail('Majburiy qism yo\u2018q: ' + need);
const secrets = /(api[_-]?key|secret|token|password)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/i;
if (secrets.test(html)) fail('Kod ichida maxfiy kalitga o\u2018xshash qator topildi');
const kb = Math.round(Buffer.byteLength(html) / 1024);
if (kb > 2048) fail(`index.html juda katta: ${kb} KB`);

if (errors.length) { console.error('BUILD XATO:\n - ' + errors.join('\n - ')); process.exit(1); }
console.log(`Build muvaffaqiyatli: public/index.html (${kb} KB), skript sintaksisi to\u2018g\u2018ri.`);
