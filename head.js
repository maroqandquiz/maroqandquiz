let __T=1000;const __tm=[];let __tid=1;
globalThis.Date={now:()=>__T};
globalThis.setTimeout=(f,ms=0)=>{__tm.push({id:++__tid,t:__T+ms,f,every:0});return __tid};
globalThis.setInterval=(f,ms)=>{__tm.push({id:++__tid,t:__T+ms,f,every:ms});return __tid};
globalThis.clearTimeout=globalThis.clearInterval=i=>{const k=__tm.findIndex(x=>x.id==i);if(k>=0)__tm.splice(k,1)};
function __adv(ms){const end=__T+ms;let n=0;while(n++<20000){__tm.sort((a,b)=>a.t-b.t);const x=__tm[0];if(!x||x.t>end)break;__T=x.t;if(x.every)x.t+=x.every;else __tm.shift();x.f()}__T=end}
let __H='';const __aus=[];
class __M{constructor(){this.style={};this.paused=true;this.src=null;this.muted=false;this.volume=1;this.currentTime=0;this.classList={add(){},remove(){},toggle(){}}}
getAttribute(n){return n=='src'?this.src:null}removeAttribute(n){if(n=='src')this.src=null}pause(){this.paused=true}play(){this.paused=false;return Promise.resolve()}load(){}getBoundingClientRect(){return{left:0,top:0,width:100,height:100}}}
const __MV=new __M(),__MA=new __M();
class Audio{constructor(s){this.src=s;this.paused=true;this.volume=1;__aus.push(this)}play(){this.paused=false;return Promise.resolve()}pause(){this.paused=true}}
globalThis.Audio=Audio;
class __AC{constructor(){this.state='running';this.destination={}}resume(){}createMediaElementSource(){return{connect(){}}}createAnalyser(){return{fftSize:0,frequencyBinCount:32,getByteFrequencyData(){},connect(){}}}}
globalThis.AudioContext=__AC;globalThis.window=globalThis;globalThis.innerWidth=1920;globalThis.innerHeight=1080;globalThis.devicePixelRatio=1;
globalThis.addEventListener=()=>{};globalThis.requestAnimationFrame=f=>setTimeout(f,16);globalThis.scrollTo=()=>{};
const __c2=new Proxy({},{get:(t,k)=>k in t?t[k]:()=>({addColorStop(){}}),set:(t,k,v)=>(t[k]=v,true)});
function __stub(){return {value:globalThis.__pwv||'Mavzu 1',checked:false,files:[],style:{},classList:{add(){},remove(){},toggle(){}},dataset:{},textContent:'',innerHTML:'',scrollHeight:10,clientHeight:100,scrollWidth:10,clientWidth:100,offsetWidth:1,parentNode:{classList:{toggle(){}}},querySelector(){return null},getContext(){return __c2},getBoundingClientRect(){return{left:0,top:0,width:100,height:100}}}}
const __app={style:{},set innerHTML(v){__H=v},get innerHTML(){return __H}};
const __has=s=>s[0]=='#'?__H.includes('id="'+s.slice(1)+'"'):s[0]=='.'?__H.includes(s.slice(1)):false;
globalThis.document={querySelector:s=>s=='#app'?__app:s=='#mv'?__MV:s=='#ma'?__MA:__has(s)?__stub():null,querySelectorAll:()=>[],getElementById:()=>null,addEventListener(t,f){((globalThis.__dh=globalThis.__dh||{})[t]=(globalThis.__dh[t]||[])).push(f)},fonts:{},head:{insertAdjacentHTML(){}},fullscreenElement:null,documentElement:{requestFullscreen(){return Promise.resolve()}},hidden:false,body:{style:{},classList:{add(){},remove(){}}}};

globalThis.URL={createObjectURL:()=>'blob:x'};
const __store={kv:new Map(),media:new Map()};globalThis.__store=__store;
function __req(){return {result:undefined}}
globalThis.indexedDB={open(){const r={};Promise.resolve().then(()=>{const db={createObjectStore(){},transaction(st,mode){const m=__store[st],t={objectStore(){return{
 put(v,k){const q=__req();m.set(k,JSON.parse(JSON.stringify(v===undefined?null:v)));q.result=k;t._q=q;return q},
 get(k){const q=__req();q.result=m.has(k)?JSON.parse(JSON.stringify(m.get(k))):undefined;return q},
 clear(){m.clear();return __req()},
 delete(k){m.delete(k);return __req()},
 openCursor(){const q=__req(),ents=[...m.entries()];let i=0;const step=()=>{if(i<ents.length){const [k,v]=ents[i++];q.result={key:k,value:v,continue(){Promise.resolve().then(step)}}}else q.result=null;q.onsuccess&&q.onsuccess()};Promise.resolve().then(step);return q}}}};
 Promise.resolve().then(()=>Promise.resolve().then(()=>t.oncomplete&&t.oncomplete()));return t}};r.result=db;r.onupgradeneeded&&r.onupgradeneeded();r.onsuccess&&r.onsuccess()});return r}};

globalThis.location={hash:'',href:'http://localhost/'};
globalThis.BroadcastChannel=class{constructor(){}postMessage(){}close(){}};
