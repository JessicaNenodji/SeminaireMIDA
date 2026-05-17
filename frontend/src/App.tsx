import React from 'react'
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'
import { Navbar } from './components/Navbar'

// Pages
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

// Citizen Pages
import { CitizenDashboard } from './pages/citizen/CitizenDashboard'
import { SubmitComplaint } from './pages/citizen/SubmitComplaint'
import { ComplaintDetail as CitizenComplaintDetail } from './pages/citizen/ComplaintDetail'

// Agent Pages
import { AgentDashboard } from './pages/agent/AgentDashboard'
import { AgentComplaintDetail } from './pages/agent/AgentComplaintDetail'

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminComplaintDetail } from './pages/admin/AdminComplaintDetail'

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Citizen Routes */}
              <Route path="/citizen" element={<CitizenDashboard />} />
              <Route path="/citizen/new" element={<SubmitComplaint />} />
              <Route path="/citizen/complaint/:id" element={<CitizenComplaintDetail />} />
              {/* Agent Routes */}
              <Route path="/agent" element={<AgentDashboard />} />
              <Route path="/agent/complaint/:id" element={<AgentComplaintDetail />} />
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/complaint/:id" element={<AdminComplaintDetail />} />
              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}
