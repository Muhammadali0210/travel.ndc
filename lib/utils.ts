import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to handle external image URLs
export function getImageUrl(imageUrl: string | null | undefined, fallback: string = "/placeholder.svg"): string {
  if (!imageUrl) return fallback
  
  // If it's already a full URL, return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl
  }
  
  // If it's a local path (starts with /), return as is
  if (imageUrl.startsWith('/')) {
    return imageUrl
  }
  
  // If it's just a filename, prepend the external domain
  return `https://project1.ndc-agency.uz/upload/images/${imageUrl}`
}

// Utility function to get image from IImage object (for API data)
export function getImageFromApi(images: { lg: string | null; md: string | null; sm: string | null } | null | undefined, fallback: string | null = "/placeholder.svg"): string | null {
  if (!images) return fallback
  
  if (images.lg) return getImageUrl(images.lg, fallback || "/placeholder.svg")
  if (images.md) return getImageUrl(images.md, fallback || "/placeholder.svg")
  if (images.sm) return getImageUrl(images.sm, fallback || "/placeholder.svg")
  
  return fallback
}
