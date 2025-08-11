"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useState, useEffect, useRef } from "react" // Added useRef
import { ImageIcon, Loader2 } from "lucide-react" // Added UploadCloud, Loader2
import type { IEvent } from "@/lib/types"
import apiClient from "@/lib/api" // Import apiClient

const eventSchema = z.object({
  title: z.string().min(1, "Event title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Short description is required"),
  fullDescription: z.string().min(1, "Full description is required"),
  prize: z.string().min(1, "Prize money is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  participants: z.string().min(1, "Participants info is required"),
  venue: z.string().min(1, "Venue is required"),
  duration: z.string().min(1, "Duration is required"),
  posterImage: z.string().url("Valid image URL is required"), // Still expects URL
  rules: z.string().optional(), // Comma-separated string
})

interface EventFormProps {
  onSubmit: (data: Partial<IEvent>) => void
  initialData?: IEvent | null
}

export function EventForm({ onSubmit, initialData }: EventFormProps) {
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
  } = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      title: "",
      category: "",
      description: "",
      fullDescription: "",
      prize: "",
      date: "",
      time: "",
      participants: "",
      venue: "",
      duration: "",
      posterImage: "",
      rules: "",
    },
  })

  const posterImageWatch = watch("posterImage")

  useEffect(() => {
    if (initialData) {
      for (const [key, value] of Object.entries(initialData)) {
        if (key === "rules" && Array.isArray(value)) {
          setValue("rules", value.join(", "))
        } else {
          setValue(key as keyof z.infer<typeof eventSchema>, value)
        }
      }
      setImagePreview(initialData.posterImage)
    }
  }, [initialData, setValue])

  useEffect(() => {
    setImagePreview(posterImageWatch)
  }, [posterImageWatch])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const response = await apiClient.uploadFile(file)
      setValue("posterImage", response.url, { shouldValidate: true })
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

  const onSubmitHandler = async (data: z.infer<typeof eventSchema>) => {
    const eventData: Partial<IEvent> = {
      ...data,
      rules: data.rules ? data.rules.split(",").map((rule) => rule.trim()) : [],
    }
    onSubmit(eventData)
  }

  const eventCategories = ["Dance", "Music", "Drama", "Visual Arts", "Gaming", "Fashion", "Other"]

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title" className="text-white/90">
            Event Title
          </Label>
          <Input
            id="title"
            {...register("title")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="category" className="text-white/90">
            Category
          </Label>
          <Select onValueChange={(value) => setValue("category", value)} defaultValue={initialData?.category}>
            <SelectTrigger className="w-full bg-white/5 border-white/10 text-white focus:border-orange-400 focus:ring-orange-400/20">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              {eventCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="description" className="text-white/90">
          Short Description
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
        />
        {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <Label htmlFor="fullDescription" className="text-white/90">
          Full Description
        </Label>
        <Textarea
          id="fullDescription"
          {...register("fullDescription")}
          rows={5}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
        />
        {errors.fullDescription && <p className="text-red-400 text-sm mt-1">{errors.fullDescription.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="prize" className="text-white/90">
            Prize Money
          </Label>
          <Input
            id="prize"
            {...register("prize")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.prize && <p className="text-red-400 text-sm mt-1">{errors.prize.message}</p>}
        </div>
        <div>
          <Label htmlFor="date" className="text-white/90">
            Date
          </Label>
          <Input
            id="date"
            {...register("date")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.date && <p className="text-red-400 text-sm mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <Label htmlFor="time" className="text-white/90">
            Time
          </Label>
          <Input
            id="time"
            {...register("time")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.time && <p className="text-red-400 text-sm mt-1">{errors.time.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="participants" className="text-white/90">
            Participants Info
          </Label>
          <Input
            id="participants"
            {...register("participants")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.participants && <p className="text-red-400 text-sm mt-1">{errors.participants.message}</p>}
        </div>
        <div>
          <Label htmlFor="venue" className="text-white/90">
            Venue
          </Label>
          <Input
            id="venue"
            {...register("venue")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.venue && <p className="text-red-400 text-sm mt-1">{errors.venue.message}</p>}
        </div>
        <div>
          <Label htmlFor="duration" className="text-white/90">
            Duration
          </Label>
          <Input
            id="duration"
            {...register("duration")}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
          />
          {errors.duration && <p className="text-red-400 text-sm mt-1">{errors.duration.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="rules" className="text-white/90">
          Rules (comma-separated)
        </Label>
        <Textarea
          id="rules"
          {...register("rules")}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
        />
        {errors.rules && <p className="text-red-400 text-sm mt-1">{errors.rules.message}</p>}
      </div>

      {/* Image Upload Section */}
      <div>
        <Label htmlFor="posterImageFile" className="text-white/90">
          Upload Poster Image
        </Label>
        <Input
          id="posterImageFile"
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
        {errors.posterImage && <p className="text-red-400 text-sm mt-1">{errors.posterImage.message}</p>}

        <Label htmlFor="posterImage" className="text-white/90 mt-4 block">
          Or Enter Poster Image URL (if already uploaded)
        </Label>
        <Input
          id="posterImage"
          {...register("posterImage")}
          placeholder="https://example.com/image.jpg"
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-orange-400 focus:ring-orange-400/20"
        />

        {imagePreview && (
          <div className="mt-4 relative w-48 h-48 rounded-lg overflow-hidden border border-white/20">
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
        {isSubmitting ? "Saving..." : "Save Event"}
      </Button>
    </form>
  )
}
