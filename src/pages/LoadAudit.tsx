import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Zap, 
  Clock, 
  Hash, 
  ChevronDown, 
  Lightbulb, 
  Utensils, 
  AirVent, 
  Waves,
  Laptop,
  Factory,
  Shield,
  Stethoscope,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const categories = [
  { id: 'lighting', name: 'Lighting', icon: Lightbulb, color: '#00F2FF' },
  { id: 'kitchen', name: 'Kitchen', icon: Utensils, color: '#FFD700' },
  { id: 'ac', name: 'Air Conditioning', icon: AirVent, color: '#10B981' },
  { id: 'pumps', name: 'Pumps', icon: Waves, color: '#8B5CF6' },
  { id: 'office', name: 'Office Equipment', icon: Laptop, color: '#F43F5E' },
];

const LoadAudit = ({ onBack }: { onBack: () => void }) => {
  const [appliances, setAppliances] = useState([
    { id: 1, name: 'LED Lights', category: 'lighting', watts: 15, hours: 10, qty: 20, priority: 'medium', critical: false },
    { id: 2, name: 'Refrigerator', category: 'kitchen', watts: 150, hours: 24, qty: 1, priority: 'high', critical: true },
    { id: 3, name: 'Air Conditioner', category: 'ac', watts: 1500, hours: 6, qty: 2, priority: 'low', critical: false },
  ]);

  const totalDaily = appliances.reduce((acc, app) => acc + (app.watts * app.hours * app.qty), 0) / 1000;
  const peakLoad = appliances.reduce((acc, app) => acc + (app.watts * app.qty), 0) / 1000;

  const chartData = categories.map(cat => ({
    name: cat.name,
    value: appliances
      .filter(a => a.category === cat.id)
      .reduce((acc, a) => acc + (a.watts * a.hours * a.qty), 0),
    color: cat.color
  })).filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Button>
        <div className="text-right">
          <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Project: Riverside Villa</div>
          <div className="text-primary font-bold">AI LOAD AUDIT</div>
        </div>
      </div>

      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Energy Load Analysis</h1>
        <p className="text-muted-foreground">Calculate total connected load and daily consumption patterns.</p>
      </header>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5 border-primary/20 bg-primary/5">
          <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Peak Load</div>
          <div className="text-3xl font-bold">{peakLoad.toFixed(2)} <span className="text-sm">kW</span></div>
          <div className="text-xs text-muted-foreground mt-2">Max simultaneous demand</div>
        </GlassCard>
        <GlassCard className="p-5 border-solar-gold/20 bg-solar-gold/5">
          <div className="text-[10px] font-bold uppercase tracking-widest text-solar-gold mb-1">Daily Consumption</div>
          <div className="text-3xl font-bold">{totalDaily.toFixed(2)} <span className="text-sm">kWh/day</span></div>
          <div className="text-xs text-muted-foreground mt-2">Estimated energy needed</div>
        </GlassCard>
        <GlassCard className="p-5 border-emerald-500/20 bg-emerald-500/5">
          <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">System Size</div>
          <div className="text-3xl font-bold">{(totalDaily * 1.3 / 4.5).toFixed(1)} <span className="text-sm">kWp</span></div>
          <div className="text-xs text-muted-foreground mt-2">Recommended PV capacity</div>
        </GlassCard>
      </div>

      {/* Interactive Pie Chart */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold">Consumption Distribution</h3>
          <Info className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#1A1F26', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#F8F9FA' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {chartData.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] text-muted-foreground font-bold uppercase">{item.name}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Appliance List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Appliances ({appliances.length})</h3>
          <Button size="sm" className="bg-primary text-black font-bold h-8 rounded-full">
            <Plus className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
        
        {appliances.map((app) => (
          <GlassCard key={app.id} className="p-4 group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {React.createElement(categories.find(c => c.id === app.category)?.icon || Info, { className: "w-5 h-5 text-muted-foreground" })}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{app.name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{app.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Critical</span>
                  <Switch checked={app.critical} />
                </div>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-muted-foreground uppercase font-bold">Power (W)</label>
                <Input value={app.watts} className="h-8 bg-white/5 border-white/10 text-xs" readOnly />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-muted-foreground uppercase font-bold">Qty</label>
                <Input value={app.qty} className="h-8 bg-white/5 border-white/10 text-xs" readOnly />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-muted-foreground uppercase font-bold">Hours/Day</label>
                <Input value={app.hours} className="h-8 bg-white/5 border-white/10 text-xs" readOnly />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <Button className="w-full h-14 bg-primary text-black font-bold rounded-2xl text-lg shadow-xl shadow-primary/20">
        Generate Full Audit Report
      </Button>
    </div>
  );
};

export default LoadAudit;
