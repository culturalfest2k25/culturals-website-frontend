"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/admin/auth-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EventForm } from "@/components/admin/event-form"
import { EventTable } from "@/components/admin/event-table"
import { CommitteeMemberForm } from "@/components/admin/committee-member-form"
import { CommitteeMemberTable } from "@/components/admin/committee-member-table"
import { ContentForm } from "@/components/admin/content-form" // New import
import { useToast } from "@/components/ui/use-toast"
import { PlusCircle, LogOut, Loader2, Settings } from "lucide-react" // Added Settings icon
import type { IEvent, ICommitteeMember, IStaticContent } from "@/lib/types"
import apiClient from "@/lib/api"
import { useStaticContent } from "@/components/static-content-context"

export default function AdminDashboard() {
  const { isAuthenticated, logout, user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { content: ctxContent, saveContent, loading: contentLoading } = useStaticContent()

  const [events, setEvents] = useState<IEvent[]>([])
  const [members, setMembers] = useState<ICommitteeMember[]>([])

  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null)
  const [editingMember, setEditingMember] = useState<ICommitteeMember | null>(null)
  const [isLoadingData, setIsLoadingData] = useState(true)

  const isAdmin = user?.role === "admin"
  const isSuperAdmin = user?.role === "super_admin"

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
      return
    }

    const fetchData = async () => {
      setIsLoadingData(true)
      try {
        // Fetch events
        const eventsData = isSuperAdmin ? await apiClient.getEvents() : await apiClient.getAdminEvents()
        setEvents(eventsData.data || [])

        // Fetch committee members
        const membersData = await apiClient.getCommitteeMembers()
        setMembers(membersData.data || [])
      } catch (error: any) {
        console.error("Failed to fetch admin data:", error)
        toast({
          title: "Error",
          description: `Failed to load data: ${error.message}`,
          variant: "destructive",
        })
        if (error.message.includes("Unauthorized") || error.message.includes("Forbidden")) {
          logout()
          router.push("/admin/login")
        }
      } finally {
        setIsLoadingData(false)
      }
    }

    fetchData()
  }, [isAuthenticated, router, user, isSuperAdmin, logout, toast])

  const handleEventSubmit = async (data: Partial<IEvent>) => {
    try {
      if (editingEvent) {
        const response = await apiClient.updateEvent(editingEvent._id, data)
        setEvents(events.map((e) => (e._id === editingEvent._id ? { ...e, ...response.data } : e)))
        toast({ title: "Success", description: "Event updated successfully." })
      } else {
        const response = await apiClient.createEvent(data)
        setEvents([...events, response.data])
        toast({ title: "Success", description: "Event added successfully." })
      }
      setIsEventModalOpen(false)
      setEditingEvent(null)
    } catch (error: any) {
      console.error("Failed to save event:", error)
      toast({
        title: "Error",
        description: `Failed to save event: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return
    try {
      await apiClient.deleteEvent(id)
      setEvents(events.filter((e) => e._id !== id))
      toast({ title: "Success", description: "Event deleted successfully." })
    } catch (error: any) {
      console.error("Failed to delete event:", error)
      toast({
        title: "Error",
        description: `Failed to delete event: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  const handleMemberSubmit = async (data: Partial<ICommitteeMember>) => {
    try {
      if (editingMember) {
        const response = await apiClient.updateCommitteeMember(editingMember._id, data)
        setMembers(members.map((m) => (m._id === editingMember._id ? { ...m, ...response } : m)))
        toast({ title: "Success", description: "Committee member updated successfully." })
      } else {
        const response = await apiClient.createCommitteeMember(data)
        setMembers([...members, response])
        toast({ title: "Success", description: "Committee member added successfully." })
      }
      setIsMemberModalOpen(false)
      setEditingMember(null)
    } catch (error: any) {
      console.error("Failed to save committee member:", error)
      toast({
        title: "Error",
        description: `Failed to save committee member: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this committee member?")) return
    try {
      await apiClient.deleteCommitteeMember(id)
      setMembers(members.filter((m) => m._id !== id))
      toast({ title: "Success", description: "Committee member deleted successfully." })
    } catch (error: any) {
      console.error("Failed to delete committee member:", error)
      toast({
        title: "Error",
        description: `Failed to delete committee member: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  const handleStaticContentSubmit = async (data: IStaticContent) => {
    try {
      await saveContent(data)
      toast({ title: "Success", description: "Static content updated successfully." })
    } catch (error: any) {
      console.error("Failed to save static content:", error)
      toast({
        title: "Error",
        description: `Failed to save static content: ${error.message}`,
        variant: "destructive",
      })
    }
  }

  const handleEditEvent = (event: IEvent) => {
    setEditingEvent(event)
    setIsEventModalOpen(true)
  }

  const handleEditMember = (member: ICommitteeMember) => {
    setEditingMember(member)
    setIsMemberModalOpen(true)
  }

  if (!isAuthenticated || isLoadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
        <Loader2 className="h-10 w-10 animate-spin text-orange-400" />
        <span className="ml-4 text-xl">Loading authentication and data...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
          Admin Panel
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-white/80">
            Logged in as: <span className="font-semibold">{user?.email}</span> (
            <span className="capitalize">{user?.role?.replace("_", " ")}</span>)
          </span>
          <Button
            onClick={logout}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
          <TabsTrigger
            value="events"
            className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-black"
          >
            Event Management
          </TabsTrigger>
          <TabsTrigger
            value="committee"
            className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-black"
          >
            Committee Management
          </TabsTrigger>
          {isSuperAdmin && (
            <TabsTrigger
              value="content"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-black"
            >
              <Settings className="mr-2 h-4 w-4" /> Content Settings
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="events" className="mt-8">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Events
              </CardTitle>
              {isSuperAdmin && (
                <Dialog open={isEventModalOpen} onOpenChange={setIsEventModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setEditingEvent(null)}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px] bg-white/10 backdrop-blur-lg border border-white/20 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                        {editingEvent ? "Edit Event" : "Add New Event"}
                      </DialogTitle>
                    </DialogHeader>
                    <EventForm onSubmit={handleEventSubmit} initialData={editingEvent} />
                  </DialogContent>
                </Dialog>
              )}
            </CardHeader>
            <CardContent>
              <EventTable events={events} onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="committee" className="mt-8">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Committee Members
              </CardTitle>
              {isSuperAdmin && (
                <Dialog open={isMemberModalOpen} onOpenChange={setIsMemberModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => setEditingMember(null)}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px] bg-white/10 backdrop-blur-lg border border-white/20 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                        {editingMember ? "Edit Member" : "Add New Member"}
                      </DialogTitle>
                    </DialogHeader>
                    <CommitteeMemberForm onSubmit={handleMemberSubmit} initialData={editingMember} />
                  </DialogContent>
                </Dialog>
              )}
            </CardHeader>
            <CardContent>
              <CommitteeMemberTable members={members} onEdit={handleEditMember} onDelete={handleDeleteMember} />
            </CardContent>
          </Card>
        </TabsContent>

        {isSuperAdmin && (
          <TabsContent value="content" className="mt-8">
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                  Website Content Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!contentLoading && ctxContent ? (
                  <ContentForm onSubmit={handleStaticContentSubmit} initialData={ctxContent} />
                ) : (
                  <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-10 w-10 animate-spin text-orange-400" />
                    <span className="ml-4 text-xl text-white/80">Loading content settings...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
