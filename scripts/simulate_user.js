import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = 'https://ultxilauukcosuceucal.supabase.co';
const supabaseKey = 'sb_publishable_Af4vcncFpkrEvlmPcWLNQw_XLaOdhQ1';
const supabase = createClient(supabaseUrl, supabaseKey);

const hashPassword = (pwd) => {
  return crypto.createHash('sha256').update(pwd).digest('hex');
};

async function simulate() {
  const appNumber = '123456';
  const newPassword = 'mysecretpassword';
  const hashedPassword = hashPassword(newPassword);

  console.log("1. Simulating Admin Change Password...");
  const { error: updateError } = await supabase
    .from('student_profiles')
    .update({ password: hashedPassword })
    .eq('application_number', appNumber);
    
  if (updateError) {
    console.error("Failed to update:", updateError);
    return;
  }
  console.log("Password updated successfully.");

  console.log("2. Simulating Student Login...");
  const loginPassword = 'mysecretpassword';
  const loginHashed = hashPassword(loginPassword);
  
  const { data, error: loginError } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('application_number', appNumber)
    .eq('password', loginHashed)
    .single();

  if (loginError) {
    console.error("Login Failed:", loginError.message);
  } else {
    console.log("Login Success! Logged in as:", data.name);
  }
}

simulate();
