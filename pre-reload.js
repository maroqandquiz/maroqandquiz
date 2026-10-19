{const d=JSON.parse(require('fs').readFileSync(process.env.MQ_DB||'/tmp/t/db.json','utf8'));for(const [k,v] of d.kv)__store.kv.set(k,v);for(const [k,v] of d.media)__store.media.set(k,v)}
