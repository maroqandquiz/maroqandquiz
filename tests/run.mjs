import fs from 'node:fs';import os from 'node:os';import path from 'node:path';import {spawnSync} from 'node:child_process';import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const html=fs.readFileSync(path.join(here,'..','public','index.html'),'utf8');
const app=html.match(/<script>([\s\S]*)<\/script>/)[1];
const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'maroq-'));const db=path.join(tmp,'db.json');
const rd=f=>fs.readFileSync(path.join(here,f),'utf8');
const suites=[['O\u2018yin (barcha raundlar, taymer, audio, qotish)','suite-play.js'],['Admin tahrirlash va saqlash','suite-edit.js'],['Sahifa yangilangandan keyin tiklash','suite-reload.js','pre-reload.js'],['Eski ma\u2019lumotlarni ko\u2018chirish','suite-legacy.js','pre-legacy.js'],['Parol, musiqa kutubxonasi, zaxira','suite-features.js'],['Ikki ekranli namoyish (nusxa tekshiruvi)','suite-mirror.js'],['Server rejimi: parol, saqlash, to\u2018qnashuv, ko\u2018chirish','suite-server.js','pre-server.js'],['Server rejimi: sahifa yangilangandan keyin','suite-server-reload.js','pre-server.js'],['Uzoq ishlash (60 ta o\u2018yin, resurslar yig\u2018ilmasligi)','suite-stress.js']];
let fail=0;
for(const [name,suite,pre] of suites){
  const code=rd('head.js')+'\n'+(pre?rd(pre):'')+'\n'+app+'\n'+rd(suite);
  const f=path.join(tmp,suite);fs.writeFileSync(f,code);
  const r=spawnSync(process.execPath,[f],{encoding:'utf8',timeout:180000,env:{...process.env,MQ_DB:db,MQ_SRV:path.join(tmp,'srv.json')}});
  const out=(r.stdout||'')+(r.stderr||'');let problems=null;
  const m=out.match(/\{\s*"(?:steps|problems)"[\s\S]*\}\s*$/);try{problems=JSON.parse(m[0]).problems}catch{}
  if(problems&&problems.length===0){console.log('OK   ',name)}else{fail++;console.log('FAIL ',name);console.log(problems?problems.map(x=>'   - '+x).join('\n'):out.slice(-1500))}
}
{const r=spawnSync(process.execPath,[path.join(here,'api.test.mjs')],{encoding:'utf8',timeout:60000});let pr=null;try{pr=JSON.parse(r.stdout.match(/\{[\s\S]*\}\s*$/)[0]).problems}catch{}if(pr&&!pr.length)console.log('OK   API funksiyalari (parol, cookie, versiya, yuklash)');else{fail++;console.log('FAIL API funksiyalari');console.log(pr?pr.map(x=>'   - '+x).join('\n'):(r.stdout+r.stderr).slice(-1200))}}
fs.rmSync(tmp,{recursive:true,force:true});
console.log(fail?`\n${fail} ta to\u2018plam muvaffaqiyatsiz`:'\nBarcha testlar muvaffaqiyatli o\u2018tdi');
process.exit(fail?1:0);
