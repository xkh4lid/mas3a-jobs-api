import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  canonicalOfficialUrl, SOURCE_HOSTS, APPLY_HOSTS,
  trustCandidate, auditSecurity, reviewMilitaryReport, reportMarkdown
} from "../coordinate.mjs";

const config=JSON.parse(readFileSync(new URL("../../.agents/masaa-agents.json",import.meta.url),"utf8"));
const item=()=>({
  sourceKey:"spa-military",
  sourceUrl:"https://www.spa.gov.sa/ar/N123456",
  status:200,
  title:"فتح باب القبول والتسجيل في الخدمة العسكرية",
  militarySignal:true,
  closed:false,
  challenge:false,
  auth:false,
  publishable:true,
  applyLinks:[{url:"https://jobs.sa/apply/123"}]
});
const report=(candidates=[item()])=>({
  generatedAt:"2026-10-08T00:00:00.000Z",
  policy:{bypassCaptcha:false,bypassLogin:false,officialPublicPagesOnly:true},
  sources:[{sourceKey:"spa-military",ok:true,status:200}],
  candidates
});

test("accepts ONLY exact official https hosts, rejects lookalikes and credentials",()=>{
  assert.ok(canonicalOfficialUrl("https://www.spa.gov.sa/ar/N123?utm_source=x",SOURCE_HOSTS));
  assert.equal(canonicalOfficialUrl("https://www.spa.gov.sa.attacker.com/ar/N123",SOURCE_HOSTS),null);
  assert.equal(canonicalOfficialUrl("http://www.spa.gov.sa/ar/N123",SOURCE_HOSTS),null);
  assert.equal(canonicalOfficialUrl("https://guest:password@jobs.sa/apply",APPLY_HOSTS),null);
  assert.equal(canonicalOfficialUrl("https://jobs.sa:444/apply",APPLY_HOSTS),null);
  assert.ok(canonicalOfficialUrl("https://tajnid.mod.gov.sa/apply/123",APPLY_HOSTS));
});

test("passing all checks still cannot auto publish",()=>{
  const result=trustCandidate(item());
  assert.equal(result.status,"needs_manual_verification");
  assert.equal(result.publishable,false);
  const summary=reviewMilitaryReport(report(),config);
  assert.equal(summary.gate.publishAllowed,false);
  assert.equal(summary.gate.deployAllowed,false);
  assert.equal(summary.gate.mergeAllowed,false);
  assert.equal(summary.provider,"none");
  assert.equal(summary.spendUsd,0);
  assert.equal(summary.agents.length,6);
  assert.match(reportMarkdown(summary),/Auto-publish/);
});

test("rejected if closed, challenged, redirected, missing apply link, or portal home only",()=>{
  for(const patch of [
    {closed:true},{challenge:true},{auth:true},
    {sourceUrl:"https://evil.example/ar/N123"},
    {applyLinks:[{url:"https://evil.example/application"}]},
    {applyLinks:[{url:"https://jobs.sa/"}]},
    {status:404}
  ]){
    const result=trustCandidate({...item(),...patch});
    assert.equal(result.status,"rejected_or_unconfirmed");
    assert.equal(result.publishable,false);
    assert.ok(result.reasons.length>0);
  }
});

test("duplicate announcements flagged and not double-counted as ready",()=>{
 const a=item(), b={...item(),title:"تجنيد جديد"};
 const result=reviewMilitaryReport(report([a,b]),config);
 assert.equal(result.candidates[0].status,"needs_manual_verification");
 assert.equal(result.candidates[1].status,"duplicate");
 assert.equal(result.agents[2].duplicates,1);
});

test("unsafe or incomplete upstream policy is rejected, not ignored",()=>{
 assert.throws(()=>reviewMilitaryReport({...report(),policy:{bypassCaptcha:true,bypassLogin:false,officialPublicPagesOnly:true}},config),/safe public-only/);
 assert.throws(()=>reviewMilitaryReport({sources:[]},config),/Missing/);
 assert.throws(()=>reviewMilitaryReport(report(),{...config,productionWrites:true}),/Invalid Masaa/);
 assert.throws(()=>reviewMilitaryReport(report(),{...config,maxAgents:99}),/Invalid Masaa/);
});

test("report processing never executes web page text or commands",()=>{
 const payload="`rm -rf /` <script>alert(1)</script>";
 const suspicious={...item(),title:payload,applyLinks:[{url:"https://jobs.sa/apply/123"}]};
 const output=reviewMilitaryReport(report([suspicious]),config);
 assert.equal(output.gate.publishAllowed,false);
 assert.equal(output.agents.length,6);
 const markdown=reportMarkdown(output);
 assert.doesNotMatch(markdown,/<script>/);
 assert.equal(auditSecurity(report([{...item(),applyLinks:[{url:"https://evil.example/x"}]}])).issues.length,1);
});
