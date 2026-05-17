import React from 'react'
import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import { CheckCircle2, Clock, FileText, Users } from 'lucide-react'
import { StatsCard } from '../../components/StatsCard'
import { StatusBadge } from '../../components/StatusBadge'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts'

export function AdminDashboard() {
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

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" />
  }

  const totalComplaints = complaints.length
  const resolvedComplaints = complaints.filter((c) => c.status === 'RESOLU').length
  const resolutionRate = totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0

  const statusData = [
    { name: 'En attente', value: complaints.filter((c) => c.status === 'EN_ATTENTE').length, color: '#f59e0b' },
    { name: 'En cours', value: complaints.filter((c) => c.status === 'EN_COURS').length, color: '#0ea5e9' },
    { name: 'Résolu', value: resolvedComplaints, color: '#10b981' },
  ]

  const categories = ['INFRASTRUCTURE', 'SANTE', 'EDUCATION', 'TRANSPORT', 'ENVIRONNEMENT', 'AUTRE']
  const categoryData = categories
    .map((cat) => ({ name: cat.charAt(0) + cat.slice(1).toLowerCase(), total: complaints.filter((c) => c.category === cat).length }))
    .sort((a, b) => b.total - a.total)

  const monthlyData = [
    { month: 'Jan', signalements: 45, resolus: 30 },
    { month: 'Fév', signalements: 52, resolus: 38 },
    { month: 'Mar', signalements: 48, resolus: 40 },
    { month: 'Avr', signalements: 61, resolus: 45 },
    { month: 'Mai', signalements: 55, resolus: 50 },
    { month: 'Juin', signalements: totalComplaints, resolus: resolvedComplaints },
  ]

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800">Tableau de bord Administrateur</h1>
        <p className="text-slate-600 mt-2 text-lg">Vue globale et statistiques de la plateforme.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard title="Total Signalements" value={totalComplaints} icon={<FileText className="w-6 h-6 text-brand-600" />} trend={{ value: 12, isPositive: true }} colorClass="bg-brand-100" borderColorClass="border-t-brand-500" />
        <StatsCard title="Taux de résolution" value={`${resolutionRate}%`} icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />} colorClass="bg-emerald-100" borderColorClass="border-t-emerald-500" trend={{ value: 5, isPositive: true }} />
        <StatsCard title="Délai moyen (jours)" value="4.2" icon={<Clock className="w-6 h-6 text-amber-600" />} colorClass="bg-amber-100" borderColorClass="border-t-amber-500" trend={{ value: 2, isPositive: false }} />
        <StatsCard title="Utilisateurs actifs" value="1,248" icon={<Users className="w-6 h-6 text-sky-600" />} colorClass="bg-sky-100" borderColorClass="border-t-sky-500" trend={{ value: 8, isPositive: true }} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200">
          <h3 className="text-xl font-extrabold text-slate-800 mb-6">Répartition par statut</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 lg:col-span-2">
          <h3 className="text-xl font-extrabold text-slate-800 mb-6">Signalements par catégorie</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <RechartsTooltip cursor={{ fill: '#fafaf9' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="total" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 lg:col-span-2">
          <h3 className="text-xl font-extrabold text-slate-800 mb-6">Évolution mensuelle</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="signalements" name="Nouveaux" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="resolus" name="Résolus" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden flex flex-col">
          <div className="p-8 border-b border-stone-100">
            <h3 className="text-xl font-extrabold text-slate-800">Derniers signalements</h3>
          </div>
          <div className="flex-1 overflow-auto">
            <table className="min-w-full divide-y divide-stone-100">
              <thead className="bg-stone-50/50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">ID / Date</th>
                  <th className="px-8 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-stone-100">
                {complaints.slice(0, 5).map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-8 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-800">
                        <Link to={`/admin/complaint/${complaint.id}`} className="hover:text-brand-600">
                          {complaint.id}
                        </Link>
                      </div>
                      <div className="text-sm text-slate-500 font-medium mt-1">{formatDate(complaint.createdAt)}</div>
                    </td>
                    <td className="px-8 py-4 whitespace-nowrap">
                      <StatusBadge status={complaint.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-stone-100 bg-stone-50/50 text-center">
            <button className="text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors">Voir tous les dossiers →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
