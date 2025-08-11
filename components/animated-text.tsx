"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import type { ReactNode } from "react"

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  effect?: "fade" | "slide" | "scale" | "shimmer"
  once?: boolean
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  effect = "slide",
  once = true,
}: AnimatedTextProps) {
  const { ref, shouldAnimate } = useScrollAnimation({
    delay,
    triggerOnce: once,
    threshold: 0.2,
  })

  const getAnimation = () => {
    switch (effect) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: shouldAnimate ? { opacity: 1 } : { opacity: 0 },
        }
      case "slide":
        return {
          initial: { y: 30, opacity: 0 },
          animate: shouldAnimate ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 },
        }
      case "scale":
        return {
          initial: { scale: 0.9, opacity: 0 },
          animate: shouldAnimate ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 },
        }
      case "shimmer":
        return {
          initial: {
            opacity: 0,
            backgroundPosition: "-200% center",
          },
          animate: shouldAnimate
            ? {
                opacity: 1,
                backgroundPosition: "200% center",
              }
            : {
                opacity: 0,
                backgroundPosition: "-200% center",
              },
        }
      default:
        return {
          initial: { y: 30, opacity: 0 },
          animate: shouldAnimate ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 },
        }
    }
  }

  const animation = getAnimation()

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={animation.initial}
      animate={animation.animate}
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
        type: effect === "shimmer" ? "tween" : "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      {children}
    </motion.div>
  )
}
