import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GlassCard } from '@/components/GlassCard';
import { Mail, Lock, Eye, EyeOff, User, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

interface AuthProps {
  onLogin: () => void;
}

const Auth = ({ onLogin }: AuthProps) => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email, password);
      setIsLoading(false);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success('Welcome back, Engineer!');
      onLogin();
    } else {
      const { error } = await signUp(email, password, { full_name: fullName, company });
      setIsLoading(false);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success('Account created! Check your email to confirm, then log in.');
      setMode('login');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20"
          >
            <span className="text-3xl font-black text-primary">S</span>
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight">
            {mode === 'login' ? 'Access Platform' : 'Create Account'}
          </h2>
          <p className="text-muted-foreground mt-2">
            {mode === 'login'
              ? 'Enter your credentials to manage solar projects'
              : 'Set up your engineering workspace'}
          </p>
        </div>

        <GlassCard className="p-8 border-white/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Jane Doe"
                      className="pl-10 bg-white/5 border-white/10 h-12"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      placeholder="SunScale Engineering Ltd."
                      className="pl-10 bg-white/5 border-white/10 h-12"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="engineer@sunscale.pro"
                  className="pl-10 bg-white/5 border-white/10 h-12"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className="pl-10 pr-10 bg-white/5 border-white/10 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-black font-bold text-lg hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
            </Button>
          </form>
        </GlassCard>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <Button
            type="button"
            variant="link"
            className="p-0 text-primary"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Create Account' : 'Log In'}
          </Button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
