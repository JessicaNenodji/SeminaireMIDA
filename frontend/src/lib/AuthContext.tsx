import React, { createContext, useContext, useEffect, useState } from 'react'
import { Complaint, ComplaintStatus, Note, User } from './types'
import { mockComplaints, mockUsers } from './mockData'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password?: string) => void
  logout: () => void
  register: (name: string, email: string, password?: string) => void
  complaints: Complaint[]
  addComplaint: (
    complaint: Omit<
      Complaint,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'status'
      | 'notes'
      | 'citizenId'
      | 'citizenName'
    >,
  ) => void
  updateComplaintStatus: (id: string, status: ComplaintStatus) => void
  addNote: (complaintId: string, content: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints)

  useEffect(() => {
    const storedUser = localStorage.getItem('citoyensConnectUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (email: string) => {
    const foundUser = mockUsers.find((u) => u.email === email)
    if (foundUser) {
      setUser(foundUser)
      localStorage.setItem('citoyensConnectUser', JSON.stringify(foundUser))
    } else {
      throw new Error('Identifiants incorrects')
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('citoyensConnectUser')
  }

  const register = (name: string, email: string) => {
    const newUser: User = {
      id: `u${Date.now()}`,
      name,
      email,
      role: 'CITIZEN',
    }
    setUser(newUser)
    localStorage.setItem('citoyensConnectUser', JSON.stringify(newUser))
  }

  const addComplaint = (
    data: Omit<
      Complaint,
      | 'id'
      | 'createdAt'
      | 'updatedAt'
      | 'status'
      | 'notes'
      | 'citizenId'
      | 'citizenName'
    >,
  ) => {
    if (!user) return
    const newComplaint: Complaint = {
      ...data,
      id: `C-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')}`,
      status: 'EN_ATTENTE',
      citizenId: user.id,
      citizenName: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: [],
    }
    setComplaints((prev) => [newComplaint, ...prev])
  }

  const updateComplaintStatus = (id: string, status: ComplaintStatus) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status,
              updatedAt: new Date().toISOString(),
            }
          : c,
      ),
    )
  }

  const addNote = (complaintId: string, content: string) => {
    if (!user || user.role !== 'AGENT') return
    const newNote: Note = {
      id: `n${Date.now()}`,
      agentId: user.id,
      agentName: user.name,
      content,
      createdAt: new Date().toISOString(),
    }
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId
          ? {
              ...c,
              notes: [...c.notes, newNote],
              updatedAt: new Date().toISOString(),
            }
          : c,
      ),
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        register,
        complaints,
        addComplaint,
        updateComplaintStatus,
        addNote,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
