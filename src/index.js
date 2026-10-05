const SOURCES = [
  {
    key: "stc",
    name: "stc Careers",
    company: "stc",
    sector: "خاص",
    host: "careers.stc.com.sa",
    listingUrls: [
      "https://careers.stc.com.sa/viewalljobs/?q=&sortColumn=referencedate&sortDirection=desc",
      "https://careers.stc.com.sa/go/All-Jobs-Except-JAP/7754423/?q=&sortColumn=referencedate&sortDirection=desc"
    ]
  },
  {
    key: "kaust",
    name: "KAUST Careers",
    company: "جامعة الملك عبدالله للعلوم والتقنية",
    sector: "خاص",
    host: "careers.kaust.edu.sa",
    listingUrls: [
      "https://careers.kaust.edu.sa/viewalljobs/?q=&sortColumn=referencedate&sortDirection=desc",
      "https://careers.kaust.edu.sa/KAUST/go/KAUST-Jobs/2989101/?q=&sortColumn=referencedate&sortDirection=desc"
    ]
  }
];

const nowIso = () => new Date().toISOString();

const clean = (value) =>
  String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const decodeBasicEntities = (value) =>
  String(value ?? "")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#x2f;/gi, "/")
    .replace(/&#47;/gi, "/");

const stripHtml = (value) =>
  clean(
    decodeBasicEntities(String(value ?? ""))
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]*>/g, " ")
  );

const absoluteUrl = (href, base) => {
  try {
    return new URL(href, base).href;
  } catch {
    return "";
  }
};

const sha256 = async (value) => {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(String(value))
  );

  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

