import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Heart, ArrowRightLeft, ShieldCheck, Zap, Truck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/GlassCard';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const RecommendationEngine = ({ onBack }: { onBack: () => void }) => {
  const recommendations = [
    {
      id: 1,
      brand: 'Huawei',
      model: 'SUN2000-6KTL-L1',
      category: 'Hybrid Inverter',
      efficiency: '98.4%',
      warranty: '10 Years',
      price: '$1,240',
      stock: 'In Stock',
      score: 98,
      image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=800',
      recommended: true
    },
    {
      id: 2,
      brand: 'Jinko Solar',
      model: 'Tiger Neo N-Type 575W',
      category: 'Solar Panel',
      efficiency: '22.3%',
      warranty: '25 Years',
      price: '$185',
      stock: 'Limited',
      score: 95,
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
      recommended: true
    },
    {
      id: 3,
      brand: 'BYD',
      model: 'Battery-Box Premium HVM',
      category: 'Battery Bank',
      efficiency: '96%',
      warranty: '10 Years',
      price: '$5,800',
      stock: 'Backorder',
      score: 92,
      image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800',
      recommended: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <Button variant="outline" className="rounded-full border-white/10 h-10 gap-2">
           <ArrowRightLeft className="w-4 h-4" /> Compare All
        </Button>
      </div>

      <header>
        <div className="flex items-center gap-2 mb-2">
           <div className="px-2 py-0.5 rounded bg-primary text-[8px] font-black text-black uppercase tracking-widest">AI MATCH</div>
           <span className="text-xs text-muted-foreground font-bold">Recommended Based on Project Scope</span>
        </div>
        <h1 className="text-3xl font-bold">Component Engine</h1>
      </header>

      <div className="space-y-6">
        {recommendations.map((item) => (
          <GlassCard key={item.id} className="relative overflow-hidden group">
            {item.recommended && (
              <div className="absolute top-0 right-0 z-10">
                 <div className="bg-primary text-black text-[10px] font-black px-4 py-1 uppercase tracking-widest rotate-45 translate-x-3 translate-y-1 shadow-xl">
                   Recommended
                 </div>
              </div>
            )}
            
            <div className="p-1">
              <img src={item.image} alt={item.model} className="w-full h-48 object-cover rounded-[20px]" />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                   <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{item.category}</div>
                   <h3 className="text-xl font-bold leading-tight">{item.brand}</h3>
                   <p className="text-sm text-muted-foreground">{item.model}</p>
                </div>
                <div className="flex flex-col items-end">
                   <div className="text-2xl font-black text-white">{item.score}%</div>
                   <div className="text-[8px] font-bold text-muted-foreground uppercase">Compatibility</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                 <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-[8px] font-bold text-muted-foreground uppercase mb-1">Efficiency</div>
                    <div className="text-xs font-bold">{item.efficiency}</div>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-[8px] font-bold text-muted-foreground uppercase mb-1">Warranty</div>
                    <div className="text-xs font-bold">{item.warranty}</div>
                 </div>
                 <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <div className="text-[8px] font-bold text-muted-foreground uppercase mb-1">Price</div>
                    <div className="text-xs font-bold">{item.price}</div>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                 <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full border border-white/10 hover:bg-white/10">
                       <Heart className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                       <Truck className={cn("w-3 h-3", item.stock === 'In Stock' ? 'text-emerald-500' : 'text-solar-gold')} />
                       <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.stock}</span>
                    </div>
                 </div>
                 <Button className="rounded-xl bg-white text-black font-bold h-10 px-6 hover:bg-white/90">
                    Add to System
                 </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6 border-primary/20 bg-primary/5 flex flex-col items-center text-center gap-4">
         <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-primary" />
         </div>
         <div>
            <h3 className="text-xl font-bold">Warranty Shield</h3>
            <p className="text-xs text-muted-foreground mt-2 max-w-[240px]">This combination of components is eligible for the SunScale 25-Year Unified Warranty.</p>
         </div>
         <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary/10">Learn More</Button>
      </GlassCard>
    </div>
  );
};

export default RecommendationEngine;
