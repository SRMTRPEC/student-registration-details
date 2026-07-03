-- Enable pgcrypto for UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean up existing tables if they exist
DROP TABLE IF EXISTS public.first_year_data CASCADE;
DROP TABLE IF EXISTS public.student_basic_details CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create profiles table (ADMIN ONLY)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Trigger to create profile on user signup (Assumes any signup is an admin for now)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (new.id, 'admin');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create first_year_data table
CREATE TABLE public.first_year_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  folder_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted')),
  
  -- Personal Details
  email TEXT NOT NULL,
  student_name TEXT,
  programme TEXT,
  course TEXT,
  admission_category TEXT,
  application_number TEXT,
  mobile_number TEXT,
  alternative_number TEXT,
  email_id TEXT,
  dob DATE,
  gender TEXT,
  gender_other TEXT,
  blood_group TEXT,
  mother_tongue TEXT,
  aadhaar_number TEXT,
  
  -- Family Details
  father_name TEXT,
  father_mobile TEXT,
  mother_name TEXT,
  mother_mobile TEXT,
  single_parent TEXT,
  father_occupation TEXT,
  mother_occupation TEXT,
  
  -- Community & Income Details
  religion TEXT,
  community TEXT,
  community_other TEXT,
  caste_name TEXT,
  community_certificate_number TEXT,
  annual_income TEXT,
  income_certificate_number TEXT,
  first_graduate TEXT,
  first_graduate_certificate_number TEXT,
  emis_number TEXT,
  
  -- Other Details
  date_of_document_submission DATE,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on first_year_data
ALTER TABLE public.first_year_data ENABLE ROW LEVEL SECURITY;

-- Allow anonymous public access to read and write
CREATE POLICY "Public can read by folder number" 
ON public.first_year_data FOR SELECT 
USING (true);

CREATE POLICY "Public can insert" 
ON public.first_year_data FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can update by folder number" 
ON public.first_year_data FOR UPDATE 
USING (true);

CREATE POLICY "Public can upsert" 
ON public.first_year_data FOR ALL 
USING (true) WITH CHECK (true);

-- Functions for updating updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_first_year_data_updated_at ON public.first_year_data;
CREATE TRIGGER update_first_year_data_updated_at
BEFORE UPDATE ON public.first_year_data
FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
