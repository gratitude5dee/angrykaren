import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import type { TrainingCategory, DifficultyLevel } from '@/types/training';

const temperamentEmoji: Record<string, string> = {
  friendly: '😊',
  neutral: '😐',
  difficult: '😤',
  hostile: '😠'
};

const difficultyConfig: Record<string, { bg: string; text: string; label: string }> = {
  beginner: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Easy' },
  intermediate: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Medium' },
  advanced: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Hard' },
  expert: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Expert' }
};

export default function Personas() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'all' | TrainingCategory>('all');
  const [difficulty, setDifficulty] = useState<'all' | DifficultyLevel>('all');

  const { data: personas, isLoading } = useQuery({
    queryKey: ['personas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_personas')
        .select('*')
        .order('name');
      if (error) throw error;
      return data;
    }
  });

  const filteredPersonas = personas?.filter(persona => {
    const matchesSearch = persona.name.toLowerCase().includes(search.toLowerCase()) ||
      persona.role.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || persona.category === category || persona.category === 'both';
    const matchesDifficulty = difficulty === 'all' || persona.difficulty === difficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const csrPersonas = filteredPersonas?.filter(p => p.category === 'csr' || p.category === 'both');
  const sdrPersonas = filteredPersonas?.filter(p => p.category === 'sdr' || p.category === 'both');

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Customer Personas
            </h1>
            <p className="text-muted-foreground mt-1">
              Practice with realistic customer simulations
            </p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search personas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <Tabs value={category} onValueChange={(v) => setCategory(v as typeof category)}>
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="csr">CSR</TabsTrigger>
              <TabsTrigger value="sdr">SDR</TabsTrigger>
            </TabsList>
          </Tabs>

          <Select value={difficulty} onValueChange={(v) => setDifficulty(v as typeof difficulty)}>
            <SelectTrigger className="w-[140px] bg-card border-border">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Difficulty</SelectItem>
              <SelectItem value="beginner">Easy</SelectItem>
              <SelectItem value="intermediate">Medium</SelectItem>
              <SelectItem value="advanced">Hard</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-48 rounded-xl bg-card animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            {/* CSR Personas */}
            {csrPersonas && csrPersonas.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-4">CSR Personas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {csrPersonas.map((persona) => (
                    <PersonaCard key={persona.id} persona={persona} />
                  ))}
                </div>
              </section>
            )}

            {/* SDR Personas */}
            {sdrPersonas && sdrPersonas.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-4">SDR Personas</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sdrPersonas.map((persona) => (
                    <PersonaCard key={persona.id} persona={persona} />
                  ))}
                </div>
              </section>
            )}

            {filteredPersonas?.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No personas found matching your criteria.
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function PersonaCard({ persona }: { persona: any }) {
  const config = difficultyConfig[persona.difficulty] || difficultyConfig.intermediate;
  
  return (
    <Link
      to={`/persona/${persona.id}`}
      className="group block p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-2xl">
            {persona.avatar_url ? (
              <img src={persona.avatar_url} alt={persona.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              temperamentEmoji[persona.temperament] || '👤'
            )}
          </div>
          <span className="absolute -bottom-1 -right-1 text-sm">
            {temperamentEmoji[persona.temperament]}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {persona.name}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{persona.role}</p>
          {persona.company && (
            <p className="text-xs text-muted-foreground/70 truncate">{persona.company}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <Badge variant="outline" className={`${config.bg} ${config.text} border-0 text-xs`}>
          {config.label}
        </Badge>
        <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-0 text-xs uppercase">
          {persona.category}
        </Badge>
      </div>

      {persona.skills && persona.skills.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {persona.skills.slice(0, 3).map((skill: string) => (
            <span key={skill} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {skill}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
