"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"
import type { IUser, IEvent } from "@/lib/types" // Updated import

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
  role: z.enum(["super_admin", "admin", "user", "volunteer"]), // Added volunteer
  assignedEventId: z.string().nullable().optional(),
})

interface UserFormProps {
  onSubmit: (data: Partial<IUser>) => void
  initialData?: IUser | null
  events: IEvent[] // Pass events to select assigned event
}

export function UserForm({ onSubmit, initialData, events }: UserFormProps) {
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          password: "", // Never pre-fill password
          assignedEventId: initialData.assignedEventId || null,
        }
      : {
          name: "",
          email: "",
          password: "",
          role: "admin", // Default to admin for new users
          assignedEventId: null,
        },
  })

  const currentRole = watch("role")

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name)
      setValue("email", initialData.email)
      setValue("role", initialData.role)
      setValue("assignedEventId", initialData.assignedEventId || null)
    }
  }, [initialData, setValue])

  const onSubmitHandler = async (data: z.infer<typeof userSchema>) => {
    const userData: Partial<IUser> = {
      name: data.name,
      email: data.email,
      role: data.role,
      assignedEventId: data.role === "admin" && data.assignedEventId ? data.assignedEventId : null,
    }

    if (data.password) {
      userData.password = data.password
    }

    onSubmit(userData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-white/90">
            Name
          </Label>
          <Input
            id="name"
            {...register("name")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="text-white/90">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="password" className="text-white/90">
            Password {initialData ? "(Leave blank to keep current)" : ""}
          </Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <Label htmlFor="role" className="text-white/90">
            Role
          </Label>
          <Select
            onValueChange={(value) => setValue("role", value as "super_admin" | "admin" | "user" | "volunteer")}
            defaultValue={initialData?.role || "user"}
          >
            <SelectTrigger className="w-full bg-white/5 border-white/10 text-white focus:border-orange-400 focus:ring-orange-400/20">
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="super_admin">Super Admin</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="volunteer">Volunteer</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>}
        </div>
      </div>

      {currentRole === "admin" && (
        <div>
          <Label htmlFor="assignedEventId" className="text-white/90">
            Assigned Event (for Admin role)
          </Label>
          <Select
            onValueChange={(value) => setValue("assignedEventId", value === "none" ? null : value)}
            defaultValue={initialData?.assignedEventId || "none"}
          >
            <SelectTrigger className="w-full bg-white/5 border-white/10 text-white focus:border-orange-400 focus:ring-orange-400/20">
              <SelectValue placeholder="Select an event (optional)" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              <SelectItem value="none">None</SelectItem>
              {events.map((event) => (
                <SelectItem key={event._id} value={event._id}>
                  {event.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.assignedEventId && <p className="text-red-400 text-sm mt-1">{errors.assignedEventId.message}</p>}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-bold"
      >
        {isSubmitting ? "Saving..." : "Save User"}
      </Button>
    </form>
  )
}
