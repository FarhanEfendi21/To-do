'use client'

import { useTransition, useOptimistic } from 'react'
import { toggleTaskStatus } from '@/app/dashboard/actions'

export default function TaskCheckbox({
  id,
  isCompleted,
}: {
  id: string
  isCompleted: boolean
}) {
  const [isPending, startTransition] = useTransition()
  
  // Instant visual check for mobile responsiveness
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic<boolean, boolean>(
    isCompleted,
    (_, newStatus) => newStatus
  )

  const handleToggle = () => {
    startTransition(() => {
      const current = optimisticCompleted
      setOptimisticCompleted(!current)
      toggleTaskStatus(id, current)
    })
  }

  return (
    <button
      id={id}
      role="checkbox"
      aria-checked={optimisticCompleted}
      onClick={handleToggle}
      disabled={isPending}
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
        ${optimisticCompleted
          ? 'bg-[#111111] border-[#111111]'
          : 'bg-white border-[#C7C7CC] hover:border-[#111111]'
        }
        ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'}
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