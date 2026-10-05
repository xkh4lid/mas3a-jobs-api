CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  source_key TEXT NOT NULL,
  external_id TEXT,
  fingerprint TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  sector TEXT NOT NULL DEFAULT 'خاص',
  city TEXT,
  region TEXT,
  work_mode TEXT,
  qualification TEXT,
  specialization TEXT,
  experience TEXT,
  salary TEXT,
  published_at TEXT,
  expires_at TEXT,
  summary TEXT,
  source_url TEXT NOT NULL,
  apply_url TEXT NOT NULL,
  remote INTEGER NOT NULL DEFAULT 0,
  fresh_graduate INTEGER NOT NULL DEFAULT 0,
  no_experience INTEGER NOT NULL DEFAULT 0,
  discovered_at TEXT NOT NULL,
  last_checked_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'verified',
  raw_hash TEXT,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_jobs_status_published
ON jobs(status, published_at DESC);

CREATE INDEX IF NOT EXISTS idx_jobs_source_external
ON jobs(source_key, external_id);

CREATE TABLE IF NOT EXISTS sources (
  source_key TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  source_type TEXT NOT NULL,
  sector TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  supported INTEGER NOT NULL DEFAULT 1,
  last_checked_at TEXT,
  last_success_at TEXT,
  jobs_seen INTEGER NOT NULL DEFAULT 0,
  new_jobs INTEGER NOT NULL DEFAULT 0,
  error_count INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  status TEXT NOT NULL DEFAULT 'needs_review'
);

CREATE TABLE IF NOT EXISTS sync_runs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at TEXT NOT NULL,
  finished_at TEXT,
  sources_checked INTEGER NOT NULL DEFAULT 0,
  jobs_seen INTEGER NOT NULL DEFAULT 0,
  jobs_added INTEGER NOT NULL DEFAULT 0,
  jobs_updated INTEGER NOT NULL DEFAULT 0,
  errors INTEGER NOT NULL DEFAULT 0
);
