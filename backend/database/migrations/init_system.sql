-- ============================================================================
-- SYSTEM MODULE INITIALIZATION
-- ============================================================================
-- This file creates all tables for the system module (system_* prefix)
-- Run this ONCE when setting up the database
--
-- Features:
-- - User management and authentication
-- - Role-based access control (RBAC)
-- - Policy-based permissions
-- - Group management
-- - Dynamic forms with field types
-- - Form access control and responses
--
-- Usage:
--   npm run db:init
-- ============================================================================

-- Drop existing tables if they exist (for clean reinstall)
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `system_form_response_values`;
DROP TABLE IF EXISTS `system_form_responses`;
DROP TABLE IF EXISTS `system_form_field_table_sources`;
DROP TABLE IF EXISTS `system_form_field_options`;
DROP TABLE IF EXISTS `system_form_fields`;
DROP TABLE IF EXISTS `system_form_access`;
DROP TABLE IF EXISTS `system_forms`;
DROP TABLE IF EXISTS `system_group_users`;
DROP TABLE IF EXISTS `system_groups`;
DROP TABLE IF EXISTS `system_user_roles`;
DROP TABLE IF EXISTS `system_role_policies`;
DROP TABLE IF EXISTS `system_policies`;
DROP TABLE IF EXISTS `system_roles`;
DROP TABLE IF EXISTS `system_users`;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================================
-- USERS TABLE
-- ============================================================================
CREATE TABLE `system_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL UNIQUE,
  `username` VARCHAR(255) NULL UNIQUE,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `phone` VARCHAR(50) NULL,
  `password` VARCHAR(255) NULL COMMENT 'Bcrypt hashed password',
  `google_id` VARCHAR(255) NULL UNIQUE COMMENT 'Google OAuth ID',
  `default_role_id` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_email` (`email`),
  INDEX `idx_username` (`username`),
  INDEX `idx_google_id` (`google_id`),
  INDEX `idx_default_role` (`default_role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='System users with authentication';

-- ============================================================================
-- ROLES TABLE
-- ============================================================================
CREATE TABLE `system_roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User roles for RBAC';

-- ============================================================================
-- POLICIES TABLE
-- ============================================================================
CREATE TABLE `system_policies` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Permissions/policies for access control';

-- ============================================================================
-- ROLE-POLICY JUNCTION TABLE
-- ============================================================================
CREATE TABLE `system_role_policies` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_id` INT UNSIGNED NOT NULL,
  `policy_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unique_role_policy` (`role_id`, `policy_id`),
  INDEX `idx_role` (`role_id`),
  INDEX `idx_policy` (`policy_id`),
  CONSTRAINT `fk_role_policies_role` FOREIGN KEY (`role_id`) REFERENCES `system_roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_role_policies_policy` FOREIGN KEY (`policy_id`) REFERENCES `system_policies` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Many-to-many: Roles to Policies';

-- ============================================================================
-- USER-ROLE JUNCTION TABLE
-- ============================================================================
CREATE TABLE `system_user_roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `role_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unique_user_role` (`user_id`, `role_id`),
  INDEX `idx_user` (`user_id`),
  INDEX `idx_role` (`role_id`),
  CONSTRAINT `fk_user_roles_user` FOREIGN KEY (`user_id`) REFERENCES `system_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user_roles_role` FOREIGN KEY (`role_id`) REFERENCES `system_roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Many-to-many: Users to Roles';

-- Add foreign key for default_role_id in users table
ALTER TABLE `system_users`
  ADD CONSTRAINT `fk_users_default_role` FOREIGN KEY (`default_role_id`) REFERENCES `system_roles` (`id`) ON DELETE SET NULL;

-- ============================================================================
-- GROUPS TABLE
-- ============================================================================
CREATE TABLE `system_groups` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User groups for organization';

-- ============================================================================
-- GROUP-USER JUNCTION TABLE
-- ============================================================================
CREATE TABLE `system_group_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `group_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `unique_group_user` (`group_id`, `user_id`),
  INDEX `idx_group` (`group_id`),
  INDEX `idx_user` (`user_id`),
  CONSTRAINT `fk_group_users_group` FOREIGN KEY (`group_id`) REFERENCES `system_groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_group_users_user` FOREIGN KEY (`user_id`) REFERENCES `system_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Many-to-many: Groups to Users';

-- ============================================================================
-- FORMS TABLE
-- ============================================================================
CREATE TABLE `system_forms` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `created_by` INT UNSIGNED NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_created_by` (`created_by`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_created_at` (`created_at`),
  CONSTRAINT `fk_forms_creator` FOREIGN KEY (`created_by`) REFERENCES `system_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Dynamic forms for data collection';

-- ============================================================================
-- FORM ACCESS TABLE
-- ============================================================================
CREATE TABLE `system_form_access` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `form_id` INT UNSIGNED NOT NULL,
  `access_type` ENUM('role', 'group', 'link') NOT NULL DEFAULT 'role',
  `access_value` VARCHAR(255) NOT NULL COMMENT 'Role name, group ID, or link token',
  `expires_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_form` (`form_id`),
  INDEX `idx_access_type_value` (`access_type`, `access_value`),
  INDEX `idx_expires_at` (`expires_at`),
  CONSTRAINT `fk_form_access_form` FOREIGN KEY (`form_id`) REFERENCES `system_forms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Form access control by role/group/link';

-- ============================================================================
-- FORM FIELDS TABLE
-- ============================================================================
CREATE TABLE `system_form_fields` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `form_id` INT UNSIGNED NOT NULL,
  `field_key` VARCHAR(255) NOT NULL,
  `label` VARCHAR(255) NOT NULL,
  `field_type` ENUM('text', 'textarea', 'number', 'select', 'checkbox', 'radio', 'table_select', 'score') NOT NULL,
  `mode` ENUM('question', 'check') NOT NULL DEFAULT 'question',
  `is_required` BOOLEAN NOT NULL DEFAULT FALSE,
  `field_order` INT NOT NULL DEFAULT 0,
  `settings` JSON NULL COMMENT 'Additional field settings',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_form` (`form_id`),
  INDEX `idx_field_order` (`field_order`),
  CONSTRAINT `fk_form_fields_form` FOREIGN KEY (`form_id`) REFERENCES `system_forms` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Form field definitions';

-- ============================================================================
-- FORM FIELD OPTIONS TABLE
-- ============================================================================
CREATE TABLE `system_form_field_options` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `field_id` INT UNSIGNED NOT NULL,
  `value` VARCHAR(255) NOT NULL,
  `label` VARCHAR(255) NULL,
  `score` INT NOT NULL DEFAULT 0,
  `option_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_field` (`field_id`),
  INDEX `idx_option_order` (`option_order`),
  CONSTRAINT `fk_field_options_field` FOREIGN KEY (`field_id`) REFERENCES `system_form_fields` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Options for select/checkbox/radio fields';

-- ============================================================================
-- FORM FIELD TABLE SOURCE
-- ============================================================================
CREATE TABLE `system_form_field_table_sources` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `field_id` INT UNSIGNED NOT NULL UNIQUE,
  `source_table` VARCHAR(255) NOT NULL,
  `source_value_column` VARCHAR(255) NOT NULL,
  `source_label_column` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idx_field` (`field_id`),
  CONSTRAINT `fk_field_table_source_field` FOREIGN KEY (`field_id`) REFERENCES `system_form_fields` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Dynamic table source for table_select fields';

-- ============================================================================
-- FORM RESPONSES TABLE
-- ============================================================================
CREATE TABLE `system_form_responses` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `form_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NULL,
  `total_score` INT NOT NULL DEFAULT 0,
  `status` ENUM('draft', 'submitted', 'reviewed') NOT NULL DEFAULT 'draft',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_form` (`form_id`),
  INDEX `idx_user` (`user_id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_created_at` (`created_at`),
  INDEX `idx_form_created` (`form_id`, `created_at`),
  CONSTRAINT `fk_responses_form` FOREIGN KEY (`form_id`) REFERENCES `system_forms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_responses_user` FOREIGN KEY (`user_id`) REFERENCES `system_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='User submissions to forms';

-- ============================================================================
-- FORM RESPONSE VALUES TABLE
-- ============================================================================
CREATE TABLE `system_form_response_values` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `response_id` INT UNSIGNED NOT NULL,
  `field_id` INT UNSIGNED NOT NULL,
  `value` TEXT NULL COMMENT 'User answer value',
  `score` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_response` (`response_id`),
  INDEX `idx_field` (`field_id`),
  CONSTRAINT `fk_response_values_response` FOREIGN KEY (`response_id`) REFERENCES `system_form_responses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_response_values_field` FOREIGN KEY (`field_id`) REFERENCES `system_form_fields` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Individual field values in form responses';

-- ============================================================================
-- INITIALIZATION COMPLETE
-- ============================================================================
-- All system_* tables have been created with:
-- - Proper indexes for performance
-- - Foreign key constraints for data integrity
-- - UTF8MB4 encoding for full Unicode support
-- - InnoDB engine for ACID transactions
--
-- Next step: Run seed_system.sql to populate initial data
-- ============================================================================
