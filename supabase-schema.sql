-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Games table
CREATE TABLE games (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT,
  banner_image TEXT,
  features TEXT[] DEFAULT '{}',
  platforms JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  youtube_trailer TEXT,
  screenshots TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  release_date DATE,
  status VARCHAR(50) DEFAULT 'development' CHECK (status IN ('development', 'alpha', 'beta', 'released')),
  game_modes JSONB DEFAULT '[]',
  progression_system JSONB DEFAULT '{}',
  system_requirements JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News table
CREATE TABLE news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover_image TEXT,
  tags TEXT[] DEFAULT '{}',
  author VARCHAR(255) NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('full-time', 'part-time', 'contract', 'internship')),
  description TEXT NOT NULL,
  requirements TEXT[] DEFAULT '{}',
  responsibilities TEXT[] DEFAULT '{}',
  is_remote BOOLEAN DEFAULT false,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pages table
CREATE TABLE pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Roles table
CREATE TABLE roles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  description TEXT,
  permissions TEXT[] DEFAULT '{}',
  is_default BOOLEAN DEFAULT false,
  can_invite_users BOOLEAN DEFAULT false,
  requires_approval BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role_id UUID REFERENCES roles(id) ON DELETE SET NULL,
  permissions TEXT[] DEFAULT '{}',
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  last_login TIMESTAMP WITH TIME ZONE,
  require_password_change BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings table
CREATE TABLE settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default roles
INSERT INTO roles (name, display_name, description, permissions, is_default, can_invite_users, requires_approval) VALUES
('admin', 'Administrator', 'Full access to all features and settings', ARRAY['manage_users', 'manage_content', 'manage_games', 'manage_news', 'manage_jobs', 'view_analytics', 'manage_settings'], false, true, false),
('editor', 'Editor', 'Can manage content, news, and jobs', ARRAY['manage_content', 'manage_news', 'manage_jobs'], false, false, false),
('writer', 'Writer', 'Can create and edit news articles', ARRAY['manage_news'], true, false, true),
('moderator', 'Moderator', 'Can moderate content and view analytics', ARRAY['manage_content', 'view_analytics'], false, false, true);

-- Insert sample users
INSERT INTO users (first_name, last_name, email, password, role_id, permissions, status) VALUES
('John', 'Doe', 'john@nextarch.com', '$2a$10$hashedpassword', (SELECT id FROM roles WHERE name = 'admin'), ARRAY['manage_users', 'manage_content', 'manage_games', 'manage_news', 'manage_jobs', 'view_analytics'], 'active'),
('Jane', 'Smith', 'jane@nextarch.com', '$2a$10$hashedpassword', (SELECT id FROM roles WHERE name = 'editor'), ARRAY['manage_content', 'manage_news', 'manage_jobs'], 'active'),
('Mike', 'Johnson', 'mike@nextarch.com', '$2a$10$hashedpassword', (SELECT id FROM roles WHERE name = 'writer'), ARRAY['manage_news'], 'inactive'),
('Sarah', 'Wilson', 'sarah@nextarch.com', '$2a$10$hashedpassword', (SELECT id FROM roles WHERE name = 'moderator'), ARRAY['manage_content', 'view_analytics'], 'active');

-- Insert default settings
INSERT INTO settings (key, value) VALUES
('general', '{"siteName": "Nextarch Studio", "siteDescription": "Crafting Tomorrow''s Games Today", "contactEmail": "contact@nextarch.studio", "socialLinks": {"twitter": "https://twitter.com/nextarchstudio", "discord": "https://discord.gg/nextarch", "linkedin": "https://linkedin.com/company/nextarch-studio"}}'),
('appearance', '{"primaryColor": "#3B82F6", "logoUrl": "/logo.png", "faviconUrl": "/favicon.ico", "theme": "dark"}'),
('security', '{"enableTwoFactor": true, "sessionTimeout": 24, "maxLoginAttempts": 5}'),
('notifications', '{"emailNotifications": true, "adminAlerts": true, "contactFormAlerts": true}');

