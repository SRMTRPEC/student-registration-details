import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, Shield, Zap } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-24">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Admissions 2026-27 Now Open
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Your Journey Starts <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Here</span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          A seamless, secure, and modern registration experience for the next generation of college students. Fast, intuitive, and designed for you.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button className="w-full sm:w-auto text-lg px-8 group" onClick={() => navigate('/access')}>
            Student Access
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" onClick={() => navigate('/admin/login')} className="w-full sm:w-auto">
            Administrator Portal
          </Button>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <Card>
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6 text-primary">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
          <p className="text-text-secondary">Complete your registration in minutes with our optimized, multi-step wizard. No more long scrolling forms.</p>
        </Card>
        
        <Card transition={{ delay: 0.1 }}>
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6 text-accent">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
          <p className="text-text-secondary">Your data is encrypted and protected with enterprise-grade security. Only you and authorized admins have access.</p>
        </Card>
        
        <Card transition={{ delay: 0.2 }}>
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold mb-3">Draft Saving</h3>
          <p className="text-text-secondary">Start now and finish later. Your progress is automatically saved, allowing you to pick up exactly where you left off.</p>
        </Card>
      </div>
    </div>
  );
};
