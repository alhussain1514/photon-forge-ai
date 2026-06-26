import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradient?: boolean;
}

export const GlassCard = ({ children, className, gradient, ...props }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl",
        gradient && "bg-gradient-to-br from-white/10 to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
