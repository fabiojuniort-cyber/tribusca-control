-- F2-119: draft de observação; NÃO executado em produção.
-- Nenhum PID, query text, nome livre de usuário/aplicação, IP ou identificador de cliente sai no resultado.
-- Requer canal/autorização de leitura próprios; esta preparação não autoriza execução produtiva.
BEGIN TRANSACTION READ ONLY;

WITH target_rows AS MATERIALIZED (
  SELECT l.pid, l.granted, l.mode, l.waitstart
  FROM pg_catalog.pg_locks AS l
  WHERE l.locktype = 'advisory'
    AND l.database = (SELECT oid FROM pg_catalog.pg_database WHERE datname = current_database())
    AND l.objsubid = 1
    AND ((l.classid::bigint << 32) | l.objid::bigint)
        = pg_catalog.hashtextextended('collection-filter-direct-rule', 0)
), sampled AS MATERIALIZED (
  SELECT * FROM target_rows ORDER BY granted, pid NULLS LAST LIMIT 20
), blocker_ids AS MATERIALIZED (
  SELECT DISTINCT blocker.pid
  FROM sampled AS waiter
  CROSS JOIN LATERAL unnest(pg_catalog.pg_blocking_pids(waiter.pid)) AS blocker(pid)
  WHERE NOT waiter.granted AND waiter.pid IS NOT NULL
), raw_observations AS (
  SELECT CASE WHEN s.granted THEN 'TARGET_GRANTED' ELSE 'TARGET_WAITING' END AS observation,
         s.pid, s.mode, s.waitstart
  FROM sampled AS s
  UNION ALL
  SELECT 'BLOCKER_REPORTED', b.pid, NULL::text, NULL::timestamptz
  FROM blocker_ids AS b
), safe_observations AS (
  SELECT o.observation,
         CASE WHEN o.pid = 0 THEN 'PREPARED_TRANSACTION'
              WHEN a.usename = 'radar_app_runtime' THEN 'APP_ROLE'
              WHEN a.usename = 'radar_worker_runtime' THEN 'WORKER_ROLE'
              ELSE 'OTHER_OR_UNKNOWN' END AS role_bucket,
         o.mode AS lock_mode,
         CASE WHEN a.state IN ('active','idle','idle in transaction','idle in transaction (aborted)','disabled')
              THEN a.state ELSE 'UNKNOWN' END AS state_bucket,
         CASE WHEN a.xact_start IS NOT NULL
              THEN greatest(0, extract(epoch FROM (clock_timestamp()-a.xact_start))*1000)::bigint END AS transaction_age_ms,
         CASE WHEN a.query_start IS NOT NULL
              THEN greatest(0, extract(epoch FROM (clock_timestamp()-a.query_start))*1000)::bigint END AS statement_age_ms,
         CASE WHEN o.waitstart IS NOT NULL
              THEN greatest(0, extract(epoch FROM (clock_timestamp()-o.waitstart))*1000)::bigint END AS lock_wait_ms
  FROM raw_observations AS o
  LEFT JOIN pg_catalog.pg_stat_activity AS a ON a.pid = o.pid
), grouped AS (
  SELECT observation, role_bucket, lock_mode, state_bucket,
         count(*) AS observed_rows,
         count(transaction_age_ms) AS rows_with_transaction_timing,
         max(transaction_age_ms) AS max_transaction_age_ms,
         max(statement_age_ms) AS max_statement_age_ms,
         max(lock_wait_ms) AS max_lock_wait_ms
  FROM safe_observations
  GROUP BY observation, role_bucket, lock_mode, state_bucket
)
SELECT jsonb_build_object(
  'sampled_at', clock_timestamp(),
  'consistency', 'NON_ATOMIC_OBSERVATION',
  'target_rows_observed', (SELECT count(*) FROM target_rows),
  'target_rows_sampled', (SELECT count(*) FROM sampled),
  'sample_limit', 20,
  'sample_truncated', (SELECT count(*) > 20 FROM target_rows),
  'groups', coalesce((SELECT jsonb_agg(to_jsonb(g) ORDER BY observation, role_bucket, lock_mode, state_bucket) FROM grouped AS g), '[]'::jsonb)
) AS sanitized_lock_observation;

ROLLBACK;
