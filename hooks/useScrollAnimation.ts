"use client"

import { useRef, useEffect, useState } from "react"
import { useInView } from "framer-motion"

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "-50px", triggerOnce = true, delay = 0 } = options

  const ref = useRef(null)
  const [hasTriggered, setHasTriggered] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  const isInView = useInView(ref, {
    threshold,
    margin: rootMargin,
    once: triggerOnce,
  })

  useEffect(() => {
    if (isInView && !hasTriggered) {
      const timer = setTimeout(() => {
        setShouldAnimate(true)
        setHasTriggered(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isInView, hasTriggered, delay])

  const reset = () => {
    setHasTriggered(false)
    setShouldAnimate(false)
  }

  return {
    ref,
    isInView,
    shouldAnimate,
    hasTriggered,
    reset,
  }
}
