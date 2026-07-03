import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { supabase } from '../supabase/client';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const isConfigured = !!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (!isConfigured) {
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // Verification logic to ensure they have the 'admin' role
      // In AuthContext this will be caught, but here we can check quickly
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user?.id)
        .single();
        
      if (profileError || profileData?.role !== 'admin') {
        // Sign them out immediately if they are not an admin
        await supabase.auth.signOut();
        throw new Error("Unauthorized: You do not have administrator privileges.");
      }
      
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4 relative">
      <div className="absolute top-0 left-4 md:left-0">
        <Button variant="ghost" onClick={() => navigate('/')} className="text-text-secondary hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>
      </div>

      {/* Background glow specific to admin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full max-w-md mb-6 z-10"
      >
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-sm font-medium text-text-secondary hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>
      </motion.div>

      <Card className="w-full max-w-md relative overflow-hidden border-t-2 border-t-red-500 z-10">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Administrator Portal
          </h2>
          <p className="text-sm text-text-secondary">
            Secure login for authorized personnel only
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-6 rounded-lg flex items-start text-sm bg-red-500/10 text-red-400 border border-red-500/20"
          >
            <ShieldAlert className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
            <p>{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-[38px] w-5 h-5 text-text-secondary pointer-events-none" />
            <Input
              label="Admin Email"
              type="email"
              required
              placeholder="admin@college.edu"
              className="pl-12 focus:border-red-500 focus:ring-red-500/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-[38px] w-5 h-5 text-text-secondary pointer-events-none" />
            <Input
              label="Password"
              type="password"
              required
              placeholder="••••••••"
              className="pl-12 focus:border-red-500 focus:ring-red-500/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            fullWidth 
            isLoading={isLoading} 
            className="mt-2 bg-red-600 hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]"
          >
            Secure Login
          </Button>
        </form>
      </Card>
    </div>
  );
};
