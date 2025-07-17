"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

export function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme()

  return <Sonner theme={theme as ToasterProps["theme"]} position="top-right"  toastOptions={{
    style: {
      marginTop: "2rem", // ⬅️ Add spacing from the top
    },
  }} {...props} />
}
