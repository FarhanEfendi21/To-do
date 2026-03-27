'use client'

import { useState, useTransition } from 'react'
import { deleteTask } from '@/app/dashboard/actions'
import { Trash2 } from 'lucide-react'

export default function DeleteTaskButton({ taskId }: { taskId: string }) {
  const [open, setOpen] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    setIsDeleted(true) // Optimistic hide immediately
    setOpen(false)
    startTransition(() => {
      deleteTask(taskId)
    })
  }

  return (
    <>
      {isDeleted && <style>{`#task-row-${taskId} { display: none !important; }`}</style>}
      <button
        onClick={() => setOpen(true)}
        disabled={isPending || isDeleted}
        title="Hapus tugas"
        className={`w-8 h-8 rounded-full flex items-center justify-center 
          text-[#C7C7CC] hover:text-red-500 hover:bg-red-50 
          opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-150
          disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        <Trash2 className="w-4 h-4" strokeWidth={2} />
      </button>

      {/* Modal Konfirmasi Hapus Tengah (Centered Alert Box) */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={(e) => { if (e.target === e.currentTarget && !isPending) setOpen(false) }}
        >
          <div className="w-full max-w-[320px] bg-white rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in-20 duration-200">
            
            <div className="px-6 pt-8 pb-6 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
                <Trash2 className="w-6 h-6 text-red-500" strokeWidth={2.2} />
              </div>
              <h2 className="text-[19px] font-semibold tracking-tight text-[#111111] mb-2">Hapus Tugas?</h2>
              <p className="text-[14px] leading-relaxed text-[#888888]">
                Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="p-4 pt-0 gap-3 flex">
              <button
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="flex-1 h-11 rounded-[12px] bg-[#F2F2F7] text-[#111111] text-[15px] font-semibold hover:bg-[#E5E5EA] transition-colors disabled:opacity-50 active:scale-[0.98]"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 h-11 rounded-[12px] bg-red-500 text-white text-[15px] font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center active:scale-[0.98]"
              >
                {isPending ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Hapus'
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
