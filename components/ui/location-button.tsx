"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { MapPinIcon } from "lucide-react"

interface LocationButtonProps {
  location: string
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  children?: React.ReactNode
}

export function LocationButton({
  location,
  className,
  variant = "outline",
  size = "default",
  children,
}: LocationButtonProps) {
  const handleClick = () => {
    // Encode the location for the URL
    const encodedLocation = encodeURIComponent(location)
    // Open Google Maps in a new tab
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, '_blank')
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      <MapPinIcon className="h-4 w-4" />
      {children || "Ver en Google Maps"}
    </Button>
  )
} 