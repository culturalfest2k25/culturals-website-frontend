"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, ImageIcon } from "lucide-react"
import type { ICommitteeMember } from "@/lib/types" // Updated import

interface CommitteeMemberTableProps {
  members: ICommitteeMember[]
  onEdit: (member: ICommitteeMember) => void
  onDelete: (id: string) => void
}

export function CommitteeMemberTable({ members, onEdit, onDelete }: CommitteeMemberTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/20">
      <Table className="min-w-full divide-y divide-white/20">
        <TableHeader className="bg-white/5">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Name
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Position
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Email
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Photo
            </TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-white/10">
          {members.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="px-6 py-4 text-center text-white/80">
                No committee members found.
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => (
              <TableRow key={member._id} className="hover:bg-white/5 transition-colors">
                <TableCell className="px-6 py-4 whitespace-nowrap text-white">{member.name}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">{member.position}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">{member.email}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {member.image ? (
                    <a
                      href={member.image}
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
                    onClick={() => onEdit(member)}
                    className="text-orange-400 hover:text-orange-300 hover:bg-white/10 mr-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(member._id)}
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
