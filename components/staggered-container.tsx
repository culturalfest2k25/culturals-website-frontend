"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"
import { type ReactNode, Children, isValidElement } from "react"

interface StaggeredContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  threshold?: number
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade"
}

export function StaggeredContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  threshold = 0.1,
  direction = "up",
}: StaggeredContainerProps) {
  const { ref, shouldAnimate } = useScrollAnimation({
    threshold,
    triggerOnce: true,
  })

  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { y: 40, opacity: 0 }
      case "down":
        return { y: -40, opacity: 0 }
      case "left":
        return { x: -40, opacity: 0 }
      case "right":
        return { x: 40, opacity: 0 }
      case "scale":
        return { scale: 0.9, opacity: 0 }
      case "fade":
        return { opacity: 0 }
      default:
        return { y: 40, opacity: 0 }
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
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return (
            <motion.div
              key={index}
              initial={getInitialState()}
              animate={shouldAnimate ? getAnimateState() : getInitialState()}
              transition={{
                duration: 0.6,
                delay: shouldAnimate ? index * staggerDelay : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            >
              {child}
            </motion.div>
          )
        }
        return child
      })}
    </div>
  )
}
