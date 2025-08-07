'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar, MapPin, Phone, Mail, Users, Star, Trophy, Music, Code, Palette, Moon, Sun, Menu, X, ChevronLeft, ChevronRight, Clock } from 'lucide-react'

export default function CulturalFestivalWebsite() {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Countdown timer
  useEffect(() => {
    const festivalDate = new Date('2025-03-15T00:00:00').getTime()
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = festivalDate - now
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Carousel auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % highlights.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const highlights = [
    {
      title: "100+ Events Across All Domains",
      description: "From technical workshops to cultural performances",
      image: "/placeholder-nqp58.png"
    },
    {
      title: "Star-Studded Pro-Nites",
      description: "International artists and celebrity performances",
      image: "/concert-stage-lights.png"
    },
    {
      title: "Innovation & Technology Hub",
      description: "AI, VR, Robotics, and cutting-edge tech demos",
      image: "/technology-innovation-showcase.png"
    }
  ]

  const events = [
    {
      category: "Technical",
      title: "AI & Machine Learning Workshop",
      description: "Hands-on workshop on latest AI technologies and applications",
      date: "March 15, 2025",
      time: "10:00 AM - 4:00 PM",
      icon: <Code className="w-6 h-6" />
    },
    {
      category: "Technical",
      title: "VR Experience Zone",
      description: "Immersive virtual reality experiences and development",
      date: "March 16, 2025",
      time: "9:00 AM - 6:00 PM",
      icon: <Code className="w-6 h-6" />
    },
    {
      category: "Cultural",
      title: "Classical Dance Competition",
      description: "Showcase of traditional and contemporary dance forms",
      date: "March 17, 2025",
      time: "6:00 PM - 9:00 PM",
      icon: <Music className="w-6 h-6" />
    },
    {
      category: "Cultural",
      title: "Literary Fest - Multilingual",
      description: "Poetry, storytelling, and literary competitions in multiple languages",
      date: "March 18, 2025",
      time: "2:00 PM - 5:00 PM",
      icon: <Palette className="w-6 h-6" />
    },
    {
      category: "Sports",
      title: "Esports Championship",
      description: "Gaming tournaments across multiple popular titles",
      date: "March 19, 2025",
      time: "10:00 AM - 8:00 PM",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      category: "Cultural",
      title: "Fashion Show Extravaganza",
      description: "Student designers showcase their creative collections",
      date: "March 20, 2025",
      time: "7:00 PM - 10:00 PM",
      icon: <Palette className="w-6 h-6" />
    }
  ]

  const sponsors = [
    { name: "TechCorp", tier: "Title Sponsor", logo: "/abstract-tech-logo.png" },
    { name: "InnovateX", tier: "Associate Sponsor", logo: "/innovation-company-logo.png" },
    { name: "CreativeHub", tier: "Associate Sponsor", logo: "/creative-agency-logo.png" },
    { name: "FutureGen", tier: "Supporting Sponsor", logo: "/future-tech-logo.png" }
  ]

  const news = [
    {
      title: "Registration Extended Until March 10th",
      date: "February 28, 2025",
      content: "Due to overwhelming response, we've extended the registration deadline."
    },
    {
      title: "New Workshop Added: Blockchain Development",
      date: "February 25, 2025",
      content: "Popular demand has led us to add an additional blockchain workshop."
    },
    {
      title: "Celebrity Guest Announcement",
      date: "February 20, 2025",
      content: "We're thrilled to announce Anirudh Ravichander as our headline performer!"
    }
  ]

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Culturama '25
                </h1>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#home" className="hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
                  <a href="#about" className="hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
                  <a href="#events" className="hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Events</a>
                  <a href="#registration" className="hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Registration</a>
                  <a href="#sponsors" className="hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Sponsors</a>
                  <a href="#contact" className="hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors">Contact</a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
                
                {/* Mobile menu button */}
                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2"
                  >
                    {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                <a href="#home" className="block hover:text-purple-600 px-3 py-2 text-base font-medium">Home</a>
                <a href="#about" className="block hover:text-purple-600 px-3 py-2 text-base font-medium">About</a>
                <a href="#events" className="block hover:text-purple-600 px-3 py-2 text-base font-medium">Events</a>
                <a href="#registration" className="block hover:text-purple-600 px-3 py-2 text-base font-medium">Registration</a>
                <a href="#sponsors" className="block hover:text-purple-600 px-3 py-2 text-base font-medium">Sponsors</a>
                <a href="#contact" className="block hover:text-purple-600 px-3 py-2 text-base font-medium">Contact</a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('/college-festival-stage.png')] bg-cover bg-center"></div>
          
          <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              Welcome to <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">Culturama '25</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-200">
              Where Technology, Culture, & Performance Unite
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5" />
                <span>March 15-20, 2025</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5" />
                <span>Tech University Campus</span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl font-bold">{timeLeft.days}</div>
                <div className="text-sm">Days</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm">Hours</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm">Minutes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4">
                <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm">Seconds</div>
              </div>
            </div>

            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg">
              Register Now
            </Button>
          </div>
        </section>

        {/* Highlights Carousel */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {highlights.map((highlight, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                      <img 
                        src={highlight.image || "/placeholder.svg"} 
                        alt={highlight.title}
                        className="w-full h-96 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-3xl font-bold mb-4">{highlight.title}</h3>
                          <p className="text-xl">{highlight.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + highlights.length) % highlights.length)}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % highlights.length)}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              <div className="flex justify-center mt-4 space-x-2">
                {highlights.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">About Culturama '25</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Culturama '25 is where innovation meets tradition, bringing together the brightest minds 
                and most talented performers for an unforgettable celebration of culture and technology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img 
                  src="/college-festival-cultural-performance.png" 
                  alt="Festival Performance"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">100+ Events</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      From technical workshops to cultural performances, we offer something for everyone.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-lg">
                    <Star className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">World-Class Acts</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      International artists and celebrity performers grace our stages.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                    <Trophy className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Student Empowerment</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Networking opportunities and skill development for the next generation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Festival Events</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Discover our diverse range of technical workshops, cultural performances, and competitions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {event.category}
                      </Badge>
                      {event.icon}
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">
                      {event.description}
                    </CardDescription>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Register
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Section */}
        <section id="registration" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Register Now</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Join thousands of students for an unforgettable experience
              </p>
            </div>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Festival Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input id="institution" placeholder="Your college/university" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Your contact number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Select Events (Multiple Selection Allowed)</Label>
                  <div className="grid md:grid-cols-2 gap-4 mt-2">
                    {events.map((event, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox id={`event-${index}`} />
                        <Label htmlFor={`event-${index}`} className="text-sm">
                          {event.title}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Message (Optional)</Label>
                  <Textarea id="message" placeholder="Any special requirements or questions?" />
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3">
                  Complete Registration
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* News Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Latest Announcements</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Stay updated with the latest news and updates
              </p>
            </div>

            <div className="space-y-6">
              {news.map((item, index) => (
                <Card key={index} className="border-l-4 border-l-purple-600 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <Badge variant="outline">{item.date}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section id="sponsors" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Sponsors</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Proudly supported by industry leaders
              </p>
            </div>

            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-2xl font-semibold mb-8 text-purple-600">Title Sponsor</h3>
                <div className="flex justify-center">
                  <img 
                    src={sponsors[0].logo || "/placeholder.svg"} 
                    alt={sponsors[0].name}
                    className="h-20 object-contain"
                  />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold mb-8 text-pink-600">Associate Sponsors</h3>
                <div className="flex justify-center items-center space-x-12">
                  {sponsors.slice(1, 3).map((sponsor, index) => (
                    <img 
                      key={index}
                      src={sponsor.logo || "/placeholder.svg"} 
                      alt={sponsor.name}
                      className="h-16 object-contain"
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-semibold mb-8 text-indigo-600">Supporting Sponsors</h3>
                <div className="flex justify-center">
                  <img 
                    src={sponsors[3].logo || "/placeholder.svg"} 
                    alt={sponsors[3].name}
                    className="h-12 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Contact & Venue</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Get in touch with us for any queries
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-purple-600" />
                      Phone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">+91 98765 43210</p>
                    <p className="text-lg">+91 87654 32109</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-purple-600" />
                      Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">info@culturama25.edu</p>
                    <p className="text-lg">events@culturama25.edu</p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-purple-600" />
                      Venue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg">Tech University Campus</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Innovation Drive, Tech City, TC 12345
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1234567890123!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjEuNCJX!5e0!3m2!1sen!2sus!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Festival Venue Location"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Culturama '25
              </h3>
              <p className="text-xl mb-6 text-gray-300">
                Where Technology, Culture, & Performance Unite
              </p>
              
              <div className="flex justify-center space-x-6 mb-8">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447c0-1.297.49-2.448 1.297-3.323.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323c0 1.297-.49 2.448-1.297 3.323-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
              
              <div className="border-t border-gray-800 pt-8">
                <p className="text-gray-400">
                  © 2025 Culturama Festival. All rights reserved. | Organized by Tech University
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