-- Insert sample data
INSERT INTO games (title, slug, description, features, tags, status, is_featured) VALUES
('Scrap Siege: Arena', 'scrap-siege-arena', 'A fast-paced multiplayer arena combat game where players battle in destructible environments using scrap-built weapons and vehicles.', ARRAY['Destructible Environments', 'Vehicle Combat', 'Weapon Crafting'], ARRAY['multiplayer', 'arena', 'combat'], 'development', true),
('Nextarch', 'nextarch', 'An innovative puzzle-platformer that challenges players to think outside the box with unique mechanics and stunning visuals.', ARRAY['Puzzle Mechanics', 'Platforming', 'Visual Effects'], ARRAY['puzzle', 'platformer', 'indie'], 'development', true);

INSERT INTO news (title, slug, content, excerpt, author, status) VALUES
('Nextarch Studio Announces Scrap Siege: Arena', 'scrap-siege-announcement', '# Nextarch Studio Announces Scrap Siege: Arena

We are excited to announce our latest project: Scrap Siege: Arena, a fast-paced multiplayer arena combat game.

## Key Features
- Destructible environments
- Vehicle combat mechanics
- Weapon crafting system
- Real-time multiplayer battles

Stay tuned for more updates!', 'We are excited to announce our latest project: Scrap Siege: Arena, a fast-paced multiplayer arena combat game.', 'Nextarch Team', 'published'),
('Join Our Growing Team', 'hiring-announcement', '# Join Our Growing Team

Nextarch Studio is expanding and we''re looking for talented individuals to join our team.

## Open Positions
- Game Developer
- UI/UX Designer
- Marketing Specialist

Apply now and be part of creating amazing games!', 'Nextarch Studio is expanding and we''re looking for talented individuals to join our team.', 'Nextarch Team', 'published');

INSERT INTO jobs (title, department, location, type, description, requirements, responsibilities, is_remote) VALUES
('Senior Game Developer', 'Engineering', 'Los Angeles, CA', 'full-time', 'We are looking for a Senior Game Developer to join our team and help create amazing games.', ARRAY['5+ years game development experience', 'Unity/Unreal Engine proficiency', 'Strong C#/C++ skills'], ARRAY['Lead game development projects', 'Mentor junior developers', 'Collaborate with design team'], true),
('UI/UX Designer', 'Design', 'Remote', 'full-time', 'Join our design team to create beautiful and intuitive user interfaces for our games.', ARRAY['3+ years UI/UX design experience', 'Figma proficiency', 'Game design portfolio'], ARRAY['Design game interfaces', 'Create user experience flows', 'Collaborate with development team'], true);

INSERT INTO contact_submissions (name, email, message, status) VALUES
('John Smith', 'john.smith@example.com', 'Hi, I''m interested in learning more about your game development process and potential collaboration opportunities.', 'new'),
('Sarah Johnson', 'sarah.j@studio.com', 'We''re a small indie studio looking to partner with Nextarch Studio for our upcoming project. Would love to discuss possibilities.', 'read'),
('Mike Chen', 'mike.chen@tech.com', 'Great work on Scrap Siege: Arena! I''m a game developer and would love to know if you''re hiring for any positions.', 'replied');

INSERT INTO pages (title, slug, content, status) VALUES
('Home', '/', '# Welcome to Nextarch Studio

We create amazing games that push the boundaries of innovation and entertainment.', 'published'),
('About', '/about', '# About Nextarch Studio

We are a passionate team of game developers dedicated to creating immersive experiences.', 'draft'),
('Contact', '/contact', '# Contact Us

Get in touch with our team for collaboration opportunities.', 'published');

-- Create indexes for better performance
CREATE INDEX idx_games_slug ON games(slug);
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_games_featured ON games(is_featured);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_news_published_at ON news(published_at);
CREATE INDEX idx_jobs_department ON jobs(department);
CREATE INDEX idx_jobs_type ON jobs(type);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at);
CREATE INDEX idx_pages_slug ON pages(slug);
CREATE INDEX idx_pages_status ON pages(status);
CREATE INDEX idx_roles_name ON roles(name);
CREATE INDEX idx_roles_is_default ON roles(is_default);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_settings_key ON settings(key);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON games FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 