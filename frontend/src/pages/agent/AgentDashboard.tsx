import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import { ComplaintCategory, ComplaintStatus } from '../../lib/types'
import { StatsCard } from '../../components/StatsCard'
import { ComplaintCard } from '../../components/ComplaintCard'
import { Activity, CheckCircle2, Clock, FileText, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

export function AgentDashboard() {
  const { user, isLoading, complaints } = useAuth()
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'ALL'>('ALL')
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategory | 'ALL'>('ALL')

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center py-20">
          <div className="inline-flex items-center px-6 py-3 rounded-xl bg-brand-50 border border-brand-100">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-600 mr-3" />
            <span className="text-brand-700 font-medium">Chargement...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'AGENT') {
    return <Navigate to="/login" />
  }

  const stats = {
    total: complaints.length,
    enAttente: complaints.filter((c) => c.status === 'EN_ATTENTE').length,
    enCours: complaints.filter((c) => c.status === 'EN_COURS').length,
    resolu: complaints.filter((c) => c.status === 'RESOLU').length,
  }

  const filteredComplaints = complaints.filter((c) => {
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false
    if (categoryFilter !== 'ALL' && c.category !== categoryFilter) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800">Espace Agent</h1>
        <p className="text-slate-600 mt-2 text-lg">Gérez et traitez les signalements des citoyens.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard title="Tous les dossiers" value={stats.total} icon={<FileText className="w-6 h-6 text-slate-600" />} colorClass="bg-stone-100" borderColorClass="border-t-stone-400" />
        <StatsCard title="À traiter (En attente)" value={stats.enAttente} icon={<Clock className="w-6 h-6 text-amber-600" />} colorClass="bg-amber-100" borderColorClass="border-t-amber-500" />
        <StatsCard title="En cours" value={stats.enCours} icon={<Activity className="w-6 h-6 text-sky-600" />} colorClass="bg-sky-100" borderColorClass="border-t-sky-500" />
        <StatsCard title="Résolus" value={stats.resolu} icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />} colorClass="bg-emerald-100" borderColorClass="border-t-emerald-500" />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-5 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center text-slate-800 font-bold">
          <div className="bg-brand-50 p-2 rounded-lg mr-3">
            <Filter className="w-5 h-5 text-brand-600" />
          </div>
          Filtres de recherche
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ComplaintStatus | 'ALL')}
            className="rounded-xl border-stone-200 bg-stone-50 shadow-sm focus:border-brand-500 focus:ring-brand-500 border py-2.5 px-4 text-sm font-medium text-slate-700 outline-none"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="EN_ATTENTE">En attente</option>
            <option value="EN_COURS">En cours</option>
            <option value="RESOLU">Résolu</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as ComplaintCategory | 'ALL')}
            className="rounded-xl border-stone-200 bg-stone-50 shadow-sm focus:border-brand-500 focus:ring-brand-500 border py-2.5 px-4 text-sm font-medium text-slate-700 outline-none"
          >
            <option value="ALL">Toutes les catégories</option>
            <option value="INFRASTRUCTURE">Infrastructure</option>
            <option value="SANTE">Santé</option>
            <option value="EDUCATION">Éducation</option>
            <option value="TRANSPORT">Transport</option>
            <option value="ENVIRONNEMENT">Environnement</option>
            <option value="AUTRE">Autre</option>
          </select>
        </div>
      </div>
      <div>
        {filteredComplaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComplaints.map((complaint, index) => (
              <motion.div key={complaint.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <ComplaintCard complaint={complaint} basePath="/agent" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 shadow-sm">
            <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-stone-400" />
            </div>
            <h3 className="mt-2 text-lg font-bold text-slate-800">Aucun dossier trouvé</h3>
            <p className="mt-2 text-slate-500">Modifiez vos filtres pour voir plus de résultats.</p>
          </div>
        )}
      </div>
    </div>
  )
}
