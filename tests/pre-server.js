globalThis.__srv={ver:0,data:null,pw:'serverpw',cookie:false,calls:[]};
{const f=require('fs');const file=process.env.MQ_SRV;if(file&&f.existsSync(file)){const d=JSON.parse(f.readFileSync(file,'utf8'));__srv.ver=d.ver;__srv.data=d.data}}
globalThis.fetch=async(url,opts={})=>{const m=(opts.method||'GET').toUpperCase();__srv.calls.push(m+' '+url);const J=(code,b)=>({ok:code>=200&&code<300,status:code,json:async()=>b});
 if(url=='/api/state'&&m=='GET')return J(200,{server:true,version:__srv.ver,data:__srv.data});
 if(url=='/api/state'&&m=='PUT'){if(!__srv.cookie)return J(401,{error:'unauthorized'});const b=JSON.parse(opts.body);if(b.base!==__srv.ver)return J(409,{error:'conflict'});__srv.ver++;__srv.data=JSON.parse(JSON.stringify(b.data));return J(200,{server:true,version:__srv.ver})}
 if(url=='/api/me')return J(200,{admin:__srv.cookie});
 if(url=='/api/login'){const b=JSON.parse(opts.body);if(b.password==__srv.pw){__srv.cookie=true;return J(200,{ok:true})}return J(401,{ok:false})}
 if(url=='/api/logout'){__srv.cookie=false;return J(200,{ok:true})}
 return J(404,{})};
