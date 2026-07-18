import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string,
    meta: { full_name?: string; company?: string }
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn: AuthContextValue['signIn'] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error ? error.message : null };
  };

  const signUp: AuthContextValue['signUp'] = async (email, password, meta) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: meta },
    });
    return { error: error ? error.message : null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{ session, user: session?.user ?? null, loading, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
