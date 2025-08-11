// Define plain TypeScript interfaces for your data models
export interface IEvent {
  _id: string // Changed from id to _id
  title: string
  category: string
  description: string
  fullDescription: string
  prize: string
  date: string
  time: string
  participants: string
  venue: string
  duration: string
  posterImage: string // URL to the image
  rules: string[]
  status?: "active" | "inactive" | "completed" // Added from backend model
  registrationDeadline?: string // Added from backend model (Date string)
  maxParticipants?: number // Added from backend model
  currentParticipants?: number // Added from backend model
  organizer?: string // ObjectId string
  stats?: {
    totalRegistrations: number
    rating: number
    reviewCount: number
  }
  createdAt?: string
  updatedAt?: string
}

export interface ICommitteeMember {
  _id: string // Changed from id to _id
  name: string
  position: string
  phone: string
  email: string
  image: string // URL to the image
  bio?: string // Added from backend model
  socialLinks?: {
    // Added from backend model
    linkedin?: string
    twitter?: string
    instagram?: string
  }
  isActive?: boolean // Added from backend model
  order?: number // Added from backend model
  createdAt?: string
  updatedAt?: string
}

export interface IUser {
  _id: string // Changed from id to _id
  name: string
  email: string
  password?: string // Optional, as it won't be stored client-side
  role: "super_admin" | "admin" | "user" | "volunteer" // Added 'volunteer' role
  assignedEventId?: string | null // For admins assigned to a specific event
  profile?: {
    // Added from backend model
    phone?: string
    avatar?: string
  }
  isActive?: boolean // Added from backend model
  createdAt?: string
  updatedAt?: string
}

export interface IRegistration {
  _id: string // Changed from id to _id
  fullName: string
  email: string
  phone: string
  college: string
  specialRequirements?: string
  eventId: string // ID of the event they registered for
  eventName: string // Name of the event for display
  registrationDate: string // Changed to string for simplicity, backend uses Date
  totalFee: number
  paymentStatus?: "pending" | "paid" | "failed" | "refunded" // Added from backend model
  paymentMethod?: string // Added from backend model
  transactionId?: string // Added from backend model
  status?: "registered" | "cancelled" | "attended" | "refunded" // Added from backend model
  createdAt?: string
  updatedAt?: string
}
