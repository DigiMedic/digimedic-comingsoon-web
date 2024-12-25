import { cn } from "@/lib/utils"
import DotPattern from "@/components/magicui/dot-pattern"

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden bg-white")}>
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "absolute inset-0",
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        )}
      />

      <div className="relative z-10">{children}</div>
    </div>
  )
}
