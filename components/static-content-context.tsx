"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import apiClient from "@/lib/api"
import type { IStaticContent } from "@/lib/types"

interface StaticContentContextValue {
  content: IStaticContent | null
  loading: boolean
  error: string | null
  setContent: (data: IStaticContent) => void
  saveContent: (data: IStaticContent) => Promise<IStaticContent>
  refetch: () => Promise<void>
}

const StaticContentContext = createContext<StaticContentContextValue | undefined>(undefined)

export function StaticContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContentState] = useState<IStaticContent | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiClient.getStaticContent()
      // Normalize shape: backend may return either { data: IStaticContent } or IStaticContent directly
      const normalized = (data && (data as any).data ? (data as any).data : data) as IStaticContent
      setContentState(normalized)
    } catch (e: any) {
      console.error("Failed to fetch static content:", e)
      setError(e?.message || "Failed to fetch static content")
      // Fallback to default so UI has content
      setContentState(apiClient.getDefaultStaticContent())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setContent = (data: IStaticContent) => {
    setContentState(data)
  }

  const saveContent = async (data: IStaticContent) => {
    const response = await apiClient.updateStaticContent(data)
    // Normalize shape as above
    const updated = (response && (response as any).data ? (response as any).data : response) as IStaticContent
    setContentState(updated)
    return updated
  }

  const value = useMemo(
    () => ({ content, loading, error, setContent, saveContent, refetch: fetchContent }),
    [content, loading, error],
  )

  return <StaticContentContext.Provider value={value}>{children}</StaticContentContext.Provider>
}

export function useStaticContent() {
  const ctx = useContext(StaticContentContext)


  if (!ctx) throw new Error("useStaticContent must be used within StaticContentProvider")
  return ctx
}
