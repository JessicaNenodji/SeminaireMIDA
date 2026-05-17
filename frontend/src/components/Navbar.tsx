
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { Building2, LogOut } from 'lucide-react'

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getDashboardLink = () => {
    if (!user) return '/'
    switch (user.role) {
      case 'CITIZEN':
        return '/citizen'
      case 'AGENT':
        return '/agent'
      case 'ADMIN':
        return '/admin'
      default:
        return '/'
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={getDashboardLink()} className="flex items-center gap-2 group">
              <div className="bg-brand-100 p-2 rounded-xl group-hover:bg-brand-200 transition-colors">
                <Building2 className="h-6 w-6 text-brand-600" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">
                CitoyensConnect
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-sm font-medium text-slate-700 leading-none">
                      {user.name}
                    </span>
                    <span className="text-xs text-brand-600 font-medium mt-1 bg-brand-50 px-2 py-0.5 rounded-full">
                      {user.role === 'CITIZEN'
                        ? 'Citoyen'
                        : user.role === 'AGENT'
                        ? 'Agent'
                        : 'Admin'}
                    </span>
                  </div>
                  <div className="h-9 w-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm border border-brand-200">
                    {getInitials(user.name)}
                  </div>
                </div>
                <div className="h-6 w-px bg-stone-200 mx-1" />
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                  title="Se déconnecter"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors px-3 py-2 rounded-lg hover:bg-stone-50"
                >
                  Connexion
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium bg-brand-600 hover:bg-brand-500 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
