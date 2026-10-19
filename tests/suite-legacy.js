;(async()=>{const bad=[];const chk=(c,m)=>{if(!c&&!bad.includes(m))bad.push(m)};const wait=async(n=60)=>{for(let i=0;i<n;i++)await Promise.resolve()};await wait();
chk(S.topics.length==2,'legacy: topics='+S.topics.length);chk(S.rounds.every(r=>r.tid&&r.no),'legacy: rounds without tid/no');
chk(S.rounds.filter(r=>r.tid==S.topics[0].id).map(r=>r.no).join()=='1,2,3,4,5,6,7,8','legacy: first topic rounds '+S.rounds.filter(r=>r.tid==S.topics[0].id).map(r=>r.no).join());
chk(__store.kv.has('backup-v1'),'legacy: no backup');chk(__store.kv.get('state').topics.length==2,'legacy: not persisted');
chk(__store.kv.get('backup-v1')&&__store.kv.get('backup-v1').rounds.length==9&&!__store.kv.get('backup-v1').rounds[0].tid,'legacy: backup content');
console.log(JSON.stringify({problems:bad},null,1))})().catch(e=>console.log('FAIL',e.stack));
