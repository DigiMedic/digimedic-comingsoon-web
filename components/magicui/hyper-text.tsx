"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface HyperTextProps {
  text: string
  className?: string
}

export default function HyperText({ text, className }: HyperTextProps) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const elementRef = useRef<HTMLSpanElement>(null)

  const animate = () => {
    let iteration = 0

    clearInterval(intervalRef.current!)

    intervalRef.current = setInterval(() => {
      if (elementRef.current) {
        elementRef.current.innerText = text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]
            }

            return letters[Math.floor(Math.random() * 26)]
          })
          .join("")

        if (iteration >= text.length) {
          clearInterval(intervalRef.current!)
        }

        iteration += 1 / 3
      }
    }, 30)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <span
      ref={elementRef}
      onMouseEnter={() => animate()}
      className={cn("cursor-default", className)}
    >
      {text}
    </span>
  )
}
