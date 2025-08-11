"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import type { IRegistration, IEvent } from "@/lib/types" // Updated import

interface RegistrationTableProps {
  registrations: IRegistration[]
  events: IEvent[] // To get event names for filtering
}

export function RegistrationTable({ registrations, events }: RegistrationTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterEventId, setFilterEventId] = useState("all")

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch =
      reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.eventName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterEventId === "all" || reg.eventId === filterEventId

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            placeholder="Search by name, email, college, or event..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
        </div>
        <div className="relative md:w-1/3">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
          <Select onValueChange={setFilterEventId} defaultValue="all">
            <SelectTrigger className="w-full pl-9 bg-white/5 border-white/10 text-white focus:border-orange-400 focus:ring-orange-400/20">
              <SelectValue placeholder="Filter by event" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="all">All Events</SelectItem>
              {events.map((event) => (
                <SelectItem key={event._id} value={event._id}>
                  {event.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-white/20">
        <Table className="min-w-full divide-y divide-white/20">
          <TableHeader className="bg-white/5">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Full Name
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Email
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Phone
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                College
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Event
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Fee
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Reg. Date
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
                Special Req.
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-white/10">
            {filteredRegistrations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="px-6 py-4 text-center text-white/80">
                  No registrations found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredRegistrations.map((reg) => (
                <TableRow key={reg._id} className="hover:bg-white/5 transition-colors">
                  <TableCell className="px-6 py-4 whitespace-nowrap text-white">{reg.fullName}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">{reg.email}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">{reg.phone}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">{reg.college}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">{reg.eventName}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">₹{reg.totalFee}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">{reg.registrationDate}</TableCell>
                  <TableCell className="px-6 py-4 text-white/80 max-w-[200px] truncate">
                    {reg.specialRequirements || "N/A"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
