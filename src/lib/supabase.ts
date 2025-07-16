import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          cover_image: string | null
          banner_image: string | null
          features: string[]
          platforms: any[]
          tags: string[]
          youtube_trailer: string | null
          screenshots: string[]
          is_featured: boolean
          release_date: string | null
          status: 'development' | 'alpha' | 'beta' | 'released'
          game_modes: any[]
          progression_system: any
          system_requirements: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          cover_image?: string | null
          banner_image?: string | null
          features?: string[]
          platforms?: any[]
          tags?: string[]
          youtube_trailer?: string | null
          screenshots?: string[]
          is_featured?: boolean
          release_date?: string | null
          status?: 'development' | 'alpha' | 'beta' | 'released'
          game_modes?: any[]
          progression_system?: any
          system_requirements?: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          cover_image?: string | null
          banner_image?: string | null
          features?: string[]
          platforms?: any[]
          tags?: string[]
          youtube_trailer?: string | null
          screenshots?: string[]
          is_featured?: boolean
          release_date?: string | null
          status?: 'development' | 'alpha' | 'beta' | 'released'
          game_modes?: any[]
          progression_system?: any
          system_requirements?: any
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string
          cover_image: string | null
          tags: string[]
          author: string
          published_at: string | null
          status: 'draft' | 'published'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt: string
          cover_image?: string | null
          tags?: string[]
          author: string
          published_at?: string | null
          status?: 'draft' | 'published'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          cover_image?: string | null
          tags?: string[]
          author?: string
          published_at?: string | null
          status?: 'draft' | 'published'
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          title: string
          department: string
          location: string
          type: 'full-time' | 'part-time' | 'contract' | 'internship'
          description: string
          requirements: string[]
          responsibilities: string[]
          is_remote: boolean
          posted_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          department: string
          location: string
          type: 'full-time' | 'part-time' | 'contract' | 'internship'
          description: string
          requirements?: string[]
          responsibilities?: string[]
          is_remote?: boolean
          posted_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          department?: string
          location?: string
          type?: 'full-time' | 'part-time' | 'contract' | 'internship'
          description?: string
          requirements?: string[]
          responsibilities?: string[]
          is_remote?: boolean
          posted_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          status: 'new' | 'read' | 'replied'
          submitted_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          status?: 'new' | 'read' | 'replied'
          submitted_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          status?: 'new' | 'read' | 'replied'
          submitted_at?: string
          created_at?: string
          updated_at?: string
        }
      }
      pages: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          status: 'draft' | 'published'
          last_modified: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          status?: 'draft' | 'published'
          last_modified?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          status?: 'draft' | 'published'
          last_modified?: string
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          id: string
          key: string
          value: any
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: any
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: any
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 