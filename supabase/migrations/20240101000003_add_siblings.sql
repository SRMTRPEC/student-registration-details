-- Add siblings tracking to first_year_data table

ALTER TABLE public.first_year_data 
ADD COLUMN IF NOT EXISTS siblings_count TEXT,
ADD COLUMN IF NOT EXISTS siblings JSONB DEFAULT '[]'::jsonb;
