-- ============================================================================
-- SYSTEM MODULE INITIALIZATION
-- ============================================================================
-- This file creates all tables for the system module (system_* prefix) plus system_form_groups mapping
-- Run this ONCE when setting up the database
--
-- Features:
-- - User management and authentication
-- - Role-based access control (RBAC)
-- - Policy-based permissions
-- - Group management and membership
-- - Google Form to group assignments
--
-- Usage:
--   npm run db:init
-- ============================================================================

-- Drop existing tables if they exist (for clean reinstall)
SET FOREIGN_KEY_CHECKS = 0;

-- Cleanup legacy name and current name for form-group mapping
DROP TABLE IF EXISTS `form_groups`;
DROP TABLE IF EXISTS `system_form_groups`;
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
-- GOOGLE FORM TO GROUP ASSIGNMENTS
-- ============================================================================
CREATE TABLE `system_form_groups` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `form_id` VARCHAR(255) NOT NULL COMMENT 'Google Form ID',
  `group_id` INT UNSIGNED NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_form_group` (`form_id`, `group_id`),
  INDEX `idx_form_id` (`form_id`),
  INDEX `idx_group_id` (`group_id`),
  CONSTRAINT `fk_system_form_groups_group` FOREIGN KEY (`group_id`) REFERENCES `system_groups` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Google Form assignments to system groups';

-- ============================================================================
-- INITIALIZATION COMPLETE
-- ============================================================================
-- Base tables have been created with:
-- - Proper indexes for performance
-- - Foreign key constraints for data integrity
-- - UTF8MB4 encoding for full Unicode support
-- - InnoDB engine for ACID transactions
--
-- Next step: Run seed_system.sql to populate initial data
-- ============================================================================
