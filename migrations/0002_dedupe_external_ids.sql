-- Remove duplicate jobs that represent the same source record.
-- Keep the most recently inserted copy before enforcing uniqueness.
DELETE FROM jobs
WHERE external_id IS NOT NULL
  AND external_id <> ''
  AND rowid NOT IN (
    SELECT MAX(rowid)
    FROM jobs
    WHERE external_id IS NOT NULL AND external_id <> ''
    GROUP BY source_key, external_id
  );

CREATE UNIQUE INDEX IF NOT EXISTS idx_jobs_source_external_unique
ON jobs(source_key, external_id)
WHERE external_id IS NOT NULL AND external_id <> '';
