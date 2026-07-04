-- Drop the foreign key constraint that tied profiles to Supabase Auth
ALTER TABLE public.student_profiles DROP CONSTRAINT IF EXISTS student_profiles_id_fkey;

-- Add a password column to store the hashed password
ALTER TABLE public.student_profiles ADD COLUMN IF NOT EXISTS password TEXT;
