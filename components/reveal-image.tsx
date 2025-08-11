"use client"

import { motion } from "framer-motion"

interface RevealImageProps {
  src: string
  alt: string
  className?: string
  delay?: number
  duration?: number
}

export function RevealImage({ src, alt, className, delay = 0, duration = 0.8 }: RevealImageProps) {
  const variants = {
    initial: {
      // Start from a small, slightly off-center rectangle with rounded corners
      clipPath: "inset(40% 45% 40% 45% round 10%)",
      opacity: 0,
      scale: 0.9,
    },
    animate: {
      // Fully revealed, no roundness
      clipPath: "inset(0% 0% 0% 0% round 0%)",
      opacity: 1,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom ease for a smooth effect
      },
    },
    exit: {
      // Collapse back to a different small, slightly off-center rectangle with rounded corners
      clipPath: "inset(45% 40% 45% 40% round 10%)",
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: duration * 0.6, // Faster exit
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    />
  )
}
