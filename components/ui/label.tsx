import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { HTMLAttributes, forwardRef } from "react"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

interface LabelProps
  extends HTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn(labelVariants({ className }))} {...props} />
  )
)

Label.displayName = "Label"

export { Label }
