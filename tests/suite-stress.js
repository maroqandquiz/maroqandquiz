;(async()=>{
const bad=[];const chk=(c,m)=>{if(!c&&!bad.includes(m))bad.push(m)};const wait=async(n=40)=>{for(let i=0;i<n;i++)await Promise.resolve()};await wait();
const U=['img1','aud1','vid1','gif1'];U.forEach(k=>urls[k]='blob:'+k);
const q1=()=>({text:'S',o:{A:'a',B:'b',D:'d',E:'e'},c:'A',img:'img1',ci:'',ce:''});
const rs=[{id:'a',tid:'t',no:1,title:'A',kind:'test',type:'1-raund',qs:[q1(),q1(),q1()],qTime:30,aTime:60,qMusic:'aud1',aMusic:'aud1',draft:false},
{id:'b',tid:'t',no:2,title:'B',kind:'foto',type:'2-raund',qs:[{text:'f',img:'img1',ans:'x',ci:'',ce:'',t:30},{text:'f',img:'img1',ans:'x',ci:'',ce:'',t:60}],qMusic:'aud1',aMusic:'aud1',draft:false},
{id:'c',tid:'t',no:3,title:'C',kind:'musiq',type:'3-raund',qs:['audio','video'].map(mt=>({text:'m',mt,m:mt=='audio'?'aud1':'vid1',au:'',vs:true,t:40,ans:'j',ci:'',cm:'',cmt:'',cs:true,ce:''})),aMusic:'aud1',draft:false},
{id:'d',tid:'t',no:10,title:'D',kind:'duel',type:'10-raund',topic:'T',qs:['text','audio','video'].map(t=>({t,text:'d',img:'',aud:'aud1',vid:'vid1',ans:'m',ai:''})),draft:false}];
S.rounds=rs;let seed=12345;const rnd=()=>(seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff;
let maxT=0,maxI=0,games=0;
for(let g=0;g<60;g++){const r=rs[g%rs.length];startGame(JSON.parse(JSON.stringify(r)));games++;
 for(let i=0;i<120&&G;i++){const x=rnd();if(x<.55)nxt();else if(x<.7)prv();else if(x<.8)A.gpause({});else if(x<.85)A.greset({});else if(x<.9)A.mplay({});else __adv(Math.floor(rnd()*50000));__adv(450);
  maxT=Math.max(maxT,__tm.length);maxI=Math.max(maxI,__tm.filter(t=>t.every).length)}
 if(G)exitG();__adv(5000)}
chk(maxI<=1,'more than one interval at once: '+maxI);chk(maxT<=12,'too many pending timers: '+maxT);
chk(__tm.filter(t=>t.every).length==0,'interval left after all games ended');
console.log(JSON.stringify({problems:bad,games,maxPendingTimers:maxT,maxIntervals:maxI},null,1));
})().catch(e=>console.log('FAIL',e.stack));
