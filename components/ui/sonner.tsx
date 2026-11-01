"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckIcon, CircleXIcon, InfoIcon, Loader2Icon, TriangleAlertIcon } from "lucide-react"

// Beacon toast: white card, round tinted icon (green success, coral info, red error), bold title + one muted line
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <span className="flex items-center justify-center size-9 bg-success-bg text-success rounded-full">
            <CheckIcon className="size-4" strokeWidth={2.5} />
          </span>
        ),
        info: (
          <span className="flex items-center justify-center size-9 bg-soft text-primary rounded-full">
            <InfoIcon className="size-4" />
          </span>
        ),
        warning: (
          <span className="flex items-center justify-center size-9 bg-soft text-primary rounded-full">
            <TriangleAlertIcon className="size-4" />
          </span>
        ),
        error: (
          <span className="flex items-center justify-center size-9 bg-danger-bg text-danger rounded-full">
            <CircleXIcon className="size-4" />
          </span>
        ),
        loading: (
          <span className="flex items-center justify-center size-9 bg-muted text-muted-foreground rounded-full">
            <Loader2Icon className="size-4 animate-spin" />
          </span>
        ),
      }}
      // sonner's own CSS reads these variables for the card
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "1.25rem",
        } as React.CSSProperties
      }
      // "!" makes these win over sonner's built-in styles
      toastOptions={{
        classNames: {
          toast: "cn-toast items-center! gap-3! p-4! shadow-toast!",
          icon: "size-9! m-0!",
          title: "text-sm! font-bold!",
          description: "text-muted-foreground! text-sm!",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
