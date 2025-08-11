"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect, useRef } from "react" // Added useRef
import { ImageIcon, Loader2 } from "lucide-react" // Added UploadCloud, Loader2
import type { ICommitteeMember } from "@/lib/types"
import apiClient from "@/lib/api" // Import apiClient

const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  position: z.string().min(1, "Position/Role is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  image: z.string().url("Valid image URL is required"),
})

interface CommitteeMemberFormProps {
  onSubmit: (data: Partial<ICommitteeMember>) => void
  initialData?: ICommitteeMember | null
}

export function CommitteeMemberForm({ onSubmit, initialData }: CommitteeMemberFormProps) {
  const { toast } = useToast()
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false) // New state for upload loading
  const fileInputRef = useRef<HTMLInputElement>(null) // Ref for file input

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof memberSchema>>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData || {
      name: "",
      position: "",
      phone: "",
      email: "",
      image: "",
    },
  })

  const imageWatch = watch("image")

  useEffect(() => {
    if (initialData) {
      for (const [key, value] of Object.entries(initialData)) {
        setValue(key as keyof z.infer<typeof memberSchema>, value)
      }
      setImagePreview(initialData.image)
    }
  }, [initialData, setValue])

  useEffect(() => {
    setImagePreview(imageWatch)
  }, [imageWatch])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const response = await apiClient.uploadFile(file)
      setValue("image", response.url, { shouldValidate: true })
      toast({ title: "Upload Success", description: "Image uploaded successfully!" })
    } catch (error: any) {
      console.error("File upload failed:", error)
      toast({
        title: "Upload Failed",
        description: `Failed to upload image: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = "" // Clear file input
      }
    }
  }

  const onSubmitHandler = async (data: z.infer<typeof memberSchema>) => {
    onSubmit(data)
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
          <Label htmlFor="position" className="text-white/90">
            Position/Role
          </Label>
          <Input
            id="position"
            {...register("position")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.position && <p className="text-red-400 text-sm mt-1">{errors.position.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="text-white/90">
            Phone
          </Label>
          <Input
            id="phone"
            {...register("phone")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
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

      {/* Image Upload Section */}
      <div>
        <Label htmlFor="imageFile" className="text-white/90">
          Upload Profile Photo
        </Label>
        <Input
          id="imageFile"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="bg-white/5 border-white/10 text-white file:text-orange-400 file:bg-white/10 file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-4 hover:file:bg-white/20"
          disabled={isUploading}
        />
        {isUploading && (
          <p className="text-orange-400 text-sm mt-2 flex items-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" /> Uploading...
          </p>
        )}
        {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>}

        <Label htmlFor="image" className="text-white/90 mt-4 block">
          Or Enter Profile Photo URL (if already uploaded)
        </Label>
        <Input
          id="image"
          {...register("image")}
          placeholder="https://example.com/profile.jpg"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
        />

        {imagePreview && (
          <div className="mt-4 relative w-48 h-48 rounded-full overflow-hidden border border-white/20">
            <img src={imagePreview || "/placeholder.svg"} alt="Image Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isUploading}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-bold"
      >
        {isSubmitting ? "Saving..." : "Save Member"}
      </Button>
    </form>
  )
}
