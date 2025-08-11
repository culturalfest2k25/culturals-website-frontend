"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Clock, Users, MapPin, Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RevealImage } from "./reveal-image" // Added import

interface Event {
  id: number
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
  posterImage: string
  rules: string[]
}

interface EventModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!event) return null

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Dance":
        return "bg-gradient-to-r from-pink-500 to-rose-500"
      case "Music":
        return "bg-gradient-to-r from-purple-500 to-violet-500"
      case "Drama":
        return "bg-gradient-to-r from-blue-500 to-indigo-500"
      case "Gaming":
        return "bg-gradient-to-r from-green-500 to-emerald-500"
      default:
        return "bg-gradient-to-r from-orange-500 to-amber-500"
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white border border-gray-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center gap-4">
                  <Badge className={`${getCategoryColor(event.category)} text-white font-bold border-0`}>
                    {event.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900">{event.title}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Left Column - Image and Basic Info */}
                <div className="space-y-6">
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <RevealImage // Replaced img with RevealImage
                      src={event.posterImage || "/placeholder.svg"}
                      alt={`${event.title} poster`}
                      className="w-full h-80 object-cover"
                      delay={0.1} // Small delay after modal starts animating
                      duration={0.8}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                      <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                        {event.prize}
                      </div>
                      <div className="text-sm text-gray-600">Prize Money</div>
                    </div>
                  </div>

                  {/* Event Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <span className="text-sm font-bold text-gray-700">DATE</span>
                      </div>
                      <div className="text-gray-900 font-bold">{event.date}</div>
                    </div>

                    <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-pink-600" />
                        <span className="text-sm font-bold text-gray-700">TIME</span>
                      </div>
                      <div className="text-gray-900 font-bold">{event.time}</div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span className="text-sm font-bold text-gray-700">VENUE</span>
                      </div>
                      <div className="text-gray-900 font-bold">{event.venue}</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Timer className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-bold text-gray-700">DURATION</span>
                      </div>
                      <div className="text-gray-900 font-bold">{event.duration}</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-bold text-gray-700">EXPECTED PARTICIPANTS</span>
                    </div>
                    <div className="text-gray-900 font-bold">{event.participants}</div>
                  </div>
                </div>

                {/* Right Column - Description and Rules */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">About This Event</h3>
                    <p className="text-gray-700 leading-relaxed">{event.fullDescription}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Rules & Guidelines</h3>
                    <ul className="space-y-3">
                      {event.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Registration Button */}
                  <div className="pt-6">
                    <Button
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                      onClick={() => {
                        onClose()
                        document.getElementById("register")?.scrollIntoView({ behavior: "smooth" })
                      }}
                    >
                      REGISTER FOR THIS EVENT
                    </Button>
                    <p className="text-center text-sm text-gray-500 mt-3">
                      Registration closes 24 hours before the event
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
