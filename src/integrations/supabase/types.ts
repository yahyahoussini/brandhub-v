export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          image_url: string | null
          is_published: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_inquiries: {
        Row: {
          company: string | null
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          notes: string | null
          phone: string | null
          service_interest: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          notes?: string | null
          phone?: string | null
          service_interest?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          notes?: string | null
          phone?: string | null
          service_interest?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      custom_quotes: {
        Row: {
          client_id: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          notes: string | null
          phone: string | null
          services: Json
          status: string | null
          total_estimate: number | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          email: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          services: Json
          status?: string | null
          total_estimate?: number | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          services?: Json
          status?: string | null
          total_estimate?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "custom_quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          created_at: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      project_updates: {
        Row: {
          attachments: string[] | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          project_id: string | null
          title: string
        }
        Insert: {
          attachments?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          project_id?: string | null
          title: string
        }
        Update: {
          attachments?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          project_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_updates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          attachments: string[] | null
          budget: number | null
          challenge: string | null
          client_id: string | null
          client_industry: string | null
          client_name: string | null
          completed_at: string | null
          created_at: string | null
          deadline: string | null
          demo_url: string | null
          description: string | null
          id: string
          is_featured: boolean | null
          is_public: boolean | null
          metrics: Json | null
          requirements: Json | null
          results: string[] | null
          screenshots: string[] | null
          service_category: string
          solution: string | null
          status: string | null
          technologies: string[] | null
          title: string
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          attachments?: string[] | null
          budget?: number | null
          challenge?: string | null
          client_id?: string | null
          client_industry?: string | null
          client_name?: string | null
          completed_at?: string | null
          created_at?: string | null
          deadline?: string | null
          demo_url?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          metrics?: Json | null
          requirements?: Json | null
          results?: string[] | null
          screenshots?: string[] | null
          service_category: string
          solution?: string | null
          status?: string | null
          technologies?: string[] | null
          title: string
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          attachments?: string[] | null
          budget?: number | null
          challenge?: string | null
          client_id?: string | null
          client_industry?: string | null
          client_name?: string | null
          completed_at?: string | null
          created_at?: string | null
          deadline?: string | null
          demo_url?: string | null
          description?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          metrics?: Json | null
          requirements?: Json | null
          results?: string[] | null
          screenshots?: string[] | null
          service_category?: string
          solution?: string | null
          status?: string | null
          technologies?: string[] | null
          title?: string
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      service_examples: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          image_url: string | null
          project_url: string | null
          service_id: string
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          project_url?: string | null
          service_id: string
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          project_url?: string | null
          service_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_examples_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_landing_content: {
        Row: {
          content: string
          id: string
          service_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          id?: string
          service_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          id?: string
          service_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_landing_content_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_pricing_tiers: {
        Row: {
          created_at: string | null
          delivery_time: string
          description: string
          details: string[]
          id: string
          price: number
          revisions_count: number
          service_id: string
          tier_name: string
        }
        Insert: {
          created_at?: string | null
          delivery_time: string
          description: string
          details?: string[]
          id?: string
          price: number
          revisions_count: number
          service_id: string
          tier_name: string
        }
        Update: {
          created_at?: string | null
          delivery_time?: string
          description?: string
          details?: string[]
          id?: string
          price?: number
          revisions_count?: number
          service_id?: string
          tier_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_pricing_tiers_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          features: string[] | null
          icon: string | null
          id: string
          is_active: boolean | null
          price_starting: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          price_starting?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          features?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          price_starting?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          client_id: string | null
          company: string | null
          content: string
          created_at: string | null
          id: string
          is_featured: boolean | null
          is_published: boolean | null
          name: string
          position: string | null
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          company?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          name: string
          position?: string | null
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          company?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          is_published?: boolean | null
          name?: string
          position?: string | null
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
