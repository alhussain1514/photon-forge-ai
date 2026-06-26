import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, CheckCircle2, Clock, Users, Plus, Hash, Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Collaboration = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex -space-x-2">
           {[1, 2, 3].map(i => (
             <Avatar key={i} className="w-8 h-8 border-2 border-background">
                <AvatarFallback className="bg-white/10 text-[10px]">U{i}</AvatarFallback>
             </Avatar>
           ))}
           <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary border-2 border-background">+4</div>
        </div>
      </div>

      <header>
        <h1 className="text-3xl font-bold">Team Engine</h1>
        <p className="text-muted-foreground">Riverside Project Collaboration</p>
      </header>

      {/* Internal Chat Simulation */}
      <GlassCard className="flex-1 min-h-[400px] flex flex-col overflow-hidden">
         <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
               <Hash className="w-5 h-5 text-primary" />
               <div className="font-bold">Engineering Chat</div>
            </div>
            <div className="text-[10px] font-bold text-emerald-500 uppercase">3 Online</div>
         </div>

         <div className="flex-1 p-6 space-y-6 overflow-y-auto">
            <div className="flex items-start gap-3">
               <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-purple-500/20 text-purple-500 font-bold text-[10px]">JD</AvatarFallback>
               </Avatar>
               <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                     <span className="text-xs font-bold text-white">John Designer</span>
                     <span className="text-[8px] text-muted-foreground">10:42 AM</span>
                  </div>
                  <div className="p-3 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-xs leading-relaxed max-w-[240px]">
                     I've updated the drone scan for Phase 2. The shading analysis looks much better with the new tree trimming.
                  </div>
               </div>
            </div>

            <div className="flex items-start gap-3 flex-row-reverse text-right">
               <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-primary/20 text-primary font-bold text-[10px]">ME</AvatarFallback>
               </Avatar>
               <div className="space-y-1.5 items-end flex flex-col">
                  <div className="flex items-center gap-2">
                     <span className="text-[8px] text-muted-foreground">10:45 AM</span>
                     <span className="text-xs font-bold text-white">You</span>
                  </div>
                  <div className="p-3 rounded-2xl rounded-tr-none bg-primary text-black font-medium text-xs leading-relaxed max-w-[240px]">
                     Perfect. I'll finalize the BOM (Bill of Materials) and send it for approval.
                  </div>
               </div>
            </div>

            <div className="flex items-start gap-3">
               <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-blue-500/20 text-blue-500 font-bold text-[10px]">ST</AvatarFallback>
               </Avatar>
               <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                     <span className="text-xs font-bold text-white">Sarah Tech</span>
                     <span className="text-[8px] text-muted-foreground">10:48 AM</span>
                  </div>
                  <div className="p-3 rounded-2xl rounded-tl-none bg-white/5 border border-white/10 text-xs leading-relaxed max-w-[240px]">
                     Check the new cable size calculations. We might need thicker gauge for the 50m run.
                  </div>
               </div>
            </div>
         </div>

         <div className="p-4 bg-white/5 border-t border-white/10">
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl hover:bg-white/10">
                  <Paperclip className="w-5 h-5 text-muted-foreground" />
               </Button>
               <div className="relative flex-1">
                  <Input placeholder="Write a message..." className="h-11 bg-black/30 border-white/10 pr-10" />
                  <Smile className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
               </div>
               <Button size="icon" className="w-11 h-11 rounded-xl bg-primary text-black">
                  <Send className="w-5 h-5" />
               </Button>
            </div>
         </div>
      </GlassCard>

      {/* Task Summary Overlay */}
      <GlassCard className="p-4 border-primary/20 bg-primary/5 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
               <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
               <div className="text-[10px] font-bold text-primary uppercase">Open Tasks</div>
               <div className="text-sm font-bold">12 Active / 4 Pending</div>
            </div>
         </div>
         <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-primary">View Board</Button>
      </GlassCard>
    </div>
  );
};

export default Collaboration;
