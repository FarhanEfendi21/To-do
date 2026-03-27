'use client'

import { useTransition } from 'react'
import { toggleTaskStatus } from '@/app/dashboard/actions'

export default function TaskCheckbox({
  id,
  isCompleted,
}: {
  id: string
  isCompleted: boolean
}) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(() => {
      toggleTaskStatus(id, isCompleted)
    })
  }

  return (
    <button
      id={id}
      role="checkbox"
      aria-checked={isCompleted}
      onClick={handleToggle}
      disabled={isPending}
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
        ${isCompleted
          ? 'bg-[#111111] border-[#111111]'
          : 'bg-white border-[#C7C7CC] hover:border-[#111111]'
        }
        ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-90'}
      `}
    >
      {isCompleted && (
        <svg
          className="w-3 h-3 text-white"
          viewBox="0 0 12 10"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="1 5 4.5 8.5 11 1" />
        </svg>
      )}
    </button>
  )
}