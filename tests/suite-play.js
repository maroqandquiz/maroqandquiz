;(async()=>{
for(let i=0;i<80;i++)await Promise.resolve();
const bad=[],seenA=new Set();const chk=(c,m)=>{if(!c&&!bad.includes(m))bad.push(m)};
const U=['img1','img2','img3','img4','img5','aud1','vid1','gif1'];U.forEach(k=>urls[k]='blob:'+k);
const mk=(no,kind,qs,ex={})=>Object.assign({id:'r'+no,__tid:'t1',no,title:'T'+no,kind,type:no+'-raund',qs,qTime:30,aTime:60,qMusic:'aud1',aMusic:'aud1',draft:false,created:0,mod:0,rules:'Qoida 1\nQoida 2'},ex);
const t1=()=>({text:'Savol matni',o:{A:'a',B:'b',D:'d',E:'e'},c:'B',img:'img1',ci:'img2',ce:'izoh'});
const f1=t=>({text:'Foto savol',img:'img1',ans:'Javob',ci:'img2',ce:'izoh',t});
const m1=(mt,extra)=>Object.assign({text:'MusIQa',mt,m:mt=='audio'?'aud1':mt=='image'||mt=='ia'?'img1':'vid1',au:mt=='va'||mt=='ia'?'aud1':'',vs:mt=='video',t:40,ans:'Jav',ci:'img2',cm:'vid1',cmt:'video',cs:true,ce:'iz'},extra||{});
const zq=a=>({text:'Zanjir savol bir ikki uch',img:'img1',ans:a,ci:'img2'});
const hq=a=>({text:'Fakt savol',img:'img1',ans:a,ce:'iz'});
const e1=()=>{const q=newE();q.n=3;for(let k=0;k<4;k++)q.imgs[k].id='img'+(k+1);q.imgs[0].o1=true;q.imgs[0].c1=2;q.imgs[1].o2=true;q.imgs[1].o3={on:true,a:'i',b:'b'};q.imgs[2].o4={on:true,a:'n',b:'i'};q.plus=[true,false,true];q.ans='Javob';q.ai='img2';q.ce='iz';return q};
const k1=t=>({t,text:'Kino savol',imgs:t=='image'?['img1']:t=='images'?['img1','img2','img3','img4','img5']:[],vid:'vid1',aud:'aud1',ans:'Film',ai:'img2',ce:'iz'});
const d1=t=>({t,text:'Duel savol',img:'img1',aud:'aud1',vid:'vid1',ans:'Messi',ai:'img2'});
const R={
1:mk(1,'test',[t1(),t1()]),
2:mk(2,'foto',[f1(30),f1(60)]),
3:mk(3,'musiq',['image','audio','video','va','ia'].map(t=>m1(t))),
4:mk(4,'tavakkal',Array.from({length:6},(_,i)=>({text:'Clue '+i,img:i%2?'img1':''})),{topic:'Mavzu',an:'Javob',aImg:'img2',tMusic:'aud1'}),
5:mk(5,'zanjir',['Olma','Anor','Rayhon','Nodir','Rahmat','Tolib'].map(zq)),
6:mk(6,'fifty',['ha','yoq','ha','yoq','ha','yoq'].map(hq),{gif:'gif1'}),
7:mk(7,'rebus',Array.from({length:6},e1)),
8:mk(8,'kino',['image','images','music','video','vm','text'].map(k1)),
9:null,
10:mk(10,'duel',['text','image','audio','video'].map(d1),{topic:'Futbolchilar'}),
11:mk(11,'win',[],{teams:['A jamoa','B jamoa','C jamoa','D jamoa','E jamoa']})
};
R[9]=mk(9,'rul',[mk(1,'test',[t1()]).qs[0],f1(30),m1('audio'),{text:'Clue',img:'img1',ans:'Jav',ci:'img2',ce:'iz'},zq('Olma'),hq('ha'),e1(),k1('video')],{gif:'gif1'});
const RUN=['question_countdown','f_cd','m_cd','t_topic','t_q','z_q','h_q','e_q','k_q','answer_writing_countdown','f_w','m_w','z_w','h_w','e_w','k_w','u_w'];
const aud=()=>__aus.filter(a=>!a.paused).length+[__MV,__MA].filter(e=>e.src&&!e.paused&&!e.muted).length;
const bal=(h,tag)=>(h.match(new RegExp('<'+tag+'[ >]','g'))||[]).length-(h.match(new RegExp('</'+tag+'>','g'))||[]).length;const grab=()=>{for(const tg of ['div','span','button','label','select','textarea','p','h1','h3','nav','header','main','a']){const d=bal(__H,tg);if(d!=0)chk(0,'unbalanced <'+tg+'> ('+d+') in state '+(G&&G.st)+' kind '+(G&&G.r&&G.r.kind)+' view '+view)}for(const m of __H.matchAll(/data-a="([^"]+)"/g))seenA.add(m[1]);{const mm=/.{40}(undefined|NaN|\[object).{40}/.exec(__H);chk(!mm,'HTML bad token in '+(G&&G.st)+' kind '+(G&&G.r&&G.r.kind)+' :: '+(mm&&mm[0]))}};
const ivs=()=>__tm.filter(x=>x.every).length;
const res={};S.rounds=Object.values(R).map(x=>cl(x));await persist();
for(const no of [1,2,3,4,5,6,7,8,9,10,11]){
 const r=R[no];S.sponsors=no==1?[{id:'s',name:'Sp',desc:'d',logo:'img1'}]:[];
 // validators on complete data
 try{const v=validate(cl(r));chk(v.length==0,'validate('+no+') not empty: '+JSON.stringify(v).slice(0,200))}catch(e){chk(0,'validate('+no+') threw '+e.message)}
 // editor render for complete data
 try{ed=cl(r);view='edit';const h=edit();__H=h;grab();chk(h.length>200,'editor '+no+' too short')}catch(e){chk(0,'edit('+no+') threw '+e.stack.split('\n').slice(0,2).join('|'))}
 try{ed=newRound('t1',no);const h=edit();chk(!/undefined|NaN/.test(h),'blank editor '+no+' __has undefined');const v=validate(cl(ed));chk(no==9||no==11||v.length>0||no==0,'blank validate '+no+' empty?')}catch(e){chk(0,'blank edit/validate('+no+') threw '+e.stack.split('\n').slice(0,2).join('|'))}
 ed=null;view='tests';
 // linear play-through
 const seq=[];let steps=0,err=null;
 try{
  startGame(cl(r));chk(G,'startGame no G '+no);if(!G)continue;grab();
  chk(!G.run&&ivs()==0,'timer running at start '+no);
  __adv(130000);chk(ivs()==0&&!G.run,'timer started by itself at start '+no);
  while(G&&steps++<400){
   const st=G.st;seq.push(st+(G.qi!=null?':'+G.qi:''));
   // idle 130s in this state: must not change
   const snap=[G.st,G.qi,G.rev,G.ph].join();__adv(1000);
   const wasRun=G.run;
   if(!RUN.includes(st))chk(!wasRun&&ivs()==0,'timer active in non-timer state '+st+' (round '+no+')');
   if(RUN.includes(st))chk(ivs()<=1,'multiple intervals '+st);
   __adv(125000);
   if(G){ const sn2=[G.st,G.qi,G.rev,G.ph].join();
     if(snap!=sn2&&!(st=='t_q'))chk(0,'state auto-changed '+snap+' -> '+sn2+' (round '+no+')');
     chk(G.rem==null||G.rem>=0,'negative rem '+st); if(RUN.includes(st)&&st!='t_q')chk(!G.run&&ivs()==0,'timer did not stop at 0 in '+st);
     chk(aud()<=1,'multiple audible sources in '+st+' round '+no+': '+aud());
     if(!RUN.includes(st)&&!['m_q','m_r','m_a','k_q0','k_rq','k_a','d_q','d_p'].includes(st)){} }
   nxt();__adv(500);if(G)grab();
  }
  chk(steps<400,'did not finish within 400 presses (stuck?) round '+no);
  chk(G==null,'game not exited after complete '+no);
  res[no]=seq.length;
 }catch(e){err=e;chk(0,'play-through threw round '+no+': '+e.stack.split('\n').slice(0,3).join(' | '))}
 mClear();stopT();G=null;
 // random walk
 try{
  let seed=no*7919;const rnd=()=>(seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff;
  startGame(cl(r));
  const acts=['nxt','nxt','nxt','prv','gpause','greset','gstopa','mplay','mre','mmute','adv'];
  for(let i=0;i<500&&G;i++){
   const a=acts[Math.floor(rnd()*acts.length)];
   if(a=='nxt')nxt();else if(a=='prv')prv();else if(a=='adv')__adv(Math.floor(rnd()*70000));else if(A[a])A[a]({});
   __adv(500);
   if(G){grab();chk(ivs()<=1,'walk: multiple intervals '+G.st+' round '+no);chk(G.rem==null||G.rem>=0,'walk: neg rem');chk(aud()<=1,'walk: >1 audible '+G.st+' r'+no+': '+aud());
     if(!RUN.includes(G.st)&&!G.run&&G.st!='u_w0')chk(ivs()==0,'walk: interval running in non-run state '+G.st+' r'+no)}
  }
 }catch(e){chk(0,'random walk threw round '+no+': '+e.stack.split('\n').slice(0,3).join(' | '))}
 mClear();stopT();G=null;
}
// non-game views
try{S.rounds=[cl(R[1]),cl(R[2])];S.topics=[{id:'t1',name:'M1'}];cur='t1';for(const v of ['home','tests','rounds','newr','topic','sponsors','settings']){view=v;__H=({home,tests,rounds,newr,topic:topicV,sponsors,settings}[v])();grab()}}catch(e){chk(0,'view render threw '+e.stack.split('\n').slice(0,3).join(' | '))}
// dead buttons
const miss=[...seenA].filter(a=>!A[a]);chk(miss.length==0,'buttons without action: '+miss.join(','));
console.log(JSON.stringify({steps:res,problems:bad},null,1));
})().catch(e=>console.log('HARNESS FAIL',e.stack));
