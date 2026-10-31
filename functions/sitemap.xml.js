import {AREAS,ORIGIN,slug,jobPath,valid,place} from './_jobs_shared.js';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
export async function onRequestGet({env}){
 const urls=[{path:'/',lastmod:null},{path:'/jobs/',lastmod:null}];
 if(env.DB){
  try{
   const {results:rows=[]}=await env.DB.prepare("SELECT id,city,region,company,published_at,updated_at,expires_at,status FROM jobs WHERE status='verified' AND published_at >= '2026-01-01' AND published_at < '2027-01-01' AND (expires_at IS NULL OR expires_at >= ?) ORDER BY published_at DESC LIMIT 5000").bind(new Date().toISOString().slice(0,10)).all();
   const jobs=rows.filter(valid);
   for(const a of AREAS){const matching=jobs.filter(j=>place(j,a));if(matching.length)urls.push({path:'/jobs/'+encodeURIComponent(slug(a)),lastmod:matching.map(j=>j.updated_at||j.published_at).sort().at(-1)});}
   for(const j of jobs)urls.push({path:jobPath(j),lastmod:j.updated_at||j.published_at});
  }catch(e){console.error('sitemap D1 unavailable',e);}
 }
 const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+urls.map(u=>'<url><loc>'+esc(ORIGIN+u.path)+'</loc>'+(u.lastmod?'<lastmod>'+esc(String(u.lastmod).slice(0,10))+'</lastmod>':'')+'</url>').join('\n')+'\n</urlset>';
 return new Response(xml,{status:200,headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public,max-age=300'}});
}