-- ============================================================================
-- SYSTEM MODULE SEED DATA
-- ============================================================================
-- This file populates initial data for the system module
-- Run this AFTER init_system.sql
--
-- Includes:
-- - 4 default roles (super, admin, user, guest)
-- - 68 policies for access control
-- - Role-policy assignments
-- - 3 default groups
-- - 1 super admin user
--
-- Usage:
--   npm run db:seed
-- ============================================================================

-- ============================================================================
-- ROLES
-- ============================================================================
INSERT INTO `system_roles` (`name`, `description`) VALUES
('super', 'Full system access - all permissions'),
('admin', 'Administrative access - most permissions'),
('user', 'Standard user access - limited permissions'),
('guest', 'Guest access - minimal permissions')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- ============================================================================
-- POLICIES
-- ============================================================================
INSERT INTO `system_policies` (`name`, `description`) VALUES
-- User Policies
('user.list', 'List all users'),
('user.get', 'Get user details'),
('user.create', 'Create new users'),
('user.edit', 'Edit user information'),
('user.delete', 'Delete users'),

-- Role Policies
('role.list', 'List all roles'),
('role.get', 'Get role details'),
('role.create', 'Create new roles'),
('role.edit', 'Edit role information'),
('role.delete', 'Delete roles'),
('role.assign', 'Assign roles to users'),
('role.remove', 'Remove roles from users'),

-- Policy Policies
('policy.list', 'List all policies'),
('policy.get', 'Get policy details'),
('policy.create', 'Create new policies'),
('policy.edit', 'Edit policy information'),
('policy.delete', 'Delete policies'),
('policy.assign', 'Assign policies to roles'),

-- Group Policies
('group.list', 'List all groups'),
('group.get', 'Get group details'),
('group.create', 'Create new groups'),
('group.edit', 'Edit group information'),
('group.delete', 'Delete groups'),
('group.assign', 'Add users to groups'),
('group.remove', 'Remove users from groups'),

-- Form Policies (Dynamic Forms System)
('form.list', 'List all forms'),
('form.get', 'Get form details'),
('form.create', 'Create new forms'),
('form.edit', 'Edit form structure'),
('form.delete', 'Delete forms'),
('form.submit', 'Submit form responses'),
('form.view_responses', 'View form responses'),
('form.review', 'Review and score responses'),
('form.access_manage', 'Manage form access control'),
('form.add_access', 'Add form access rules'),
('form.public_link', 'Generate public form links'),
('form.response_detail', 'View form response details'),

-- Google Forms Integration Policies
('forms.list', 'List Google Forms from Drive'),
('forms.view', 'View Google Form structure'),
('forms.view_responses', 'View Google Form responses'),
('forms.manage_access', 'Manage Google Form access settings'),

-- Self Management Policies
('me.get', 'Get own profile'),
('me.edit', 'Edit own profile'),
('me.delete', 'Delete own account')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- ============================================================================
-- ROLE-POLICY ASSIGNMENTS
-- ============================================================================

-- Get role IDs
SET @role_super_id = (SELECT id FROM system_roles WHERE name = 'super');
SET @role_admin_id = (SELECT id FROM system_roles WHERE name = 'admin');
SET @role_user_id = (SELECT id FROM system_roles WHERE name = 'user');
SET @role_guest_id = (SELECT id FROM system_roles WHERE name = 'guest');

-- Clear existing assignments
DELETE FROM system_role_policies;

-- SUPER ROLE: All permissions
INSERT INTO system_role_policies (role_id, policy_id)
SELECT @role_super_id, id FROM system_policies;

-- ADMIN ROLE: All except delete permissions
INSERT INTO system_role_policies (role_id, policy_id)
SELECT @role_admin_id, id FROM system_policies
WHERE name NOT IN ('user.delete', 'role.delete', 'policy.delete', 'group.delete', 'form.delete', 'me.delete');

-- USER ROLE: Basic permissions
INSERT INTO system_role_policies (role_id, policy_id)
SELECT @role_user_id, id FROM system_policies
WHERE name IN (
  'me.get',
  'me.edit',
  'form.list',
  'form.get',
  'form.submit',
  'forms.list',
  'forms.view',
  'forms.view_responses'
);

-- GUEST ROLE: Minimal permissions
INSERT INTO system_role_policies (role_id, policy_id)
SELECT @role_guest_id, id FROM system_policies
WHERE name IN ('me.get');

-- ============================================================================
-- GROUPS
-- ============================================================================
INSERT INTO `system_groups` (`name`, `description`) VALUES
('Development', 'Development team members'),
('HR', 'Human resources department'),
('Marketing', 'Marketing and communications team')
ON DUPLICATE KEY UPDATE `description` = VALUES(`description`);

-- ============================================================================
-- SUPER ADMIN USER
-- ============================================================================
-- Password: Admin@123
-- Bcrypt hash with salt rounds = 10
INSERT INTO `system_users` (
  `email`,
  `username`,
  `first_name`,
  `last_name`,
  `phone`,
  `password`,
  `default_role_id`
) VALUES (
  'balkibumen@gmail.com',
  'admin',
  'Super',
  'Admin',
  '+998900000001',
  '$2b$10$sq7LKaJD9mVrpuWp6cu./.762O7UDy412AZAUdVVAh61pZr20QCgq',
  @role_super_id
)
ON DUPLICATE KEY UPDATE
  `password` = VALUES(`password`),
  `default_role_id` = VALUES(`default_role_id`);

-- Assign super role to admin user
SET @admin_user_id = (SELECT id FROM system_users WHERE email = 'balkibumen@gmail.com');

INSERT INTO system_user_roles (user_id, role_id)
VALUES (@admin_user_id, @role_super_id)
ON DUPLICATE KEY UPDATE role_id = role_id;

-- ============================================================================
-- SEED COMPLETE
-- ============================================================================
-- System module has been seeded with:
-- - 4 roles (super, admin, user, guest)
-- - 34 policies
-- - All role-policy assignments
-- - 3 default groups
-- - 1 super admin user (balkibumen@gmail.com / Admin@123)
--
-- You can now start the application and login
-- ============================================================================
