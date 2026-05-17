import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import { StatsCard } from '../../components/StatsCard'
import { ComplaintCard } from '../../components/ComplaintCard'
import { Activity, CheckCircle2, Clock, FileText, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

export function CitizenDashboard() {
  const { user, isLoading, complaints } = useAuth()

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

  if (!user || user.role !== 'CITIZEN') {
    return <Navigate to="/login" />
  }

  const myComplaints = complaints.filter((c) => c.citizenId === user.id)
  const stats = {
    total: myComplaints.length,
    enAttente: myComplaints.filter((c) => c.status === 'EN_ATTENTE').length,
    enCours: myComplaints.filter((c) => c.status === 'EN_COURS').length,
    resolu: myComplaints.filter((c) => c.status === 'RESOLU').length,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 flex items-center gap-3">
            Bonjour, {user.name.split(' ')[0]}
          </h1>
          <p className="text-slate-600 mt-2 text-lg">Voici le résumé de vos signalements.</p>
        </div>
        <Link
          to="/citizen/new"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-xl shadow-sm text-white bg-brand-600 hover:bg-brand-500 transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5 mr-2" /> Nouveau signalement
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard title="Total signalements" value={stats.total} icon={<FileText className="w-6 h-6 text-slate-600" />} colorClass="bg-stone-100" borderColorClass="border-t-stone-400" />
        <StatsCard title="En attente" value={stats.enAttente} icon={<Clock className="w-6 h-6 text-amber-600" />} colorClass="bg-amber-100" borderColorClass="border-t-amber-500" />
        <StatsCard title="En cours" value={stats.enCours} icon={<Activity className="w-6 h-6 text-sky-600" />} colorClass="bg-sky-100" borderColorClass="border-t-sky-500" />
        <StatsCard title="Résolus" value={stats.resolu} icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />} colorClass="bg-emerald-100" borderColorClass="border-t-emerald-500" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Vos dossiers récents</h2>
        {myComplaints.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myComplaints.map((complaint, index) => (
              <motion.div key={complaint.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <ComplaintCard complaint={complaint} basePath="/citizen" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-stone-300 shadow-sm">
            <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-stone-400" />
            </div>
            <h3 className="mt-2 text-lg font-bold text-slate-800">Aucun signalement</h3>
            <p className="mt-2 text-slate-500 max-w-sm mx-auto">
              Vous n'avez pas encore soumis de plainte. Signalez un problème pour améliorer votre quartier.
            </p>
            <div className="mt-8">
              <Link
                to="/citizen/new"
                className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-bold rounded-xl text-white bg-brand-600 hover:bg-brand-500 transition-all"
              >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" /> Créer un signalement
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
