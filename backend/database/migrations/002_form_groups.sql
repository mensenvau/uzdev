-- ============================================================================
-- FORM-GROUP JUNCTION TABLE
-- ============================================================================
CREATE TABLE `form_groups` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `form_id` VARCHAR(255) NOT NULL COMMENT 'Google Form ID',
  `group_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_form_group` (`form_id`, `group_id`),
  INDEX `idx_form_id` (`form_id`),
  INDEX `idx_group_id` (`group_id`),
  CONSTRAINT `fk_form_groups_group` FOREIGN KEY (`group_id`) REFERENCES `system_groups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Form group assignments';
