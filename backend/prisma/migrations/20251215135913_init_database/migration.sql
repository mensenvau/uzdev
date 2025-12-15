-- CreateTable
CREATE TABLE `system_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `first_name` VARCHAR(100) NULL,
    `last_name` VARCHAR(100) NULL,
    `phone` VARCHAR(50) NULL,
    `password` VARCHAR(255) NULL,
    `google_id` VARCHAR(191) NULL,
    `default_role_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `system_users_email_key`(`email`),
    UNIQUE INDEX `system_users_username_key`(`username`),
    UNIQUE INDEX `system_users_google_id_key`(`google_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `system_roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_policies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `system_policies_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_role_policies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_id` INTEGER NOT NULL,
    `policy_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `unique_role_policy`(`role_id`, `policy_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_user_roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `role_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `unique_user_role`(`user_id`, `role_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_group_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `unique_group_user`(`group_id`, `user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_forms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_by` INTEGER NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_form_access` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `form_id` INTEGER NOT NULL,
    `access_type` ENUM('role', 'group', 'link') NOT NULL DEFAULT 'role',
    `access_value` VARCHAR(191) NOT NULL,
    `expires_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_form_fields` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `form_id` INTEGER NOT NULL,
    `field_key` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `field_type` ENUM('text', 'textarea', 'number', 'select', 'checkbox', 'radio', 'table_select', 'score') NOT NULL,
    `mode` ENUM('question', 'check') NOT NULL DEFAULT 'question',
    `is_required` BOOLEAN NOT NULL DEFAULT false,
    `field_order` INTEGER NOT NULL DEFAULT 0,
    `settings` JSON NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_form_field_options` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `field_id` INTEGER NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NULL,
    `score` INTEGER NOT NULL DEFAULT 0,
    `option_order` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_form_field_table_sources` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `field_id` INTEGER NOT NULL,
    `source_table` VARCHAR(191) NOT NULL,
    `source_value_column` VARCHAR(191) NOT NULL,
    `source_label_column` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `system_form_field_table_sources_field_id_key`(`field_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_form_responses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `form_id` INTEGER NOT NULL,
    `user_id` INTEGER NULL,
    `total_score` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('draft', 'submitted', 'reviewed') NOT NULL DEFAULT 'draft',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `system_form_response_values` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `response_id` INTEGER NOT NULL,
    `field_id` INTEGER NOT NULL,
    `value` VARCHAR(191) NULL,
    `score` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `system_users` ADD CONSTRAINT `system_users_default_role_id_fkey` FOREIGN KEY (`default_role_id`) REFERENCES `system_roles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_role_policies` ADD CONSTRAINT `system_role_policies_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `system_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_role_policies` ADD CONSTRAINT `system_role_policies_policy_id_fkey` FOREIGN KEY (`policy_id`) REFERENCES `system_policies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_user_roles` ADD CONSTRAINT `system_user_roles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `system_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_user_roles` ADD CONSTRAINT `system_user_roles_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `system_roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_group_users` ADD CONSTRAINT `system_group_users_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `system_groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_group_users` ADD CONSTRAINT `system_group_users_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `system_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_forms` ADD CONSTRAINT `system_forms_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `system_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_form_access` ADD CONSTRAINT `system_form_access_form_id_fkey` FOREIGN KEY (`form_id`) REFERENCES `system_forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_form_fields` ADD CONSTRAINT `system_form_fields_form_id_fkey` FOREIGN KEY (`form_id`) REFERENCES `system_forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_form_field_options` ADD CONSTRAINT `system_form_field_options_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `system_form_fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_form_field_table_sources` ADD CONSTRAINT `system_form_field_table_sources_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `system_form_fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_form_responses` ADD CONSTRAINT `system_form_responses_form_id_fkey` FOREIGN KEY (`form_id`) REFERENCES `system_forms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_form_responses` ADD CONSTRAINT `system_form_responses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `system_users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_form_response_values` ADD CONSTRAINT `system_form_response_values_response_id_fkey` FOREIGN KEY (`response_id`) REFERENCES `system_form_responses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `system_form_response_values` ADD CONSTRAINT `system_form_response_values_field_id_fkey` FOREIGN KEY (`field_id`) REFERENCES `system_form_fields`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
