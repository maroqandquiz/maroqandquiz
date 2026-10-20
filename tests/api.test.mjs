// /api funksiyalarini soxta Neon va Blob paketlari bilan sinaydi (internet va haqiqiy baza kerak emas).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'maroq-api-'));
fs.mkdirSync(path.join(tmp, 'api'));
for (const f of fs.readdirSync(path.join(here, '..', 'api'))) fs.copyFileSync(path.join(here, '..', 'api', f), path.join(tmp, 'api', f));
fs.writeFileSync(path.join(tmp, 'package.json'), '{"type":"module"}');
const mod = (name, files) => {
  const d = path.join(tmp, 'node_modules', ...name.split('/'));
  fs.mkdirSync(d, { recursive: true });
  for (const [k, v] of Object.entries(files)) { fs.mkdirSync(path.dirname(path.join(d, k)), { recursive: true }); fs.writeFileSync(path.join(d, k), v); }
};
mod('@neondatabase/serverless', {
  'package.json': '{"name":"@neondatabase/serverless","type":"module","main":"index.js","exports":"./index.js"}',
  'index.js': `const store={row:null};export const __store=store;
export function neon(){return async(strings,...vals)=>{const t=strings.join('?').replace(/\\s+/g,' ').trim().toLowerCase();
 if(t.startsWith('create table'))return [];
 if(t.startsWith('select version, data'))return store.row?[{version:String(store.row.version),data:store.row.data}]:[];
 if(t.startsWith('insert into app_state')){if(store.row)return [];store.row={version:1,data:JSON.parse(vals[0])};return [{version:'1'}]}
 if(t.startsWith('update app_state')){if(store.row&&store.row.version===Number(vals[1])){store.row.version++;store.row.data=JSON.parse(vals[0]);return [{version:String(store.row.version)}]}return []}
 throw new Error('unexpected sql: '+t)}}`,
});
mod('@vercel/blob', {
  'package.json': '{"name":"@vercel/blob","type":"module","exports":{"./client":"./client.js"}}',
  'client.js': `export async function handleUpload({body,request,onBeforeGenerateToken}){if(body.type==='blob.generate-client-token'){const o=await onBeforeGenerateToken(body.payload.pathname,null);return{type:body.type,clientToken:'tok',opts:o}}return{type:body.type,response:'ok'}}`,
});

process.env.ADMIN_PASSWORD = 'secret-pass-123';
process.env.SESSION_SECRET = 'x'.repeat(40);
process.env.DATABASE_URL = 'postgres://fake';

const load = (n) => import(pathToFileURL(path.join(tmp, 'api', n + '.js')).href + '?t=' + Math.random());
const mkRes = () => { const r = { code: 200, headers: {}, body: undefined, setHeader(k, v) { r.headers[k.toLowerCase()] = v }, status(c) { r.code = c; return r }, json(b) { r.body = b; return r }, end() { return r } }; return r; };
const call = async (h, { method = 'GET', body, cookie } = {}) => { const res = mkRes(); await h({ method, body, headers: cookie ? { cookie } : {} }, res); return res; };

const bad = [];
const chk = (c, m) => { if (!c) bad.push(m) };

const state = (await load('state')).default, login = (await load('login')).default, logout = (await load('logout')).default, me = (await load('me')).default, upload = (await load('upload')).default;

