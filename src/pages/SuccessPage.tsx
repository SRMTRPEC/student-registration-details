import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="mb-8"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-green-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <CheckCircle className="w-32 h-32 text-green-500 relative z-10" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center max-w-lg"
      >
        <h1 className="text-4xl font-extrabold mb-4 text-white">Submission Successful!</h1>
        <p className="text-lg text-text-secondary mb-8">
          Your application form has been securely submitted. You can track your registration status from your dashboard.
        </p>
        
        <Button onClick={() => navigate('/dashboard')} className="group">
          <Home className="w-5 h-5 mr-2" />
          Return to Dashboard
        </Button>
      </motion.div>
    </div>
  );
};
