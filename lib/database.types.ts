/**
 * Minimal hand-written Database type matching the live Supabase schema.
 * Column names verified against actual table definitions.
 * Must satisfy @supabase/supabase-js GenericSchema constraints.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      announcements: {
        Row: {
          id: string;
          title: string;
          excerpt: string | null;
          body: string | null;
          category: string;
          image_url: string | null;
          is_published: boolean;
          published_at: string | null;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt?: string | null;
          body?: string | null;
          category: string;
          image_url?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string | null;
          body?: string | null;
          category?: string;
          image_url?: string | null;
          is_published?: boolean;
          published_at?: string | null;
          created_by?: string | null;
        };
        Relationships: [];
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          category: string;
          location: string | null;
          starts_at: string;
          ends_at: string | null;
          image_url: string | null;
          is_published: boolean;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          category: string;
          location?: string | null;
          starts_at: string;
          ends_at?: string | null;
          image_url?: string | null;
          is_published?: boolean;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          category?: string;
          location?: string | null;
          starts_at?: string;
          ends_at?: string | null;
          image_url?: string | null;
          is_published?: boolean;
          created_by?: string | null;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          status: string;
          target_amount: number;
          raised_amount: number;
          image_url: string | null;
          is_published: boolean;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          status: string;
          target_amount: number;
          raised_amount?: number;
          image_url?: string | null;
          is_published?: boolean;
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          status?: string;
          target_amount?: number;
          raised_amount?: number;
          image_url?: string | null;
          is_published?: boolean;
          created_by?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;          // matches auth.users.id
          full_name: string | null;
          role: string | null; // "admin" | "secretary"
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          role?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          role?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// Convenience row types
export type AnnouncementRow =
  Database["public"]["Tables"]["announcements"]["Row"];
export type EventRow = Database["public"]["Tables"]["events"]["Row"];
export type ProjectRow = Database["public"]["Tables"]["projects"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