let r = await call(state); chk(r.code === 200 && r.body.server === true && r.body.version === 0 && r.body.data === null, 'empty GET state');
r = await call(login, { method: 'POST', body: { password: 'wrong' } }); chk(r.code === 401, 'wrong password must be 401');
r = await call(login, { method: 'GET' }); chk(r.code === 405, 'login GET must be 405');
r = await call(login, { method: 'POST', body: { password: 'secret-pass-123' } });
chk(r.code === 200 && r.body.ok === true, 'correct password rejected');
const sc = r.headers['set-cookie'] || ''; chk(/HttpOnly/.test(sc) && /Secure/.test(sc) && /SameSite=Strict/.test(sc), 'cookie flags missing');
const cookie = sc.split(';')[0];
r = await call(me, { cookie }); chk(r.body.admin === true, 'me with cookie must be admin');
r = await call(me); chk(r.body.admin === false, 'me without cookie must not be admin');
r = await call(me, { cookie: cookie.slice(0, -3) + 'AAA' }); chk(r.body.admin === false, 'tampered cookie accepted');
const data = { rounds: [{ id: 'a' }], topics: [], sponsors: [], music: [], media: {} };
r = await call(state, { method: 'PUT', body: { base: 0, data } }); chk(r.code === 401, 'PUT without admin must be 401');
r = await call(state, { method: 'PUT', body: { base: 0, data: { x: 1 } }, cookie }); chk(r.code === 400, 'invalid data must be 400');
r = await call(state, { method: 'PUT', body: { base: 0, data }, cookie }); chk(r.code === 200 && r.body.version === 1, 'first PUT failed: ' + JSON.stringify(r.body));
r = await call(state, { method: 'PUT', body: { base: 0, data }, cookie }); chk(r.code === 409, 'stale base 0 must conflict');
r = await call(state, { method: 'PUT', body: { base: 1, data: { ...data, rounds: [{ id: 'b' }] } }, cookie }); chk(r.code === 200 && r.body.version === 2, 'second PUT failed');
r = await call(state, { method: 'PUT', body: { base: 1, data }, cookie }); chk(r.code === 409, 'stale base 1 must conflict');
r = await call(state); chk(r.body.version === 2 && r.body.data.rounds[0].id === 'b', 'GET after PUT wrong');
r = await call(state, { method: 'PUT', body: { base: 2, data: { rounds: [], pad: 'x'.repeat(3_600_000) } }, cookie }); chk(r.code === 413, 'oversized PUT must be 413');
r = await call(state, { method: 'DELETE' }); chk(r.code === 405, 'DELETE must be 405');
r = await call(upload, { method: 'POST', body: { type: 'blob.generate-client-token', payload: { pathname: 'x.png' } } }); chk(r.code === 401, 'upload token without admin must be 401');
r = await call(upload, { method: 'POST', body: { type: 'blob.generate-client-token', payload: { pathname: 'x.png' } }, cookie });
chk(r.code === 200 && r.body.clientToken === 'tok' && r.body.opts.allowedContentTypes.join().includes('video/*') && r.body.opts.maximumSizeInBytes > 0, 'upload token with admin failed: ' + JSON.stringify(r.body));
r = await call(upload, { method: 'POST', body: { type: 'blob.upload-completed', payload: {} } }); chk(r.code === 200, 'upload-completed callback must not need cookie');
r = await call(logout, { method: 'POST' }); chk(/Max-Age=0/.test(r.headers['set-cookie'] || ''), 'logout does not clear cookie');
// muhit o'zgaruvchilari yo'q bo'lsa — aniq xato
const keep = process.env.ADMIN_PASSWORD; delete process.env.ADMIN_PASSWORD;
r = await call(login, { method: 'POST', body: { password: 'x' } }); chk(r.code === 500 && /ADMIN_PASSWORD/.test(r.body.error), 'missing ADMIN_PASSWORD must be 500 with message'); process.env.ADMIN_PASSWORD = keep;
const k2 = process.env.SESSION_SECRET; delete process.env.SESSION_SECRET;
r = await call(me, { cookie }); chk(r.body.admin === false, 'no SESSION_SECRET must not grant admin'); process.env.SESSION_SECRET = k2;
const k3 = process.env.DATABASE_URL; delete process.env.DATABASE_URL;
const lib2 = await load('_lib'); let thrown = ''; try { lib2.sql() } catch (e) { thrown = e.message } chk(/DATABASE_URL/.test(thrown), 'missing DATABASE_URL must give a clear error'); process.env.DATABASE_URL = k3;

fs.rmSync(tmp, { recursive: true, force: true });
console.log(JSON.stringify({ problems: bad }, null, 1));
process.exit(bad.length ? 1 : 0);
