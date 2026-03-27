import Image from 'next/image'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LogOut, Calendar } from 'lucide-react'

import TaskCheckbox from '@/components/dashboard/TaskCheckbox'
import AddTaskModal from '@/components/dashboard/AddTaskModal'
import DeleteTaskButton from '@/components/dashboard/DeleteTaskButton'
import CompletedTasksModal from '@/components/dashboard/CompletedTasksModal'

// Gunakan warna pastel/lembut untuk label hierarki prioritas agar lebih minimalis
const priorityLabel: Record<string, { label: string; color: string }> = {
  high: { label: 'Penting', color: 'text-red-600 bg-red-50 ring-1 ring-red-100/50' },
  medium: { label: 'Sedang', color: 'text-orange-600 bg-orange-50 ring-1 ring-orange-100/50' },
  low: { label: 'Santai', color: 'text-emerald-600 bg-emerald-50 ring-1 ring-emerald-100/50' },
}

const categoryLabel: Record<string, { label: string; color: string }> = {
  mata_kuliah: { label: 'Mata Kuliah', color: 'text-blue-600 bg-blue-50 ring-1 ring-blue-100/50' },
  praktikum:   { label: 'Praktikum',   color: 'text-teal-600 bg-teal-50 ring-1 ring-teal-100/50' },
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tasks } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('is_completed', { ascending: true })
    .order('created_at', { ascending: false })

  const total = tasks?.length ?? 0
  const doneTasks = tasks?.filter((t) => t.is_completed) ?? []
  const done = doneTasks.length
  const activeTasks = tasks?.filter((t) => !t.is_completed) ?? []
  const remaining = activeTasks.length

  async function logout() {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-[var(--font-plus-jakarta)] text-[#111111]">

      {/* ── Minimalist Glass Header ── */}
      <header className="sticky top-0 z-10 bg-white/70 backdrop-blur-2xl border-b border-[#F0F0F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/Logo.png" alt="Logo" width={48} height={48} className="object-contain drop-shadow-sm" priority />
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-2 text-[13px] font-medium text-[#888888] hover:text-[#111111] transition-colors"
            >
              <LogOut className="w-[15px] h-[15px]" strokeWidth={2} />
              Keluar
            </button>
          </form>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-8 sm:gap-10">

        {/* ── Title Area & Action ── */}
        <section className="flex items-start justify-between gap-4 pb-2">
          <div className="flex flex-col gap-1.5 pt-1">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#111111]">
              Tugas Saya
            </h1>
            <p className="text-[14px] sm:text-[15px] text-[#888888] pr-2">
              {remaining > 0
                ? `Fokus pada ${remaining} tugas yang belum selesai hari ini.`
                : total > 0
                  ? 'Semua tugas selesai. Waktunya istirahat! 🎉'
                  : 'Mulai harimu dengan menambahkan tugas.'}
            </p>
          </div>
          <div className="shrink-0 mt-0.5">
            <AddTaskModal />
          </div>
        </section>

        {/* ── Slim Progress Indicator ── */}
        {total > 0 && (
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-[13px] font-medium text-[#888888]">
              <span>Progress</span>
              <span className="text-[#111111]">{done} / {total} Tugas</span>
            </div>
            <div className="h-1 w-full rounded-full bg-[#EAEAEA] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#111111] transition-all duration-700 ease-out"
                style={{ width: total > 0 ? `${(done / total) * 100}%` : '0%' }}
              />
            </div>
          </section>
        )}

        {/* ── Task List ── */}
        <section className="flex flex-col gap-3 sm:gap-3.5">
          {!activeTasks || activeTasks.length === 0 ? (
            <div className="bg-white rounded-[20px] border border-[#F0F0F0] px-6 py-16 sm:px-8 sm:py-20 flex flex-col items-center justify-center text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-4">
                <Image src="/Logo.png" alt="Empty" width={48} height={48} className="opacity-40 grayscale" />
              </div>
              <p className="text-[17px] font-medium text-[#111111] mb-1.5">GG Gaming Adick Adick!!!</p>
              <p className="text-[14px] text-[#888888] max-w-xs leading-relaxed">
                {total > 0 ? "Kamu telah menyelesaikan semua tugas aktif. Waktunya bersantai." : "Belum ada tugas kuliah aktif yang dibuat."}
              </p>
            </div>
          ) : (
            activeTasks.map((task) => {
              const p = priorityLabel[task.priority] ?? priorityLabel.medium
              const c = categoryLabel[task.category] ?? categoryLabel.mata_kuliah
              return (
                <div
                  key={task.id}
                  className={`group bg-white rounded-[16px] border px-4 sm:px-5 py-3.5 sm:py-4 flex gap-3 sm:gap-4 transition-all duration-200 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.02)] border-[#F0F0F0] hover:border-[#E0E0E0] hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.04)]`}
                >
                  {/* Custom Checkbox */}
                  <div className="pt-0.5 shrink-0">
                    <TaskCheckbox id={task.id} isCompleted={task.is_completed} />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0 pr-4">
                    <label
                      htmlFor={task.id}
                      className={`block text-[15px] leading-snug cursor-pointer mb-1 transition-colors text-[#111111] font-medium`}
                    >
                      {task.title}
                    </label>

                    {task.description && (
                      <p className={`text-[13px] leading-relaxed line-clamp-2 mt-1.5 mb-3 text-[#777777]`}>
                        {task.description}
                      </p>
                    )}

                    {/* Badges Container */}
                    <div className="flex items-center flex-wrap gap-2 mt-2">
                       {/* Category Badge */}
                       {c && (
                        <span className={`inline-flex items-center text-[10.5px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${c.color}`}>
                          {c.label}
                        </span>
                      )}

                      {/* Priority Badge */}
                      {task.priority && (
                        <span className={`inline-flex items-center text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${p.color}`}>
                          {p.label}
                        </span>
                      )}

                      {/* Deadline Badge */}
                      {task.due_date && (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#777777] bg-[#F5F5F5] px-2 py-0.5 rounded-full border border-[#EAEAEA]">
                          <Calendar className="w-3 h-3 text-[#A0A0A0]" strokeWidth={2.5} />
                          {new Date(task.due_date).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: new Date(task.due_date).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
                          })}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Delete Action */}
                  <div className="shrink-0 flex items-center h-full pt-0.5">
                    <DeleteTaskButton taskId={task.id} />
                  </div>
                </div>
              )
            })
          )}
        </section>

        {/* ── Selesai Tasks Modal Trigger ── */}
        <CompletedTasksModal tasks={doneTasks} />

      </main>
    </div>
  )
}