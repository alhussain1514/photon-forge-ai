import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Compass, Maximize2, Layers, Sun, Eye, Info, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { cn } from '@/lib/utils';

const RoofAnalysis = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Button>
        <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase">
          AI Analysis Active
        </div>
      </div>

      <header>
        <h1 className="text-3xl font-bold">Roof Intelligence</h1>
        <p className="text-muted-foreground">3D Modeling & Solar Potential Mapping</p>
      </header>

      {/* Main Satellite View */}
      <GlassCard className="relative aspect-[4/5] overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200" 
          alt="Satellite View" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
        
        {/* Heatmap Overlay Simulation */}
        <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-red-500/40 via-yellow-500/20 to-blue-500/40 pointer-events-none" />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Button size="icon" className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
            <Compass className="w-5 h-5 text-white" />
          </Button>
          <Button size="icon" className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10">
            <Maximize2 className="w-5 h-5 text-white" />
          </Button>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <GlassCard className="p-4 bg-black/60 border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sun className="w-5 h-5 text-solar-gold" />
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-white">Shading Index</div>
                <div className="text-lg font-bold text-solar-gold">Low (12%)</div>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-white/10" />
            <div className="text-right">
              <div className="text-xs font-bold uppercase tracking-widest text-white">Usable Area</div>
              <div className="text-lg font-bold">145 m²</div>
            </div>
          </GlassCard>
        </div>
      </GlassCard>

      {/* Analysis Metrics */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Roof Pitch', value: '25°', status: 'Optimal' },
          { label: 'Orientation', value: 'South-West', status: 'Good' },
          { label: 'Obstacles', value: '3 Detected', status: 'Vents/Chimney' },
          { label: 'Avg. Irradiation', value: '1850 kWh', status: 'High' },
        ].map((item, i) => (
          <GlassCard key={i} className="p-4">
            <div className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{item.label}</div>
            <div className="text-xl font-bold">{item.value}</div>
            <div className="text-[10px] font-medium text-primary mt-1">{item.status}</div>
          </GlassCard>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="font-bold flex items-center gap-2">
           <Layers className="w-5 h-5 text-primary" />
           Analysis Layers
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['Satellite', '3D Model', 'Solar Heatmap', 'Panel Layout', 'Tree Shadows'].map((layer, i) => (
            <button key={i} className={cn(
              "px-4 py-2 rounded-full border text-xs font-bold whitespace-nowrap transition-all",
              i === 2 ? "bg-primary border-primary text-black" : "bg-white/5 border-white/10 text-muted-foreground"
            )}>
              {layer}
            </button>
          ))}
        </div>
      </div>

      <GlassCard className="p-4 border-solar-gold/20 bg-solar-gold/5 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-solar-gold shrink-0" />
        <div>
          <h4 className="font-bold text-sm text-solar-gold">Optimization Tip</h4>
          <p className="text-xs text-muted-foreground mt-1">Increasing panel tilt to 30° could improve winter yield by 8.5%. Consider adjusting mounting structures.</p>
        </div>
      </GlassCard>

      <Button className="w-full h-14 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2">
        <Eye className="w-5 h-5" />
        Preview 3D Placement
      </Button>
    </div>
  );
};

export default RoofAnalysis;
