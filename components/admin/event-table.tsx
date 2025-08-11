"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ImageIcon } from "lucide-react"
import type { IEvent } from "@/lib/types" // Updated import

interface EventTableProps {
  events: IEvent[]
  onEdit: (event: IEvent) => void
  onDelete: (id: string) => void
}

export function EventTable({ events, onEdit, onDelete }: EventTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/20">
      <Table className="min-w-full divide-y divide-white/20">
        <TableHeader className="bg-white/5">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Title
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Category
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Date
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Prize
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Image
            </TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-white/10">
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="px-6 py-4 text-center text-white/80">
                No events found.
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event._id} className="hover:bg-white/5 transition-colors">
                <TableCell className="px-6 py-4 whitespace-nowrap text-white">{event.title}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">{event.category}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">{event.date}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">{event.prize}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {event.posterImage ? (
                    <a
                      href={event.posterImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:underline flex items-center gap-1"
                    >
                      <ImageIcon className="w-4 h-4" /> View
                    </a>
                  ) : (
                    <span className="text-white/60">N/A</span>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(event)}
                    className="text-orange-400 hover:text-orange-300 hover:bg-white/10 mr-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(event._id)}
                    className="text-red-400 hover:text-red-300 hover:bg-white/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
