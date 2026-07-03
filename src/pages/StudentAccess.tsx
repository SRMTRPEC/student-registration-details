import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn, FolderOpen, ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const StudentAccess = () => {
  const navigate = useNavigate();
  const [folderNumber, setFolderNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderNumber.trim()) return;
    
    setIsLoading(true);
    
    // Simulate slight delay for effect
    setTimeout(() => {
      // Store folder number in localStorage for session
      localStorage.setItem('student_folder_number', folderNumber.trim());
      setIsLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 px-4 relative">
      <div className="absolute top-0 left-4 md:left-0">
        <Button variant="ghost" onClick={() => navigate('/')} className="text-text-secondary hover:text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xl border border-primary/20">
          <FolderOpen className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4 text-white">Student Access Portal</h1>
        <p className="text-lg text-text-secondary max-w-md mx-auto">
          Enter your unique folder number to access your registration dashboard.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          <form onSubmit={handleAccess} className="space-y-6">
            <Input
              label="Folder Number"
              type="text"
              placeholder="e.g. DDMM/Branch/Quota/001"
              value={folderNumber}
              onChange={(e) => setFolderNumber(e.target.value)}
              required
            />
            
            <Button type="submit" className="w-full" isLoading={isLoading}>
              <LogIn className="w-4 h-4 mr-2" />
              Access Dashboard
            </Button>
          </form>
          
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-sm text-text-secondary">
              Admin? <button onClick={() => navigate('/admin/login')} className="text-primary hover:text-white transition-colors">Login here</button>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
