import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CloudSun,
  Zap,
  Battery,
  Leaf,
  Calculator,
  FileText,
  FolderKanban,
  Bot,
  TrendingUp,
  ArrowUpRight,
  Calendar,
  Clock,
  FilePlus,
  Briefcase,
  Trophy,
  MapPin
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { View } from '@/App';
import { cn } from '@/lib/utils';
import { listProjects } from '@/lib/api';
import type { Project } from '@/lib/types';
import { useAuth } from '@/context/AuthContext';
import { worldSolarProjects, worldRecordCapacityMw } from '@/data/worldSolarProjects';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const energyData = [
  { time: '06:00', production: 0, consumption: 2 },
  { time: '08:00', production: 2, consumption: 3 },
  { time: '10:00', production: 8, consumption: 4 },
  { time: '12:00', production: 15, consumption: 6 },
  { time: '14:00', production: 12, consumption: 5 },
  { time: '16:00', production: 6, consumption: 4 },
  { time: '18:00', production: 1, consumption: 3 },
  { time: '20:00', production: 0, consumption: 4 },
];

const completionData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 18 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 25 },
];

interface DashboardProps {
  setView: (view: View) => void;
}

const Dashboard = ({ setView }: DashboardProps) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoadingProjects(false));
  }, []);

  const firstName = ((user?.user_metadata?.full_name as string) || '').split(' ')[0] || 'Engineer';
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Welcome back</h2>
          <h1 className="text-3xl font-bold">{greeting}, {firstName}.</h1>
        </div>
        <GlassCard className="px-4 py-2 flex items-center gap-3 border-white/5 bg-white/5">
          <CloudSun className="w-6 h-6 text-solar-gold" />
          <div>
            <div className="text-sm font-bold">28°C</div>
            <div className="text-[10px] text-muted-foreground">Clear Sky • 5.8 kWh/m²</div>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-5 flex flex-col justify-between h-40 group hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-bold">42.5 kWh</div>
            <div className="text-xs text-muted-foreground">Today's Production</div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex flex-col justify-between h-40 group hover:border-solar-gold/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-solar-gold/10 flex items-center justify-center">
              <Battery className="w-5 h-5 text-solar-gold" />
            </div>
            <span className="text-[10px] font-bold text-solar-gold">98% HEALTH</span>
          </div>
          <div>
            <div className="text-2xl font-bold">85% SOC</div>
            <div className="text-xs text-muted-foreground">Total Storage System</div>
          </div>
        </GlassCard>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'project-wizard', icon: FilePlus, label: 'New Design' },
            { id: 'solar-consultant', icon: Calculator, label: 'Solar Consultant' },
            { id: 'load-audit', icon: Zap, label: 'AI Audit' },
            { id: 'quotation', icon: FileText, label: 'Generate Quote' },
            { id: 'crm', icon: FolderKanban, label: 'Projects' },
            { id: 'financials', icon: TrendingUp, label: 'Financials' },
            { id: 'collaboration', icon: Bot, label: 'AI Assistant' },
          ].map((action) => (
            <button
              key={action.id}
              onClick={() => setView(action.id as View)}
              className="flex flex-col items-center gap-2 group"
            >
              <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95",
                "bg-white/5 border border-white/10 group-hover:border-white/20"
              )}>
                <action.icon className="w-8 h-8 text-white" />
              </div>
              <span className="text-[10px] font-bold text-center uppercase tracking-tight text-muted-foreground group-hover:text-white transition-colors">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold">Energy Performance</h3>
            <p className="text-xs text-muted-foreground">Production vs Consumption (simulated — connect an inverter API for live data)</p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Production</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Load</span>
            </div>
          </div>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={energyData}>
              <defs>
                <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F2FF" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00F2FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A1F26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#F8F9FA' }}
              />
              <Area type="monotone" dataKey="production" stroke="#00F2FF" strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" />
              <Area type="monotone" dataKey="consumption" stroke="rgba(255,255,255,0.2)" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Project Completion</h3>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData}>
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {completionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 ? '#00F2FF' : 'rgba(255,255,255,0.1)'} />
                  ))}
                </Bar>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm font-medium">Monthly Target</div>
            <div className="text-primary font-bold">84%</div>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '84%' }}
              className="h-full bg-primary"
            />
          </div>
        </GlassCard>

        <GlassCard className="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
              <Leaf className="w-7 h-7 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-bold">Eco Impact</h3>
              <p className="text-xs text-muted-foreground">Lifetime CO₂ reduction</p>
            </div>
          </div>
          <div className="text-4xl font-bold text-emerald-500 mb-2">1,240 <span className="text-xl">tons</span></div>
          <p className="text-xs text-muted-foreground">Equivalent to planting 5,400 trees annually.</p>
          <div className="mt-6 flex items-center gap-2 text-emerald-500 font-bold text-sm">
            <ArrowUpRight className="w-4 h-4" />
            +12% from last quarter
          </div>
        </GlassCard>
      </div>

      <section>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-solar-gold" />
            <h3 className="font-bold text-lg">World's Largest Solar Installations</h3>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mb-4">Real, publicly documented mega-projects — for scale and inspiration.</p>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none">
          {worldSolarProjects
            .slice()
            .sort((a, b) => b.capacityMw - a.capacityMw)
            .map((proj) => {
              const pct = Math.round((proj.capacityMw / worldRecordCapacityMw) * 100);
              return (
                <GlassCard
                  key={proj.id}
                  className="p-5 min-w-[260px] snap-start border-white/10 relative overflow-hidden shrink-0"
                >
                  <div
                    className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20"
                    style={{ backgroundColor: proj.accent }}
                  />
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl leading-none">{proj.countryFlag}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{proj.commissioned}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-tight">{proj.name}</h4>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-muted-foreground">
                        <MapPin className="w-3 h-3" /> {proj.country}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-black" style={{ color: proj.accent }}>
                        {proj.capacityMw.toLocaleString()} <span className="text-xs font-bold">MW</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: proj.accent }}
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{proj.fact}</p>
                  </div>
                </GlassCard>
              );
            })}
        </div>
      </section>

      <section className="pb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Your Projects</h3>
          <Button variant="link" className="text-primary text-xs" onClick={() => setView('crm')}>View All</Button>
        </div>
        <div className="space-y-4">
          {loadingProjects ? (
            <div className="text-center text-muted-foreground text-sm py-8">Loading projects...</div>
          ) : projects.length === 0 ? (
            <GlassCard className="p-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">No projects yet — every one of the giants above started as a single design too.</p>
              <Button size="sm" className="bg-primary text-black font-bold" onClick={() => setView('project-wizard')}>
                Start your first design
              </Button>
            </GlassCard>
          ) : (
            projects.slice(0, 5).map((item) => (
              <GlassCard key={item.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                     <Briefcase className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{item.client_name}</div>
                    <div className="text-xs text-muted-foreground">{item.address || item.building_type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-primary flex items-center gap-1 justify-end">
                     <Clock className="w-3 h-3" />
                     {new Date(item.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">{item.status}</div>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
