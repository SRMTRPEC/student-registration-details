import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ultxilauukcosuceucal.supabase.co';
const supabaseKey = 'sb_publishable_Af4vcncFpkrEvlmPcWLNQw_XLaOdhQ1';
const supabase = createClient(supabaseUrl, supabaseKey);

// Use Node.js crypto since we don't have crypto.subtle in Node without subtle module
import crypto from 'crypto';

const hashPassword = (pwd) => {
  return crypto.createHash('sha256').update(pwd).digest('hex');
};

async function testLogin(appNumber, password) {
  const hashedPassword = hashPassword(password);
  console.log(`Testing Login for ${appNumber}...`);
  console.log(`Plain: ${password}`);
  console.log(`Hash : ${hashedPassword}`);

  const { data, error } = await supabase
    .from('student_profiles')
    .select('*')
    .eq('application_number', appNumber.trim())
    .eq('password', hashedPassword)
    .single();

  if (error) {
    console.error("Login Failed:", error.message, error.details);
  } else {
    console.log("Login Success!", data.application_number);
  }
}

// Check the existing hashes in DB to figure out what the password might have been
async function debug() {
  const { data } = await supabase.from('student_profiles').select('application_number, password').limit(5);
  console.log("Existing users:", data);
  
  // Try a common test password for the first user
  if (data && data.length > 0) {
    await testLogin(data[0].application_number, "123456");
    await testLogin(data[0].application_number, "password");
    await testLogin(data[0].application_number, "admin123");
  }
}

debug();
