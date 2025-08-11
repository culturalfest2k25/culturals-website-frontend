"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Users, MapPin, Sparkles, Eye } from "lucide-react"
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

interface EventCardProps {
  event: Event
  index: number
  onClick: () => void
}

export function EventCard({ event, index, onClick }: EventCardProps) {
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "Dance":
        return "from-pink-500 to-rose-500"
      case "Music":
        return "from-purple-500 to-violet-500"
      case "Drama":
        return "from-blue-500 to-indigo-500"
      case "Gaming":
        return "from-green-500 to-emerald-500"
      case "Fashion":
        return "from-red-500 to-pink-500"
      case "Visual Arts":
        return "from-cyan-500 to-blue-500"
      default:
        return "from-orange-500 to-amber-500"
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="group cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick()
        }
      }}
      aria-label={`View details for ${event.title}`}
    >
      <div className="relative h-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-orange-400/50 hover:bg-white/15 transition-all duration-500 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl">
        {/* Poster Image */}
        <div className="relative h-64 overflow-hidden">
          <RevealImage // Replaced motion.img with RevealImage
            src={event.posterImage || "/placeholder.svg"}
            alt={`${event.title} poster`}
            className="w-full h-full object-cover"
            delay={0.2} // Small delay after card starts animating
            duration={0.8}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100"
              style={{
                top: `${20 + i * 10}%`,
                left: `${20 + i * 12}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3,
              }}
            />
          ))}

          {/* Category Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
            whileHover={{ scale: 1.1 }}
          >
            <Badge
              className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryGradient(event.category)} text-white font-bold border-0 shadow-lg`}
            >
              {event.category}
            </Badge>
          </motion.div>

          {/* Prize */}
          <motion.div
            className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 shadow-xl border border-white/20"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {event.prize}
            </motion.div>
            <div className="text-xs text-white/70">Prize Money</div>
            <Sparkles className="w-3 h-3 text-orange-400 absolute -top-1 -right-1" />
          </motion.div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <motion.h3
              className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
            >
              {event.title}
            </motion.h3>
            <motion.p
              className="text-white/80 text-sm line-clamp-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
            >
              {event.description}
            </motion.p>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <motion.div className="flex items-center gap-2" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
              <Calendar className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span className="text-white/80 truncate">{event.date}</span>
            </motion.div>
            <motion.div className="flex items-center gap-2" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
              <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span className="text-white/80 truncate">{event.time}</span>
            </motion.div>
            <motion.div className="flex items-center gap-2" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
              <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span className="text-white/80 truncate">{event.venue}</span>
            </motion.div>
            <motion.div className="flex items-center gap-2" whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
              <Users className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span className="text-white/80 truncate">{event.participants}</span>
            </motion.div>
          </div>

          {/* Click Indicator */}
          <motion.div
            className="pt-4 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.9 }}
          >
            <motion.div
              className="text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 text-sm font-medium group-hover:from-orange-300 group-hover:to-yellow-300 transition-all flex items-center justify-center gap-2"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Eye className="w-4 h-4 text-orange-400" />
              <span>View Details</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
      </div>
    </motion.div>
  )
}
