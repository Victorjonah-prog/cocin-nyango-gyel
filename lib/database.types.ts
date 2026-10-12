/**
 * Minimal hand-written Database type matching the existing Supabase schema.
 * Covers only the tables used by this app; extend as new tables are added.
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
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt?: string | null;
          body?: string | null;
          category: string;
          image_url?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string | null;
          body?: string | null;
          category?: string;
          image_url?: string | null;
          published?: boolean;
          updated_at?: string;
        };
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
          published: boolean;
          created_at: string;
          updated_at: string;
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
          published?: boolean;
          created_at?: string;
          updated_at?: string;
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
          published?: boolean;
          updated_at?: string;
        };
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          status: string;
          target_amount: number;
          amount_raised: number;
          image_url: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          status: string;
          target_amount: number;
          amount_raised?: number;
          image_url?: string | null;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          status?: string;
          target_amount?: number;
          amount_raised?: number;
          image_url?: string | null;
          published?: boolean;
          updated_at?: string;
        };
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
