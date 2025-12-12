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
      customer_personas: {
        Row: {
          agent_id: string | null
          avatar_url: string | null
          background_story: string | null
          category: Database["public"]["Enums"]["training_category"]
          common_objections: string[] | null
          company: string | null
          created_at: string
          decision_authority: Database["public"]["Enums"]["decision_authority"]
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          name: string
          objection_style: Database["public"]["Enums"]["objection_style"]
          patience: number
          role: string
          skills: string[] | null
          system_prompt: string | null
          technical_level: number
          temperament: Database["public"]["Enums"]["temperament_type"]
          updated_at: string
          voice_id: string | null
        }
        Insert: {
          agent_id?: string | null
          avatar_url?: string | null
          background_story?: string | null
          category?: Database["public"]["Enums"]["training_category"]
          common_objections?: string[] | null
          company?: string | null
          created_at?: string
          decision_authority?: Database["public"]["Enums"]["decision_authority"]
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          name: string
          objection_style?: Database["public"]["Enums"]["objection_style"]
          patience?: number
          role: string
          skills?: string[] | null
          system_prompt?: string | null
          technical_level?: number
          temperament?: Database["public"]["Enums"]["temperament_type"]
          updated_at?: string
          voice_id?: string | null
        }
        Update: {
          agent_id?: string | null
          avatar_url?: string | null
          background_story?: string | null
          category?: Database["public"]["Enums"]["training_category"]
          common_objections?: string[] | null
          company?: string | null
          created_at?: string
          decision_authority?: Database["public"]["Enums"]["decision_authority"]
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          name?: string
          objection_style?: Database["public"]["Enums"]["objection_style"]
          patience?: number
          role?: string
          skills?: string[] | null
          system_prompt?: string | null
          technical_level?: number
          temperament?: Database["public"]["Enums"]["temperament_type"]
          updated_at?: string
          voice_id?: string | null
        }
        Relationships: []
      }
      learning_paths: {
        Row: {
          category: Database["public"]["Enums"]["training_category"]
          created_at: string
          description: string | null
          estimated_hours: number
          id: string
          module_ids: string[] | null
          name: string
          updated_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["training_category"]
          created_at?: string
          description?: string | null
          estimated_hours?: number
          id?: string
          module_ids?: string[] | null
          name: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["training_category"]
          created_at?: string
          description?: string | null
          estimated_hours?: number
          id?: string
          module_ids?: string[] | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          handle: string
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          handle: string
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          handle?: string
          id?: string
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      skill_definitions: {
        Row: {
          category: Database["public"]["Enums"]["training_category"]
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["training_category"]
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          category?: Database["public"]["Enums"]["training_category"]
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      trainee_progress: {
        Row: {
          average_score: number
          certifications: Json | null
          created_at: string
          current_module_name: string | null
          current_path_id: string | null
          current_path_progress: number
          current_streak: number
          id: string
          last_session_at: string | null
          longest_streak: number
          skills: Json | null
          total_hours: number
          total_sessions: number
          updated_at: string
          user_id: string
        }
        Insert: {
          average_score?: number
          certifications?: Json | null
          created_at?: string
          current_module_name?: string | null
          current_path_id?: string | null
          current_path_progress?: number
          current_streak?: number
          id?: string
          last_session_at?: string | null
          longest_streak?: number
          skills?: Json | null
          total_hours?: number
          total_sessions?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          average_score?: number
          certifications?: Json | null
          created_at?: string
          current_module_name?: string | null
          current_path_id?: string | null
          current_path_progress?: number
          current_streak?: number
          id?: string
          last_session_at?: string | null
          longest_streak?: number
          skills?: Json | null
          total_hours?: number
          total_sessions?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trainee_progress_current_path_id_fkey"
            columns: ["current_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      training_modules: {
        Row: {
          avatar_url: string | null
          created_at: string
          description: string | null
          estimated_minutes: number
          id: string
          lessons_count: number
          name: string
          scenario_ids: string[] | null
          skills: string[] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          estimated_minutes?: number
          id?: string
          lessons_count?: number
          name: string
          scenario_ids?: string[] | null
          skills?: string[] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          estimated_minutes?: number
          id?: string
          lessons_count?: number
          name?: string
          scenario_ids?: string[] | null
          skills?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      training_scenarios: {
        Row: {
          briefing_avoid_phrases: string[] | null
          briefing_customer_background: string | null
          briefing_key_phrases: string[] | null
          briefing_objectives: string[] | null
          briefing_situation: string | null
          category: Database["public"]["Enums"]["training_category"]
          compatible_persona_ids: string[] | null
          created_at: string
          description: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          estimated_duration: number
          gradient: string | null
          id: string
          image_url: string | null
          learning_objectives: string[] | null
          rubric: Json | null
          skills: string[] | null
          title: string
          type: Database["public"]["Enums"]["scenario_type"]
          updated_at: string
        }
        Insert: {
          briefing_avoid_phrases?: string[] | null
          briefing_customer_background?: string | null
          briefing_key_phrases?: string[] | null
          briefing_objectives?: string[] | null
          briefing_situation?: string | null
          category?: Database["public"]["Enums"]["training_category"]
          compatible_persona_ids?: string[] | null
          created_at?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          estimated_duration?: number
          gradient?: string | null
          id?: string
          image_url?: string | null
          learning_objectives?: string[] | null
          rubric?: Json | null
          skills?: string[] | null
          title: string
          type: Database["public"]["Enums"]["scenario_type"]
          updated_at?: string
        }
        Update: {
          briefing_avoid_phrases?: string[] | null
          briefing_customer_background?: string | null
          briefing_key_phrases?: string[] | null
          briefing_objectives?: string[] | null
          briefing_situation?: string | null
          category?: Database["public"]["Enums"]["training_category"]
          compatible_persona_ids?: string[] | null
          created_at?: string
          description?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          estimated_duration?: number
          gradient?: string | null
          id?: string
          image_url?: string | null
          learning_objectives?: string[] | null
          rubric?: Json | null
          skills?: string[] | null
          title?: string
          type?: Database["public"]["Enums"]["scenario_type"]
          updated_at?: string
        }
        Relationships: []
      }
      training_sessions: {
        Row: {
          created_at: string
          duration: number
          ended_at: string | null
          feedback: Json | null
          id: string
          mode: Database["public"]["Enums"]["session_mode"]
          persona_id: string | null
          recording_url: string | null
          scenario_id: string | null
          score: Json | null
          started_at: string
          status: Database["public"]["Enums"]["session_status"]
          transcript: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          duration?: number
          ended_at?: string | null
          feedback?: Json | null
          id?: string
          mode?: Database["public"]["Enums"]["session_mode"]
          persona_id?: string | null
          recording_url?: string | null
          scenario_id?: string | null
          score?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["session_status"]
          transcript?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          duration?: number
          ended_at?: string | null
          feedback?: Json | null
          id?: string
          mode?: Database["public"]["Enums"]["session_mode"]
          persona_id?: string | null
          recording_url?: string | null
          scenario_id?: string | null
          score?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["session_status"]
          transcript?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "training_sessions_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "customer_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "training_sessions_scenario_id_fkey"
            columns: ["scenario_id"]
            isOneToOne: false
            referencedRelation: "training_scenarios"
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
      decision_authority:
        | "none"
        | "influencer"
        | "decision-maker"
        | "budget-holder"
      difficulty_level: "beginner" | "intermediate" | "advanced" | "expert"
      objection_style: "direct" | "passive" | "analytical" | "emotional"
      scenario_type:
        | "complaint-resolution"
        | "technical-support"
        | "billing-inquiry"
        | "escalation-handling"
        | "churn-prevention"
        | "upsell-cross-sell"
        | "cold-call"
        | "discovery-call"
        | "objection-handling"
        | "gatekeeper-navigation"
        | "demo-scheduling"
        | "follow-up-call"
        | "pricing-discussion"
      session_mode: "video" | "audio" | "chat"
      session_status: "in-progress" | "completed" | "abandoned"
      temperament_type: "friendly" | "neutral" | "difficult" | "hostile"
      training_category: "csr" | "sdr" | "both"
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
    Enums: {
      decision_authority: [
        "none",
        "influencer",
        "decision-maker",
        "budget-holder",
      ],
      difficulty_level: ["beginner", "intermediate", "advanced", "expert"],
      objection_style: ["direct", "passive", "analytical", "emotional"],
      scenario_type: [
        "complaint-resolution",
        "technical-support",
        "billing-inquiry",
        "escalation-handling",
        "churn-prevention",
        "upsell-cross-sell",
        "cold-call",
        "discovery-call",
        "objection-handling",
        "gatekeeper-navigation",
        "demo-scheduling",
        "follow-up-call",
        "pricing-discussion",
      ],
      session_mode: ["video", "audio", "chat"],
      session_status: ["in-progress", "completed", "abandoned"],
      temperament_type: ["friendly", "neutral", "difficult", "hostile"],
      training_category: ["csr", "sdr", "both"],
    },
  },
} as const
