import React from 'react'
import { ArrowLeft, Calendar, CheckCircle2, MessageSquare, Tag } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import { StatusBadge } from '../../components/StatusBadge'

export function ComplaintDetail() {
  const { id } = useParams<{ id: string }>()
  const { user, isLoading, complaints } = useAuth()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

  const complaint = complaints.find((c) => c.id === id && c.citizenId === user.id)

  if (!complaint) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800">Dossier introuvable</h2>
        <p className="mt-4 text-slate-600 text-lg">
          Ce signalement n'existe pas ou vous n'y avez pas accès.
        </p>
        <button
          onClick={() => navigate('/citizen')}
          className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-brand-600 hover:bg-brand-500 transition-all"
        >
          Retour au tableau de bord
        </button>
      </div>
    )
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  const formatCategory = (cat: string) => cat.charAt(0) + cat.slice(1).toLowerCase()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate('/citizen')}
        className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux signalements
      </button>
      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden mb-10">
        <div className="px-8 py-6 border-b border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-slate-500 bg-white border border-stone-200 px-3 py-1 rounded-lg">{complaint.id}</span>
              <StatusBadge status={complaint.status} />
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 leading-tight">{complaint.title}</h1>
          </div>
          <div className="text-sm text-slate-500 flex flex-col items-start sm:items-end gap-2 bg-white p-4 rounded-xl border border-stone-100">
            <span className="flex items-center font-medium">
              <Calendar className="w-4 h-4 mr-2 text-slate-400" />
              {formatDate(complaint.createdAt).split(' à ')[0]}
            </span>
            <span className="flex items-center font-medium">
              <Tag className="w-4 h-4 mr-2 text-slate-400" />
              {formatCategory(complaint.category)}
            </span>
          </div>
        </div>
        <div className="p-8">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Description</h3>
          <div className="text-slate-700 whitespace-pre-wrap text-lg leading-relaxed">{complaint.description}</div>
        </div>
      </div>
      <h2 className="text-2xl font-extrabold text-slate-800 mb-8">Suivi du dossier</h2>
      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8">
        <div className="relative border-l-2 border-stone-200 ml-4 space-y-10">
          {complaint.notes.map((note) => (
            <div key={note.id} className="relative pl-10">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-brand-500 border-4 border-white shadow-sm" />
              <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100 relative">
                <div className="absolute top-3 -left-2 w-4 h-4 bg-brand-50 border-l border-b border-brand-100 transform rotate-45" />
                <div className="flex justify-between items-start mb-3">
                  <span className="font-bold text-brand-900 flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2 text-brand-600" /> Mise à jour par l'administration
                  </span>
                  <span className="text-xs font-medium text-brand-600/70 bg-white px-2 py-1 rounded-md">{formatDate(note.createdAt)}</span>
                </div>
                <p className="text-brand-800 leading-relaxed">{note.content}</p>
              </div>
            </div>
          ))}
          <div className="relative pl-10">
            <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-stone-300 border-4 border-white shadow-sm" />
            <div className="pt-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-800">Signalement soumis</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-sm font-medium text-slate-500">{formatDate(complaint.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
