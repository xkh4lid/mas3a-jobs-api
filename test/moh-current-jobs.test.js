import test from "node:test";
import assert from "node:assert/strict";
import { extractMohCurrentJobs } from "../src/index.js";
const source = { company:"وزارة الصحة", url:"https://www.moh.gov.sa/ministry/about/pages/work-for-us.aspx" };
test("extracts active Ministry of Health government recruitment and ignores old announcements", () => {
 const html = '<p>الوظائف الحالية:</p><table><tr><th>​إعلان الأطباء والتمريض​<br/></th><td>من بداية السنة</td><td>إلى نهاية السنة</td><td>قائم</td></tr></table><p>الوظائف السابقة:</p><table><tr><th>إعلان الأمن السيبراني</th><td>1443</td><td>1443</td><td>انتهى</td></tr></table>';
 const result = extractMohCurrentJobs(html,source);
 assert.equal(result.parsed,true);
 assert.equal(result.jobs.length,1);
 assert.equal(result.jobs[0].title,"إعلان الأطباء والتمريض");
 assert.equal(result.jobs[0].sector,"حكومي");
 assert.equal(result.jobs[0].apply_url,source.url);
});
test("does not declare missing jobs when current-section format unexpectedly changes",()=>{
 const result=extractMohCurrentJobs("<p>الوظائف الحالية:</p><div>صفحة جديدة قيد التحديث</div>",source);
 assert.equal(result.jobs.length,0);
 assert.notEqual(result.explicitNoJobs,true);
});
