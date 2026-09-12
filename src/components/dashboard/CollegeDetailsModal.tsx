import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { supabase } from '../../supabase/client';

interface CollegeDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationNumber: string;
  studentName: string;
  department: string;
  onSuccess: () => void;
}

const SECTION_OPTIONS = [
  'CSE A', 'CSE B', 'CSE C', 'CSE D', 'CSE E',
  'ECE A', 'ECE B', 'ECE C', 'EEE',
  'AI&DS A', 'AI&DS B', 'AI&DS C',
  'MECH A', 'MECH B', 'CIVIL', 'AIML',
  'IT A', 'IT B'
].map(opt => ({ value: opt, label: opt }));

const YEAR_OPTIONS = [
  '1st Year', '2nd Year', '3rd Year', '4th Year'
].map(opt => ({ value: opt, label: opt }));

export const CollegeDetailsModal = ({
  isOpen,
  onClose,
  applicationNumber,
  studentName,
  department,
  onSuccess
}: CollegeDetailsModalProps) => {
  const [rollNo, setRollNo] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [section, setSection] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fetch existing college details if any
      const fetchDetails = async () => {
        setIsLoading(true);
        try {
          const { data } = await supabase
            .from('college_details')
            .select('*')
            .eq('application_number', applicationNumber)
            .maybeSingle();

          if (data) {
            setRollNo(data.roll_no);
            setAcademicYear(data.academic_year);
            setSection(data.section);
          } else {
            setRollNo('');
            setAcademicYear('');
            setSection('');
          }
        } catch (error) {
          console.error("Error fetching college details:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    }
  }, [isOpen, applicationNumber]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('college_details')
        .upsert(
          {
            application_number: applicationNumber,
            roll_no: rollNo,
            academic_year: academicYear,
            section: section
          },
          { onConflict: 'application_number' }
        );

      if (error) throw error;
      onSuccess();
      onClose();
    } catch (error: any) {
      alert("Error saving college details: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-card border border-white/10 p-6 rounded-xl w-full max-w-lg shadow-2xl my-8 relative"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-text-secondary hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl font-bold mb-6 text-white">College Details</h3>
          
          {isLoading ? (
            <div className="flex justify-center p-8 text-text-secondary">
              Loading...
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                value={studentName}
                readOnly
                className="bg-white/5 cursor-not-allowed text-text-secondary"
              />
              <Input
                label="Department"
                value={department}
                readOnly
                className="bg-white/5 cursor-not-allowed text-text-secondary"
              />
              <Input
                label="Roll No"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
                placeholder="Enter your Roll No"
              />
              <Select
                label="Year"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                required
                options={YEAR_OPTIONS}
              />
              <Select
                label="Section"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                required
                options={SECTION_OPTIONS}
              />
              
              <div className="pt-4 flex gap-4">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" isLoading={isSubmitting} className="flex-1">
                  Save Details
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
