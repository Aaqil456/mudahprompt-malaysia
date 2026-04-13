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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      assistants: {
        Row: {
          category_en: string
          category_key: string[]
          category_ms: string
          created_at: string
          description_en: string
          description_ms: string
          fields: Json
          id: string
          image_src: string | null
          name_en: string
          name_ms: string
          template_en: string
          template_ms: string
          trending_score: number
          tutorial_url: string | null
        }
        Insert: {
          category_en: string
          category_key: string[]
          category_ms: string
          created_at?: string
          description_en: string
          description_ms: string
          fields: Json
          id: string
          image_src?: string | null
          name_en: string
          name_ms: string
          template_en: string
          template_ms: string
          trending_score?: number
          tutorial_url?: string | null
        }
        Update: {
          category_en?: string
          category_key?: string[]
          category_ms?: string
          created_at?: string
          description_en?: string
          description_ms?: string
          fields?: Json
          id?: string
          image_src?: string | null
          name_en?: string
          name_ms?: string
          template_en?: string
          template_ms?: string
          trending_score?: number
          tutorial_url?: string | null
        }
        Relationships: []
      }
      feedback_submissions: {
        Row: {
          created_at: string
          id: string
          message: string
          subject: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          subject: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          subject?: string
          user_id?: string | null
        }
        Relationships: []
      }
      prompt_history: {
        Row: {
          assistant_id: string | null
          created_at: string | null
          id: string
          prompt_content: string
        }
        Insert: {
          assistant_id?: string | null
          created_at?: string | null
          id?: string
          prompt_content: string
        }
        Update: {
          assistant_id?: string | null
          created_at?: string | null
          id?: string
          prompt_content?: string
        }
        Relationships: [
          {
            foreignKeyName: "prompt_history_assistant_id_fkey"
            columns: ["assistant_id"]
            isOneToOne: false
            referencedRelation: "assistants"
            referencedColumns: ["id"]
          },
        ]
      }
      vault_categories: {
        Row: {
          created_at: string | null
          id: string
          name: Json
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          id: string
          name: Json
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: Json
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "vault_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "vault_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      vault_collections: {
        Row: {
          aesthetic: Json
          category_id: string | null
          created_at: string | null
          description: Json
          id: string
          is_featured: boolean | null
          prompts: Json
          title: Json
        }
        Insert: {
          aesthetic: Json
          category_id?: string | null
          created_at?: string | null
          description: Json
          id: string
          is_featured?: boolean | null
          prompts: Json
          title: Json
        }
        Update: {
          aesthetic?: Json
          category_id?: string | null
          created_at?: string | null
          description?: Json
          id?: string
          is_featured?: boolean | null
          prompts?: Json
          title?: Json
        }
        Relationships: [
          {
            foreignKeyName: "vault_collections_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "vault_categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_trending_score: {
        Args: { assistant_id_param: string }
        Returns: undefined
      }
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
