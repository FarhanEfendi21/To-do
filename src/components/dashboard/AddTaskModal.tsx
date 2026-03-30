'use client'

import { useState } from 'react'
import { addTask } from '@/app/dashboard/actions'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PlusCircle, X, Calendar as CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

type Priority = 'low' | 'medium' | 'high'
type Category = 'mata_kuliah' | 'praktikum'

const priorities: { value: Priority; label: string; desc: string }[] = [
  { value: 'low', label: 'Santai', desc: 'Bisa nanti' },
  { value: 'medium', label: 'Sedang', desc: 'Jadwal normal' },
  { value: 'high', label: 'Penting', desc: 'Segera kerjakan' },
]

const categories: { value: Category; label: string }[] = [
  { value: 'mata_kuliah', label: 'Mata Kuliah' },
  { value: 'praktikum', label: 'Praktikum' },
]

export default function AddTaskModal() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [priority, setPriority] = useState<Priority>('medium')
  const [category, setCategory] = useState<Category>('mata_kuliah')
  const [date, setDate] = useState<Date | undefined>()

  const handleSubmit = async (formData: FormData) => {
    formData.set('priority', priority)
    formData.set('category', category)
    if (date) {
      formData.set('due_date', format(date, 'yyyy-MM-dd'))
    }
    setLoading(true)
    await addTask(formData)
    setLoading(false)
    setOpen(false)
    // Tweak: reset the form state nicely
    setDate(undefined)
    setPriority('medium')
    setCategory('mata_kuliah')
  }

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 h-11 px-4 rounded-[10px] bg-foreground text-background text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all shadow-sm"
      >
        <PlusCircle className="w-4 h-4" strokeWidth={2} />
        Tambah
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          {/* Sheet / Dialog */}
          <div className="w-full sm:max-w-sm bg-card rounded-t-[24px] sm:rounded-[24px] border border-border shadow-2xl overflow-hidden pb-4 sm:pb-0 animate-in slide-in-from-bottom-8 sm:slide-in-from-bottom-4 fade-in-20 duration-300">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Tambah Tugas</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>

            {/* Form */}
            <form action={handleSubmit} className="px-6 pt-5 pb-8 flex flex-col gap-5">

              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Judul Tugas
                </label>
                <Input
                  name="title"
                  required
                  className="h-11 rounded-[10px] border-border bg-secondary text-foreground placeholder:text-muted-foreground/50 text-sm focus-visible:ring-primary focus-visible:border-transparent"
                />
              </div>

              {/* Category — segmented control */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Kategori
                </label>
                <div className="flex rounded-[10px] overflow-hidden border border-border bg-secondary p-0.5 gap-0.5">
                  {categories.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setCategory(value)}
                      className={`flex-1 py-2 text-[13px] font-semibold rounded-[8px] transition-all ${category === value
                        ? 'bg-card text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.06)]'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Catatan <span className="normal-case font-normal">(opsional)</span>
                </label>
                <Textarea
                  name="description"
                  className="rounded-[10px] border-border bg-secondary text-foreground placeholder:text-muted-foreground/50 text-sm resize-none min-h-[76px] focus-visible:ring-primary focus-visible:border-transparent"
                />
              </div>

              {/* Deadline (Tenggat Waktu) Custom Picker */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Tenggat Waktu <span className="normal-case font-normal">(opsional)</span>
                </label>

                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className={`h-11 rounded-[10px] w-full border border-border bg-secondary px-3.5 flex items-center justify-between transition-colors focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none text-sm ${!date ? 'text-muted-foreground/50' : 'text-foreground font-medium'
                        }`}
                    >
                      <span>
                        {date ? format(date, "d MMM yyyy", { locale: id }) : "Pilih tenggat waktu"}
                      </span>
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-[16px] border border-border shadow-xl overflow-hidden bg-card" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      locale={id}
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Priority — segmented control style */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Prioritas
                </label>
                <div className="flex rounded-[10px] overflow-hidden border border-border bg-secondary p-0.5 gap-0.5">
                  {priorities.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPriority(value)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-[8px] transition-all ${priority === value
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-[12px] bg-foreground text-background text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1 shadow-sm"
              >
                {loading ? 'Menyimpan...' : 'Simpan Tugas'}
              </button>
            </form>

          </div>
        </div>
      )}
    </>
  )
}