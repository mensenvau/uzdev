USE core_app;

INSERT INTO system_roles (name, description) VALUES
('super', 'Full system access'),
('admin', 'Administrative access'),
('user', 'Standard user access'),
('guest', 'Limited guest access');

INSERT INTO system_policies (name, description) VALUES
('me.delete', 'Delete own account'),
('me.edit', 'Edit own profile'),
('me.get', 'Get own profile'),

('form.access_manage', 'Manage form access'),
('form.create', 'Create forms'),
('form.delete', 'Delete forms'),
('form.edit', 'Edit forms'),
('form.get', 'Get form details'),
('form.list', 'List forms'),
('form.review', 'Review form responses'),
('form.submit', 'Submit form responses'),
('form.view_responses', 'View form responses'),

('group.assign', 'Add user to group'),
('group.create', 'Create groups'),
('group.delete', 'Delete groups'),
('group.edit', 'Edit groups'),
('group.get', 'Get group details'),
('group.list', 'List groups'),
('group.remove', 'Remove user from group'),

('department.assign', 'Assign user to department'),
('department.create', 'Create departments'),
('department.delete', 'Delete departments'),
('department.edit', 'Edit departments'),
('department.get', 'Get department details'),
('department.list', 'List departments'),
('department.remove', 'Remove user from department'),

('policy.assign', 'Assign policies to roles'),
('policy.create', 'Create policies'),
('policy.delete', 'Delete policies'),
('policy.edit', 'Edit policies'),
('policy.get', 'Get policy details'),
('policy.list', 'List policies'),

('role.assign', 'Assign roles to users'),
('role.create', 'Create roles'),
('role.delete', 'Delete roles'),
('role.edit', 'Edit roles'),
('role.get', 'Get role details'),
('role.list', 'List roles'),
('role.remove', 'Remove role from user'),

('user.create', 'Create users'),
('user.delete', 'Delete users'),
('user.edit', 'Edit users'),
('user.get', 'Get user details'),
('user.list', 'List users');

INSERT INTO system_role_policies (role_id, policy_id)
SELECT (SELECT id FROM system_roles WHERE name = 'super'), id FROM system_policies;

INSERT INTO system_role_policies (role_id, policy_id)
SELECT (SELECT id FROM system_roles WHERE name = 'admin'), id FROM system_policies
WHERE name NOT IN ('policy.delete', 'role.delete', 'user.delete');

INSERT INTO system_role_policies (role_id, policy_id)
SELECT (SELECT id FROM system_roles WHERE name = 'user'), id FROM system_policies
WHERE name IN ('form.get', 'form.list', 'form.submit', 'me.edit', 'me.get');

INSERT INTO system_role_policies (role_id, policy_id)
SELECT (SELECT id FROM system_roles WHERE name = 'guest'), id FROM system_policies
WHERE name IN ('me.get');

INSERT INTO system_users (email, username, first_name, last_name, phone, password) VALUES
('balkibumen@gmail.com', 'admin', 'UK', '', '+998900000001', '$2b$10$4iyU9aFt89.x62YkoRG9oe7kFnysJR1DVKUWXpaIs570xzAFgGCfm');

INSERT INTO system_user_roles (user_id, role_id) VALUES
((SELECT id FROM system_users WHERE username = 'admin'), (SELECT id FROM system_roles WHERE name = 'super'));

INSERT INTO system_groups (name, description) VALUES
('Development', 'Development team'),
('HR', 'Human resources'),
('Marketing', 'Marketing team');

INSERT INTO system_departments (name, description) VALUES
('Engineering', 'Product and engineering'),
('People', 'Human resources and talent'),
('Sales', 'Sales and growth');
