'use client'

import { useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'
import TaskCheckbox from '@/components/dashboard/TaskCheckbox'
import DeleteTaskButton from '@/components/dashboard/DeleteTaskButton'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CompletedTasksModal({ tasks }: { tasks: any[] }) {
  const [open, setOpen] = useState(false)

  const categoryLabel: Record<string, { label: string; color: string }> = {
    mata_kuliah: { label: 'Mata Kuliah', color: 'text-blue-600 bg-blue-50 ring-1 ring-blue-100/50' },
    praktikum:   { label: 'Praktikum',   color: 'text-teal-600 bg-teal-50 ring-1 ring-teal-100/50' },
  }

  if (!tasks || tasks.length === 0) return null

  return (
    <>
      <div className="flex justify-center mt-2 mb-8">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#888888] hover:text-[#111111] transition-colors py-2 px-4 rounded-full bg-white border border-[#EAEAEA] shadow-sm hover:shadow-md"
        >
          <CheckCircle2 className="w-4 h-4" />
          Lihat {tasks.length} Tugas Selesai
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="w-full sm:max-w-md bg-white rounded-t-[24px] sm:rounded-[24px] border border-[#E5E5EA] shadow-2xl overflow-hidden pb-4 sm:pb-0 animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 fade-in-20 duration-300 max-h-[85vh] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#E5E5EA] shrink-0">
              <h2 className="text-base font-semibold text-[#1C1C1E]">Tugas Selesai</h2>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F2F2F7] flex items-center justify-center text-[#8E8E93] hover:bg-[#E5E5EA] transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Content List */}
            <div className="overflow-y-auto px-6 py-5 flex flex-col gap-3">
              {tasks.map((task) => {
                const c = categoryLabel[task.category] ?? categoryLabel.mata_kuliah

                return (
                  <div
                    key={task.id}
                    className="group bg-[#F5F5F5] rounded-[16px] px-5 py-4 flex gap-4"
                  >
                    <div className="pt-0.5 shrink-0">
                      <TaskCheckbox id={task.id} isCompleted={true} />
                    </div>

                    <div className="flex-1 min-w-0 pr-2">
                      <div className="flex flex-col items-start gap-1.5 object-top">
                        {c && (
                           <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full opacity-60 grayscale-[50%] ${c.color}`}>
                             {c.label}
                           </span>
                        )}
                        <label
                          htmlFor={task.id}
                          className="block text-[15px] leading-snug cursor-pointer transition-colors line-through text-[#A0A0A0] font-normal"
                        >
                          {task.title}
                        </label>
                      </div>

                      {task.description && (
                        <p className="text-[13px] leading-relaxed line-clamp-2 mt-1 mb-1 text-[#C0C0C0]">
                          {task.description}
                        </p>
                      )}
                    </div>

                    <div className="shrink-0 flex items-center h-full pt-1">
                      <DeleteTaskButton taskId={task.id} />
                    </div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      )}
    </>
  )
}
