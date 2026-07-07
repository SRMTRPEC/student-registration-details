-- Add delete policy for student_profiles to allow admins to delete records
CREATE POLICY "Public can delete profiles" ON public.student_profiles FOR DELETE USING (true);
