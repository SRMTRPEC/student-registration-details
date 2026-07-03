-- Add school, residence, and transport fields to first_year_data table

ALTER TABLE public.first_year_data 
ADD COLUMN IF NOT EXISTS district TEXT,
ADD COLUMN IF NOT EXISTS block TEXT,
ADD COLUMN IF NOT EXISTS school TEXT,
ADD COLUMN IF NOT EXISTS residence_type TEXT,
ADD COLUMN IF NOT EXISTS transport_mode TEXT,
ADD COLUMN IF NOT EXISTS boarding_point TEXT;
