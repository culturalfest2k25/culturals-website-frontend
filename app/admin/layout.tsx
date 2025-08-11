import type React from "react"
import { AuthProvider } from "@/components/admin/auth-context"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        {children}
        <Toaster />
      </div>
    </AuthProvider>
  )
}
