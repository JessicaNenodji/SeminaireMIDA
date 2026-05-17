import React, { useState } from 'react'
import { ArrowLeft, Calendar, CheckCircle2, MessageSquare, Save, Tag, User as UserIcon } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import { ComplaintStatus } from '../../lib/types'
import { StatusBadge } from '../../components/StatusBadge'
import { mockUsers } from '../../lib/mockData'

export function AdminComplaintDetail() {
  const { id } = useParams<{ id: string }>()
  const { user, isLoading, complaints, updateComplaintStatus, addNote } = useAuth()
  const navigate = useNavigate()
  const [newNote, setNewNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [assignee, setAssignee] = useState<string>('')

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

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" />
  }

  const complaint = complaints.find((c) => c.id === id)

  if (!complaint) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-slate-800">Dossier introuvable</h2>
        <button
          onClick={() => navigate('/admin')}
          className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-xl text-white bg-brand-600 hover:bg-brand-500 transition-all"
        >
          Retour au tableau de bord
        </button>
      </div>
    )
  }

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateComplaintStatus(complaint.id, e.target.value as ComplaintStatus)
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return
    setIsSubmitting(true)
    setTimeout(() => {
      addNote(complaint.id, newNote)
      setNewNote('')
      setIsSubmitting(false)
    }, 500)
  }

  const handleAssign = () => {
    if (!assignee) return
    const agent = mockUsers.find((u) => u.id === assignee)
    if (agent) {
      addNote(complaint.id, `Assigné à ${agent.name} (agent)`)
    }
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate('/admin')}
        className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Retour à la liste
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
            <div className="px-8 py-6 border-b border-stone-100 bg-stone-50/50 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-bold text-slate-500 bg-white border border-stone-200 px-3 py-1 rounded-lg">{complaint.id}</span>
                  <StatusBadge status={complaint.status} />
                </div>
                <h1 className="text-3xl font-extrabold text-slate-800 leading-tight">{complaint.title}</h1>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Citoyen</span>
                  <div className="flex items-center text-sm font-bold text-slate-800">
                    <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mr-2 text-xs">
                      {complaint.citizenName.charAt(0)}
                    </div>
                    {complaint.citizenName}
                  </div>
                </div>
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Date</span>
                  <div className="flex items-center text-sm font-bold text-slate-800">
                    <Calendar className="w-4 h-4 mr-2 text-brand-500" />
                    {formatDate(complaint.createdAt).split(' à ')[0]}
                  </div>
                </div>
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Catégorie</span>
                  <div className="flex items-center text-sm font-bold text-slate-800">
                    <Tag className="w-4 h-4 mr-2 text-brand-500" />
                    {formatCategory(complaint.category)}
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Description du problème</h3>
              <div className="bg-white rounded-2xl p-6 border border-stone-200 text-slate-700 whitespace-pre-wrap text-lg leading-relaxed shadow-sm">
                {complaint.description}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8">
            <h2 className="text-xl font-extrabold text-slate-800 mb-8 flex items-center">
              <div className="bg-brand-100 p-2 rounded-xl mr-3">
                <MessageSquare className="w-5 h-5 text-brand-600" />
              </div>
              Historique et communication
            </h2>
            <div className="relative border-l-2 border-stone-200 ml-4 space-y-10">
              {complaint.notes.map((note) => (
                <div key={note.id} className="relative pl-10">
                  <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-brand-500 border-4 border-white shadow-sm" />
                  <div className="bg-brand-50 rounded-2xl p-6 border border-brand-100 relative">
                    <div className="absolute top-3 -left-2 w-4 h-4 bg-brand-50 border-l border-b border-brand-100 transform rotate-45" />
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-bold text-brand-900 flex items-center text-sm">
                        <UserIcon className="w-4 h-4 mr-2 text-brand-600" />
                        {note.agentName}
                        <span className="text-brand-600/70 font-medium ml-1">(Agent)</span>
                      </span>
                      <span className="text-xs font-medium text-brand-600/70 bg-white px-2 py-1 rounded-md">
                        {formatDate(note.createdAt)}
                      </span>
                    </div>
                    <p className="text-brand-800 leading-relaxed">{note.content}</p>
                  </div>
                </div>
              ))}
              <div className="relative pl-10">
                <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-stone-300 border-4 border-white shadow-sm" />
                <div className="pt-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-800">Signalement soumis par le citoyen</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-500">{formatDate(complaint.createdAt)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-8 sticky top-24">
            <h3 className="text-xl font-extrabold text-slate-800 mb-6">Actions Administrateur</h3>
            <div className="mb-6">
              <label htmlFor="status" className="block text-sm font-bold text-slate-700 mb-3">Changer le statut</label>
              <select
                id="status"
                value={complaint.status}
                onChange={handleStatusChange}
                className="w-full rounded-xl border-stone-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-3.5 bg-stone-50 font-medium text-slate-800 outline-none transition-shadow"
              >
                <option value="EN_ATTENTE">En attente</option>
                <option value="EN_COURS">En cours</option>
                <option value="RESOLU">Résolu</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-3">Assigner à un agent</label>
              <div className="flex gap-2">
                <select
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="flex-1 rounded-xl border-stone-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-3.5 bg-stone-50 font-medium text-slate-800 outline-none transition-shadow"
                >
                  <option value="">-- Choisir un agent --</option>
                  {mockUsers.filter((u) => u.role === 'AGENT').map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
                <button
                  onClick={handleAssign}
                  className="inline-flex items-center px-4 py-3.5 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-500 transition-all"
                >
                  Assigner
                </button>
              </div>
            </div>
            <hr className="border-stone-200 mb-6" />
            <form onSubmit={handleAddNote}>
              <label htmlFor="note" className="block text-sm font-bold text-slate-700 mb-3">Ajouter une note publique</label>
              <textarea
                id="note"
                rows={4}
                required
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full rounded-xl border-stone-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-4 mb-4 text-slate-800 placeholder-slate-400 outline-none transition-shadow resize-none"
                placeholder="Cette note sera visible par le citoyen..."
              />
              <button
                type="submit"
                disabled={isSubmitting || !newNote.trim()}
                className="w-full inline-flex justify-center items-center py-3.5 px-4 border border-transparent shadow-sm text-base font-bold rounded-xl text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                {isSubmitting ? 'Envoi...' : <><Save className="w-5 h-5 mr-2" /> Enregistrer la note</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
