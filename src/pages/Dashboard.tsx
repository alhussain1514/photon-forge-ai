import React from 'react';
import { motion } from 'framer-motion';
import { 
  CloudSun, 
  Zap, 
  Battery, 
  Leaf, 
  PlusCircle, 
  Compass, 
  FileText, 
  FolderKanban, 
  Calculator, 
  Bot,
  TrendingUp,
  ArrowUpRight,
  MoreVertical, 
  Calendar,
  CheckCircle2,
  Clock,
  FilePlus,
  Briefcase
} from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { Button } from '@/components/ui/button';
import { View } from '@/App';
import { cn } from '@/lib/utils';
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
  return (
    <div className="space-y-8">
      {/* Greeting & Weather */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Welcome back</h2>
          <h1 className="text-3xl font-bold">Good Morning, Engineer.</h1>
        </div>
        <GlassCard className="px-4 py-2 flex items-center gap-3 border-white/5 bg-white/5">
          <CloudSun className="w-6 h-6 text-solar-gold" />
          <div>
            <div className="text-sm font-bold">28°C</div>
            <div className="text-[10px] text-muted-foreground">Clear Sky • 5.8 kWh/m²</div>
          </div>
        </GlassCard>
      </div>

      {/* Hero Stats */}
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

      {/* Quick Actions */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Quick Actions</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: 'project-wizard', icon: FilePlus, label: 'New Design', color: 'bg-blue-500' },
            { id: 'load-audit', icon: Zap, label: 'AI Audit', color: 'bg-emerald-500' },
            { id: 'quotation', icon: FileText, label: 'Generate Quote', color: 'bg-solar-gold' },
            { id: 'crm', icon: FolderKanban, label: 'Projects', color: 'bg-purple-500' },
            { id: 'financials', icon: Calculator, label: 'Calculator', color: 'bg-pink-500' },
            { id: 'collaboration', icon: Bot, label: 'AI Assistant', color: 'bg-indigo-500' },
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

      {/* Energy Chart */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold">Energy Performance</h3>
            <p className="text-xs text-muted-foreground">Production vs Consumption</p>
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

      {/* Statistics & Revenue */}
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

        {/* Environmental Impact */}
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

      {/* Upcoming Installations */}
      <section className="pb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Upcoming Installations</h3>
          <Button variant="link" className="text-primary text-xs">View All</Button>
        </div>
        <div className="space-y-4">
          {[
            { client: "Dr. Elizabeth Stone", project: "Solar-H Hybrid System", date: "Tomorrow, 09:00", status: "Ready", progress: 0 },
            { client: "Global Tech Hub", project: "Industrial Array 250kW", date: "Friday, 08:30", status: "Materials", progress: 65 },
          ].map((item, i) => (
            <GlassCard key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                   <Briefcase className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-bold text-sm">{item.client}</div>
                  <div className="text-xs text-muted-foreground">{item.project}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-primary flex items-center gap-1 justify-end">
                   <Clock className="w-3 h-3" />
                   {item.date}
                </div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">{item.status}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
