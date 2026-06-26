import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, User, Shield, Bell, Globe, Moon, Database, CreditCard, 
  ExternalLink, LogOut, ChevronRight, Check, Zap, BadgeCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Settings = ({ onBack }: { onBack: () => void }) => {
  const sections = [
    {
      title: 'Company & Profile',
      items: [
        { icon: User, label: 'Profile Settings', sub: 'Engineering License, Photo' },
        { icon: Shield, label: 'Security', sub: 'Face ID, Two-Factor Auth' },
        { icon: BadgeCheck, label: 'Credentials', sub: 'Verify Certifications' },
      ]
    },
    {
      title: 'Application Settings',
      items: [
        { icon: Bell, label: 'Notifications', sub: 'Alerts, Emails, Push', toggle: true },
        { icon: Moon, label: 'Dark Mode', sub: 'OLED Black Theme', toggle: true, default: true },
        { icon: Globe, label: 'Language', sub: 'English (US)', action: 'Change' },
      ]
    },
    {
      title: 'System & Data',
      items: [
        { icon: Database, label: 'Cloud Backup', sub: 'Sync to Microsoft 365', action: 'Sync Now' },
        { icon: CreditCard, label: 'Subscription', sub: 'Enterprise Plan • Active' },
        { icon: Zap, label: 'API Integrations', sub: 'Huawei, Victron, SolarEdge' },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button variant="ghost" size="icon" className="text-red-500">
           <LogOut className="w-5 h-5" />
        </Button>
      </div>

      <header className="flex flex-col items-center text-center">
         <div className="relative mb-4">
            <Avatar className="h-24 w-24 border-4 border-primary/20">
               <AvatarFallback className="bg-white/5 font-black text-2xl">SE</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center border-4 border-background">
               <Check className="w-3 h-3 text-black" strokeWidth={4} />
            </div>
         </div>
         <h1 className="text-2xl font-bold">Senior Engineer</h1>
         <p className="text-muted-foreground text-sm">SunScale Engineering Africa Ltd.</p>
         <Badge className="mt-3 bg-primary/10 text-primary border-primary/20 px-3 py-1 font-bold text-[10px] uppercase">Enterprise Admin</Badge>
      </header>

      <div className="space-y-8">
         {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
               <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-2">{section.title}</h3>
               <GlassCard className="divide-y divide-white/5">
                  {section.items.map((item, i) => (
                     <div key={i} className="flex items-center justify-between p-4 group cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                              <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                           </div>
                           <div>
                              <div className="text-sm font-bold">{item.label}</div>
                              <div className="text-[10px] text-muted-foreground">{item.sub}</div>
                           </div>
                        </div>
                        {item.toggle ? (
                           <Switch defaultChecked={item.default} />
                        ) : item.action ? (
                           <Button variant="link" className="text-[10px] font-bold text-primary uppercase h-auto p-0">{item.action}</Button>
                        ) : (
                           <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        )}
                     </div>
                  ))}
               </GlassCard>
            </div>
         ))}
      </div>

      <div className="pt-4 pb-8 text-center space-y-4">
         <p className="text-[10px] text-muted-foreground font-medium">SunScale Pro v2.4.1 (Enterprise Edition)</p>
         <div className="flex justify-center gap-6">
            <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-white cursor-pointer" />
            <Globe className="w-4 h-4 text-muted-foreground hover:text-white cursor-pointer" />
         </div>
      </div>
    </div>
  );
};

export default Settings;
