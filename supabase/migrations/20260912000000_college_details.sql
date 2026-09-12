-- Create college_details table
CREATE TABLE public.college_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_number TEXT UNIQUE NOT NULL REFERENCES public.first_year_data(application_number) ON DELETE CASCADE,
  roll_no TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  section TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.college_details ENABLE ROW LEVEL SECURITY;

-- Allow public read access (similar to student_profiles)
CREATE POLICY "Public can read college_details" ON public.college_details FOR SELECT USING (true);

-- Allow public insert access
CREATE POLICY "Public can insert college_details" ON public.college_details FOR INSERT WITH CHECK (true);

-- Allow public update access
CREATE POLICY "Public can update college_details" ON public.college_details FOR UPDATE USING (true);
