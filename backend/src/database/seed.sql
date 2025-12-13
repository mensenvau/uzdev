USE core_app;

INSERT INTO roles (name, description) VALUES
('super', 'Full system access'),
('admin', 'Administrative access'),
('user', 'Standard user access'),
('guest', 'Limited guest access');

INSERT INTO policies (name, description) VALUES
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

('group.assign', 'Assign users to groups'),
('group.create', 'Create groups'),
('group.delete', 'Delete groups'),
('group.edit', 'Edit groups'),
('group.get', 'Get group details'),
('group.list', 'List groups'),

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

('user.create', 'Create users'),
('user.delete', 'Delete users'),
('user.edit', 'Edit users'),
('user.get', 'Get user details'),
('user.list', 'List users');

INSERT INTO role_policies (role_id, policy_id)
SELECT (SELECT id FROM roles WHERE name = 'super'), id FROM policies;

INSERT INTO role_policies (role_id, policy_id)
SELECT (SELECT id FROM roles WHERE name = 'admin'), id FROM policies
WHERE name NOT IN ('policy.delete', 'role.delete', 'user.delete');

INSERT INTO role_policies (role_id, policy_id)
SELECT (SELECT id FROM roles WHERE name = 'user'), id FROM policies
WHERE name IN ('form.get', 'form.list', 'form.submit', 'me.edit', 'me.get');

INSERT INTO role_policies (role_id, policy_id)
SELECT (SELECT id FROM roles WHERE name = 'guest'), id FROM policies
WHERE name IN ('me.get');

INSERT INTO users (email, username, password) VALUES
('admin@app.com', 'admin', '$2b$10$rGHvEW5qZ4vQN5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5xK5');

INSERT INTO user_roles (user_id, role_id) VALUES
((SELECT id FROM users WHERE username = 'admin'), (SELECT id FROM roles WHERE name = 'super'));

INSERT INTO groups (name, description) VALUES
('Development', 'Development team'),
('HR', 'Human resources'),
('Marketing', 'Marketing team');
