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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      event_photos: {
        Row: {
          event_key: string
          storage_path: string
          updated_at: string
        }
        Insert: {
          event_key: string
          storage_path: string
          updated_at?: string
        }
        Update: {
          event_key?: string
          storage_path?: string
          updated_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          city: string
          created_at: string
          date: string
          description: string
          external_link: string | null
          finish_time: string
          host_name: string
          host_phone: string | null
          id: string
          location: string
          name: string
          source: Database["public"]["Enums"]["event_source"]
          start_time: string
          status: Database["public"]["Enums"]["event_status"]
          submitter_name: string | null
          submitter_phone: string | null
          tags: string[]
          updated_at: string
        }
        Insert: {
          city?: string
          created_at?: string
          date: string
          description: string
          external_link?: string | null
          finish_time: string
          host_name: string
          host_phone?: string | null
          id?: string
          location: string
          name: string
          source?: Database["public"]["Enums"]["event_source"]
          start_time: string
          status?: Database["public"]["Enums"]["event_status"]
          submitter_name?: string | null
          submitter_phone?: string | null
          tags?: string[]
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          date?: string
          description?: string
          external_link?: string | null
          finish_time?: string
          host_name?: string
          host_phone?: string | null
          id?: string
          location?: string
          name?: string
          source?: Database["public"]["Enums"]["event_source"]
          start_time?: string
          status?: Database["public"]["Enums"]["event_status"]
          submitter_name?: string | null
          submitter_phone?: string | null
          tags?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      studio_requests: {
        Row: {
          created_at: string
          details: Json
          email: string
          id: string
          kind: string
          name: string
        }
        Insert: {
          created_at?: string
          details?: Json
          email: string
          id?: string
          kind: string
          name: string
        }
        Update: {
          created_at?: string
          details?: Json
          email?: string
          id?: string
          kind?: string
          name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      events_public: {
        Row: {
          city: string | null
          created_at: string | null
          date: string | null
          description: string | null
          external_link: string | null
          finish_time: string | null
          host_name: string | null
          id: string | null
          location: string | null
          name: string | null
          source: Database["public"]["Enums"]["event_source"] | null
          start_time: string | null
          status: Database["public"]["Enums"]["event_status"] | null
          tags: string[] | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          external_link?: string | null
          finish_time?: string | null
          host_name?: string | null
          id?: string | null
          location?: string | null
          name?: string | null
          source?: Database["public"]["Enums"]["event_source"] | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["event_status"] | null
          tags?: string[] | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          date?: string | null
          description?: string | null
          external_link?: string | null
          finish_time?: string | null
          host_name?: string | null
          id?: string | null
          location?: string | null
          name?: string | null
          source?: Database["public"]["Enums"]["event_source"] | null
          start_time?: string | null
          status?: Database["public"]["Enums"]["event_status"] | null
          tags?: string[] | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      event_source: "submitted" | "admin"
      event_status: "pending" | "approved" | "rejected"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      event_source: ["submitted", "admin"],
      event_status: ["pending", "approved", "rejected"],
    },
  },
} as const
