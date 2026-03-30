"use client"

import * as React from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface ThemeImageProps extends Omit<ImageProps, "src"> {
  lightSrc: string
  darkSrc: string
}

/**
 * A theme-aware Image component that switches source based on the current theme.
 * Uses CSS classes to avoid hydration mismatch and show the correct image instantly.
 */
export function ThemeImage({ lightSrc, darkSrc, alt, className, ...props }: ThemeImageProps) {
  return (
    <>
      <Image
        {...props}
        src={lightSrc}
        alt={alt}
        className={cn(className, "dark:hidden")}
      />
      <Image
        {...props}
        src={darkSrc}
        alt={alt}
        className={cn(className, "hidden dark:block")}
      />
    </>
  )
}
