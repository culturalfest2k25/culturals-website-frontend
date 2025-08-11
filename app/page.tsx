"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import {
  Calendar,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Users,
  Award,
  Mail,
  ChevronDown,
  Star,
  Sparkles,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { EventCard } from "@/components/event-card"
import { EventModal } from "@/components/event-modal"
import { AnimatedSection } from "@/components/animated-section"
import { StaggeredContainer } from "@/components/staggered-container"
import { AnimatedText } from "@/components/animated-text"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useToast } from "@/components/ui/use-toast"
import apiClient from "@/lib/api"
import type { IEvent, ICommitteeMember } from "@/lib/types"

export default function NuvoriyaFest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const { toast } = useToast()

  const [events, setEvents] = useState<IEvent[]>([])
  const [committeeMembers, setCommitteeMembers] = useState<ICommitteeMember[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(true)
  const [isLoadingMembers, setIsLoadingMembers] = useState(true)
  const [isRegistering, setIsRegistering] = useState(false)

  // Registration form states
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [college, setCollege] = useState("")
  const [specialRequirements, setSpecialRequirements] = useState("")

  // Smooth parallax transforms with reduced intensity
  const smoothScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const backgroundY = useTransform(smoothScrollY, [0, 1], ["0%", "20%"])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    document.title = "Nuvoriya 2025 - Cultural Festival"

    const fetchInitialData = async () => {
      setIsLoadingEvents(true)
      setIsLoadingMembers(true)
      try {
        // Fetch events
        const eventsData = await apiClient.getEvents()
        setEvents(eventsData.data || [])
        setIsLoadingEvents(false)

        // Fetch committee members
        const membersData = await apiClient.getCommitteeMembers()
        setCommitteeMembers(membersData.data || []) // Corrected: Access .data property
        setIsLoadingMembers(false)
      } catch (error: any) {
        console.error("Failed to fetch initial data:", error)
        toast({
          title: "Error",
          description: `Failed to load festival data: ${error.message}`,
          variant: "destructive",
        })
        setIsLoadingEvents(false)
        setIsLoadingMembers(false)
      }
    }

    fetchInitialData()
  }, [toast])

  const eventCategories = ["All", "Dance", "Music", "Drama", "Visual Arts", "Gaming", "Fashion"]

  const filteredEvents = activeFilter === "All" ? events : events.filter((event) => event.category === activeFilter)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMenuOpen(false)
  }

  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRegistering(true)

    const registrationData = {
      fullName,
      email,
      phone,
      college,
      specialRequirements,
      eventId: "festival_pass", // Assuming a generic ID for festival pass registration
      eventName: "Nuvoriya 2025 Festival Pass",
      totalFee: 449,
      paymentMethod: "online", // Or "upi", "card" etc.
    }

    try {
      await apiClient.registerForEvent(registrationData)
      toast({
        title: "Registration Successful",
        description: "🎉 Welcome to Nuvoriya 2025! Your registration is complete.",
      })
      // Clear form
      setFullName("")
      setEmail("")
      setPhone("")
      setCollege("")
      setSpecialRequirements("")
    } catch (error: any) {
      console.error("Registration failed:", error)
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRegistering(false)
    }
  }

  // Floating Navigation Component
  const FloatingNav = () => {
    const { ref, shouldAnimate } = useScrollAnimation({ delay: 1000, threshold: 0 })

    return (
      <motion.nav
        ref={ref}
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={shouldAnimate ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-8 py-4 flex items-center gap-8"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {["About", "Events", "Register", "Contact"].map((item, index) => (
            <motion.button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-white/80 hover:text-white font-medium transition-colors duration-300 relative group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
              <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
        </motion.div>
      </motion.nav>
    )
  }

  // Parallax Background Component
  const ParallaxBackground = ({ children, speed = 0.5 }: { children: React.ReactNode; speed?: number }) => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    })
    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])

    return (
      <div ref={ref} className="relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          {children}
        </motion.div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Enhanced Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Hero Section with Background Image */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
          <div
            className="w-full h-[120%] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('/placeholder.svg?height=1080&width=1920&text=Cultural+Festival+Stage')`,
            }}
          />
        </motion.div>

        {/* Static Animated Overlay Elements */}
        <div className="absolute inset-0 z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
          <AnimatedSection delay={300} duration={1.2}>
            <div className="mb-16">
              {/* Enhanced Title */}
              <AnimatedText effect="shimmer" delay={500} duration={1.5}>
                <h1
                  className="text-7xl md:text-8xl lg:text-9xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-yellow-200 tracking-wider mb-8 relative"
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  NUVORIYA
                </h1>
              </AnimatedText>

              {/* Subtitle */}
              <AnimatedText delay={1000} duration={1}>
                <div className="text-xl md:text-2xl font-light text-white/90 mb-8 max-w-3xl mx-auto">
                  Cultural Festival • September 20-22, 2025 • Coimbatore
                </div>
              </AnimatedText>

              {/* Statistics */}
              <StaggeredContainer
                staggerDelay={0.2}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto"
              >
                {[
                  { number: "30+", label: "Events", icon: <Star className="w-6 h-6" /> },
                  { number: "3 Days", label: "Celebration", icon: <Calendar className="w-6 h-6" /> },
                  { number: "5000+", label: "Participants", icon: <Users className="w-6 h-6" /> },
                ].map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300"
                  >
                    <div className="text-orange-400 mb-3 flex justify-center">{stat.icon}</div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                ))}
              </StaggeredContainer>

              {/* CTA Buttons */}
              <AnimatedSection delay={2000} direction="up">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">
                  <motion.button
                    className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-full hover:bg-white/20 transition-all duration-300 group relative overflow-hidden"
                    onClick={() => scrollToSection("events")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">View Events</span>
                  </motion.button>

                  <motion.button
                    className="px-10 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 relative overflow-hidden group"
                    onClick={() => scrollToSection("register")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Register Now
                      <Sparkles className="w-4 h-4" />
                    </span>
                  </motion.button>
                </div>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll Indicator */}
        <AnimatedSection delay={3000} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-white/60" />
          </motion.div>
        </AnimatedSection>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        {/* Background Image */}
        <ParallaxBackground speed={0.3}>
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('/placeholder.svg?height=800&width=1600&text=Traditional+Tamil+Art')`,
            }}
          />
        </ParallaxBackground>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />

        <div className="container mx-auto px-6 relative z-20">
          <AnimatedSection className="text-center mb-20">
            <AnimatedText effect="shimmer" duration={1.2}>
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-8">
                ABOUT NUVORIYA
              </h2>
            </AnimatedText>

            <AnimatedSection delay={300} direction="scale">
              <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-8 rounded-full" />
            </AnimatedSection>

            <AnimatedText delay={500} duration={1}>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto">
                Nuvoriya is the premier cultural festival celebrating the rich heritage of Tamil arts, cinema, music,
                and performing arts. Join us for three days of extraordinary performances, competitions, and cultural
                immersion in the heart of Coimbatore.
              </p>
            </AnimatedText>
          </AnimatedSection>

          {/* Feature Cards */}
          <StaggeredContainer staggerDelay={0.2} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Calendar className="w-10 h-10" />,
                title: "3 DAYS",
                subtitle: "OF CELEBRATION",
                description: "Non-stop entertainment with 30+ events across multiple categories",
                gradient: "from-blue-500 to-purple-500",
              },
              {
                icon: <Award className="w-10 h-10" />,
                title: "₹1 LAKH+",
                subtitle: "PRIZE MONEY",
                description: "Exciting cash prizes and recognition for winners",
                gradient: "from-orange-500 to-yellow-500",
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: "5000+",
                subtitle: "PARTICIPANTS",
                description: "Students from across Tamil Nadu and beyond",
                gradient: "from-pink-500 to-red-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 relative overflow-hidden">
                  <div
                    className={`text-white mb-6 flex justify-center bg-gradient-to-r ${item.gradient} w-20 h-20 rounded-full items-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">{item.title}</h3>

                  <h4
                    className={`text-lg font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}
                  >
                    {item.subtitle}
                  </h4>

                  <p className="text-white/80 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </StaggeredContainer>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-32 relative overflow-hidden">
        {/* Background Image */}
        <ParallaxBackground speed={0.4}>
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-15"
            style={{
              backgroundImage: `url('/placeholder.svg?height=800&width=1600&text=Modern+Event+Stage')`,
            }}
          />
        </ParallaxBackground>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10" />

        <div className="container mx-auto px-6 relative z-20">
          <AnimatedSection className="text-center mb-20">
            <AnimatedText effect="shimmer" duration={1.2}>
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-8">
                EVENTS & COMPETITIONS
              </h2>
            </AnimatedText>

            <AnimatedSection delay={300} direction="scale">
              <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-8 rounded-full" />
            </AnimatedSection>
          </AnimatedSection>

          {/* Event Filters */}
          <StaggeredContainer staggerDelay={0.05} className="flex flex-wrap justify-center gap-4 mb-16">
            {eventCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 font-medium transition-all duration-300 rounded-full relative overflow-hidden ${
                  activeFilter === category
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-black"
                    : "text-white border border-white/20 hover:border-orange-400/50 hover:text-orange-400 bg-white/5 backdrop-blur-sm"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeFilter === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400"
                    layoutId="activeFilter"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </StaggeredContainer>

          {/* Events Grid */}
          {isLoadingEvents ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-orange-400" />
              <span className="ml-4 text-xl text-white/80">Loading events...</span>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event._id}
                    layout
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                  >
                    <EventCard event={event} index={index} onClick={() => setSelectedEvent(event)} />
                  </motion.div>
                ))}
              </AnimatePresence>
              {filteredEvents.length === 0 && (
                <div className="col-span-full text-center text-white/70 text-lg">
                  No events found for this category.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-32 relative overflow-hidden">
        {/* Background Image */}
        <ParallaxBackground speed={0.2}>
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('/placeholder.svg?height=800&width=1600&text=Elegant+Venue+Interior')`,
            }}
          />
        </ParallaxBackground>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/85 z-10" />

        <div className="container mx-auto px-6 relative z-20">
          <AnimatedSection className="text-center mb-20">
            <AnimatedText effect="shimmer" duration={1.2}>
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-8">
                REGISTER NOW
              </h2>
            </AnimatedText>

            <AnimatedSection delay={300} direction="scale">
              <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-8 rounded-full" />
            </AnimatedSection>

            <AnimatedText delay={500} duration={1}>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Secure your spot at the grandest Tamil cultural celebration
              </p>
            </AnimatedText>
          </AnimatedSection>

          <AnimatedSection delay={300} className="max-w-2xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-4">
                  FESTIVAL PASS
                </h3>
                <p className="text-white/80 text-lg">Complete access to all events and competitions</p>
              </div>

              <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                <StaggeredContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="block text-orange-300 font-medium mb-2">
                      FULL NAME
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white focus:border-orange-400 focus:ring-orange-400/20 backdrop-blur-sm rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="block text-orange-300 font-medium mb-2">
                      EMAIL
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white focus:border-orange-400 focus:ring-orange-400/20 backdrop-blur-sm rounded-xl"
                    />
                  </div>
                </StaggeredContainer>

                <StaggeredContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="block text-orange-300 font-medium mb-2">
                      PHONE
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+91 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white focus:border-orange-400 focus:ring-orange-400/20 backdrop-blur-sm rounded-xl"
                    />
                  </div>
                  <div>
                    <Label htmlFor="college" className="block text-orange-300 font-medium mb-2">
                      COLLEGE
                    </Label>
                    <Input
                      id="college"
                      placeholder="Your college name"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white focus:border-orange-400 focus:ring-orange-400/20 backdrop-blur-sm rounded-xl"
                    />
                  </div>
                </StaggeredContainer>

                <AnimatedSection delay={500}>
                  <Label htmlFor="specialRequirements" className="block text-orange-300 font-medium mb-2">
                    SPECIAL REQUIREMENTS
                  </Label>
                  <Textarea
                    id="specialRequirements"
                    placeholder="Any special requirements..."
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    className="bg-white/10 border-white/20 text-white focus:border-orange-400 focus:ring-orange-400/20 backdrop-blur-sm rounded-xl"
                    rows={3}
                  />
                </AnimatedSection>

                <AnimatedSection delay={600}>
                  <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 p-6 rounded-2xl border border-orange-500/20">
                    <h4 className="font-bold text-white mb-4 text-xl">REGISTRATION FEE</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Festival Pass (3 Days)</span>
                        <span className="text-white font-bold">₹299</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Food Coupon</span>
                        <span className="text-white font-bold">₹150</span>
                      </div>
                      <div className="border-t border-orange-500/20 pt-3 flex justify-between items-center text-xl">
                        <span className="font-bold text-white">TOTAL</span>
                        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                          ₹449
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={700}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-bold py-4 text-lg rounded-2xl relative overflow-hidden group"
                    disabled={isRegistering}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isRegistering ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Registering...
                      </span>
                    ) : (
                      <span className="relative z-10">COMPLETE REGISTRATION - ₹449</span>
                    )}
                  </Button>
                </AnimatedSection>

                <AnimatedSection delay={800}>
                  <p className="text-center text-white/60">Secure payment • 100% refundable until September 15</p>
                </AnimatedSection>
              </form>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Core Committee Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black z-10" />

        <div className="container mx-auto px-6 relative z-20">
          <AnimatedSection className="text-center mb-20">
            <AnimatedText effect="shimmer" duration={1.2}>
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-8">
                CORE COMMITTEE
              </h2>
            </AnimatedText>

            <AnimatedSection delay={300} direction="scale">
              <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-8 rounded-full" />
            </AnimatedSection>

            <AnimatedText delay={500} duration={1}>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Meet the dedicated team behind Nuvoriya 2025
              </p>
            </AnimatedText>
          </AnimatedSection>

          {isLoadingMembers ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-orange-400" />
              <span className="ml-4 text-xl text-white/80">Loading committee members...</span>
            </div>
          ) : (
            <StaggeredContainer
              staggerDelay={0.1}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              {committeeMembers.map((member, index) => (
                <motion.div
                  key={member._id}
                  className="relative group"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 text-center relative overflow-hidden">
                    <div className="relative mb-6">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-orange-500/30 group-hover:border-orange-400/60 transition-colors duration-300"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 font-medium mb-4">
                      {member.position}
                    </p>

                    <div className="space-y-3">
                      <motion.div
                        className="flex items-center justify-center gap-2 text-white/80 group-hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Phone className="w-4 h-4 text-orange-400" />
                        <a href={`tel:${member.phone}`} className="hover:text-orange-400 transition-colors">
                          {member.phone}
                        </a>
                      </motion.div>
                      <motion.div
                        className="flex items-center justify-center gap-2 text-white/80 group-hover:text-white transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Mail className="w-4 h-4 text-orange-400" />
                        <a href={`mailto:${member.email}`} className="hover:text-orange-400 transition-colors">
                          {member.email}
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </StaggeredContainer>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 relative border-t border-white/10">
        <div className="container mx-auto px-6 relative z-10">
          <StaggeredContainer staggerDelay={0.1} className="grid md:grid-cols-4 gap-8">
            <div>
              <AnimatedText effect="shimmer" duration={1.5}>
                <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-4">
                  NUVORIYA
                </h3>
              </AnimatedText>
              <p className="text-white/70 mb-6 leading-relaxed">
                The premier Tamil cultural festival celebrating arts, cinema, music, and performing arts.
              </p>
              <div className="flex space-x-4">
                {[Instagram, Facebook, Twitter].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/10 hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/20 hover:border-orange-400"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-4">QUICK LINKS</h4>
              <ul className="space-y-3">
                {["About", "Events", "Registration", "Contact", "FAQ"].map((link) => (
                  <li key={link}>
                    <button
                      className="text-white/70 hover:text-orange-400 transition-colors duration-300 font-medium relative group"
                      onClick={() => scrollToSection(link.toLowerCase())}
                    >
                      {link}
                      <motion.div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 group-hover:w-full transition-all duration-300" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-4">EVENT INFO</h4>
              <div className="space-y-4">
                <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Calendar className="w-5 h-5 text-orange-400" />
                  <span className="text-white/70">September 20-22, 2025</span>
                </motion.div>
                <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <span className="text-white/70">Coimbatore, Tamil Nadu</span>
                </motion.div>
                <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Phone className="w-5 h-5 text-orange-400" />
                  <span className="text-white/70">+91 98765 43210</span>
                </motion.div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-4">NEWSLETTER</h4>
              <p className="text-white/70 mb-4">Stay updated with latest announcements</p>
              <div className="space-y-3">
                <Input
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white focus:border-orange-400 backdrop-blur-sm rounded-xl"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-bold rounded-xl">
                    SUBSCRIBE
                  </Button>
                </motion.div>
              </div>
            </div>
          </StaggeredContainer>

          <AnimatedSection delay={400} className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/60">© 2025 Nuvoriya. All rights reserved. Made with ❤️ for Tamil culture.</p>
          </AnimatedSection>
        </div>
      </footer>

      {/* Event Modal */}
      <EventModal event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  )
}