function externalIdFromUrl(url) {
  const match = String(url).match(/\/(\d{6,})\/?(?:[?#]|$)/);
  return match?.[1] || null;
}

function parseDate(value) {
  const text = clean(value);
  if (!text) return null;

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return null;

  return parsed.toISOString().slice(0, 10);
}

function fieldFromHtml(html, labels) {
  for (const label of labels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = String(html).match(
      new RegExp(
        `${escaped}\\s*:?\\s*(?:<[^>]+>\\s*)*([^<\\n\\r]{1,220})`,
        "i"
      )
    );

    if (match?.[1]) return clean(decodeBasicEntities(match[1]));
  }

  return "";
}

function textAfterLabel(text, labels, maxLength = 250) {
  for (const label of labels) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = text.match(
      new RegExp(`${escaped}\\s*:?\\s*([^|]{1,${maxLength}})`, "i")
    );

    if (match?.[1]) return clean(match[1]).slice(0, maxLength);
  }

  return "";
}

function normalizeListingHtml(html) {
  return decodeBasicEntities(String(html ?? ""))
    .replace(/\\u002f/gi, "/")
    .replace(/\\u002F/g, "/")
    .replace(/\\\//g, "/");
}

function discoverJobUrls(html, source, baseUrl) {
  const normalized = normalizeListingHtml(html);
  const found = new Set();

  const add = (candidate) => {
    if (!candidate) return;

    const url = absoluteUrl(candidate, baseUrl);

    try {
      const parsed = new URL(url);
      if (parsed.hostname !== source.host) return;
      if (!/\/job\//i.test(parsed.pathname)) return;
      if (!/\/\d{6,}\/?$/i.test(parsed.pathname)) return;
      found.add(parsed.href);
    } catch {
      // Ignore invalid URLs.
    }
  };

  const hrefRegex = /<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  let match;

  while ((match = hrefRegex.exec(normalized))) {
    add(match[1]);
  }

  const rawJobRegex =
    /((?:https?:\/\/[^"'<>\\\s]+)?\/job\/[^"'<>\\\s?#]+\/\d{6,}\/?)/gi;

  while ((match = rawJobRegex.exec(normalized))) {
    add(match[1]);
  }

  return [...found];
}

function pageExplicitlyHasNoJobs(html) {
  const text = stripHtml(html).toLowerCase();

  return [
    "there are currently no open positions",
    "0 most recent jobs",
    "no jobs found",
    "لا توجد حاليًا أي مناصب شاغرة",
    "لا توجد وظائف",
    "لا توجد فرص"
  ].some((phrase) => text.includes(phrase.toLowerCase()));
}

function extractDescription(html) {
  const candidates = [
    /Job Purpose([\s\S]{0,6500}?)(?:Job Responsibility|Years of Experience|Education|Apply now|Find similar jobs)/i,
    /Position Summary([\s\S]{0,6500}?)(?:Requirements|Qualifications|Experience|Apply now|Find similar jobs)/i,
    /Major Accountabilities([\s\S]{0,6500}?)(?:Candidate.?s Requirements|Qualifications|Experience|Apply now|Find similar jobs)/i,
    /Role Purpose([\s\S]{0,6500}?)(?:Requirements|Qualifications|Experience|Apply now|Find similar jobs)/i
  ];

  for (const regex of candidates) {
    const match = String(html).match(regex);
    if (match?.[1]) {
      const text = stripHtml(match[1]);
      if (text.length >= 30) return text.slice(0, 1800);
    }
  }

  return stripHtml(html).slice(0, 1200);
}

function extractDetail(html, source, url) {
  const fullText = stripHtml(html);

  const title =
    stripHtml(
      (String(html).match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [
              "",
      ""
    ])[1]
  ) ||
    fieldFromHtml(html, ["Job Title", "Title"]) ||
    clean(
      decodeBasicEntities(
        (String(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [
          "",
          ""
        ])[1]
      )
    ).replace(/\s*[-|]\s*(?:stc|kaust).*$/i, "");

  const city =
    fieldFromHtml(html, [
      "Location",
      "Primary Location",
      "مدينة الوظيفة",
      "الموقع"
    ]) ||
    textAfterLabel(fullText, [
      "Location",
      "Primary Location",
      "مدينة الوظيفة",
      "الموقع"
    ]);

  const qualification =
    fieldFromHtml(html, [
      "Education",
      "Qualifications",
      "Minimum Qualifications",
      "المؤهل",
      "المؤهلات"
    ]) ||
    textAfterLabel(fullText, [
      "Education",
      "Qualifications",
      "Minimum Qualifications",
      "المؤهل",
      "المؤهلات"
    ]);

  const experience =
    fieldFromHtml(html, [
      "Years of Experience",
      "Experience",
      "Minimum Experience",
      "الخبرة"
    ]) ||
    textAfterLabel(fullText, [
      "Years of Experience",
      "Experience",
      "Minimum Experience",
      "الخبرة"
    ]);

  const published =
    fieldFromHtml(html, [
      "Date",
      "Posting Date",
      "Date Posted",
      "تاريخ النشر"
    ]) ||
    textAfterLabel(fullText, [
      "Posting Date",
      "Date Posted",
      "تاريخ النشر"
    ]);

  const description = extractDescription(html);

  const remote =
    /\b(remote|work from home|hybrid)\b/i.test(
      `${title} ${description} ${fullText.slice(0, 3000)}`
    ) ||
    /عن بعد|العمل عن بعد|هجين/.test(
      `${title} ${description} ${fullText.slice(0, 3000)}`
    );

  const freshGraduate =
    /fresh graduate|graduate program|حديثي التخرج|حديث التخرج/i.test(
      `${title} ${description}`
    );

  const noExperience =
    /no experience|0 years|بدون خبرة|لا تشترط الخبرة/i.test(
      `${title} ${description}`
    );

  return {
    external_id: externalIdFromUrl(url),
    title: clean(title),
    company: source.company,
    sector: source.sector,
    city: clean(city) || null,
    region: null,
    work_mode: remote ? "عن بعد/مرن" : null,
    qualification: clean(qualification) || null,
    specialization: null,
    experience: clean(experience) || null,
    salary: null,
    published_at: parseDate(published),
    expires_at: null,
    summary: clean(description) || null,
    source_url: url,
    apply_url: url,
    remote: remote ? 1 : 0,
    fresh_graduate: freshGraduate ? 1 : 0,
    no_experience: noExperience ? 1 : 0
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; MasaaJobsBot/2.0; +https://mas3a.pages.dev)",
      Accept: "text/html,application/xhtml+xml"
    },
    redirect: "follow"
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  return response.text();
}

async function upsertSource(env, source, patch = {}) {
  const timestamp = nowIso();

  await env.DB.prepare(
    `
      INSERT INTO sources (
        source_key, name, url, source_type, sector, enabled, supported,
        last_checked_at, last_success_at, jobs_seen, new_jobs,
        error_count, last_error, status
      )
      VALUES (?, ?, ?, 'successfactors', ?, 1, 1, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(source_key) DO UPDATE SET
        name = excluded.name,
        url = excluded.url,
        sector = excluded.sector,
        last_checked_at = excluded.last_checked_at,
        last_success_at = excluded.last_success_at,
        jobs_seen = excluded.jobs_seen,
        new_jobs = excluded.new_jobs,
        error_count = excluded.error_count,
        last_error = excluded.last_error,
        status = excluded.status
    `
  )
    .bind(
      source.key,
      source.name,
      source.listingUrls[0],
      source.sector,
      timestamp,
      patch.success ? timestamp : null,
      patch.jobsSeen ?? 0,
      patch.newJobs ?? 0,
      patch.error ? 1 : 0,
      patch.error || null,
      patch.status || (patch.success ? "ok" : "error")
    )
    .run();
}

async function saveJob(env, source, job) {
  if (!job.title || !job.apply_url) {
    return { added: false, updated: false };
  }

  const fingerprint = await sha256(
    [
      source.key,
      job.external_id || "",
      job.title,
      job.company,
      job.city || "",
      job.apply_url
    ].join("|")
  );

  const rawHash = await sha256(
    JSON.stringify({
      title: job.title,
      city: job.city,
      qualification: job.qualification,
      experience: job.experience,
      summary: job.summary,
      published_at: job.published_at
    })
  );

  const existing = await env.DB.prepare(
    `SELECT id, raw_hash FROM jobs WHERE fingerprint = ? LIMIT 1`
  )
    .bind(fingerprint)
    .first();

  const timestamp = nowIso();

  if (!existing) {
    const id = crypto.randomUUID();

    await env.DB.prepare(
      `
        INSERT INTO jobs (
          id, source_key, external_id, fingerprint, title, company, sector,
          city, region, work_mode, qualification, specialization, experience,
          salary, published_at, expires_at, summary, source_url, apply_url,
          remote, fresh_graduate, no_experience, discovered_at,
          last_checked_at, status, raw_hash, updated_at
        )
        VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, 'verified', ?, ?
        )
      `
    )
      .bind(
        id,
        source.key,
        job.external_id,
        fingerprint,
        job.title,
        job.company,
        job.sector,
        job.city,
        job.region,
        job.work_mode,
        job.qualification,
        job.specialization,
        job.experience,
        job.salary,
        job.published_at,
        job.expires_at,
        job.summary,
        job.source_url,
        job.apply_url,
        job.remote,
        job.fresh_graduate,
        job.no_experience,
        timestamp,
        timestamp,
        rawHash,
        timestamp
      )
      .run();

    return { added: true, updated: false };
  }

  await env.DB.prepare(
    `
      UPDATE jobs SET
        external_id = ?,
        title = ?,
        company = ?,
        sector = ?,
        city = ?,
        region = ?,
        work_mode = ?,
        qualification = ?,
        specialization = ?,
        experience = ?,
        salary = ?,
        published_at = ?,
        expires_at = ?,
        summary = ?,
        source_url = ?,
        apply_url = ?,
        remote = ?,
        fresh_graduate = ?,
        no_experience = ?,
        last_checked_at = ?,
        status = 'verified',
        raw_hash = ?,
        updated_at = ?
      WHERE id = ?
    `
  )
    .bind(
      job.external_id,
      job.title,
      job.company,
      job.sector,
      job.city,
      job.region,
      job.work_mode,
      job.qualification,
      job.specialization,
      job.experience,
      job.salary,
      job.published_at,
      job.expires_at,
      job.summary,
      job.source_url,
      job.apply_url,
      job.remote,
      job.fresh_graduate,
      job.no_experience,
      timestamp,
      rawHash,
      timestamp,
      existing.id
    )
    .run();

  return {
    added: false,
    updated: existing.raw_hash !== rawHash
  };
}
async function syncSource(env, source) {
  const urls = new Set();
  let listingWorked = false;
  let explicitNoJobs = false;
  const errors = [];

  for (const listingUrl of source.listingUrls) {
    try {
      const html = await fetchText(listingUrl);
      listingWorked = true;

      if (pageExplicitlyHasNoJobs(html)) {
        explicitNoJobs = true;
      }

      for (const url of discoverJobUrls(html, source, listingUrl)) {
        urls.add(url);
      }
    } catch (error) {
      errors.push(clean(error?.message || error));
    }
  }

  if (!listingWorked) {
    const message =
      errors.join(" | ") || "Could not fetch any listing page";

    await upsertSource(env, source, {
      success: false,
      error: message,
      status: "error"
    });

    return {
      source: source.key,
      jobsSeen: 0,
      added: 0,
      updated: 0,
      errors: 1,
      error: message
    };
  }

  if (urls.size === 0 && !explicitNoJobs) {
    const message =
      "Listing pages loaded but no job URLs were discovered; parser may need review.";

    await upsertSource(env, source, {
      success: false,
      error: message,
      status: "needs_review"
    });

    return {
      source: source.key,
      jobsSeen: 0,
      added: 0,
      updated: 0,
      errors: 1,
      error: message
    };
  }

  let added = 0;
  let updated = 0;
  let detailErrors = 0;

  for (const url of [...urls].slice(0, 100)) {
    try {
      const html = await fetchText(url);
      const job = extractDetail(html, source, url);
      const result = await saveJob(env, source, job);

      if (result.added) added += 1;
      if (result.updated) updated += 1;
    } catch {
      detailErrors += 1;
    }
  }

  await upsertSource(env, source, {
    success: detailErrors === 0,
    jobsSeen: urls.size,
    newJobs: added,
    error:
      detailErrors > 0
        ? `${detailErrors} job detail page(s) failed`
        : null,
    status: detailErrors > 0 ? "partial" : "ok"
  });

  return {
    source: source.key,
    jobsSeen: urls.size,
    added,
    updated,
    errors: detailErrors
  };
}

async function runSync(env) {
  const startedAt = nowIso();

  const insert = await env.DB.prepare(
    `
      INSERT INTO sync_runs (
        started_at, sources_checked, jobs_seen,
        jobs_added, jobs_updated, errors
      )
      VALUES (?, 0, 0, 0, 0, 0)
    `
  )
    .bind(startedAt)
    .run();

  const runId = insert.meta?.last_row_id;

  let sourcesChecked = 0;
  let jobsSeen = 0;
  let jobsAdded = 0;
  let jobsUpdated = 0;
  let errors = 0;
  const results = [];

  for (const source of SOURCES) {
    const result = await syncSource(env, source);

    sourcesChecked += 1;
    jobsSeen += result.jobsSeen || 0;
    jobsAdded += result.added || 0;
    jobsUpdated += result.updated || 0;
    errors += result.errors || 0;
    results.push(result);
  }

  const finishedAt = nowIso();

  if (runId) {
    await env.DB.prepare(
      `
        UPDATE sync_runs SET
          finished_at = ?,
          sources_checked = ?,
          jobs_seen = ?,
          jobs_added = ?,
          jobs_updated = ?,
          errors = ?
        WHERE id = ?
      `
    )
      .bind(
        finishedAt,
        sourcesChecked,
        jobsSeen,
        jobsAdded,
        jobsUpdated,
        errors,
        runId
      )
      .run();
  }

  return {
    ok: errors === 0,
    started_at: startedAt,
    finished_at: finishedAt,
    sources_checked: sourcesChecked,
    jobs_seen: jobsSeen,
    jobs_added: jobsAdded,
    jobs_updated: jobsUpdated,
    errors,
    results
  };
}

function corsHeaders(env) {
  return {
    "Access-Control-Allow-Origin": env.CORS_ORIGIN || "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
}

function json(data, env, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders(env)
    }
  });
}

function parseBoolean(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return ["1", "true", "yes", "on"].includes(
    String(value).toLowerCase()
  );
}

async function listJobs(request, env) {
  const url = new URL(request.url);

  const q = clean(url.searchParams.get("q"));
  const city = clean(url.searchParams.get("city"));
  const sector = clean(url.searchParams.get("sector"));
  const source = clean(url.searchParams.get("source"));
  const remote = parseBoolean(url.searchParams.get("remote"));
  const freshGraduate = parseBoolean(
    url.searchParams.get("fresh_graduate")
  );
  const noExperience = parseBoolean(
    url.searchParams.get("no_experience")
  );

  const limit = Math.min(
    Math.max(Number(url.searchParams.get("limit")) || 50, 1),
    100
  );

  const offset = Math.max(
    Number(url.searchParams.get("offset")) || 0,
    0
  );

  const where = ["status = 'verified'"];
  const values = [];

  if (q) {
    where.push(
      `(title LIKE ? OR company LIKE ? OR summary LIKE ? OR city LIKE ?)`
    );

    const term = `%${q}%`;
    values.push(term, term, term, term);
  }

  if (city) {
    where.push("city LIKE ?");
    values.push(`%${city}%`);
  }

  if (sector) {
    where.push("sector = ?");
    values.push(sector);
  }

  if (source) {
    where.push("source_key = ?");
    values.push(source);
  }

  if (remote !== null) {
    where.push("remote = ?");
    values.push(remote ? 1 : 0);
  }

  if (freshGraduate !== null) {
    where.push("fresh_graduate = ?");
    values.push(freshGraduate ? 1 : 0);
  }

  if (noExperience !== null) {
    where.push("no_experience = ?");
    values.push(noExperience ? 1 : 0);
  }

  const sql = `
    SELECT
      id, source_key, external_id, title, company, sector,
      city, region, work_mode, qualification, specialization,
      experience, salary, published_at, expires_at, summary,
      source_url, apply_url, remote, fresh_graduate,
      no_experience, discovered_at, updated_at
    FROM jobs
    WHERE ${where.join(" AND ")}
    ORDER BY
      CASE WHEN published_at IS NULL THEN 1 ELSE 0 END,
      published_at DESC,
      discovered_at DESC
    LIMIT ? OFFSET ?
  `;

  const result = await env.DB.prepare(sql)
    .bind(...values, limit, offset)
    .all();

  return {
    ok: true,
    count: result.results?.length || 0,
    limit,
    offset,
    jobs: result.results || []
  };
}
async function listSources(env) {
  const result = await env.DB.prepare(
    `
      SELECT
        source_key, name, url, source_type, sector,
        enabled, supported, last_checked_at, last_success_at,
        jobs_seen, new_jobs, error_count, last_error, status
      FROM sources
      ORDER BY name ASC
    `
  ).all();

  return {
    ok: true,
    sources: result.results || []
  };
}

async function stats(env) {
  const jobs = await env.DB.prepare(
    `
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN remote = 1 THEN 1 ELSE 0 END) AS remote,
        SUM(CASE WHEN fresh_graduate = 1 THEN 1 ELSE 0 END) AS fresh_graduate,
        SUM(CASE WHEN no_experience = 1 THEN 1 ELSE 0 END) AS no_experience
      FROM jobs
      WHERE status = 'verified'
    `
  ).first();

  const sources = await env.DB.prepare(
    `
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'ok' THEN 1 ELSE 0 END) AS healthy
      FROM sources
    `
  ).first();

  const lastRun = await env.DB.prepare(
    `
      SELECT *
      FROM sync_runs
      ORDER BY id DESC
      LIMIT 1
    `
  ).first();

  return {
    ok: true,
    jobs: jobs || {},
    sources: sources || {},
    last_sync: lastRun || null
  };
}

async function handleRequest(request, env) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(env)
    });
  }

  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  if (request.method === "GET" && path === "/") {
    return json(
      {
        ok: true,
        service: "Masaa Jobs API",
        version: "2.0.0",
        endpoints: [
          "GET /health",
          "GET /jobs",
          "GET /sources",
          "GET /stats",
          "POST /sync"
        ]
      },
      env
    );
  }

  if (request.method === "GET" && path === "/health") {
    return json(
      {
        ok: true,
        service: "Masaa Jobs API",
        version: "2.0.0",
        time: nowIso()
      },
      env
    );
  }

  if (request.method === "GET" && path === "/jobs") {
    try {
      return json(await listJobs(request, env), env);
    } catch (error) {
      return json(
        {
          ok: false,
          error: clean(error?.message || error)
        },
        env,
        500
      );
    }
  }

  if (request.method === "GET" && path === "/sources") {
    try {
      return json(await listSources(env), env);
    } catch (error) {
      return json(
        {
          ok: false,
          error: clean(error?.message || error)
        },
        env,
        500
      );
    }
  }

  if (request.method === "GET" && path === "/stats") {
    try {
      return json(await stats(env), env);
    } catch (error) {
      return json(
        {
          ok: false,
          error: clean(error?.message || error)
        },
        env,
        500
      );
    }
  }

  if (request.method === "POST" && path === "/sync") {
    try {
      const result = await runSync(env);
      return json(result, env, result.ok ? 200 : 207);
    } catch (error) {
      return json(
        {
          ok: false,
          error: clean(error?.message || error)
        },
        env,
        500
      );
    }
  }

  return json(
    {
      ok: false,
      error: "Not found"
    },
    env,
    404
  );
}

export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  },

  async scheduled(_controller, env, ctx) {
    ctx.waitUntil(runSync(env));
  }
};
