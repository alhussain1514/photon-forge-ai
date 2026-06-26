import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const pages = [
  {
    title: "Solar Design Made Simple",
    description: "Create professional solar system designs for residential and commercial properties in minutes.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/a2d75eee-e314-4548-b1d2-8df7553ef39a/onboarding-1-28f39f6b-1782500099406.webp",
    accent: "text-primary"
  },
  {
    title: "AI Energy Auditing",
    description: "Use advanced AI to analyze energy consumption patterns and optimize system performance.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/a2d75eee-e314-4548-b1d2-8df7553ef39a/onboarding-2-4f577237-1782500099629.webp",
    accent: "text-emerald-500"
  },
  {
    title: "Generate Professional Quotations",
    description: "Instantly generate and share high-fidelity project proposals with built-in financial analysis.",
    image: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/a2d75eee-e314-4548-b1d2-8df7553ef39a/onboarding-3-7a61b1a4-1782500099196.webp",
    accent: "text-solar-gold"
  }
];

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current === pages.length - 1) {
      onComplete();
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-background flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative flex-1 flex flex-col"
        >
          <div className="relative h-[60%] w-full">
            <img 
              src={pages[current].image} 
              alt={pages[current].title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>

          <div className="flex-1 px-8 pt-8 flex flex-col justify-between pb-12">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold tracking-tight leading-tight"
              >
                {pages[current].title.split(' ').map((word, i) => (
                  <span key={i} className={i === 0 ? pages[current].accent : ""}>{word} </span>
                ))}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-muted-foreground text-lg leading-relaxed"
              >
                {pages[current].description}
              </motion.p>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex space-x-2 mb-4">
                {pages.map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === current ? "w-8 bg-primary" : "w-2 bg-white/20"
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <Button variant="ghost" className="text-muted-foreground" onClick={onComplete}>
                  Skip
                </Button>
                <Button size="lg" className="rounded-full px-8 gap-2 group" onClick={next}>
                  {current === pages.length - 1 ? "Get Started" : "Next"}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
