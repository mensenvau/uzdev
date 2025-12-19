-- PUBLIC MODULE INITIALIZATION
-- Views prefixed with vw_public_
-- Adjust definitions to expose only safe columns

SET @dummy := 1;

-- Public user directory (safe subset of fields)
DROP VIEW IF EXISTS vw_public_users;
CREATE VIEW vw_public_users AS
SELECT
  u.id            AS user_id,
  u.first_name    AS first_name,
  u.last_name     AS last_name,
  u.email         AS email
FROM system_users u;

