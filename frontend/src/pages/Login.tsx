import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { AlertCircle, Building2, Info, Lock, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      login(email, password)
      navigate('/citizen')
    } catch (err) {
      setError('Identifiants incorrects. Veuillez réessayer.')
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-stone-50">
      <div className="hidden lg:flex lg:w-1/2 bg-brand-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/90 to-teal-800/90" />
        <div className="relative z-10 text-white max-w-lg">
          <div className="bg-white/10 p-4 rounded-2xl inline-block mb-8 backdrop-blur-sm border border-white/20">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold mb-6 leading-tight">Bienvenue sur CitoyensConnect</h1>
          <p className="text-brand-100 text-lg leading-relaxed">
            Connectez-vous pour suivre vos signalements, échanger avec l'administration et participer à l'amélioration de votre cadre de vie.
          </p>
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border-[30px] border-white/5" />
        <div className="absolute top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full space-y-8">
          <div className="text-center lg:text-left">
            <div className="lg:hidden mx-auto w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mb-6">
              <Building2 className="h-8 w-8 text-brand-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800">Connexion</h2>
            <p className="mt-3 text-slate-600">
              Nouveau sur la plateforme ?{' '}
              <Link to="/register" className="font-bold text-brand-600 hover:text-brand-500 transition-colors">
                Créez un compte
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-start">
                <AlertCircle className="h-5 w-5 text-rose-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-rose-700 font-medium">{error}</p>
              </div>
            )}
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                  Adresse e-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-white border border-stone-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
                    placeholder="vous@exemple.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-bold text-slate-700 mb-2">
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-white border border-stone-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-shadow"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-brand-600 hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Se connecter
              </button>
            </div>
          </form>
          <div className="mt-10 bg-stone-100 rounded-2xl p-6 border border-stone-200">
            <div className="flex items-center mb-4">
              <Info className="h-5 w-5 text-brand-600 mr-2" />
              <h3 className="text-sm font-bold text-slate-800">Comptes de démonstration</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                <span className="text-sm font-bold text-slate-700">Citoyen</span>
                <code className="text-xs font-mono bg-stone-100 text-brand-700 px-2 py-1 rounded">citoyen@test.com</code>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                <span className="text-sm font-bold text-slate-700">Agent</span>
                <code className="text-xs font-mono bg-stone-100 text-brand-700 px-2 py-1 rounded">agent@test.com</code>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
                <span className="text-sm font-bold text-slate-700">Admin</span>
                <code className="text-xs font-mono bg-stone-100 text-brand-700 px-2 py-1 rounded">admin@test.com</code>
              </div>
              <p className="text-xs text-slate-500 text-center mt-4 italic">Mot de passe : n'importe lequel</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
