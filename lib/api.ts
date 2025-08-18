const API_BASE_URL = process.env.BACKEND_URL || "https://cultural-backend-7gfl.onrender.com"

console.log("Resolved API_BASE_URL:", API_BASE_URL)

class ApiClient {
  private token: string | null

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token")
    } else {
      this.token = null
    }
  }

  setToken(token: string | null) {
    this.token = token
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("token", token)
      } else {
        localStorage.removeItem("token")
      }
    }
  }

  getToken(): string | null {
    return this.token
  }

  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    console.log("API Request URL:", url)

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    if (this.token) {
      ;(config.headers as Record<string, string>).Authorization = `Bearer ${this.token}`
    }

    if (options.body instanceof FormData) {
      delete (config.headers as Record<string, string>)["Content-Type"]
    }

    let response: Response
    try {
      response = await fetch(url, config)
    } catch (error) {
      console.error("Network error during API request: Load failed", error)
      throw new Error("Network error: Could not connect to the API server.")
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `API request failed with status ${response.status}`)
    }
    return data
  }

  // Auth methods
  async login(email: string, password: string) {
    const data = await this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
    if (data.token) {
      this.setToken(data.token)
    }
    return data
  }

  async getCurrentUser() {
    return this.request("/api/auth/me")
  }

  // Event methods
  async getEvents() {
    console.log("Fetching events...")
    return this.request("/api/events")
  }

  async getEventById(id: string) {
    return this.request(`/api/events/${id}`)
  }

  async createEvent(eventData: any) {
    return this.request("/api/events", {
      method: "POST",
      body: JSON.stringify(eventData),
    })
  }

  async updateEvent(id: string, eventData: any) {
    return this.request(`/api/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    })
  }

  async deleteEvent(id: string) {
    return this.request(`/api/events/${id}`, {
      method: "DELETE",
    })
  }

  async getAdminEvents() {
    return this.request("/api/events/admin/events")
  }

  // Committee methods
  async getCommitteeMembers() {
    return this.request("/api/committee")
  }

  async getCommitteeMemberById(id: string) {
    return this.request(`/api/committee/${id}`)
  }

  async createCommitteeMember(memberData: any) {
    return this.request("/api/committee", {
      method: "POST",
      body: JSON.stringify(memberData),
    })
  }

  async updateCommitteeMember(id: string, memberData: any) {
    return this.request(`/api/committee/${id}`, {
      method: "PUT",
      body: JSON.stringify(memberData),
    })
  }

  async deleteCommitteeMember(id: string) {
    return this.request(`/api/committee/${id}`, {
      method: "DELETE",
    })
  }

  // File Upload
  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append("file", file)
    return this.request("/api/upload", {
      method: "POST",
      body: formData,
      headers: {},
    })
  }

  // Static Content methods (Simulated)
  async getStaticContent() {
    // In a real app, this would fetch from your backend database
    // For now, we'll return a default structure or a stored one
    try {
      const response = await this.request("/api/static-content")
      return response
    } catch (error: any) {
      if (error.message.includes("404") || error.message.includes("not found")) {
        console.warn("Static content not found on backend, returning default.")
        return this.getDefaultStaticContent()
      }
      throw error
    }
  }

  async updateStaticContent(contentData: any) {
    // In a real app, this would send to your backend database
    // For now, we'll just log and return the updated data
    console.log("Simulating static content update:", contentData)
    const response = await this.request("/api/static-content", {
      method: "PUT",
      body: JSON.stringify(contentData),
    })
    return response
  }

  // Default static content for initial load or if backend is empty
  getDefaultStaticContent() {
    return {
      festivalName: "VARNAVE'25",
      festivalDates: "September 12-13, 2025",
      festivalLocation: "Coimbatore",
      heroSubtitle: "Cultural Festival • September 12-13, 2025 • Coimbatore",
      stats: {
        eventsCount: "20+",
        eventsLabel: "Events",
        celebrationDuration: "3 Days",
        celebrationLabel: "Celebration",
        participantsCount: "5000+",
        participantsLabel: "Participants",
      },
      aboutTitle: "ABOUT VARNAVE'25",
      aboutDescription:
        "Varnave'25 is the premier cultural festival celebrating the rich heritage of Tamil arts, cinema, music, and performing arts. Join us for three days of extraordinary performances, competitions, and cultural immersion in the heart of Coimbatore.",
      aboutFeatures: [
        {
          title: "3 DAYS",
          subtitle: "OF CELEBRATION",
          description: "Non-stop entertainment with 30+ events across multiple categories",
          gradient: "from-blue-500 to-purple-500",
        },
        {
          title: "₹1 LAKH+",
          subtitle: "PRIZE MONEY",
          description: "Exciting cash prizes and recognition for winners",
          gradient: "from-orange-500 to-yellow-500",
        },
        {
          title: "5000+",
          subtitle: "PARTICIPANTS",
          description: "Students from across Tamil Nadu and beyond",
          gradient: "from-pink-500 to-red-500",
        },
      ],
      eventsTitle: "EVENTS & COMPETITIONS",
      registerTitle: "REGISTER NOW",
      registerDescription: "Secure your spot at the grandest Tamil cultural celebration",
      registerFormTitle: "EVENT REGISTRATION",
      registerFormDescription: "Register for events and competitions via Google Forms.",
      registerButtonText: "REGISTER VIA GOOGLE FORM",
      registerDisclaimer: "Click the button to proceed to the Google Form for registration.",
      eventRegistrationFormUrl: "https://forms.gle/YourEventRegistrationFormLink", // Placeholder
      volunteerTitle: "BE A VOLUNTEER",
      volunteerDescription: "Join our dedicated team and help make Varnave'25 a grand success!",
      volunteerFormTitle: "VOLUNTEER REGISTRATION",
      volunteerFormDescription: "Contribute to the festival and gain valuable experience.",
      volunteerButtonText: "APPLY TO VOLUNTEER",
      volunteerDisclaimer: "Applications close September 1, 2025",
      volunteerRegistrationFormUrl: "https://forms.gle/JEz272bQkz7HEjks6", // Placeholder
      committeeTitle: "CORE COMMITTEE",
      committeeDescription: "Meet the dedicated team behind Varnave'25",
      footerDescription: "The premier Tamil cultural festival celebrating arts, cinema, music, and performing arts.",
      footerQuickLinks: ["About", "Events", "Register", "Volunteer", "Contact"],
      footerEventInfo: {
        date: "September 12-13, 2025",
        location: "Coimbatore, Tamil Nadu",
        phone: "+91 98765 43210",
      },
      socialMediaLinks: {
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
      },
      copyrightText: "© 2025 Varnave. All rights reserved.",
    }
  }
}

export default new ApiClient()
