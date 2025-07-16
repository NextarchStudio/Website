# Supabase Setup Guide

## Framework Information
- **Framework**: Next.js 15.4.1
- **App Router**: Yes (using `/app` directory)
- **TypeScript**: Yes
- **Database**: Supabase (PostgreSQL)

## Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# NextAuth Configuration (if using)
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=your_nextauth_secret_here

# Discord OAuth (if using)
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here
```

## Supabase Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

### 2. Set Up Database Schema
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql` into the editor
4. Run the SQL to create all tables and sample data

### 3. Configure Environment Variables
Replace the placeholder values in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL (found in Settings > API)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key (found in Settings > API)

### 4. Install Dependencies
```bash
npm install @supabase/supabase-js
```

## Database Schema

The following tables will be created:

### Games Table
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `slug` (VARCHAR, Unique)
- `description` (TEXT)
- `cover_image` (TEXT)
- `banner_image` (TEXT)
- `features` (TEXT[])
- `platforms` (JSONB)
- `tags` (TEXT[])
- `youtube_trailer` (TEXT)
- `screenshots` (TEXT[])
- `is_featured` (BOOLEAN)
- `release_date` (DATE)
- `status` (VARCHAR)
- `game_modes` (JSONB)
- `progression_system` (JSONB)
- `system_requirements` (JSONB)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### News Table
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `slug` (VARCHAR, Unique)
- `content` (TEXT)
- `excerpt` (TEXT)
- `cover_image` (TEXT)
- `tags` (TEXT[])
- `author` (VARCHAR)
- `published_at` (TIMESTAMP)
- `status` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Jobs Table
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `department` (VARCHAR)
- `location` (VARCHAR)
- `type` (VARCHAR)
- `description` (TEXT)
- `requirements` (TEXT[])
- `responsibilities` (TEXT[])
- `is_remote` (BOOLEAN)
- `posted_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Contact Submissions Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR)
- `message` (TEXT)
- `status` (VARCHAR)
- `submitted_at` (TIMESTAMP)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Pages Table
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `slug` (VARCHAR, Unique)
- `content` (TEXT)
- `status` (VARCHAR)
- `last_modified` (TIMESTAMP)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Roles Table
- `id` (UUID, Primary Key)
- `name` (VARCHAR, Unique)
- `display_name` (VARCHAR)
- `description` (TEXT)
- `permissions` (TEXT[])
- `is_default` (BOOLEAN)
- `can_invite_users` (BOOLEAN)
- `requires_approval` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Users Table
- `id` (UUID, Primary Key)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR)
- `role_id` (UUID, Foreign Key to roles)
- `permissions` (TEXT[])
- `status` (VARCHAR)
- `last_login` (TIMESTAMP)
- `require_password_change` (BOOLEAN)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Settings Table
- `id` (UUID, Primary Key)
- `key` (VARCHAR, Unique)
- `value` (JSONB)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## API Endpoints

The following API endpoints are available:

### Games
- `GET /api/games` - Fetch all games
- `POST /api/games` - Create new game
- `GET /api/games/[id]` - Fetch specific game
- `PUT /api/games/[id]` - Update game
- `DELETE /api/games/[id]` - Delete game

### News
- `GET /api/news` - Fetch all news articles
- `POST /api/news` - Create new article
- `GET /api/news/[id]` - Fetch specific article
- `PUT /api/news/[id]` - Update article
- `DELETE /api/news/[id]` - Delete article

### Jobs
- `GET /api/jobs` - Fetch all jobs
- `POST /api/jobs` - Create new job
- `GET /api/jobs/[id]` - Fetch specific job
- `PUT /api/jobs/[id]` - Update job
- `DELETE /api/jobs/[id]` - Delete job

### Contact
- `GET /api/contact` - Fetch all contact submissions
- `POST /api/contact` - Create new submission
- `PUT /api/contact/[id]` - Update submission status
- `DELETE /api/contact/[id]` - Delete submission

### Pages
- `GET /api/pages` - Fetch all pages
- `POST /api/pages` - Create new page
- `GET /api/pages/[id]` - Fetch specific page
- `PUT /api/pages/[id]` - Update page
- `DELETE /api/pages/[id]` - Delete page

### Users
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create new user
- `GET /api/users/[id]` - Fetch specific user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Roles
- `GET /api/roles` - Fetch all roles
- `POST /api/roles` - Create new role
- `GET /api/roles/[id]` - Fetch specific role
- `PUT /api/roles/[id]` - Update role
- `DELETE /api/roles/[id]` - Delete role

### Settings
- `GET /api/settings` - Fetch all settings
- `PUT /api/settings` - Update settings

## Sample Data

The schema includes sample data for:
- 2 games (Scrap Siege: Arena, Nextarch)
- 2 news articles
- 2 job openings
- 3 contact submissions
- 3 pages (Home, About, Contact)
- 4 roles (admin, editor, writer, moderator)
- 4 users (John Doe, Jane Smith, Mike Johnson, Sarah Wilson)
- Default settings

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (see above)

3. Run the development server:
```bash
npm run dev
```

4. Access the admin panel at: `http://localhost:3002/admin`

## Features

- ✅ Full CRUD operations for all entities
- ✅ Real-time data synchronization
- ✅ Type-safe database operations
- ✅ Automatic timestamps
- ✅ Optimized queries with indexes
- ✅ Error handling and validation
- ✅ File upload support (ready for Supabase Storage)
- ✅ Authentication ready (NextAuth integration)

## Next Steps

1. Replace the placeholder values in `.env.local` with your actual Supabase credentials
2. Run the SQL schema in your Supabase project
3. Test the admin functionality
4. Set up file uploads using Supabase Storage
5. Configure authentication if needed 