import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Battery, Home, Radio, Cloud, AlertCircle, RefreshCcw, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const liveData = [
  { time: '12:00', val: 4.2 },
  { time: '12:05', val: 4.8 },
  { time: '12:10', val: 5.1 },
  { time: '12:15', val: 4.9 },
  { time: '12:20', val: 5.3 },
  { time: '12:25', val: 5.8 },
  { time: '12:30', val: 5.5 },
];

const Monitoring = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
           <span className="text-[10px] font-bold text-primary uppercase">Live Data</span>
        </div>
      </div>

      <header>
        <h1 className="text-3xl font-bold">Real-time Power</h1>
        <p className="text-muted-foreground">Energy Flow & System Analytics</p>
      </header>

      {/* Energy Flow Animation Simulation */}
      <GlassCard className="p-8 aspect-square relative flex flex-col items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-slate-900/50" />
         
         {/* Solar Icon */}
         <div className="relative z-10 flex flex-col items-center gap-2 mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center relative">
               <Zap className="w-8 h-8 text-primary" />
               <motion.div 
                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inset-0 rounded-full border border-primary/60"
               />
            </div>
            <span className="text-xs font-bold text-primary">5.8 kW</span>
         </div>

         {/* Energy Flow Lines */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <path d="M 50% 30% L 50% 50%" stroke="#00F2FF" strokeWidth="2" strokeDasharray="5 5">
               <animate attributeName="stroke-dashoffset" from="50" to="0" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M 50% 50% L 20% 70%" stroke="#FFD700" strokeWidth="2" strokeDasharray="5 5">
               <animate attributeName="stroke-dashoffset" from="50" to="0" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M 50% 50% L 80% 70%" stroke="#10B981" strokeWidth="2" strokeDasharray="5 5">
               <animate attributeName="stroke-dashoffset" from="0" to="50" dur="2s" repeatCount="indefinite" />
            </path>
         </svg>

         <div className="relative z-10 flex items-center justify-between w-full mt-4">
            <div className="flex flex-col items-center gap-2">
               <div className="w-14 h-14 rounded-2xl bg-solar-gold/20 border border-solar-gold/40 flex items-center justify-center">
                  <Battery className="w-6 h-6 text-solar-gold" />
               </div>
               <span className="text-[10px] font-bold text-solar-gold">85% SOC</span>
            </div>

            <div className="flex flex-col items-center gap-2">
               <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Home className="w-6 h-6 text-emerald-500" />
               </div>
               <span className="text-[10px] font-bold text-emerald-500">2.1 kW LOAD</span>
            </div>

            <div className="flex flex-col items-center gap-2">
               <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Radio className="w-6 h-6 text-white" />
               </div>
               <span className="text-[10px] font-bold text-muted-foreground">-3.7 kW GRID</span>
            </div>
         </div>
      </GlassCard>

      {/* Production Graph */}
      <GlassCard className="p-6">
         <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Yield History</h3>
            <div className="flex gap-2">
               <Button size="sm" variant="ghost" className="h-7 text-[10px] font-bold uppercase">1H</Button>
               <Button size="sm" variant="ghost" className="h-7 text-[10px] font-bold uppercase text-primary bg-primary/10">LIVE</Button>
            </div>
         </div>
         <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={liveData}>
                  <defs>
                     <linearGradient id="liveColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00F2FF" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00F2FF" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#00F2FF" fillOpacity={1} fill="url(#liveColor)" />
                  <XAxis dataKey="time" hide />
                  <YAxis hide domain={['dataMin - 1', 'dataMax + 1']} />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-4">
         <GlassCard className="p-4 flex items-center gap-3">
            <Cloud className="w-5 h-5 text-muted-foreground" />
            <div>
               <div className="text-[10px] font-bold text-muted-foreground uppercase">Weather</div>
               <div className="text-xs font-bold">Partly Cloudy</div>
            </div>
         </GlassCard>
         <GlassCard className="p-4 flex items-center gap-3">
            <RefreshCcw className="w-5 h-5 text-primary animate-spin-slow" />
            <div>
               <div className="text-[10px] font-bold text-muted-foreground uppercase">Sync</div>
               <div className="text-xs font-bold">12s ago</div>
            </div>
         </GlassCard>
      </div>

      <GlassCard className="p-4 border-red-500/20 bg-red-500/5 flex items-start gap-4">
         <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
         <div>
            <h4 className="font-bold text-sm text-red-500">System Alert</h4>
            <p className="text-xs text-muted-foreground mt-1">String 2 voltage deviation detected. Check DC combiner box connections.</p>
         </div>
      </GlassCard>
    </div>
  );
};

export default Monitoring;
