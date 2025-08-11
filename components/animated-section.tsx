"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade"
  stagger?: number
  threshold?: number
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  stagger = 0,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const { ref, shouldAnimate } = useScrollAnimation({
    threshold,
    delay,
    triggerOnce: true,
  })

  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { y: 60, opacity: 0 }
      case "down":
        return { y: -60, opacity: 0 }
      case "left":
        return { x: -60, opacity: 0 }
      case "right":
        return { x: 60, opacity: 0 }
      case "scale":
        return { scale: 0.8, opacity: 0 }
      case "fade":
        return { opacity: 0 }
      default:
        return { y: 60, opacity: 0 }
    }
  }

  const getAnimateState = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 }
      case "left":
      case "right":
        return { x: 0, opacity: 1 }
      case "scale":
        return { scale: 1, opacity: 1 }
      case "fade":
        return { opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialState()}
      animate={shouldAnimate ? getAnimateState() : getInitialState()}
      transition={{
        duration,
        delay: stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  )
}
