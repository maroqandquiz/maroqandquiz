;(async()=>{
const bad=[];const chk=(c,m)=>{if(!c&&!bad.includes(m))bad.push(m)};const wait=async(n=60)=>{for(let i=0;i<n;i++)await Promise.resolve()};await wait();
const U=['img1','img2','img3','img4','img5','aud1','vid1','gif1'];U.forEach(k=>urls[k]='blob:'+k);
const mk=(no,kind,qs,ex={})=>Object.assign({id:'r'+no,tid:'t1',no,title:'T'+no,kind,type:no+'-raund',qs,qTime:30,aTime:60,qMusic:'aud1',aMusic:'aud1',draft:false,created:0,mod:0,rules:'Qoida'},ex);
const t1=()=>({text:'Savol',o:{A:'a',B:'b',D:'d',E:'e'},c:'B',img:'img1',ci:'img2',ce:'izoh'});
const f1=t=>({text:'Foto',img:'img1',ans:'J',ci:'img2',ce:'iz',t});
const m1=mt=>({text:'Mus',mt,m:mt=='audio'?'aud1':mt=='image'||mt=='ia'?'img1':'vid1',au:mt=='va'||mt=='ia'?'aud1':'',vs:mt=='video',t:40,ans:'J',ci:'img2',cm:'vid1',cmt:'video',cs:true,ce:'i'});
const zq=a=>({text:'Zanjir',img:'img1',ans:a,ci:'img2'}),hq=a=>({text:'Fakt',img:'img1',ans:a,ce:'i'});
const e1=()=>{const q=newE();q.n=3;for(let k=0;k<4;k++)q.imgs[k].id='img'+(k+1);q.imgs[0].o1=true;q.plus=[true,false,true];q.ans='J';q.ai='img2';return q};
const k1=t=>({t,text:'Kino',imgs:t=='image'?['img1']:[],vid:'vid1',aud:'aud1',ans:'F',ai:'img2',ce:'i'});
const R=[mk(1,'test',[t1(),t1()]),mk(2,'foto',[f1(30)]),mk(3,'musiq',['image','audio','video'].map(m1)),mk(4,'tavakkal',Array.from({length:3},()=>({text:'C',img:''})),{topic:'M',an:'J',aImg:'img2'}),
mk(5,'zanjir',['Olma','Anor'].map(zq)),mk(6,'fifty',['ha','yoq'].map(hq),{gif:'gif1'}),mk(7,'rebus',[e1()]),mk(8,'kino',['image','video','music'].map(k1)),
mk(9,'rul',[t1(),f1(30),m1('audio'),{text:'C',img:'img1',ans:'J',ci:'img2',ce:'i'},zq('Olma'),hq('ha'),e1(),k1('video')],{gif:'gif1'}),
mk(10,'duel',['text','image','audio','video'].map(t=>({t,text:'D',img:'img1',aud:'aud1',vid:'vid1',ans:'M',ai:'img2'})),{topic:'F'}),mk(11,'win',[],{teams:['A','B','C','D','E']})];
S.rounds=R.map(x=>cl(x));S.sponsors=[{id:'s',name:'Sp',desc:'d',logo:'img1'}];await persist();
const strip=h=>h.split('<div class="ctl')[0];
let total=0,diff=0;
for(const r of R){
 const pairs=[];const real=netSend;netSend=d=>{if(d.k=='s')pairs.push({m:JSON.parse(JSON.stringify(d)),h:strip(__H)})};
 dispOK=true;startGame(cl(S.rounds.find(x=>x.id==r.id)));let n=0;while(G&&n++<300){nxt();__adv(500)}netSend=real;mClear();stopT();G=null;
 DISP=true;G=null;
 for(const p of pairs){await dApply(p.m);total++;const dh=strip(__H);if(dh!==p.h){diff++;chk(0,'mirror mismatch round '+r.no+' state '+p.m.st+' :: '+dh.slice(0,80)+' <> '+p.h.slice(0,80))}}
 mClear();G=null;DISP=false;dispOK=false;
}
chk(total>100,'too few mirrored states: '+total);
// ko\u2018rsatkich: ekran kutish holati
DISP=true;G=null;render();chk(__H.includes('ulanishini kutmoqda'),'display waiting screen missing');DISP=false;
console.log(JSON.stringify({problems:bad,mirrored:total},null,1));
})().catch(e=>console.log('FAIL',e.stack));
