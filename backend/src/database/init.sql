DROP DATABASE IF EXISTS core_app;
CREATE DATABASE core_app;
USE core_app;

CREATE TABLE system_users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  username VARCHAR(100) UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(50),
  password VARCHAR(255),
  google_id VARCHAR(255) UNIQUE NULL,
  default_role_id BIGINT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE system_roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE system_policies (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE system_role_policies (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  role_id BIGINT,
  policy_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_role_policy (role_id, policy_id),
  FOREIGN KEY (role_id) REFERENCES system_roles(id) ON DELETE CASCADE,
  FOREIGN KEY (policy_id) REFERENCES system_policies(id) ON DELETE CASCADE
);

CREATE TABLE system_user_roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  role_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_role (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES system_users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES system_roles(id) ON DELETE CASCADE
);

CREATE TABLE system_groups (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE system_departments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE system_group_users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  group_id BIGINT,
  user_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_group_user (group_id, user_id),
  FOREIGN KEY (group_id) REFERENCES system_groups(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES system_users(id) ON DELETE CASCADE
);

CREATE TABLE system_user_departments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  department_id BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_department (user_id, department_id),
  FOREIGN KEY (department_id) REFERENCES system_departments(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES system_users(id) ON DELETE CASCADE
);

CREATE TABLE system_forms (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description TEXT,
  created_by BIGINT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES system_users(id) ON DELETE SET NULL
);

CREATE TABLE system_form_access (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  form_id BIGINT,
  access_type ENUM('role', 'group', 'link') NOT NULL,
  access_value VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (form_id) REFERENCES system_forms(id) ON DELETE CASCADE
);

CREATE TABLE system_form_fields (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  form_id BIGINT,
  field_key VARCHAR(100),
  label VARCHAR(255),
  field_type ENUM('text','textarea','number','select','checkbox','radio','table_select','score') NOT NULL,
  mode ENUM('question', 'check') DEFAULT 'question',
  is_required BOOLEAN DEFAULT FALSE,
  field_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (form_id) REFERENCES system_forms(id) ON DELETE CASCADE
);

CREATE TABLE system_form_field_options (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  field_id BIGINT,
  value VARCHAR(255),
  label VARCHAR(255),
  score INT DEFAULT 0,
  option_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (field_id) REFERENCES system_form_fields(id) ON DELETE CASCADE
);

CREATE TABLE system_form_field_table_sources (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  field_id BIGINT,
  source_table VARCHAR(100),
  source_value_column VARCHAR(100),
  source_label_column VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (field_id) REFERENCES system_form_fields(id) ON DELETE CASCADE
);

CREATE TABLE system_form_responses (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  form_id BIGINT,
  user_id BIGINT NULL,
  total_score INT DEFAULT 0,
  status ENUM('draft', 'submitted', 'reviewed') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (form_id) REFERENCES system_forms(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES system_users(id) ON DELETE SET NULL
);

CREATE TABLE system_form_response_values (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  response_id BIGINT,
  field_id BIGINT,
  value TEXT,
  score INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (response_id) REFERENCES system_form_responses(id) ON DELETE CASCADE,
  FOREIGN KEY (field_id) REFERENCES system_form_fields(id) ON DELETE CASCADE
);

CREATE INDEX idx_system_users_email ON system_users(email);
CREATE INDEX idx_system_users_username ON system_users(username);
CREATE INDEX idx_system_users_google_id ON system_users(google_id);
CREATE INDEX idx_system_form_access_form_id ON system_form_access(form_id);
CREATE INDEX idx_system_form_fields_form_id ON system_form_fields(form_id);
CREATE INDEX idx_system_form_responses_form_id ON system_form_responses(form_id);
CREATE INDEX idx_system_form_responses_user_id ON system_form_responses(user_id);
