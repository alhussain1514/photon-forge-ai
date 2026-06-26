import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FilePlus, 
  Search, 
  Map, 
  Settings as SettingsIcon, 
  BarChart3, 
  Users, 
  History,
  Briefcase,
  Zap,
  Battery,
  ShieldCheck,
  Menu,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { View } from '@/App';

interface AppShellProps {
  children: React.ReactNode;
  currentView: View;
  setView: (view: View) => void;
}

const navItems = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
  { id: 'crm', icon: Users, label: 'Clients' },
  { id: 'reporting', icon: BarChart3, label: 'Analytics' },
  { id: 'settings', icon: SettingsIcon, label: 'System' },
];

const AppShell = ({ children, currentView, setView }: AppShellProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" fill="currentColor" />
          </div>
          <span className="font-bold text-xl tracking-tighter">SunScale <span className="text-primary">Pro</span></span>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-full hover:bg-white/5">
            <Bell className="w-6 h-6 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/5 md:hidden">
            <Menu className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-t border-white/5 px-6 pb-8 pt-4 md:hidden">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as View)}
              className="flex flex-col items-center gap-1 group"
            >
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                currentView === item.id ? "bg-primary text-black shadow-lg shadow-primary/20" : "text-muted-foreground group-hover:text-white"
              )}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-widest",
                currentView === item.id ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppShell;
