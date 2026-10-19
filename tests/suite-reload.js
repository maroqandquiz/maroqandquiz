;(async()=>{const bad=[];const chk=(c,m)=>{if(!c&&!bad.includes(m))bad.push(m)};const wait=async(n=40)=>{for(let i=0;i<n;i++)await Promise.resolve()};await wait();
chk(S.rounds.length==11,'after reload rounds='+S.rounds.length);chk(S.topics.length==1,'after reload topics='+S.topics.length);
chk(S.rounds.every(r=>r.tid==S.topics[0].id),'rounds not linked to topic');
chk(S.rounds.find(r=>r.no==9).qs.length==8,'ruletka qs lost');chk(S.rounds.find(r=>r.no==7).qs[0].imgs[0].o1===true,'rebus op lost');
chk(S.rounds.find(r=>r.no==11).teams.join()=='A,B,C,D,E','winners teams lost');
chk(!toast||toast.k!='er','init error toast: '+(toast&&toast.t));
const U=['img1','img2','img3','img4','img5','aud1','vid1','gif1'];U.forEach(k=>urls[k]='blob:'+k);
view='tests';render();chk(/11 raund|\/11/.test(__H)||__H.includes('/11'),'tests list does not show /11');
// play ruletka after reload
const r=cl(S.rounds.find(x=>x.no==9));startGame(r);let n=0;while(G&&n++<300){nxt();__adv(500)}chk(G==null,'ruletka after reload did not finish');
console.log(JSON.stringify({problems:bad},null,1))})().catch(e=>console.log('FAIL',e.stack));
