import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-[#6b7280]",
          actionButton:
            "group-[.toast]:bg-[#0f172a] group-[.toast]:text-[#f8fafc]",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-[#6b7280]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }

