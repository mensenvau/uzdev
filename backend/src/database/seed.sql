USE core_app;

INSERT INTO roles (name, description) VALUES
('super', 'Full system access with all permissions'),
('admin', 'Administrative access with most permissions'),
('user', 'Standard user access'),
('guest', 'Limited guest access');

INSERT INTO policies (name, description) VALUES
('me.get', 'Get own profile information'),
('me.edit', 'Edit own profile'),
('me.delete', 'Delete own account'),

('user.list', 'List all users'),
('user.get', 'Get any user details'),
('user.create', 'Create new users'),
('user.edit', 'Edit any user'),
('user.delete', 'Delete any user'),

('role.list', 'List all roles'),
('role.get', 'Get role details'),
('role.create', 'Create new roles'),
('role.edit', 'Edit roles'),
('role.delete', 'Delete roles'),
('role.assign', 'Assign roles to users'),

('policy.list', 'List all policies'),
('policy.get', 'Get policy details'),
('policy.create', 'Create new policies'),
('policy.edit', 'Edit policies'),
('policy.delete', 'Delete policies'),
('policy.assign', 'Assign policies to roles'),

('group.list', 'List all groups'),
('group.get', 'Get group details'),
('group.create', 'Create new groups'),
('group.edit', 'Edit groups'),
('group.delete', 'Delete groups'),
('group.assign', 'Assign users to groups'),

('form.list', 'List all forms'),
('form.get', 'Get form details'),
('form.create', 'Create new forms'),
('form.edit', 'Edit forms'),
('form.delete', 'Delete forms'),
('form.submit', 'Submit form responses'),
('form.view_responses', 'View form responses'),
('form.review', 'Review and score form responses'),
('form.access_manage', 'Manage form access control');

INSERT INTO role_policies (role_id, policy_id)
SELECT
  (SELECT id FROM roles WHERE name = 'super'),
  id
FROM policies;

INSERT INTO role_policies (role_id, policy_id)
SELECT
  (SELECT id FROM roles WHERE name = 'admin'),
  id
FROM policies
WHERE name NOT IN ('role.delete', 'policy.delete', 'user.delete');

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

INSERT INTO role_policies (role_id, policy_id)
SELECT
  (SELECT id FROM roles WHERE name = 'guest'),
  id
FROM policies
WHERE name IN ('me.get');

INSERT INTO users (email, username, password_hash) VALUES
('admin@coreapp.com', 'superadmin', '$2b$10$rGHvEW5qZ4vQN5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5');

INSERT INTO user_roles (user_id, role_id) VALUES
((SELECT id FROM users WHERE username = 'superadmin'),
 (SELECT id FROM roles WHERE name = 'super'));

INSERT INTO groups (name, description) VALUES
('Marketing Team', 'Marketing department members'),
('Development Team', 'Software development team'),
('HR Team', 'Human resources department');

INSERT INTO forms (name, description, created_by) VALUES
('Employee Feedback Survey', 'Annual employee feedback and satisfaction survey',
 (SELECT id FROM users WHERE username = 'superadmin'));

INSERT INTO form_fields (form_id, field_key, label, field_type, is_required, field_order) VALUES
((SELECT id FROM forms WHERE name = 'Employee Feedback Survey'),
 'employee_name', 'Employee Name', 'text', TRUE, 1),

((SELECT id FROM forms WHERE name = 'Employee Feedback Survey'),
 'satisfaction_level', 'Overall Satisfaction', 'select', TRUE, 2),

((SELECT id FROM forms WHERE name = 'Employee Feedback Survey'),
 'feedback', 'Additional Feedback', 'textarea', FALSE, 3);

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

INSERT INTO form_access (form_id, access_type, access_value) VALUES
((SELECT id FROM forms WHERE name = 'Employee Feedback Survey'),
 'role',
 (SELECT id FROM roles WHERE name = 'user'));
