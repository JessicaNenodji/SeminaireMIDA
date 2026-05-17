import React from 'react'
import { motion } from 'framer-motion'

interface StatsCardProps {
  title: string
  value: number | string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  colorClass?: string
  borderColorClass?: string
}

export function StatsCard({
  title,
  value,
  icon,
  trend,
  colorClass = 'text-brand-600 bg-brand-50',
  borderColorClass = 'border-t-brand-500',
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-sm border border-stone-200 p-6 border-t-4 ${borderColorClass} relative overflow-hidden`}
    >
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-2">{title}</p>
          <h3 className="text-4xl font-bold text-slate-800 tracking-tight">{value}</h3>
          {trend && (
            <div className="flex items-center mt-3">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  trend.isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}
              >
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-slate-500 ml-2">vs mois dernier</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl ${colorClass}`}>{icon}</div>
      </div>
      <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-20 ${colorClass.split(' ')[1]}`} />
    </motion.div>
  )
}
