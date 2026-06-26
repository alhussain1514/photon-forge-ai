import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { GlassCard } from '@/components/GlassCard';
import { Mail, Lock, Globe as Google, LayoutGrid as Microsoft, Fingerprint, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface AuthProps {
  onLogin: () => void;
}

const Auth = ({ onLogin }: AuthProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back, Engineer!");
      onLogin();
    }, 1500);
  };

  const handleBiometric = () => {
    toast.info("Authenticating via Biometrics...");
    setTimeout(() => {
      toast.success("Identity Verified");
      onLogin();
    }, 1000);
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
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/a2d75eee-e314-4548-b1d2-8df7553ef39a/logo-a4f8fe19-1782500099591.webp" 
              className="w-12 h-12 rounded-lg"
              alt="Logo"
            />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight">Access Platform</h2>
          <p className="text-muted-foreground mt-2">Enter your credentials to manage solar projects</p>
        </div>

        <GlassCard className="p-8 border-white/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  placeholder="engineer@sunscale.pro" 
                  className="pl-10 bg-white/5 border-white/10 h-12" 
                  type="email" 
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="px-0 font-normal text-xs text-primary">Forgot password?</Button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  className="pl-10 pr-10 bg-white/5 border-white/10 h-12" 
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

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remember this device
              </label>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl bg-primary text-black font-bold text-lg hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Login"}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-muted-foreground">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-white/10 bg-white/5 h-12 rounded-xl hover:bg-white/10">
              <Google className="w-4 h-4 mr-2" />
              Google
            </Button>
            <Button variant="outline" className="border-white/10 bg-white/5 h-12 rounded-xl hover:bg-white/10">
              <Microsoft className="w-4 h-4 mr-2" />
              Microsoft
            </Button>
          </div>

          <div className="mt-8 flex justify-center">
            <button 
              onClick={handleBiometric}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="p-4 rounded-full border border-primary/20 bg-primary/5 group-hover:bg-primary/10 transition-colors">
                <Fingerprint className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">Biometric Login</span>
            </button>
          </div>
        </GlassCard>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Don't have an account? <Button variant="link" className="p-0 text-primary">Create Account</Button>
        </p>
      </motion.div>
    </div>
  );
};

export default Auth;
