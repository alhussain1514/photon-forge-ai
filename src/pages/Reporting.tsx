import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, DollarSign, Zap, Leaf, Download, Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { cn } from '@/lib/utils';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Cell
} from 'recharts';

const revenueData = [
  { month: 'Jan', rev: 45000 },
  { month: 'Feb', rev: 52000 },
  { month: 'Mar', rev: 48000 },
  { month: 'Apr', rev: 61000 },
  { month: 'May', rev: 58000 },
  { month: 'Jun', rev: 72000 },
];

const projectStats = [
  { name: 'Completed', val: 24, color: '#10B981' },
  { name: 'Active', val: 18, color: '#00F2FF' },
  { name: 'In Review', val: 9, color: '#FFD700' },
  { name: 'Leads', val: 32, color: '#8B5CF6' },
];

const Reporting = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button variant="outline" className="rounded-full border-white/10 h-10 gap-2">
           <Download className="w-4 h-4" /> Export
        </Button>
      </div>

      <header>
        <h1 className="text-3xl font-bold">Analytics Engine</h1>
        <p className="text-muted-foreground">Performance, Revenue & Impact Metrics</p>
      </header>

      {/* Filter Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
         {['Last 30 Days', 'This Quarter', 'Year to Date', 'All Time'].map((f, i) => (
           <Button key={i} variant="outline" size="sm" className={cn(
             "rounded-full border-white/10 h-9 px-4 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap",
             i === 0 ? "bg-primary border-primary text-black" : "bg-white/5"
           )}>
             {f}
           </Button>
         ))}
      </div>

      {/* Financial Summary */}
      <GlassCard className="p-6">
         <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="font-bold">Gross Revenue</h3>
               <div className="text-3xl font-black text-white mt-1">$348,250.00</div>
            </div>
            <div className="text-right">
               <div className="flex items-center gap-1 text-emerald-500 font-bold">
                  <TrendingUp className="w-4 h-4" />
                  <span>+12.4%</span>
               </div>
               <div className="text-[10px] text-muted-foreground uppercase font-bold">vs last month</div>
            </div>
         </div>
         <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <BarChart data={revenueData}>
                  <XAxis dataKey="month" hide />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#1A1F26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="rev" radius={[4, 4, 0, 0]}>
                     {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 5 ? '#00F2FF' : 'rgba(0, 242, 255, 0.2)'} />
                     ))}
                  </Bar>
               </BarChart>
            </ResponsiveContainer>
         </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-4">
         <GlassCard className="p-5">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
               <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-black">4.2 GWh</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Total Generated</div>
         </GlassCard>
         <GlassCard className="p-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4">
               <Leaf className="w-6 h-6 text-emerald-500" />
            </div>
            <div className="text-2xl font-black">8.4k Tons</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">CO₂ Reduced</div>
         </GlassCard>
      </div>

      {/* Project Breakdown */}
      <GlassCard className="p-6">
         <h3 className="font-bold mb-6">Project Portfolio</h3>
         <div className="space-y-4">
            {projectStats.map((item, i) => (
               <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                     <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-bold text-white">{item.val}</span>
               </div>
            ))}
         </div>
         <div className="mt-6 h-2 w-full flex rounded-full overflow-hidden">
            {projectStats.map((item, i) => (
               <div key={i} style={{ width: `${(item.val / 83) * 100}%`, backgroundColor: item.color }} />
            ))}
         </div>
      </GlassCard>

      <Button className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em]">
         View Full Audit Log
      </Button>
    </div>
  );
};

export default Reporting;
