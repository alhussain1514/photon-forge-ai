import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Users, CheckSquare, Camera, MessageSquare, ClipboardCheck, PlayCircle, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

const Installation = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
           <span className="text-[10px] font-bold text-primary uppercase">Live Sync Active</span>
        </div>
      </div>

      <header>
        <div className="flex items-center gap-2 mb-2">
           <Badge className="bg-primary/20 text-primary border-primary/30 font-bold uppercase text-[8px]">In Progress</Badge>
           <span className="text-xs text-muted-foreground font-bold">Project ID: #SUN-2491</span>
        </div>
        <h1 className="text-3xl font-bold">Installation Hub</h1>
      </header>

      {/* Progress Card */}
      <GlassCard className="p-6">
         <div className="flex justify-between items-start mb-6">
            <div>
               <h3 className="font-bold text-lg">Overall Completion</h3>
               <p className="text-xs text-muted-foreground">Riverside Villa Site</p>
            </div>
            <div className="text-3xl font-black text-primary">68%</div>
         </div>
         <Progress value={68} className="h-3 bg-white/5" />
         <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-2">
               <Clock className="w-4 h-4 text-muted-foreground" />
               <span className="text-[10px] font-bold text-muted-foreground uppercase">Est. Finish: 14:30</span>
            </div>
            <div className="flex items-center gap-2 justify-end">
               <MapPin className="w-4 h-4 text-muted-foreground" />
               <span className="text-[10px] font-bold text-muted-foreground uppercase">Zone 2 Arrived</span>
            </div>
         </div>
      </GlassCard>

      {/* Tasks */}
      <div className="space-y-4">
         <h3 className="font-bold text-lg">Daily Milestones</h3>
         {[
           { title: 'Roof Structure Mounting', status: 'completed', time: '09:15' },
           { title: 'PV Panel Placement', status: 'completed', time: '11:40' },
           { title: 'Inverter Mounting & DC Wiring', status: 'active', time: 'Now' },
           { title: 'Battery Storage Integration', status: 'pending', time: '15:00' },
           { title: 'AC DB Connection', status: 'pending', time: '16:30' },
         ].map((task, i) => (
           <div key={i} className="flex items-start gap-4">
              <div className="flex flex-col items-center mt-1">
                 <div className={cn(
                   "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                   task.status === 'completed' ? "bg-primary border-primary" : 
                   task.status === 'active' ? "border-primary animate-pulse" : "border-white/10"
                 )}>
                    {task.status === 'completed' && <CheckSquare className="w-3 h-3 text-black" />}
                 </div>
                 {i < 4 && <div className="w-[1px] h-12 bg-white/10 my-1" />}
              </div>
              <div className="flex-1 pb-6">
                 <div className="flex justify-between">
                    <h4 className={cn("font-bold text-sm", task.status === 'pending' ? 'text-muted-foreground' : 'text-white')}>
                       {task.title}
                    </h4>
                    <span className="text-[10px] font-bold text-muted-foreground">{task.time}</span>
                 </div>
                 {task.status === 'active' && (
                    <div className="mt-3 flex gap-2">
                       <Button size="sm" className="h-8 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase">Update</Button>
                       <Button size="sm" className="h-8 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase text-primary">Live Chat</Button>
                    </div>
                 )}
              </div>
           </div>
         ))}
      </div>

      {/* Field Actions */}
      <div className="grid grid-cols-2 gap-4">
         <Button variant="outline" className="h-24 rounded-2xl flex flex-col gap-2 border-white/10 hover:bg-white/5">
            <Camera className="w-6 h-6 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Site Photos</span>
         </Button>
         <Button variant="outline" className="h-24 rounded-2xl flex flex-col gap-2 border-white/10 hover:bg-white/5">
            <ClipboardCheck className="w-6 h-6 text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest">QC Checklist</span>
         </Button>
      </div>

      <GlassCard className="p-4 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-muted-foreground" />
            <div>
               <div className="text-[10px] font-bold text-muted-foreground uppercase">Assigned Team</div>
               <div className="text-xs font-bold">Alpha-Unit • 4 Technicians</div>
            </div>
         </div>
         <Button variant="ghost" size="icon">
            <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
         </Button>
      </GlassCard>

      <Button className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl text-white font-bold gap-2">
         <PlayCircle className="w-5 h-5 text-primary" />
         Start Site Commissioning
      </Button>
    </div>
  );
};

export default Installation;
