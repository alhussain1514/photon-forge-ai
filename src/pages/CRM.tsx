import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Plus, UserPlus, Filter, MoreHorizontal, MessageSquare, Phone, Briefcase, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const CRM = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button size="sm" className="bg-primary text-black font-bold h-8 rounded-full">
           <UserPlus className="w-4 h-4 mr-1" /> New Lead
        </Button>
      </div>

      <header>
        <h1 className="text-3xl font-bold">Client Manager</h1>
        <p className="text-muted-foreground">Manage leads, projects & support</p>
      </header>

      <div className="flex gap-2">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search clients..." className="pl-10 h-12 bg-white/5 border-white/10 rounded-xl" />
         </div>
         <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-white/10">
            <Filter className="w-5 h-5" />
         </Button>
      </div>

      <div className="space-y-4">
         {[
           { name: 'Dr. Elizabeth Stone', type: 'Residential', status: 'Installation', projects: 2, avatar: 'ES' },
           { name: 'Industrial Logistics S.A.', type: 'Commercial', status: 'Audit Phase', projects: 1, avatar: 'IL' },
           { name: 'Marcus Chen', type: 'Residential', status: 'Warranty', projects: 3, avatar: 'MC' },
           { name: 'Oceanic Resorts', type: 'Hospitality', status: 'Design', projects: 4, avatar: 'OR' },
         ].map((client, i) => (
           <GlassCard key={i} className="p-4 group cursor-pointer hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between mb-6">
                 <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-white/10">
                       <AvatarFallback className="bg-white/5 font-bold">{client.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                       <h4 className="font-bold text-base group-hover:text-primary transition-colors">{client.name}</h4>
                       <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{client.type}</span>
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{client.status}</span>
                       </div>
                    </div>
                 </div>
                 <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                 </Button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                 <Button variant="outline" className="h-10 border-white/10 bg-white/5 rounded-xl hover:bg-primary/10 hover:border-primary/20">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                 </Button>
                 <Button variant="outline" className="h-10 border-white/10 bg-white/5 rounded-xl hover:bg-primary/10 hover:border-primary/20">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                 </Button>
                 <Button variant="outline" className="h-10 border-white/10 bg-white/5 rounded-xl hover:bg-primary/10 hover:border-primary/20">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                 </Button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                 <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Malibu, CA</span>
                 </div>
                 <div className="text-[10px] font-bold text-muted-foreground uppercase">
                    {client.projects} Active Projects
                 </div>
              </div>
           </GlassCard>
         ))}
      </div>

      <Button variant="ghost" className="w-full text-muted-foreground text-xs uppercase font-bold tracking-widest h-12">
         Load 50+ more clients
      </Button>
    </div>
  );
};

export default CRM;
