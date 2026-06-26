import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2, Printer, QrCode, ShieldCheck, Zap, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';

const Quotation = ({ onBack }: { onBack: () => void }) => {
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
        </div>
      </div>

      <header>
        <h1 className="text-3xl font-bold">Proposal Generator</h1>
        <p className="text-muted-foreground">Final quotation and professional proposal</p>
      </header>

      {/* Interactive Quotation Preview */}
      <div className="relative">
         <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-solar-gold/30 blur-2xl opacity-20" />
         <GlassCard className="relative p-8 bg-white/5 border-white/10">
            <div className="flex items-start justify-between mb-12">
               <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <Zap className="w-7 h-7 text-black" fill="currentColor" />
                  </div>
                  <div>
                    <h2 className="font-black text-xl tracking-tighter uppercase italic">SunScale <span className="text-primary">Pro</span></h2>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Engineering Excellence</p>
                  </div>
               </div>
               <div className="text-right">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Quotation #88241</div>
                  <div className="text-[10px] text-muted-foreground font-medium">May 24, 2024</div>
               </div>
            </div>

            <div className="space-y-8 mb-12">
               <div>
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 pb-2 border-b border-white/5">Client Information</h4>
                  <div className="flex justify-between items-end">
                     <div>
                        <div className="text-lg font-bold">Riverside Luxury Villas</div>
                        <div className="text-xs text-muted-foreground">128 Coastal Dr, Marina Bay</div>
                     </div>
                     <div className="text-[10px] text-muted-foreground text-right">ATTN: James Wilson</div>
                  </div>
               </div>

               <div>
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 pb-2 border-b border-white/5">System Configuration</h4>
                  <div className="space-y-3">
                     {[
                       { item: 'PV Array: 6.6kW Jinko Neo', price: '$4,280' },
                       { item: 'Inverter: Huawei SUN2000-5KTL', price: '$1,850' },
                       { item: 'Battery: Luna2000 10kWh', price: '$5,400' },
                       { item: 'Installation & Electrical Works', price: '$2,800' },
                     ].map((row, i) => (
                       <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{row.item}</span>
                          <span className="font-bold">{row.price}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="pt-8 border-t border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                     <div className="p-2 bg-white rounded-lg">
                        <QrCode className="w-12 h-12 text-black" />
                     </div>
                     <div className="text-[8px] text-muted-foreground font-bold uppercase tracking-widest max-w-[80px]">Scan to verify authenticity</div>
                  </div>
                  <div className="text-right">
                     <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Investment</div>
                     <div className="text-4xl font-black text-primary">$14,330.00</div>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
               <CheckCircle2 className="w-4 h-4 text-emerald-500" />
               <span className="text-[10px] font-bold text-emerald-500 uppercase">Proposal valid for 15 days</span>
            </div>
         </GlassCard>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <Button variant="outline" className="h-14 rounded-2xl border-white/10 flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email Proposal
         </Button>
         <Button variant="outline" className="h-14 rounded-2xl border-white/10 flex items-center gap-2">
            <Printer className="w-5 h-5" />
            Print Preview
         </Button>
      </div>

      <GlassCard className="p-6">
         <h3 className="font-bold flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            Legal & Terms
         </h3>
         <div className="space-y-3">
            {[
              '25-year Performance Warranty',
              '10-year Workmanship Guarantee',
              'Grid connection approval included',
              'Smart Monitoring app setup',
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                 <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                 {text}
              </div>
            ))}
         </div>
      </GlassCard>

      <Button className="w-full h-16 bg-primary text-black font-black text-lg rounded-2xl shadow-2xl shadow-primary/30 uppercase tracking-widest">
         Confirm & Sign Proposal
      </Button>
    </div>
  );
};

export default Quotation;
