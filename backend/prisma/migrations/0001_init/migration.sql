-- Prisma migration: initial schema (departments removed)

CREATE TABLE `system_users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL UNIQUE,
  `username` VARCHAR(100) NULL UNIQUE,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `phone` VARCHAR(50) NULL,
  `password` VARCHAR(255) NULL,
  `google_id` VARCHAR(255) NULL UNIQUE,
  `default_role_id` BIGINT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_roles` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_policies` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_role_policies` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `role_id` BIGINT NOT NULL,
  `policy_id` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_role_policy` (`role_id`, `policy_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `role_policy_role_fk` FOREIGN KEY (`role_id`) REFERENCES `system_roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_policy_policy_fk` FOREIGN KEY (`policy_id`) REFERENCES `system_policies` (`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_user_roles` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `role_id` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_user_role` (`user_id`, `role_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `user_role_user_fk` FOREIGN KEY (`user_id`) REFERENCES `system_users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_role_fk` FOREIGN KEY (`role_id`) REFERENCES `system_roles` (`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_groups` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_group_users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `group_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_group_user` (`group_id`, `user_id`),
  PRIMARY KEY (`id`),
  CONSTRAINT `group_user_group_fk` FOREIGN KEY (`group_id`) REFERENCES `system_groups` (`id`) ON DELETE CASCADE,
  CONSTRAINT `group_user_user_fk` FOREIGN KEY (`user_id`) REFERENCES `system_users` (`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_forms` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `created_by` BIGINT NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT TRUE,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `form_user_fk` FOREIGN KEY (`created_by`) REFERENCES `system_users` (`id`) ON DELETE SET NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_form_access` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `form_id` BIGINT NOT NULL,
  `access_type` ENUM('role', 'group', 'link') NOT NULL,
  `access_value` VARCHAR(255) NOT NULL,
  `expires_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `form_access_form_fk` FOREIGN KEY (`form_id`) REFERENCES `system_forms` (`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_form_fields` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `form_id` BIGINT NOT NULL,
  `field_key` VARCHAR(100) NOT NULL,
  `label` VARCHAR(255) NOT NULL,
  `field_type` ENUM('text','textarea','number','select','checkbox','radio','table_select','score') NOT NULL,
  `mode` ENUM('question', 'check') NOT NULL DEFAULT 'question',
  `is_required` BOOLEAN NOT NULL DEFAULT FALSE,
  `field_order` INT NOT NULL DEFAULT 0,
  `settings` JSON NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `form_field_form_fk` FOREIGN KEY (`form_id`) REFERENCES `system_forms` (`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_form_field_options` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `field_id` BIGINT NOT NULL,
  `value` VARCHAR(255) NOT NULL,
  `label` VARCHAR(255) NULL,
  `score` INT NOT NULL DEFAULT 0,
  `option_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `form_field_option_field_fk` FOREIGN KEY (`field_id`) REFERENCES `system_form_fields` (`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_form_field_table_sources` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `field_id` BIGINT NOT NULL,
  `source_table` VARCHAR(100) NOT NULL,
  `source_value_column` VARCHAR(100) NOT NULL,
  `source_label_column` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `form_field_table_source_field_fk` FOREIGN KEY (`field_id`) REFERENCES `system_form_fields` (`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_form_responses` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `form_id` BIGINT NOT NULL,
  `user_id` BIGINT NULL,
  `total_score` INT NOT NULL DEFAULT 0,
  `status` ENUM('draft', 'submitted', 'reviewed') NOT NULL DEFAULT 'draft',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `form_response_form_fk` FOREIGN KEY (`form_id`) REFERENCES `system_forms` (`id`) ON DELETE CASCADE,
  CONSTRAINT `form_response_user_fk` FOREIGN KEY (`user_id`) REFERENCES `system_users` (`id`) ON DELETE SET NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `system_form_response_values` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `response_id` BIGINT NOT NULL,
  `field_id` BIGINT NOT NULL,
  `value` TEXT NULL,
  `score` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `form_response_value_response_fk` FOREIGN KEY (`response_id`) REFERENCES `system_form_responses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `form_response_value_field_fk` FOREIGN KEY (`field_id`) REFERENCES `system_form_fields` (`id`) ON DELETE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE INDEX `idx_system_users_email` ON `system_users` (`email`);
CREATE INDEX `idx_system_users_username` ON `system_users` (`username`);
CREATE INDEX `idx_system_users_google_id` ON `system_users` (`google_id`);
CREATE INDEX `idx_system_form_access_form_id` ON `system_form_access` (`form_id`);
CREATE INDEX `idx_system_form_fields_form_id` ON `system_form_fields` (`form_id`);
CREATE INDEX `idx_system_form_responses_form_id` ON `system_form_responses` (`form_id`);
CREATE INDEX `idx_system_form_responses_user_id` ON `system_form_responses` (`user_id`);
