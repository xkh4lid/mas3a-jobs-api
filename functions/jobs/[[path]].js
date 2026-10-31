import {AREAS,ORIGIN,esc,slug,jobPath,valid,place,html,response} from './_jobs_shared.js';
export async function onRequestGet({env,params,request}){
 const raw=Array.isArray(params.path)?params.path.join('/'):String(params.path||'');
 const path=decodeURIComponent(raw);
 if(!env.DB)return response(html('وظائف السعودية 2026','<p>الوظائف غير متاحة مؤقتاً.</p>','/jobs/','noindex,follow'),503);
 const {results:jobs=[]}=await env.DB.prepare("SELECT id,title,company,city,region,published_at,expires_at,source_url,apply_url,status FROM jobs WHERE status = 'verified' AND published_at >= '2026-01-01' AND published_at < '2027-01-01' AND (expires_at IS NULL OR expires_at >= ?) ORDER BY published_at DESC LIMIT 5000").bind(new Date().toISOString().slice(0,10)).all();
 const active=jobs.filter(valid);
 const cards=arr=>arr.map(j=>'<article><h2><a href="'+esc(jobPath(j))+'">'+esc(j.title)+'</a></h2><p>'+esc([j.company,j.city,j.region].filter(Boolean).join(' — '))+'</p></article>').join('');
 if(!path||path==='index.html'){
  const links=AREAS.map(a=>{const n=active.filter(j=>place(j,a)).length;return n?'<li><a href="/jobs/'+encodeURIComponent(slug(a))+'">'+esc(a)+' ('+n+')</a></li>':''}).join('');
  return response(html('وظائف السعودية 2026 | جميع المناطق','<p>وظائف موثقة من المصادر الأصلية، مع روابط التقديم الرسمية.</p><ul>'+links+'</ul>'+cards(active),'/jobs/'));
 }
 const area=AREAS.find(a=>path===slug(a));
 if(area){
  const selected=active.filter(j=>place(j,area));
  if(!selected.length)return response(html('وظائف '+area+' 2026','<p>لا توجد وظائف موثقة حالياً لهذه المنطقة.</p>','/jobs/'+encodeURIComponent(slug(area)),'noindex,follow'),200);
  return response(html('وظائف '+area+' 2026 | مسعى','<p>أحدث الوظائف الموثقة في '+esc(area)+'.</p>'+cards(selected),'/jobs/'+encodeURIComponent(slug(area))));
 }
 const match=/^وظيفة-(.+)-2026\.html$/.exec(path);
 if(match){
  const job=active.find(j=>String(j.id)===match[1]);
  if(!job)return response(html('الوظيفة غير متاحة','<p>انتهى الإعلان أو لم يعد موثقاً.</p>','/jobs/','noindex,follow'),404);
  const url=job.apply_url||job.source_url;
  const safe=/^https:\/\//i.test(url||'')?url:null;
  const body='<p>الجهة: '+esc(job.company||'غير محددة')+'</p><p>الموقع: '+esc([job.city,job.region].filter(Boolean).join('، ')||'غير محدد')+'</p><p>تاريخ النشر: '+esc(job.published_at)+'</p>'+(safe?'<p><a rel="noopener noreferrer" href="'+esc(safe)+'">قدّم من المصدر الرسمي</a></p>':'<p>رابط التقديم غير متاح</p>');
  return response(html(job.title+' | وظائف 2026 | مسعى',body,jobPath(job)));
 }
 return response(html('الصفحة غير موجودة','<p>تصفح الوظائف المتاحة.</p>','/jobs/','noindex,follow'),404);
}