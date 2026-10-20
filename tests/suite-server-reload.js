;(async()=>{
const bad=[];const chk=(c,m)=>{if(!c&&!bad.includes(m))bad.push(m)};const wait=async(n=80)=>{for(let i=0;i<n;i++)await Promise.resolve()};await wait();
chk(SRV===true,'server mode not detected after reload');chk(!isAdm(),'new visitor must not be admin');
chk(S.rounds.length==1&&S.rounds[0].id=='L1','state not loaded from server after reload: '+JSON.stringify(S.rounds.map(r=>r.id)));
chk(urls.lm1&&urls.lm1.includes('blob.test'),'media urls not restored from registry');
view='tests';render();chk(!/undefined|NaN/.test(__H),'tests view bad');
view='rounds';render();chk(__H.includes('id="pw"'),'guarded view must ask for login for a visitor');
console.log(JSON.stringify({problems:bad},null,1));
})().catch(e=>console.log('FAIL',e.stack));
