import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kawhslxhhhemhpejybgf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthd2hzbHhoaGhlbWhwZWp5YmdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1OTQyNTgsImV4cCI6MjA5MDE3MDI1OH0.HzinChqUFdcc39Q77-bm8nwP3EeSzUY0f4uXt-2rSP4'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testAuth() {
  console.log('Trying to sign up test user...')
  const email = `test-${Date.now()}@example.com`
  const password = 'testpassword123'
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.error('Signup Error:', error.message)
    return
  }

  console.log('Signup Success! User:', data.user?.id)
  console.log('Session present?', !!data.session)
  
  if (!data.session) {
    console.log('Email confirmation is required by Supabase!')
  }

  console.log('Trying to login immediately...')
  const loginRes = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (loginRes.error) {
    console.error('Login Error:', loginRes.error.message)
  } else {
    console.log('Login Success! Session:', !!loginRes.data.session)
  }
}

testAuth()
