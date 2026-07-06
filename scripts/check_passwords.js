import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ultxilauukcosuceucal.supabase.co';
const supabaseKey = 'sb_publishable_Af4vcncFpkrEvlmPcWLNQw_XLaOdhQ1';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('student_profiles').select('application_number, password').limit(5);
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}
check();
