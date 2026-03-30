'use client'

import { useTransition, useOptimistic, useState } from 'react'
import { toggleTaskStatus } from '@/app/dashboard/actions'

export default function TaskCheckbox({
  id,
  isCompleted,
}: {
  id: string
  isCompleted: boolean
}) {
  const [isPending, startTransition] = useTransition()
  
  // Optimistic state for the actual data
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic<boolean, boolean>(
    isCompleted,
    (_, newStatus) => newStatus
  )

  const handleToggle = async () => {
    // 1. Update UI instantly using startTransition + setOptimistic
    startTransition(() => {
      setOptimisticCompleted(!optimisticCompleted)
      toggleTaskStatus(id, optimisticCompleted)
    })
  }

  return (
    <button
      id={id}
      role="checkbox"
      aria-checked={optimisticCompleted}
      onClick={handleToggle}
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer active:scale-90
        ${optimisticCompleted
          ? 'bg-foreground border-foreground'
          : 'bg-background border-muted-foreground/30 hover:border-foreground'
        }
        ${isPending ? 'opacity-80' : 'opacity-100'}
      `}
    >
      {optimisticCompleted && (
        <svg
          className="w-3 h-3 text-background animate-in zoom-in-50 duration-200"
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