;(async()=>{
const bad=[];const chk=(c,m)=>{if(!c&&!bad.includes(m))bad.push(m)};const wait=async(n=80)=>{for(let i=0;i<n;i++)await Promise.resolve()};await wait();
chk(SRV===true,'server mode not detected');chk(!isAdm(),'must start logged out');chk(AUTH&&AUTH.srv,'AUTH marker missing in server mode');
chk(__srv.calls[0]=='GET /api/state','first call must be GET /api/state, got '+__srv.calls[0]);
view='rounds';render();chk(__H.includes('id="pw"')&&!__H.includes('id="pw2"'),'server mode login form must not offer password creation');
__pwv='bad';await A.login();await wait();chk(!isAdm(),'bad password accepted');
__pwv='serverpw';await A.login();await wait();chk(isAdm(),'good password rejected');
view='newr';render();A.create({});await wait();chk(__srv.ver==1&&__srv.data.topics.length==1,'topic not stored on server');
BLOBLIB=Promise.resolve({upload:async(n,f,o)=>({url:'https://blob.test/'+n})});
cur=S.topics[0].id;ed=newRound(cur,2);Object.assign(ed,{title:'Foto',qs:[{text:'q',img:'m1',ans:'a',ci:'',ce:'',t:30}]});
await tx('media','readwrite',s=>s.put({name:'a b.png',type:'image/png',size:10},'m1'));
chk(MEDIAREG.m1&&MEDIAREG.m1.u=='https://blob.test/media/m1-a_b.png','media not registered: '+JSON.stringify(MEDIAREG));
dirty=true;await saveRound(false);await wait();
chk(__srv.ver==2&&__srv.data.rounds.length==1&&__srv.data.media.m1.u.includes('blob.test'),'round and media registry not stored');
await loadMedia();chk(urls.m1=='https://blob.test/media/m1-a_b.png','urls not filled from registry');
// to'qnashuv: boshqa qurilma o'zgartirdi
__srv.ver=50;ed.title='Yangi';dirty=true;await saveRound(false);await wait();
chk(toast&&toast.k=='er'&&/boshqa qurilmada/.test(toast.t),'conflict message missing: '+(toast&&toast.t));
chk(S.rounds.length==1,'local state must be reverted after failed save');
__srv.ver=2;await tx('kv','readonly',o=>o.get('state'));chk(SV==2,'SV not refreshed from server');
// seans yo'qolishi
__srv.cookie=false;ed.title='Yana';dirty=true;await saveRound(false);await wait();chk(toast&&/qayta kiring/.test(toast.t)&&!adm,'401 must log out with message: '+(toast&&toast.t));
__pwv='serverpw';adm=false;view='rounds';render();await A.login();await wait();chk(isAdm(),'re-login failed');
// brauzerdagi eski ma'lumotni ko'chirish
__store.kv.set('state',{rounds:[{id:'L1',tid:'tt',no:1,title:'Local',kind:'test',qs:[],draft:true}],topics:[{id:'tt',name:'Loc'}],sponsors:[],music:[]});
__store.media.set('lm1',{type:'image/png',size:5});
A.mig({});chk(M,'migration confirmation missing');A.yes();await wait(300);
chk(__srv.data.rounds.length==1&&__srv.data.rounds[0].id=='L1','migration did not store local rounds on server: '+JSON.stringify(__srv.data.rounds.map(r=>r.id)));
chk(__srv.data.media.lm1&&__srv.data.media.lm1.u.includes('blob.test'),'migration did not upload local media');
// sozlamalar: server rejimi kartasi, parol almashtirish yo'q
view='settings';render();chk(__H.includes('Server rejimi')&&!__H.includes('id="pw0"'),'settings must show server mode card without password change');
require('fs').writeFileSync(process.env.MQ_SRV,JSON.stringify({ver:__srv.ver,data:__srv.data}));
console.log(JSON.stringify({problems:bad},null,1));
})().catch(e=>console.log('FAIL',e.stack));
