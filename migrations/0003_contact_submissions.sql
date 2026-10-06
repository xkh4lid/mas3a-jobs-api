CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  organization TEXT,
  job_title TEXT,
  source_url TEXT,
  contact_email TEXT,
  details TEXT NOT NULL,
  submission_hash TEXT NOT NULL,
  submitted_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_hash ON contact_submissions(submission_hash);
