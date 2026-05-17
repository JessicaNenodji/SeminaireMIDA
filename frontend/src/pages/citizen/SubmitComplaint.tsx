import React, { useState } from 'react'
import { ArrowLeft, CheckCircle2, FileText, Image as ImageIcon, MapPin, Upload } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import { ComplaintCategory } from '../../lib/types'

export function SubmitComplaint() {
  const { user, isLoading, addComplaint } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<ComplaintCategory>('INFRASTRUCTURE')
  const [description, setDescription] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addComplaint({ title, category, description })
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-stone-100 p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-10 left-10 w-3 h-3 rounded-full bg-brand-400 animate-ping" />
          <div className="absolute top-20 right-20 w-4 h-4 rounded-full bg-amber-400 animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-20 left-20 w-2 h-2 rounded-full bg-sky-400 animate-ping" style={{ animationDelay: '1s' }} />
          <div className="mx-auto w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center mb-8 relative z-10">
            <CheckCircle2 className="h-12 w-12 text-brand-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-4 relative z-10">Signalement envoyé avec succès !</h2>
          <p className="text-slate-600 mb-10 max-w-md mx-auto text-lg relative z-10">
            Votre dossier a bien été enregistré. Il sera traité prochainement par nos services. Vous pouvez suivre son évolution depuis votre tableau de bord.
          </p>
          <button
            onClick={() => navigate('/citizen')}
            className="inline-flex items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl shadow-sm text-white bg-brand-600 hover:bg-brand-500 transition-all hover:-translate-y-0.5 relative z-10"
          >
            Retour au tableau de bord
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button
        onClick={() => navigate('/citizen')}
        className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-brand-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Retour
      </button>
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-stone-200 rounded-full -z-10" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-1 bg-brand-500 rounded-full -z-10" />
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold shadow-md">1</div>
            <span className="text-xs font-bold text-brand-700 mt-2">Informations</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold shadow-md">2</div>
            <span className="text-xs font-bold text-brand-700 mt-2">Description</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-stone-200 text-slate-500 flex items-center justify-center font-bold">3</div>
            <span className="text-xs font-bold text-slate-500 mt-2">Confirmation</span>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-stone-100 bg-stone-50/50">
          <h1 className="text-2xl font-extrabold text-slate-800">Nouveau signalement</h1>
          <p className="text-slate-500 mt-1">Veuillez détailler le problème rencontré.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-bold text-slate-700 mb-2">
                Titre du signalement
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FileText className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-white border border-stone-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
                  placeholder="Ex: Nid de poule rue de la Gare"
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-bold text-slate-700 mb-2">
                Catégorie
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ComplaintCategory)}
                  className="block w-full pl-11 pr-10 py-3 bg-white border border-stone-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow appearance-none"
                >
                  <option value="INFRASTRUCTURE">Infrastructure & Voirie</option>
                  <option value="SANTE">Santé & Hygiène</option>
                  <option value="EDUCATION">Éducation</option>
                  <option value="TRANSPORT">Transport public</option>
                  <option value="ENVIRONNEMENT">Environnement & Propreté</option>
                  <option value="AUTRE">Autre</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-bold text-slate-700 mb-2">
                Description détaillée
              </label>
              <textarea
                id="description"
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full p-4 bg-white border border-stone-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow resize-none"
                placeholder="Décrivez le problème avec le plus de détails possible (localisation exacte, date de constatation, etc.)"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Pièces jointes (Photos, documents) - Optionnel
              </label>
              <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-dashed rounded-2xl bg-brand-50/50 hover:bg-brand-50 transition-colors cursor-pointer group">
                <div className="space-y-2 text-center">
                  <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <ImageIcon className="h-6 w-6 text-brand-500" />
                  </div>
                  <div className="flex text-sm text-slate-600 justify-center mt-4">
                    <span className="relative cursor-pointer rounded-md font-bold text-brand-600 hover:text-brand-500">
                      Téléverser un fichier
                    </span>
                    <p className="pl-1">ou glisser-déposer</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, PDF jusqu'à 10MB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-stone-100 flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/citizen')}
              className="py-3 px-6 border-2 border-stone-200 rounded-xl text-base font-bold text-slate-700 hover:bg-stone-50 hover:border-stone-300 transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="py-3 px-8 border border-transparent rounded-xl text-base font-bold text-white bg-brand-600 hover:bg-brand-500 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Soumettre le signalement
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
