import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = 'https://ultxilauukcosuceucal.supabase.co';
const supabaseKey = 'sb_publishable_Af4vcncFpkrEvlmPcWLNQw_XLaOdhQ1';
const supabase = createClient(supabaseUrl, supabaseKey);

const hashPassword = (pwd) => {
  return crypto.createHash('sha256').update(pwd).digest('hex');
};

async function debugFlow() {
  const appNumber = '123456';
  const plainPassword = 'password123';
  const hashedPassword = hashPassword(plainPassword);

  console.log(`Setting password for ${appNumber} to ${plainPassword} (${hashedPassword})`);

  const { error: updateError, data: updateData } = await supabase
    .from('student_profiles')
    .update({ password: hashedPassword })
    .eq('application_number', appNumber)
    .select();

  console.log("Update result:", updateError || "Success");

  console.log("Now trying to login...");
  
  const loginHashed = hashPassword(plainPassword);
  
  const { data: loginData, error: loginError } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('application_number', appNumber)
    .eq('password', loginHashed)
    .single();

  if (loginError) {
    console.log("Login failed!", loginError);
  } else {
    console.log("Login succeeded!", loginData.name);
  }
}

debugFlow();
