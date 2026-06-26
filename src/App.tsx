import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import SplashScreen from './pages/SplashScreen';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ProjectWizard from './pages/ProjectWizard';
import LoadAudit from './pages/LoadAudit';
import RoofAnalysis from './pages/RoofAnalysis';
import SystemDesigner from './pages/SystemDesigner';
import RecommendationEngine from './pages/RecommendationEngine';
import Financials from './pages/Financials';
import Quotation from './pages/Quotation';
import Installation from './pages/Installation';
import Monitoring from './pages/Monitoring';
import Maintenance from './pages/Maintenance';
import CRM from './pages/CRM';
import Collaboration from './pages/Collaboration';
import Reporting from './pages/Reporting';
import Settings from './pages/Settings';
import AppShell from './components/layout/AppShell';

export type View = 
  | 'splash' 
  | 'onboarding' 
  | 'auth' 
  | 'dashboard' 
  | 'project-wizard' 
  | 'load-audit' 
  | 'roof-analysis' 
  | 'system-designer'
  | 'recommendations'
  | 'financials'
  | 'quotation'
  | 'installation'
  | 'monitoring'
  | 'maintenance'
  | 'crm'
  | 'collaboration'
  | 'reporting'
  | 'settings';

function App() {
  const [view, setView] = useState<View>('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (view === 'splash') {
      const timer = setTimeout(() => setView('onboarding'), 3000);
      return () => clearTimeout(timer);
    }
  }, [view]);

  const renderView = () => {
    switch (view) {
      case 'splash': return <SplashScreen />;
      case 'onboarding': return <Onboarding onComplete={() => setView('auth')} />;
      case 'auth': return <Auth onLogin={() => { setIsLoggedIn(true); setView('dashboard'); }} />;
      default:
        return (
          <AppShell currentView={view} setView={setView}>
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="pb-24 pt-6 px-4"
              >
                {view === 'dashboard' && <Dashboard setView={setView} />}
                {view === 'project-wizard' && <ProjectWizard onComplete={() => setView('dashboard')} onCancel={() => setView('dashboard')} />}
                {view === 'load-audit' && <LoadAudit onBack={() => setView('dashboard')} />}
                {view === 'roof-analysis' && <RoofAnalysis onBack={() => setView('dashboard')} />}
                {view === 'system-designer' && <SystemDesigner onBack={() => setView('dashboard')} />}
                {view === 'recommendations' && <RecommendationEngine onBack={() => setView('dashboard')} />}
                {view === 'financials' && <Financials onBack={() => setView('dashboard')} />}
                {view === 'quotation' && <Quotation onBack={() => setView('dashboard')} />}
                {view === 'installation' && <Installation onBack={() => setView('dashboard')} />}
                {view === 'monitoring' && <Monitoring onBack={() => setView('dashboard')} />}
                {view === 'maintenance' && <Maintenance onBack={() => setView('dashboard')} />}
                {view === 'crm' && <CRM onBack={() => setView('dashboard')} />}
                {view === 'collaboration' && <Collaboration onBack={() => setView('dashboard')} />}
                {view === 'reporting' && <Reporting onBack={() => setView('dashboard')} />}
                {view === 'settings' && <Settings onBack={() => setView('dashboard')} />}
              </motion.div>
            </AnimatePresence>
          </AppShell>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {renderView()}
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
