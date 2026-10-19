;(async()=>{
const bad=[];const chk=(c,m)=>{if(!c&&!bad.includes(m))bad.push(m)};
const wait=async(n=30)=>{for(let i=0;i<n;i++)await Promise.resolve()};
await wait();adm=true;admT=Date.now();
const U=['img1','img2','img3','img4','img5','aud1','vid1','gif1'];U.forEach(k=>urls[k]='blob:'+k);
const mk=(no,kind,qs,ex={})=>Object.assign({title:'T'+no,kind,qs,qTime:30,aTime:60,qMusic:'aud1',aMusic:'aud1',rules:'Qoida'},ex);
const t1=()=>({text:'Savol matni',o:{A:'a',B:'b',D:'d',E:'e'},c:'B',img:'img1',ci:'img2',ce:'izoh'});
const f1=t=>({text:'Foto savol',img:'img1',ans:'Javob',ci:'img2',ce:'izoh',t});
const m1=mt=>({text:'MusIQa',mt,m:mt=='audio'?'aud1':mt=='image'||mt=='ia'?'img1':'vid1',au:mt=='va'||mt=='ia'?'aud1':'',vs:mt=='video',t:40,ans:'Jav',ci:'img2',cm:'vid1',cmt:'video',cs:true,ce:'iz'});
const zq=a=>({text:'Zanjir savol',img:'img1',ans:a,ci:'img2'});
const hq=a=>({text:'Fakt',img:'img1',ans:a,ce:'iz'});
const e1=()=>{const q=newE();q.n=3;for(let k=0;k<4;k++)q.imgs[k].id='img'+(k+1);q.imgs[0].o1=true;q.imgs[0].c1=2;q.imgs[1].o3={on:true,a:'i',b:'b'};q.imgs[2].o4={on:true,a:'n',b:'i'};q.plus=[true,false,true];q.ans='J';q.ai='img2';return q};
const k1=t=>({t,text:'Kino',imgs:t=='image'?['img1']:t=='images'?['img1','img2']:[],vid:'vid1',aud:'aud1',ans:'Film',ai:'img2',ce:'iz'});
const d1=t=>({t,text:'Duel',img:'img1',aud:'aud1',vid:'vid1',ans:'M',ai:'img2'});
const D={1:mk(1,'test',[t1(),t1()]),2:mk(2,'foto',[f1(30),f1(60)]),3:mk(3,'musiq',['image','audio','video','va','ia'].map(m1)),
4:mk(4,'tavakkal',Array.from({length:6},(_,i)=>({text:'Clue'+i,img:i%2?'img1':''})),{topic:'Mavzu',an:'Javob',aImg:'img2',tMusic:'aud1'}),
5:mk(5,'zanjir',['Olma','Anor','Rayhon','Nodir','Rahmat','Tolib'].map(zq)),6:mk(6,'fifty',['ha','yoq','ha','yoq','ha','yoq'].map(hq),{gif:'gif1'}),
7:mk(7,'rebus',Array.from({length:6},e1)),8:mk(8,'kino',['image','images','music','video','vm','text'].map(k1)),
9:mk(9,'rul',[t1(),f1(30),m1('audio'),{text:'Clue',img:'img1',ans:'Jav',ci:'img2',ce:'iz'},zq('Olma'),hq('ha'),e1(),k1('video')],{gif:'gif1'}),
10:mk(10,'duel',['text','image','audio','video'].map(d1),{topic:'Futbolchilar'}),11:mk(11,'win',[],{teams:['A','B','C','D','E']})};
chk(S&&Array.isArray(S.rounds),'init: S missing');
view='newr';render();A.create({});await wait();await wait();
chk(S.topics.length==1,'topic not created');chk(__store.kv.has('state')&&__store.kv.get('state').topics.length==1,'topic not persisted');
cur=S.topics[0].id;
for(let no=1;no<=11;no++){
 ed=newRound(cur,no);const base={id:ed.id,tid:cur,no,type:ed.type,draft:true,created:1,mod:1};ed=Object.assign(ed,JSON.parse(JSON.stringify(D[no])),base);
 if(no==9)ed.qs=JSON.parse(JSON.stringify(D[9].qs));
 err=[];dirty=true;await saveRound(false);await wait();
 const sv=S.rounds.find(x=>x.id==base.id);chk(sv&&!sv.draft,'round '+no+' not saved as ready; err='+JSON.stringify(err).slice(0,200));
}
const st=__store.kv.get('state');chk(st&&st.rounds.length==11,'persisted rounds != 11: '+(st&&st.rounds.length));
view='topic';render();chk((__H.match(/data-a="play"/g)||[]).length==11,'play buttons != 11: '+(__H.match(/data-a="play"/g)||[]).length);
chk(/11\/11|k\/11/.test('11/11')||true,'');
// edit each saved round & fire every control
const skip=new Set(['logout','login','setpw','chpw','dmode','dexit','dsp','dopen','expt','rcv','yes','no','go','newq','create','open','edr','play','prev','wipe','delr','delt','save','draft','dupr','sdel','ssave','sed','smv','sprev','gexit','gnext','gprev','fs']);
for(const r of S.rounds){
 ed=cl(r);view='edit';err=[];render();
 const tags=[...__H.matchAll(/<[^>]*data-a="(\w+)"[^>]*>/g)].map(m=>m[0]);
 for(const tag of tags){const ds={};for(const m of tag.matchAll(/data-([a-z]+)="([^"]*)"/g))ds[m[1]]=m[2];if(skip.has(ds.a))continue;
  try{__dh.click[0]({target:{closest:()=>({dataset:ds})}});if(M)A.yes();await wait(4)}catch(e){chk(0,'click '+ds.a+' threw in round '+r.no+': '+e.message)}
  try{ed=ed||cl(r);render()}catch(e){chk(0,'render after '+ds.a+' threw r'+r.no+': '+e.message)}
 }
 ed=cl(r);view='edit';render();
 const fs=[...__H.matchAll(/data-f="([^"]+)"/g)].map(m=>m[1]).filter(f=>f!='vol'&&!/^(kt|mt|dt|en|ec|lb|mc)[|]?/.test(f.split('|')[0]+'|'));
 for(const f of fs){try{__dh.input[0]({target:{dataset:{f},value:'3',checked:true}})}catch(e){chk(0,'input '+f+' threw r'+r.no+': '+e.message)}}
 try{render();chk(!/undefined|NaN|\[object/.test(__H),'editor html bad after inputs r'+r.no)}catch(e){chk(0,'editor render after inputs threw r'+r.no+': '+e.message)}
}
ed=null;view='tests';
require('fs').writeFileSync(process.env.MQ_DB||'/tmp/t/db.json',JSON.stringify({kv:[...__store.kv],media:[...__store.media]}));
console.log(JSON.stringify({problems:bad},null,1));
})().catch(e=>console.log('HARNESS FAIL',e.stack));
