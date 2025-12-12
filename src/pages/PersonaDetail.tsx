import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Target, MessageSquare, AlertTriangle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

const temperamentEmoji: Record<string, string> = {
  friendly: '😊',
  neutral: '😐',
  difficult: '😤',
  hostile: '😠'
};

const temperamentColors: Record<string, string> = {
  friendly: 'bg-emerald-500/20 text-emerald-400',
  neutral: 'bg-slate-500/20 text-slate-400',
  difficult: 'bg-amber-500/20 text-amber-400',
  hostile: 'bg-red-500/20 text-red-400'
};

const difficultyConfig: Record<string, { bg: string; text: string; label: string }> = {
  beginner: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Beginner' },
  intermediate: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Intermediate' },
  advanced: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Advanced' },
  expert: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Expert' }
};

export default function PersonaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: persona, isLoading: personaLoading } = useQuery({
    queryKey: ['persona', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_personas')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const { data: compatibleScenarios } = useQuery({
    queryKey: ['compatible-scenarios', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('training_scenarios')
        .select('*')
        .contains('compatible_persona_ids', [id])
        .limit(6);
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  if (personaLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <div className="h-8 w-48 bg-card animate-pulse rounded" />
          <div className="h-64 bg-card animate-pulse rounded-xl" />
        </div>
      </DashboardLayout>
    );
  }

  if (!persona) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center">
          <p className="text-muted-foreground">Persona not found</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/personas')}>
            Back to Personas
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const config = difficultyConfig[persona.difficulty] || difficultyConfig.intermediate;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 max-w-5xl">
        {/* Back Button */}
        <Link
          to="/personas"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Personas
        </Link>

        {/* Header Card */}
        <Card className="bg-card border-border overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-5xl shadow-lg">
                {persona.avatar_url ? (
                  <img src={persona.avatar_url} alt={persona.name} className="w-full h-full rounded-2xl object-cover" />
                ) : (
                  temperamentEmoji[persona.temperament] || '👤'
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground">{persona.name}</h1>
                <p className="text-muted-foreground">{persona.role}</p>
                {persona.company && (
                  <p className="text-sm text-muted-foreground/70">{persona.company}</p>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge className={`${config.bg} ${config.text} border-0`}>
                    {config.label}
                  </Badge>
                  <Badge variant="outline" className="uppercase">
                    {persona.category}
                  </Badge>
                  <Badge className={`${temperamentColors[persona.temperament]} border-0`}>
                    {temperamentEmoji[persona.temperament]} {persona.temperament}
                  </Badge>
                </div>
              </div>

              <Button size="lg" className="gap-2">
                <Play className="h-4 w-4" />
                Start Practice Session
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Background */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {persona.background_story || 'No background story available for this persona.'}
              </p>
            </CardContent>
          </Card>

          {/* Personality Profile */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Personality Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Patience</span>
                  <span className="text-foreground">{persona.patience}/10</span>
                </div>
                <Progress value={persona.patience * 10} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Technical Level</span>
                  <span className="text-foreground">{persona.technical_level}/10</span>
                </div>
                <Progress value={persona.technical_level * 10} className="h-2" />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-muted-foreground">Decision Authority</span>
                <Badge variant="secondary" className="capitalize">
                  {persona.decision_authority?.replace('-', ' ')}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Objection Style</span>
                <Badge variant="secondary" className="capitalize">
                  {persona.objection_style}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills */}
        {persona.skills && persona.skills.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Skills You'll Develop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {persona.skills.map((skill: string) => (
                  <Badge key={skill} variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Common Objections */}
        {persona.common_objections && persona.common_objections.length > 0 && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Common Objections & Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {persona.common_objections.map((objection: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-amber-500">•</span>
                    "{objection}"
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Compatible Scenarios */}
        {compatibleScenarios && compatibleScenarios.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Compatible Scenarios</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {compatibleScenarios.map((scenario) => (
                <Link
                  key={scenario.id}
                  to={`/scenario/${scenario.id}`}
                  className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-medium text-foreground">{scenario.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {scenario.description}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-xs">
                      {scenario.type?.replace('-', ' ')}
                    </Badge>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
