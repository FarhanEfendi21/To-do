'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// Fungsi untuk Login
export async function login(formData: FormData) {
  const supabase = await createClient()

  // Mengambil data dari input form
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Jika gagal, kembalikan ke halaman login dengan pesan error asli
    redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard') // Arahkan ke dashboard jika sukses
}

// Fungsi untuk Mendaftar (Register)
export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    redirect(`/register?message=${encodeURIComponent(error.message)}`)
  }

  // Jika Supabase mengharuskan konfirmasi email (session null), beri tahu user
  if (data.user && !data.session) {
    redirect(`/login?message=Cek email kamu untuk konfirmasi pendaftaran sebelum masuk.`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}