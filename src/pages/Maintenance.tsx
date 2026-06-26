import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Wrench as Tool, AlertTriangle, FileText, CheckCircle2, ChevronRight, Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Input } from '@/components/ui/input';

const Maintenance = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button size="sm" className="bg-primary text-black font-bold h-8 rounded-full">
           <Plus className="w-4 h-4 mr-1" /> New Log
        </Button>
      </div>

      <header>
        <h1 className="text-3xl font-bold">Maintenance Center</h1>
        <p className="text-muted-foreground">Service Logs & Fault Management</p>
      </header>

      <div className="relative">
         <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
         <Input placeholder="Search assets, faults or logs..." className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl" />
      </div>

      {/* Critical Faults */}
      <section className="space-y-4">
         <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em]">Active Critical Faults (2)</h3>
         {[
           { asset: 'Inverter #2 (Huawei)', fault: 'Thermal Overload Protection', time: '2h ago', severity: 'High' },
           { asset: 'String #4', fault: 'Grounding Fault Detected', time: '5h ago', severity: 'Critical' },
         ].map((item, i) => (
           <GlassCard key={i} className="p-4 border-red-500/20 bg-red-500/5 group">
              <div className="flex items-start justify-between">
                 <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-red-500/20">
                       <AlertTriangle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                       <h4 className="font-bold text-sm text-white">{item.asset}</h4>
                       <p className="text-xs text-muted-foreground">{item.fault}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] font-bold text-red-500 uppercase">{item.severity}</div>
                    <div className="text-[10px] text-muted-foreground font-medium">{item.time}</div>
                 </div>
              </div>
              <div className="mt-4 flex gap-2">
                 <Button size="sm" className="bg-red-500 text-white font-bold h-8 rounded-lg flex-1">Assign Tech</Button>
                 <Button size="sm" variant="ghost" className="border border-white/10 h-8 rounded-lg flex-1">Details</Button>
              </div>
           </GlassCard>
         ))}
      </section>

      {/* Maintenance Schedule */}
      <section className="space-y-4">
         <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Upcoming Inspections</h3>
         {[
           { client: 'Riverside Villa', service: 'Bi-annual Performance Audit', date: 'June 12, 2024' },
           { client: 'Tech Hub', service: 'Panel Cleaning & String Check', date: 'June 15, 2024' },
         ].map((item, i) => (
           <GlassCard key={i} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                 </div>
                 <div>
                    <div className="font-bold text-sm">{item.client}</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{item.service}</div>
                 </div>
              </div>
              <div className="text-right">
                 <div className="text-xs font-bold text-primary">{item.date}</div>
                 <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto mt-1" />
              </div>
           </GlassCard>
         ))}
      </section>

      {/* Asset Tracker */}
      <GlassCard className="p-6">
         <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
               <Tool className="w-7 h-7 text-primary" />
            </div>
            <div>
               <h3 className="font-bold">Inventory Tracker</h3>
               <p className="text-xs text-muted-foreground">Warehouse & Spare Parts</p>
            </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
               <div className="text-2xl font-black text-white">42</div>
               <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Available Inverters</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
               <div className="text-2xl font-black text-red-500">3</div>
               <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Low Stock Alerts</div>
            </div>
         </div>
         <Button variant="outline" className="w-full mt-6 h-12 rounded-xl border-white/10 uppercase tracking-widest text-[10px] font-black">
            Manage Inventory
         </Button>
      </GlassCard>
    </div>
  );
};

export default Maintenance;
