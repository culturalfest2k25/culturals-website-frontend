const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

// Log the resolved base URL to help debug environment variable issues
console.log("Resolved API_BASE_URL:", API_BASE_URL)

class ApiClient {
  private token: string | null

  constructor() {
    // Client-side only: retrieve token from localStorage
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
    console.log("API Request URL:", url) // Log the full URL

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

    // Special handling for FormData (file uploads)
    if (options.body instanceof FormData) {
      delete (config.headers as Record<string, string>)["Content-Type"] // Let browser set Content-Type for FormData
    }

    let response: Response
    try {
      response = await fetch(url, config)
    } catch (error) {
      console.error("Network error during API request:", error)
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
    return this.request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async register(userData: any) {
    return this.request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async getCurrentUser() {
    return this.request("/api/auth/me")
  }

  async getAllUsers() {
    return this.request("/api/auth/users")
  }

  async getUserById(id: string) {
    return this.request(`/api/auth/users/${id}`)
  }

  async createUser(userData: any) {
    return this.request("/api/auth/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  async updateUser(id: string, userData: any) {
    return this.request(`/api/auth/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(id: string) {
    return this.request(`/api/auth/users/${id}`, {
      method: "DELETE",
    })
  }

  // Event methods
  async getEvents() {
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

  // Registration methods
  async registerForEvent(registrationData: any) {
    return this.request("/api/registrations", {
      method: "POST",
      body: JSON.stringify(registrationData),
    })
  }

  async getAllRegistrations() {
    return this.request("/api/registrations")
  }

  async getRegistrationStats() {
    return this.request("/api/registrations/stats")
  }

  async updateRegistrationStatus(id: string, status: string) {
    return this.request(`/api/registrations/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  }

  async deleteRegistration(id: string) {
    return this.request(`/api/registrations/${id}`, {
      method: "DELETE",
    })
  }

  // Volunteer methods
  async registerVolunteer(volunteerData: any) {
    return this.request("/api/volunteers/register", {
      method: "POST",
      body: JSON.stringify(volunteerData),
    })
  }

  async getAllVolunteers() {
    return this.request("/api/volunteers")
  }

  async updateVolunteerStatus(id: string, applicationStatus: string) {
    return this.request(`/api/volunteers/status/${id}`, {
      method: "PUT",
      body: JSON.stringify({ applicationStatus }),
    })
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
      headers: {}, // Important: Let browser set Content-Type for FormData
    })
  }
}

export default new ApiClient()
