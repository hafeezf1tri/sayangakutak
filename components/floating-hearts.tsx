"use client"

import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

type FloatingHeartsProps = {
  count?: number
}

type HeartConfig = {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  opacity: number
}

// A soft, decorative layer of hearts drifting upward in the background.
// Generated client-side only to avoid server/client hydration mismatches.
export function FloatingHearts({ count = 14 }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<HeartConfig[]>([])

  useEffect(() => {
    setHearts(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.round(Math.random() * 26),
        duration: 9 + Math.random() * 10,
        delay: Math.random() * 10,
        opacity: 0.25 + Math.random() * 0.4,
      })),
    )
  }, [count])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="animate-float-up absolute bottom-0 text-primary"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  )
}
