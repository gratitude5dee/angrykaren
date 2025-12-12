-- ============= CSR/SDR Training Platform Schema =============

-- Create enums
CREATE TYPE public.difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE public.training_category AS ENUM ('csr', 'sdr', 'both');
CREATE TYPE public.scenario_type AS ENUM (
  'complaint-resolution', 'technical-support', 'billing-inquiry', 
  'escalation-handling', 'churn-prevention', 'upsell-cross-sell',
  'cold-call', 'discovery-call', 'objection-handling', 
  'gatekeeper-navigation', 'demo-scheduling', 'follow-up-call', 'pricing-discussion'
);
CREATE TYPE public.session_mode AS ENUM ('video', 'audio', 'chat');
CREATE TYPE public.session_status AS ENUM ('in-progress', 'completed', 'abandoned');
CREATE TYPE public.temperament_type AS ENUM ('friendly', 'neutral', 'difficult', 'hostile');
CREATE TYPE public.decision_authority AS ENUM ('none', 'influencer', 'decision-maker', 'budget-holder');
CREATE TYPE public.objection_style AS ENUM ('direct', 'passive', 'analytical', 'emotional');

-- Skill definitions table
CREATE TABLE public.skill_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category public.training_category NOT NULL DEFAULT 'both',
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Customer personas table
CREATE TABLE public.customer_personas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  avatar_url TEXT,
  difficulty public.difficulty_level NOT NULL DEFAULT 'intermediate',
  category public.training_category NOT NULL DEFAULT 'both',
  temperament public.temperament_type NOT NULL DEFAULT 'neutral',
  patience INTEGER NOT NULL DEFAULT 5 CHECK (patience >= 1 AND patience <= 10),
  technical_level INTEGER NOT NULL DEFAULT 5 CHECK (technical_level >= 1 AND technical_level <= 10),
  decision_authority public.decision_authority NOT NULL DEFAULT 'none',
  objection_style public.objection_style NOT NULL DEFAULT 'direct',
  agent_id TEXT,
  voice_id TEXT,
  system_prompt TEXT,
  skills TEXT[] DEFAULT '{}',
  common_objections TEXT[] DEFAULT '{}',
  background_story TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Training scenarios table
CREATE TABLE public.training_scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category public.training_category NOT NULL DEFAULT 'both',
  type public.scenario_type NOT NULL,
  difficulty public.difficulty_level NOT NULL DEFAULT 'intermediate',
  estimated_duration INTEGER NOT NULL DEFAULT 10,
  briefing_situation TEXT,
  briefing_customer_background TEXT,
  briefing_objectives TEXT[] DEFAULT '{}',
  briefing_key_phrases TEXT[] DEFAULT '{}',
  briefing_avoid_phrases TEXT[] DEFAULT '{}',
  compatible_persona_ids UUID[] DEFAULT '{}',
  rubric JSONB,
  skills TEXT[] DEFAULT '{}',
  learning_objectives TEXT[] DEFAULT '{}',
  image_url TEXT,
  gradient TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Training modules table
CREATE TABLE public.training_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  avatar_url TEXT,
  lessons_count INTEGER NOT NULL DEFAULT 0,
  scenario_ids UUID[] DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  estimated_minutes INTEGER NOT NULL DEFAULT 30,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Learning paths table
CREATE TABLE public.learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  category public.training_category NOT NULL DEFAULT 'both',
  module_ids UUID[] DEFAULT '{}',
  estimated_hours DECIMAL(5,1) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Training sessions table
CREATE TABLE public.training_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  persona_id UUID REFERENCES public.customer_personas(id) ON DELETE SET NULL,
  scenario_id UUID REFERENCES public.training_scenarios(id) ON DELETE SET NULL,
  mode public.session_mode NOT NULL DEFAULT 'video',
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration INTEGER NOT NULL DEFAULT 0,
  transcript JSONB DEFAULT '[]',
  score JSONB,
  feedback JSONB,
  recording_url TEXT,
  status public.session_status NOT NULL DEFAULT 'in-progress',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trainee progress table
CREATE TABLE public.trainee_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_sessions INTEGER NOT NULL DEFAULT 0,
  total_hours DECIMAL(10,2) NOT NULL DEFAULT 0,
  average_score DECIMAL(5,2) NOT NULL DEFAULT 0,
  skills JSONB DEFAULT '[]',
  certifications JSONB DEFAULT '[]',
  current_path_id UUID REFERENCES public.learning_paths(id) ON DELETE SET NULL,
  current_path_progress INTEGER NOT NULL DEFAULT 0,
  current_module_name TEXT,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_session_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.skill_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainee_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access (personas, scenarios, modules, paths, skills are public content)
CREATE POLICY "Anyone can view skill definitions" ON public.skill_definitions FOR SELECT USING (true);
CREATE POLICY "Anyone can view customer personas" ON public.customer_personas FOR SELECT USING (true);
CREATE POLICY "Anyone can view training scenarios" ON public.training_scenarios FOR SELECT USING (true);
CREATE POLICY "Anyone can view training modules" ON public.training_modules FOR SELECT USING (true);
CREATE POLICY "Anyone can view learning paths" ON public.learning_paths FOR SELECT USING (true);

-- RLS Policies for user-specific data
CREATE POLICY "Users can view their own sessions" ON public.training_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own sessions" ON public.training_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sessions" ON public.training_sessions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own progress" ON public.trainee_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own progress" ON public.trainee_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own progress" ON public.trainee_progress FOR UPDATE USING (auth.uid() = user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_skill_definitions_updated_at BEFORE UPDATE ON public.skill_definitions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customer_personas_updated_at BEFORE UPDATE ON public.customer_personas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_training_scenarios_updated_at BEFORE UPDATE ON public.training_scenarios
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_training_modules_updated_at BEFORE UPDATE ON public.training_modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_learning_paths_updated_at BEFORE UPDATE ON public.learning_paths
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_training_sessions_updated_at BEFORE UPDATE ON public.training_sessions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_trainee_progress_updated_at BEFORE UPDATE ON public.trainee_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_training_sessions_user_id ON public.training_sessions(user_id);
CREATE INDEX idx_training_sessions_status ON public.training_sessions(status);
CREATE INDEX idx_trainee_progress_user_id ON public.trainee_progress(user_id);
CREATE INDEX idx_customer_personas_category ON public.customer_personas(category);
CREATE INDEX idx_training_scenarios_category ON public.training_scenarios(category);
CREATE INDEX idx_training_scenarios_type ON public.training_scenarios(type);