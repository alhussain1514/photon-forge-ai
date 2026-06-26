import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Box, Share2, Save, Download, Plus, Settings2, Trash2, Cpu, Grid3X3, Battery, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const SystemDesigner = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-white/10">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-white/10">
            <Download className="w-4 h-4" />
          </Button>
          <Button className="bg-primary text-black font-bold px-4 rounded-xl">
            Save Design
          </Button>
        </div>
      </div>

      <header>
        <h1 className="text-3xl font-bold tracking-tight">System Designer</h1>
        <p className="text-muted-foreground">DC/AC Configuration & Wiring Diagram</p>
      </header>

      {/* Designer Canvas Simulation */}
      <GlassCard className="aspect-square relative overflow-hidden bg-slate-900 border-white/5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(rgba(0, 242, 255, 0.05) 1px, transparent 1px)',
          backgroundSize: '20px 20px' 
        }} />
        
        {/* Mock SLD Components */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-12 p-8">
           <div className="flex gap-8">
              <div className="w-16 h-24 bg-primary/20 border border-primary/50 rounded-lg flex flex-col items-center justify-center p-2">
                <Grid3X3 className="w-6 h-6 text-primary mb-1" />
                <span className="text-[8px] font-bold text-primary">PV ARRAY</span>
              </div>
              <div className="w-16 h-24 bg-primary/20 border border-primary/50 rounded-lg flex flex-col items-center justify-center p-2">
                <Grid3X3 className="w-6 h-6 text-primary mb-1" />
                <span className="text-[8px] font-bold text-primary">PV ARRAY</span>
              </div>
           </div>

           <div className="w-[200px] h-[2px] bg-primary/50 relative">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
           </div>

           <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-2xl flex flex-col items-center justify-center relative">
              <Cpu className="w-8 h-8 text-white mb-2" />
              <span className="text-[10px] font-bold">INVERTER</span>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-white/20" />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-white/20" />
           </div>

           <div className="flex gap-16 mt-4">
              <div className="w-20 h-16 bg-solar-gold/20 border border-solar-gold/50 rounded-xl flex flex-col items-center justify-center">
                <Battery className="w-5 h-5 text-solar-gold" />
                <span className="text-[8px] font-bold text-solar-gold">BATTERY</span>
              </div>
              <div className="w-20 h-16 bg-emerald-500/20 border border-emerald-500/50 rounded-xl flex flex-col items-center justify-center">
                <Radio className="w-5 h-5 text-emerald-500" />
                <span className="text-[8px] font-bold text-emerald-500">GRID</span>
              </div>
           </div>
        </div>

        <div className="absolute bottom-4 left-4 flex gap-2">
           <Button size="sm" className="bg-black/60 backdrop-blur-md rounded-lg h-8 text-[10px] font-bold uppercase tracking-widest border border-white/10">
              <Plus className="w-3 h-3 mr-1" /> Component
           </Button>
           <Button size="sm" className="bg-black/60 backdrop-blur-md rounded-lg h-8 text-[10px] font-bold uppercase tracking-widest border border-white/10">
              <Settings2 className="w-3 h-3 mr-1" /> Tools
           </Button>
        </div>
      </GlassCard>

      <Tabs defaultValue="components" className="w-full">
        <TabsList className="w-full bg-white/5 border border-white/10 h-12 p-1 rounded-xl">
          <TabsTrigger value="components" className="flex-1 rounded-lg font-bold text-xs uppercase tracking-widest">Components</TabsTrigger>
          <TabsTrigger value="wiring" className="flex-1 rounded-lg font-bold text-xs uppercase tracking-widest">Wiring</TabsTrigger>
          <TabsTrigger value="specs" className="flex-1 rounded-lg font-bold text-xs uppercase tracking-widest">Calculations</TabsTrigger>
        </TabsList>
        <TabsContent value="components" className="pt-4 space-y-4">
          <div className="grid grid-cols-1 gap-3">
             {[
               { name: 'Canadian Solar 550W', qty: 12, spec: 'DC String 1' },
               { name: 'Huawei SUN2000-5KTL', qty: 1, spec: 'Hybrid Inverter' },
               { name: 'Luna2000 10kWh', qty: 1, spec: 'LiFePO4 Storage' },
             ].map((item, i) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <div className="text-sm font-bold">{item.name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.spec}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-primary">x{item.qty}</span>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg">
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
               </div>
             ))}
          </div>
          <Button variant="outline" className="w-full border-dashed border-white/20 h-12 rounded-xl text-muted-foreground hover:border-primary/50 hover:text-primary">
            <Plus className="w-4 h-4 mr-2" /> Add Component to Designer
          </Button>
        </TabsContent>
      </Tabs>

      <GlassCard className="p-4 border-emerald-500/20 bg-emerald-500/5">
         <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Validation Success</div>
            <div className="text-xs text-muted-foreground">AS/NZS 5033 Compliant</div>
         </div>
      </GlassCard>
    </div>
  );
};

export default SystemDesigner;
