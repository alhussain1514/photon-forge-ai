import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';

const SetupRequired = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <GlassCard className="max-w-md w-full p-8 border-solar-gold/30 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-solar-gold/10 border border-solar-gold/20 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-solar-gold" />
        </div>
        <h1 className="text-2xl font-bold">Backend not connected</h1>
        <p className="text-sm text-muted-foreground">
          SunScale Pro needs a Supabase project to store real accounts, projects, and
          customer data. Add these two values to a <code>.env</code> file at the root of
          this project, then restart the dev server:
        </p>
        <pre className="bg-black/40 border border-white/10 rounded-xl p-4 text-xs overflow-x-auto">
{`VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key`}
        </pre>
        <p className="text-xs text-muted-foreground">
          See the README for the full step-by-step setup (creating a free Supabase
          project, running the schema, and getting these keys).
        </p>
      </GlassCard>
    </div>
  );
};

export default SetupRequired;
