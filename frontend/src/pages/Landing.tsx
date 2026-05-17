import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { Activity, ArrowRight, Camera, MapPin, MessageSquare, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export function Landing() {
  const { user } = useAuth()

  if (user) {
    switch (user.role) {
      case 'CITIZEN':
        return <Navigate to="/citizen" />
      case 'AGENT':
        return <Navigate to="/agent" />
      case 'ADMIN':
        return <Navigate to="/admin" />
      default:
        return <Navigate to="/" />
    }
  }

  const features = [
    {
      num: '01',
      icon: <Camera className="w-6 h-6 text-brand-600" />,
      title: 'Signalez',
      description:
        'Prenez une photo et décrivez le problème rencontré dans votre quartier en quelques clics.',
    },
    {
      num: '02',
      icon: <Activity className="w-6 h-6 text-brand-600" />,
      title: 'Suivez',
      description:
        "Restez informé de l'évolution de votre dossier grâce à un suivi transparent et en temps réel.",
    },
    {
      num: '03',
      icon: <ShieldCheck className="w-6 h-6 text-brand-600" />,
      title: 'Résolution',
      description:
        'Les agents municipaux interviennent et vous informent dès que le problème est résolu.',
    },
  ]

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-stone-50 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-80 h-80 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      <div className="relative pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-semibold mb-6">
                <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2" /> Plateforme citoyenne officielle
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-slate-800 leading-[1.1]">
                Votre voix pour une <br />ville meilleure
              </h1>
              <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
                CitoyensConnect vous permet de signaler facilement les problèmes de votre quotidien (voirie, propreté, éclairage) et de participer activement à l'amélioration de votre cadre de vie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-brand-600 hover:bg-brand-500 transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-0.5"
                >
                  Commencer maintenant
                </Link>
                <Link
                  to="/login"
                  className="inline-flex justify-center items-center px-8 py-4 border-2 border-stone-200 text-base font-bold rounded-xl text-slate-700 bg-white hover:bg-stone-50 hover:border-stone-300 transition-all"
                >
                  Se connecter
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative h-[500px]"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                className="absolute top-10 right-10 w-80 bg-white p-5 rounded-2xl shadow-xl border border-stone-100 z-20 rotate-3"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mr-2" /> En attente
                  </span>
                  <span className="text-xs text-slate-400">Aujourd'hui</span>
                </div>
                <h3 className="font-bold text-slate-800 mb-1">Nid de poule dangereux</h3>
                <p className="text-sm text-slate-500 mb-3">Rue de la République, devant la boulangerie.</p>
                <div className="flex items-center text-xs text-slate-400 bg-stone-50 p-2 rounded-lg">
                  <MapPin className="w-3 h-3 mr-1" /> Centre-ville
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1 }}
                className="absolute top-48 left-0 w-72 bg-white p-5 rounded-2xl shadow-xl border border-stone-100 z-30 -rotate-2"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
                    <span className="w-2 h-2 rounded-full bg-sky-500 mr-2" /> En cours
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 mb-1">Lampadaire cassé</h3>
                <div className="mt-3 bg-stone-50 p-3 rounded-lg border border-stone-100">
                  <div className="flex items-center text-xs text-brand-700 font-medium mb-1">
                    <MessageSquare className="w-3 h-3 mr-1" /> Agent municipal
                  </div>
                  <p className="text-xs text-slate-600">Équipe technique planifiée pour demain matin.</p>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-10 right-20 w-72 bg-white p-5 rounded-2xl shadow-xl border border-stone-100 z-10 rotate-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" /> Résolu
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 mb-1">Dépôt sauvage</h3>
                <p className="text-sm text-slate-500">Nettoyé par les services de la ville.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="py-24 bg-white relative z-10 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800">Comment ça marche ?</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Un processus simple, rapide et transparent pour améliorer notre ville ensemble.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-stone-100 -z-10" />
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="mx-auto bg-white w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-stone-200/50 border border-stone-100 relative">
                  <span className="absolute -top-3 -right-3 text-4xl font-black text-brand-100 select-none">
                    {feature.num}
                  </span>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-br from-brand-600 to-teal-700 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[20px] border-white/10" />
          <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 rounded-full bg-white/10" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Prêt à faire la différence ?</h2>
          <p className="text-brand-100 text-lg mb-10 max-w-2xl mx-auto">
            Rejoignez des milliers de citoyens qui contribuent chaque jour à rendre notre ville plus belle, plus sûre et plus agréable.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-brand-700 bg-white hover:bg-stone-50 transition-all shadow-xl hover:-translate-y-1"
          >
            Créer mon compte citoyen
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
