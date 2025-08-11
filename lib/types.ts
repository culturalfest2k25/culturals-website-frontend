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

// New interface for static content
export interface IStaticContent {
  _id?: string // Optional, as it might be created on first save
  festivalName: string
  festivalDates: string
  festivalLocation: string
  heroSubtitle: string
  stats: {
    eventsCount: string
    eventsLabel: string
    celebrationDuration: string
    celebrationLabel: string
    participantsCount: string
    participantsLabel: string
  }
  aboutTitle: string
  aboutDescription: string
  aboutFeatures: {
    title: string
    subtitle: string
    description: string
    gradient: string
  }[]
  eventsTitle: string
  registerTitle: string
  registerDescription: string
  registerFormTitle: string
  registerFormDescription: string
  registerButtonText: string
  registerDisclaimer: string
  eventRegistrationFormUrl: string
  volunteerTitle: string
  volunteerDescription: string
  volunteerFormTitle: string
  volunteerFormDescription: string
  volunteerButtonText: string
  volunteerDisclaimer: string
  volunteerRegistrationFormUrl: string
  committeeTitle: string
  committeeDescription: string
  footerDescription: string
  footerQuickLinks: string[]
  footerEventInfo: {
    date: string
    location: string
    phone: string
  }
  socialMediaLinks: {
    instagram: string
    facebook: string
    twitter: string
  }
  copyrightText: string
}
