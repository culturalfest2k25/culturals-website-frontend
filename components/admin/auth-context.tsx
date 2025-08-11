"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import apiClient from "@/lib/api" // Import the new API client
import type { IUser } from "@/lib/types" // Import IUser type

interface AuthContextType {
  isAuthenticated: boolean
  login: (user: { _id: string; email: string; role: string; assignedEventId?: string | null }) => void // Changed id to _id
  logout: () => void
  user: IUser | null // Use IUser type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(() => {
    const token = apiClient.getToken()
    if (token) {
      const fetchUser = async () => {
        try {
          const data = await apiClient.getCurrentUser()
          setUser(data.user)
          setIsAuthenticated(true)
        } catch (e) {
          console.error("Failed to fetch current user:", e)
          apiClient.setToken(null) // Clear invalid token
          setUser(null)
          setIsAuthenticated(false)
        }
      }
      fetchUser()
    }
  }, [])

  const login = (loggedInUser: { _id: string; email: string; role: string; assignedEventId?: string | null }) => {
    // The token is set by apiClient.login, so we just update the user state
    setUser(loggedInUser as IUser) // Cast to IUser
    setIsAuthenticated(true)
  }

  const logout = () => {
    apiClient.setToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
