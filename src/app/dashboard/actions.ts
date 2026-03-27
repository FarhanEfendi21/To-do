'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Fungsi untuk mencentang/batal centang tugas
export async function toggleTaskStatus(taskId: string, currentStatus: boolean) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('tasks')
    .update({ is_completed: !currentStatus })
    .eq('id', taskId)

  if (error) {
    console.error('Gagal update status:', error)
    return { error: error.message }
  }

  // Refresh data di halaman dashboard seketika
  revalidatePath('/dashboard')
}

// Fungsi untuk menambah tugas baru
export async function addTask(formData: FormData) {
  const supabase = await createClient()

  // Ambil ID User yang sedang login
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  // Ambil data dari form
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const priority = formData.get('priority') as string
  const category = formData.get('category') as string
  
  // Tangkap input due_date, set ke null jika kosong
  const dueDateInput = formData.get('due_date') as string
  const due_date = dueDateInput && dueDateInput.trim() !== '' ? dueDateInput : null

  const { error } = await supabase
    .from('tasks')
    .insert({
      user_id: user.id,
      title,
      description,
      priority: priority || 'medium',
      category: category || 'mata_kuliah',
      due_date,
    })

  if (error) {
    console.error('Gagal menambah tugas:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard')
}

// Fungsi untuk menghapus tugas
export async function deleteTask(taskId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)
    .eq('user_id', user.id) // Pastikan hanya pemilik yang bisa menghapus

  if (error) {
    console.error('Gagal menghapus tugas:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard')
}

// Fungsi untuk mengedit tugas
export async function editTask(taskId: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const priority = formData.get('priority') as string
  const category = formData.get('category') as string
  const dueDateInput = formData.get('due_date') as string
  const due_date = dueDateInput && dueDateInput.trim() !== '' ? dueDateInput : null

  const { error } = await supabase
    .from('tasks')
    .update({
      title,
      description,
      priority: priority || 'medium',
      category: category || 'mata_kuliah',
      due_date,
    })
    .eq('id', taskId)
    .eq('user_id', user.id)

  if (error) {
    console.error('Gagal mengedit tugas:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard')
}