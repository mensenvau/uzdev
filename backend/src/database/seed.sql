-- Seed Data for Core App
USE core_app;

-- =============================================
-- DEFAULT ROLES
-- =============================================

INSERT INTO roles (name, description) VALUES
('super_admin', 'Full system access with all permissions'),
('admin', 'Administrative access with most permissions'),
('user', 'Standard user access'),
('guest', 'Limited guest access');

-- =============================================
-- DEFAULT POLICIES
-- =============================================

INSERT INTO policies (name, description) VALUES
-- User self-management
('me.get', 'Get own profile information'),
('me.edit', 'Edit own profile'),
('me.delete', 'Delete own account'),

-- User management
('user.list', 'List all users'),
('user.get', 'Get any user details'),
('user.create', 'Create new users'),
('user.edit', 'Edit any user'),
('user.delete', 'Delete any user'),

-- Role management
('role.list', 'List all roles'),
('role.get', 'Get role details'),
('role.create', 'Create new roles'),
('role.edit', 'Edit roles'),
('role.delete', 'Delete roles'),
('role.assign', 'Assign roles to users'),

-- Policy management
('policy.list', 'List all policies'),
('policy.get', 'Get policy details'),
('policy.create', 'Create new policies'),
('policy.edit', 'Edit policies'),
('policy.delete', 'Delete policies'),
('policy.assign', 'Assign policies to roles'),

-- Group management
('group.list', 'List all groups'),
('group.get', 'Get group details'),
('group.create', 'Create new groups'),
('group.edit', 'Edit groups'),
('group.delete', 'Delete groups'),
('group.assign', 'Assign users to groups'),

-- Form management
('form.list', 'List all forms'),
('form.get', 'Get form details'),
('form.create', 'Create new forms'),
('form.edit', 'Edit forms'),
('form.delete', 'Delete forms'),
('form.submit', 'Submit form responses'),
('form.view_responses', 'View form responses'),
('form.review', 'Review and score form responses'),
('form.access_manage', 'Manage form access control');

-- =============================================
-- ASSIGN POLICIES TO ROLES
-- =============================================

-- Super Admin: ALL policies
INSERT INTO role_policies (role_id, policy_id)
SELECT
  (SELECT id FROM roles WHERE name = 'super_admin'),
  id
FROM policies;

-- Admin: Most policies except super admin specific ones
INSERT INTO role_policies (role_id, policy_id)
SELECT
  (SELECT id FROM roles WHERE name = 'admin'),
  id
FROM policies
WHERE name NOT IN ('role.delete', 'policy.delete', 'user.delete');

-- User: Basic self-management and form access
INSERT INTO role_policies (role_id, policy_id)
SELECT
  (SELECT id FROM roles WHERE name = 'user'),
  id
FROM policies
WHERE name IN (
  'me.get',
  'me.edit',
  'form.list',
  'form.get',
  'form.submit'
);

-- Guest: Read-only access
INSERT INTO role_policies (role_id, policy_id)
SELECT
  (SELECT id FROM roles WHERE name = 'guest'),
  id
FROM policies
WHERE name IN ('me.get');

-- =============================================
-- DEFAULT SUPER ADMIN USER
-- Password: Admin@123 (hashed with bcrypt)
-- =============================================

INSERT INTO users (email, username, password_hash, is_email_verified) VALUES
('admin@coreapp.com', 'superadmin', '$2b$10$rGHvEW5qZ4vQN5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5', TRUE);

-- Assign super_admin role to default admin
INSERT INTO user_roles (user_id, role_id) VALUES
((SELECT id FROM users WHERE username = 'superadmin'),
 (SELECT id FROM roles WHERE name = 'super_admin'));

-- =============================================
-- DEFAULT GROUPS (examples)
-- =============================================

INSERT INTO groups (name, description) VALUES
('Marketing Team', 'Marketing department members'),
('Development Team', 'Software development team'),
('HR Team', 'Human resources department');

-- =============================================
-- SAMPLE FORM (for testing)
-- =============================================

INSERT INTO forms (name, description, created_by) VALUES
('Employee Feedback Survey', 'Annual employee feedback and satisfaction survey',
 (SELECT id FROM users WHERE username = 'superadmin'));

-- Sample form fields
INSERT INTO form_fields (form_id, field_key, label, field_type, is_required, field_order) VALUES
((SELECT id FROM forms WHERE name = 'Employee Feedback Survey'),
 'employee_name', 'Employee Name', 'text', TRUE, 1),

((SELECT id FROM forms WHERE name = 'Employee Feedback Survey'),
 'satisfaction_level', 'Overall Satisfaction', 'select', TRUE, 2),

((SELECT id FROM forms WHERE name = 'Employee Feedback Survey'),
 'feedback', 'Additional Feedback', 'textarea', FALSE, 3);

-- Sample field options with scores
INSERT INTO field_options (field_id, value, label, score, option_order) VALUES
((SELECT id FROM form_fields WHERE field_key = 'satisfaction_level'),
 'very_satisfied', 'Very Satisfied', 5, 1),

((SELECT id FROM form_fields WHERE field_key = 'satisfaction_level'),
 'satisfied', 'Satisfied', 4, 2),

((SELECT id FROM form_fields WHERE field_key = 'satisfaction_level'),
 'neutral', 'Neutral', 3, 3),

((SELECT id FROM form_fields WHERE field_key = 'satisfaction_level'),
 'dissatisfied', 'Dissatisfied', 2, 4),

((SELECT id FROM form_fields WHERE field_key = 'satisfaction_level'),
 'very_dissatisfied', 'Very Dissatisfied', 1, 5);

-- Grant access to user role
INSERT INTO form_access (form_id, access_type, access_value) VALUES
((SELECT id FROM forms WHERE name = 'Employee Feedback Survey'),
 'role',
 (SELECT id FROM roles WHERE name = 'user'));
