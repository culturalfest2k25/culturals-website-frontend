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
import { EventCard } from "@/components/event-card"
import { EventModal } from "@/components/event-modal"
import { AnimatedSection } from "@/components/animated-section"
import { StaggeredContainer } from "@/components/staggered-container"
import { AnimatedText } from "@/components/animated-text"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { useToast } from "@/components/ui/use-toast"
import apiClient from "@/lib/api"
import type { IEvent, ICommitteeMember } from "@/lib/types"
import { useStaticContent } from "@/components/static-content-context"

export default function NuvoriyaFest() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const { toast } = useToast()
  const { content: ctxContent, loading: isLoadingStaticContent } = useStaticContent()

  const [events, setEvents] = useState<IEvent[]>([])
  const [committeeMembers, setCommitteeMembers] = useState<ICommitteeMember[]>([])
  const [isLoadingEvents, setIsLoadingEvents] = useState(true)
  const [isLoadingMembers, setIsLoadingMembers] = useState(true)

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
    const fetchInitialData = async () => {
      setIsLoadingEvents(true)
      setIsLoadingMembers(true)
      try {
        const eventsData = await apiClient.getEvents()
        setEvents(eventsData.data || [])
        setIsLoadingEvents(false)

        const membersData = await apiClient.getCommitteeMembers()
        setCommitteeMembers(membersData.data || [])
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

  useEffect(() => {
    if (ctxContent?.festivalName) {
      document.title = `${ctxContent.festivalName} - Cultural Festivals`
     
    }
  }, [ctxContent?.festivalName])

  const eventCategories = ["All", "Dance", "Music", "Drama", "Visual Arts", "Gaming", "Fashion"]

  const filteredEvents = activeFilter === "All" ? events : events.filter((event) => event.category === activeFilter)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    setIsMenuOpen(false)
  }

  if (isLoadingStaticContent) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <Loader2 className="h-10 w-10 animate-spin text-orange-400" />
        <span className="ml-4 text-xl">Loading festival content...</span>
      </div>
    )
  }

  // Use default content if context content is null (e.g., initial render before fetch completes or on error)
  const content = ctxContent ;

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

      {/* Floating Navigation Component */}
      <FloatingNav />

      {/* Hero Section with Background Image */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
          <div
            className="w-full h-[120%] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/bg-waves.png?height=1080&width=1920')`,
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
        <div className="relative z-20 text-center px-6 w-full max-w-none">

          <AnimatedSection delay={300} duration={1.2}>
            <div className="mb-16">
              {/* Enhanced Title */}
              <AnimatedText effect="shimmer" delay={200} duration={1}>
<img
  src="/JIT-Logo.png"
  alt="College Logo"
  className="
    absolute top-4 left-4
    w-28 sm:w-40 md:w-56 lg:w-64
    h-auto z-50
  "
/>

  <img 
    src="/placeholder.png" 
    alt="Varnave Logo" 
    className="w-[100px] md:w-[1000px] mx-auto mb-8" 
  />
</AnimatedText>
{/* Subtitle */}
{/* Statistics */}
<div className="col-span-full w-full flex justify-center relative -top-[32px] md:-top-[40px]">
  <div className="min-w-[320px] md:min-w-[400px] bg-white/20 backdrop-blur-md px-8 py-3 rounded-full shadow-lg border border-white/30 text-center whitespace-nowrap">
    <span className="text-xl md:text-2xl font-bold tracking-wide text-white drop-shadow-md">
      September 12 & 13
    </span>
  </div>
</div>



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
            className="w-full h-[800px] bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('/about-section.jpg')`,
            }}
          />
        </ParallaxBackground>

        {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 z-10" />

  






        <div className="container mx-auto px-6 relative z-20">
          <AnimatedSection className="text-center mb-20">
            <AnimatedText effect="shimmer" duration={1.2}>
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-8">
                {content.aboutTitle}
              </h2>
            </AnimatedText>

            <AnimatedSection delay={300} direction="scale">
              <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-8 rounded-full" />
            </AnimatedSection>

            <AnimatedText delay={500} duration={1}>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto">
                {content.aboutDescription}
              </p>
            </AnimatedText>
          </AnimatedSection>

          {/* Feature Cards */}
          <StaggeredContainer staggerDelay={0.2} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {content.aboutFeatures.map((item, index) => (
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
                    {/* Icons are hardcoded for now, could be dynamic if needed */}
                    {index === 0 && <Calendar className="w-10 h-10" />}
                    {index === 1 && <Award className="w-10 h-10" />}
                    {index === 2 && <Users className="w-10 h-10" />}
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
              backgroundImage: `url('/about-section.jpg?height=800&width=1600')`,
            }}
          />
        </ParallaxBackground>

        {/* Overlay */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90 z-10" />



        <div className="container mx-auto px-6 relative z-20">
          <AnimatedSection className="text-center mb-20">
            <AnimatedText effect="shimmer" duration={1.2}>
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-8">
                {content.eventsTitle}
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
              backgroundImage: `url('/placeholder.svg?height=800&width=1600')`,
            }}
          />
        </ParallaxBackground>

        {/* Overlay */}
       <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/85 z-10" />

        <div className="container mx-auto px-6 relative z-20">
          <AnimatedSection className="text-center mb-20">
            <AnimatedText effect="shimmer" duration={1.2}>
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-8">
                {content.registerTitle}
              </h2>
            </AnimatedText>

            <AnimatedSection delay={300} direction="scale">
              <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-8 rounded-full" />
            </AnimatedSection>

            <AnimatedText delay={500} duration={1}>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">{content.registerDescription}</p>
            </AnimatedText>
          </AnimatedSection>

          <AnimatedSection delay={300} className="max-w-2xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-4">
                  {content.registerFormTitle}
                </h3>
                <p className="text-white/80 text-lg">{content.registerFormDescription}</p>
              </div>

              <AnimatedSection delay={700}>
                <a href={content.eventRegistrationFormUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-bold py-4 text-lg rounded-2xl relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">{content.registerButtonText}</span>
                  </Button>
                </a>
              </AnimatedSection>

              <AnimatedSection delay={800}>
                <p className="text-center text-white/60 mt-3">{content.registerDisclaimer}</p>
              </AnimatedSection>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-32 relative overflow-hidden">
        {/* Background Image */}
        <ParallaxBackground speed={0.3}>
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat opacity-15"
            style={{
              backgroundImage: `url('/placeholder.svg?height=800&width=1600')`,
            }}
          />
        </ParallaxBackground>

        {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/85 z-10" />

        <div className="container mx-auto px-6 relative z-20">
          <AnimatedSection className="text-center mb-20">
            <AnimatedText effect="shimmer" duration={1.2}>
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-8">
                {content.volunteerTitle}
              </h2>
            </AnimatedText>

            <AnimatedSection delay={300} direction="scale">
              <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-8 rounded-full" />
            </AnimatedSection>

            <AnimatedText delay={500} duration={1}>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">{content.volunteerDescription}</p>
            </AnimatedText>
          </AnimatedSection>

          <AnimatedSection delay={300} className="max-w-2xl mx-auto">
            <motion.div
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 text-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center mb-8">
                <Users className="w-20 h-20 text-orange-400 mx-auto mb-6" /> {/* Generic icon */}
                <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-4">
                  {content.volunteerFormTitle}
                </h3>
                <p className="text-white/80 text-lg">{content.volunteerFormDescription}</p>
              </div>

              <AnimatedSection delay={700}>
                <a href={content.volunteerRegistrationFormUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-bold py-4 text-lg rounded-2xl relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {content.volunteerButtonText} <Sparkles className="w-4 h-4" />
                    </span>
                  </Button>
                </a>
              </AnimatedSection>

              <AnimatedSection delay={800}>
                <p className="text-center text-white/60 mt-3">{content.volunteerDisclaimer}</p>
              </AnimatedSection>
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
                {content.committeeTitle}
              </h2>
            </AnimatedText>

            <AnimatedSection delay={300} direction="scale">
              <div className="w-32 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 mx-auto mb-8 rounded-full" />
            </AnimatedSection>

            <AnimatedText delay={500} duration={1}>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">{content.committeeDescription}</p>
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
          <StaggeredContainer staggerDelay={0.1} className="grid md:grid-cols-3 gap-8">
            <div>
              <AnimatedText effect="shimmer" duration={1.5}>
                <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-4">
                  {content.festivalName}
                </h3>
              </AnimatedText>
              <p className="text-white/70 mb-6 leading-relaxed">{content.footerDescription}</p>
              <div className="flex space-x-4">
                {content.socialMediaLinks.instagram && (
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/10 hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/20 hover:border-orange-400"
                  >
                    <a
                      href={content.socialMediaLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                  </motion.div>
                )}
                {content.socialMediaLinks.facebook && (
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/10 hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/20 hover:border-orange-400"
                  >
                    <a
                      href={content.socialMediaLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                  </motion.div>
                )}
                {content.socialMediaLinks.twitter && (
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-white/10 hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/20 hover:border-orange-400"
                  >
                    <a
                      href={content.socialMediaLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-5 h-5 text-white" />
                    </a>
                  </motion.div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-4">QUICK LINKS</h4>
              <ul className="space-y-3">
                {content.footerQuickLinks.map((link) => (
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
                  <span className="text-white/70">{content.footerEventInfo.date}</span>
                </motion.div>
                <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <MapPin className="w-5 h-5 text-orange-400" />
                  <span className="text-white/70">{content.footerEventInfo.location}</span>
                </motion.div>
                <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                  <Phone className="w-5 h-5 text-orange-400" />
                  <span className="text-white/70">{content.footerEventInfo.phone}</span>
                </motion.div>
              </div>
            </div>
          </StaggeredContainer>

          <AnimatedSection delay={400} className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/60">{content.copyrightText}</p>
          </AnimatedSection>
        </div>
      </footer>

      {/* Event Modal */}
      <EventModal event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  )
}

// Floating Navigation Component (moved outside for clarity, but functionally same)
const FloatingNav = () => {
  const { ref, shouldAnimate } = useScrollAnimation({ delay: 1000, threshold: 0 })

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

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
        {["About", "Events", "Register", "Volunteer", "Contact"].map((item, index) => (
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

// Parallax Background Component (moved outside for clarity, but functionally same)
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
