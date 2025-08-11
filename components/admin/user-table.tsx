"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import type { IUser } from "@/lib/types" // Updated import

interface UserTableProps {
  users: IUser[]
  onEdit: (user: IUser) => void
  onDelete: (id: string) => void
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/20">
      <Table className="min-w-full divide-y divide-white/20">
        <TableHeader className="bg-white/5">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Name
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Email
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Role
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">
              Assigned Event
            </TableHead>
            <TableHead className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-white/10">
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="px-6 py-4 text-center text-white/80">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id} className="hover:bg-white/5 transition-colors">
                <TableCell className="px-6 py-4 whitespace-nowrap text-white">{user.name}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">{user.email}</TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-white/80 capitalize">
                  {user.role.replace("_", " ")}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-white/80">
                  {user.assignedEventId ? "Assigned" : "N/A"}
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(user)}
                    className="text-orange-400 hover:text-orange-300 hover:bg-white/10 mr-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(user._id)}
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
