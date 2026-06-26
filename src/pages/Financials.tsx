import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, DollarSign, PieChart as PieIcon, LineChart as LineIcon, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

const cashFlowData = [
  { year: 'Yr 0', flow: -18500 },
  { year: 'Yr 1', flow: -16000 },
  { year: 'Yr 2', flow: -13500 },
  { year: 'Yr 3', flow: -11000 },
  { year: 'Yr 4', flow: -8500 },
  { year: 'Yr 5', flow: -6000 },
  { year: 'Yr 6', flow: -3500 },
  { year: 'Yr 7', flow: -1000 },
  { year: 'Yr 8', flow: 1500 },
  { year: 'Yr 9', flow: 4000 },
  { year: 'Yr 10', flow: 6500 },
];

const Financials = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center gap-2">
           <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">High ROI</Badge>
        </div>
      </div>

      <header>
        <h1 className="text-3xl font-bold">Financial Analysis</h1>
        <p className="text-muted-foreground">Investment, ROI & Payback Projections</p>
      </header>

      {/* Main KPIs */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-5 flex flex-col justify-between h-36">
           <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Payback Period</div>
           <div>
              <div className="text-3xl font-bold">7.2 <span className="text-sm">Years</span></div>
              <div className="text-[10px] text-emerald-500 font-bold mt-1">Excellent Performance</div>
           </div>
        </GlassCard>
        <GlassCard className="p-5 flex flex-col justify-between h-36">
           <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Net Profit (25y)</div>
           <div>
              <div className="text-3xl font-bold">$42.8k</div>
              <div className="text-[10px] text-emerald-500 font-bold mt-1">+14% vs Grid cost</div>
           </div>
        </GlassCard>
      </div>

      {/* Cash Flow Chart */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
           <div>
              <h3 className="font-bold">Cumulative Cash Flow</h3>
              <p className="text-[10px] text-muted-foreground">Initial investment vs lifetime savings</p>
           </div>
           <LineIcon className="w-5 h-5 text-primary" />
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#F8F9FA' }}
              />
              <Line type="monotone" dataKey="flow" stroke="#00F2FF" strokeWidth={3} dot={{ fill: '#00F2FF', r: 4 }} activeDot={{ r: 6, stroke: '#0B0B0B', strokeWidth: 2 }} />
              <motion.path d="M0 0" /> {/* Just for reference */}
              {/* Zero line */}
              <Line type="monotone" dataKey={() => 0} stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" dot={false} activeDot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Detailed Breakdown */}
      <div className="space-y-4">
        <h3 className="font-bold flex items-center gap-2">
           <PieIcon className="w-5 h-5 text-solar-gold" />
           Investment Breakdown
        </h3>
        <div className="space-y-3">
           {[
             { label: 'Equipment & Hardware', value: '$12,450', percent: 65, color: 'bg-primary' },
             { label: 'Installation & Labor', value: '$3,200', percent: 18, color: 'bg-solar-gold' },
             { label: 'Permits & Connection', value: '$1,850', percent: 10, color: 'bg-emerald-500' },
             { label: 'Maintenance (Reserve)', value: '$1,200', percent: 7, color: 'bg-purple-500' },
           ].map((item, i) => (
             <div key={i} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tight">
                   <span className="text-muted-foreground">{item.label}</span>
                   <span>{item.value}</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.percent}%` }} />
                </div>
             </div>
           ))}
        </div>
      </div>

      <GlassCard className="p-6 bg-gradient-to-br from-solar-gold/10 to-transparent border-solar-gold/20">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-solar-gold/20 flex items-center justify-center">
               <TrendingUp className="w-7 h-7 text-solar-gold" />
            </div>
            <div>
               <h3 className="font-bold">Net Present Value (NPV)</h3>
               <div className="text-2xl font-black text-solar-gold">$14,280.50</div>
            </div>
         </div>
         <p className="text-xs text-muted-foreground mt-4">The current value of all future cash flows, discounted at a rate of 5%. This project is financially sound.</p>
      </GlassCard>

      <Button className="w-full h-14 bg-primary text-black font-bold rounded-2xl group">
         Generate Financial Report PDF
         <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};

export default Financials;
