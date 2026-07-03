ALTER TABLE public.first_year_data 
ADD COLUMN IF NOT EXISTS father_income TEXT,
ADD COLUMN IF NOT EXISTS mother_income TEXT,
ADD COLUMN IF NOT EXISTS guardian_income TEXT;
