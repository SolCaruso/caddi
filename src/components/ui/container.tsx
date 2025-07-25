import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "default" | "full"
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        size === "default" && "max-w-8xl 3xl:max-w-[2400px] px-4 xl:px-6",
        size === "full" && "max-w-none px-0",
        className
      )}
    >
      {children}
    </div>
  )
} 