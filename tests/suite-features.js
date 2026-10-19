;(async()=>{
const bad=[];const chk=(c,m)=>{if(!c&&!bad.includes(m))bad.push(m)};const wait=async(n=60)=>{for(let i=0;i<n;i++)await Promise.resolve()};await wait();
// ---- parol ----
chk(!isAdm(),'admin should start logged out');
view='rounds';render();chk(__H.includes('id="pw"'),'login page not shown for a guarded view');
__pwv='abc';await A.setpw({});await wait();chk(!isAdm(),'short password accepted');
__pwv='secret123';await A.setpw({});await wait();chk(isAdm(),'setpw did not log in');
chk(AUTH&&AUTH.hash&&!JSON.stringify(AUTH).includes('secret123'),'password stored in clear text');chk(__store.kv.has('auth'),'auth not persisted');
A.logout();chk(!isAdm(),'logout did not log out');
view='rounds';nextV='rounds';render();__pwv='wrong';await A.login();await wait();chk(!isAdm(),'wrong password accepted');
__pwv='secret123';await A.login();await wait();chk(isAdm()&&view=='rounds','correct password rejected');
admT=Date.now()-19e5;chk(!isAdm(),'session did not expire');
sess();A.logout();A.mkr({n:'1'});chk(view=='login','guarded action not redirected to login');
__pwv='secret123';await A.login();await wait();
// ---- musiqa kutubxonasi ----
view='music';render();chk(__H.includes('Saqlangan musiqalar'),'music view missing');
mus={n:'Qo\u2018shiq',c:40};const ev={target:{dataset:{up:'L|x'},files:[{type:'audio/mpeg',size:5000,name:'a.mp3'}]}};for(const f of __dh.change)await f(ev);await wait(120);
chk(S.music.length==1&&S.music[0].cat==40,'library track not saved');chk(__store.kv.get('state').music.length==1,'library track not persisted');
const bigEv={target:{dataset:{up:'L|x'},files:[{type:'audio/mpeg',size:40*1048576,name:'big.mp3'}]}};for(const f of __dh.change)await f(bigEv);await wait();chk(S.music.length==1,'oversized audio accepted');
ed=newRound('t1',3);view='edit';HTML=edit();
chk(__H!==undefined,'');const eh=edit();chk(eh.includes('lb|aMusic')&&eh.includes('Qo\u2018shiq'),'library picker missing in editor');
__dh.input[0]({target:{dataset:{f:'lb|aMusic'},value:S.music[0].mid,checked:false}});chk(ed.aMusic==S.music[0].mid,'library pick not applied to round');
A.mdel({id:S.music[0].id});A.yes();await wait(120);chk(S.music.length==0,'library delete failed');
// ---- zaxira import ----
const bk=JSON.stringify({app:'MaroqAndQuiz',v:2,state:{rounds:[{id:'z',tid:'q',no:1,title:'Imp',kind:'test',qs:[],draft:true}],topics:[{id:'q',name:'Imp'}],sponsors:[],music:[]},media:{m1:'data:image/png;base64,AAAA'}});
const ev2={target:{dataset:{up:'I|x'},files:[{text:async()=>bk}]}};for(const f of __dh.change)await f(ev2);await wait();chk(M,'import confirmation missing');A.yes();await wait(150);
chk(S.rounds.length==1&&S.rounds[0].id=='z','import did not restore state');chk(__store.media.has('m1'),'import did not restore media');
const ev3={target:{dataset:{up:'I|x'},files:[{text:async()=>'not json'}]}};M=null;for(const f of __dh.change)await f(ev3);await wait();chk(toast&&toast.k=='er','invalid backup not rejected');
// ---- render xatosi qotib qolmasligi ----
const keep=guard;view='home';render();chk(__H.includes('Quiz testni boshlash'),'home page missing');
console.log(JSON.stringify({problems:bad},null,1));
})().catch(e=>console.log('FAIL',e.stack));
