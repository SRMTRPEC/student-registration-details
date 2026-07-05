import React, { useState } from 'react';
import { X, Save, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface CreateAdminModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateAdminModal = ({ onClose, onSuccess }: CreateAdminModalProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Create a secondary client so we don't accidentally log out the current admin
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      const adminClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false, // Prevents overwriting current local session
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      });

      const { error } = await adminClient.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;
      
      onSuccess();
    } catch (err: any) {
      alert("Failed to create admin profile: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
            <div>
              <h2 className="text-xl font-bold">Create Admin Profile</h2>
              <p className="text-sm text-text-secondary">Invite a new administrator</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg mb-4 text-sm text-yellow-200">
                <p>New admins will be able to view and manage all student data. If email confirmations are enabled in your project, they must confirm their email before logging in.</p>
              </div>

              <Input 
                label="Email Address" 
                name="email"
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="admin@example.com"
              />
              
              <div className="relative">
                <Input 
                  label="Password" 
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  placeholder="Min 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[34px] text-text-secondary hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <Button type="button" variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Create Admin
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
