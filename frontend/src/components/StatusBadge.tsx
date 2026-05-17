import React from 'react'
import { ComplaintStatus } from '../lib/types'

interface StatusBadgeProps {
  status: ComplaintStatus
  className?: string
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = {
    EN_ATTENTE: {
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      dot: 'bg-amber-500',
      border: 'border-amber-200',
      label: 'En attente',
    },
    EN_COURS: {
      bg: 'bg-sky-50',
      text: 'text-sky-700',
      dot: 'bg-sky-500',
      border: 'border-sky-200',
      label: 'En cours',
    },
    RESOLU: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      border: 'border-emerald-200',
      label: 'Résolu',
    },
  }

  const { bg, text, dot, border, label } = config[status]

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${bg} ${text} ${border} ${className}`}>
      <span className={`w-2 h-2 rounded-full mr-2 ${dot}`} />
      {label}
    </span>
  )
}
