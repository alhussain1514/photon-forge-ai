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
import SetupRequired from './components/SetupRequired';
import { AuthProvider, useAuth } from './context/AuthContext';
import { isSupabaseConfigured } from './lib/supabase';

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

const ONBOARDING_KEY = 'sunscale_onboarding_complete';

function AppShellRouter() {
  const { session, loading, signOut } = useAuth();
  const [view, setView] = useState<View>('splash');

  // Splash screen, then decide where to land based on real auth state.
  useEffect(() => {
    if (view !== 'splash') return;
    const timer = setTimeout(() => {
      if (loading) return;
      const seenOnboarding = localStorage.getItem(ONBOARDING_KEY) === 'true';
      if (session) setView('dashboard');
      else if (seenOnboarding) setView('auth');
      else setView('onboarding');
    }, 2200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, loading, session]);

  // If the session changes while already past splash (e.g. user logs out from
  // Settings), route back to auth.
  useEffect(() => {
    if (view === 'splash') return;
    if (!loading && !session && view !== 'onboarding' && view !== 'auth') {
      setView('auth');
    }
  }, [session, loading, view]);

  const goToDashboard = () => setView('dashboard');

  const renderView = () => {
    switch (view) {
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return (
          <Onboarding
            onComplete={() => {
              localStorage.setItem(ONBOARDING_KEY, 'true');
              setView('auth');
            }}
          />
        );
      case 'auth':
        return <Auth onLogin={goToDashboard} />;
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
                {view === 'settings' && <Settings onBack={() => setView('dashboard')} onSignOut={async () => { await signOut(); setView('auth'); }} />}
              </motion.div>
            </AnimatePresence>
          </AppShell>
        );
    }
  };

  return <>{renderView()}</>;
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">
      {isSupabaseConfigured ? (
        <AuthProvider>
          <AppShellRouter />
        </AuthProvider>
      ) : (
        <SetupRequired />
      )}
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
