import React from 'react'
import { Link } from 'react-router-dom'
import { Complaint } from '../lib/types'
import { StatusBadge } from './StatusBadge'
import { Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

interface ComplaintCardProps {
  complaint: Complaint
  basePath: string
}

export function ComplaintCard({ complaint, basePath }: ComplaintCardProps) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  const formatCategory = (cat: string) => cat.charAt(0) + cat.slice(1).toLowerCase()

  const getBorderColor = (status: string) => {
    switch (status) {
      case 'EN_ATTENTE':
        return 'border-l-amber-500'
      case 'EN_COURS':
        return 'border-l-sky-500'
      case 'RESOLU':
        return 'border-l-emerald-500'
      default:
        return 'border-l-stone-300'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={`bg-white rounded-2xl shadow-sm border border-stone-200 border-l-4 ${getBorderColor(
        complaint.status,
      )} overflow-hidden hover:shadow-md transition-shadow`}
    >
      <Link to={`${basePath}/complaint/${complaint.id}`} className="block p-6">
        <div className="flex justify-between items-start mb-4">
          <StatusBadge status={complaint.status} />
          <div className="flex items-center text-xs font-medium text-slate-500 bg-stone-100 px-2.5 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {formatDate(complaint.createdAt)}
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1">{complaint.title}</h3>
        <p className="text-sm text-slate-600 mb-5 line-clamp-2 leading-relaxed">{complaint.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-stone-100">
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-slate-600">
            {formatCategory(complaint.category)}
          </span>
          <span className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center">
            Détails <span className="ml-1 text-lg leading-none">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
