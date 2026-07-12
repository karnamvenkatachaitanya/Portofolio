import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-bg-primary hover:bg-accent/90 dark:bg-accent-pop dark:text-bg-dark",
        outline:
          "border border-border bg-transparent hover:bg-bg-secondary dark:border-border-dark",
        ghost: "hover:bg-bg-secondary",
        accent:
          "bg-accent-pop text-bg-dark hover:bg-accent-pop/90 font-semibold",
      },
      size: {
        default: "h-10 px-5 py-2 2xl:h-12 2xl:px-6 2xl:text-base 3xl:h-13 3xl:px-7 3xl:text-lg",
        sm: "h-8 px-3 text-xs 2xl:h-10 2xl:px-4 2xl:text-sm 3xl:h-11 3xl:px-5 3xl:text-base",
        lg: "h-12 px-8 text-base 2xl:h-14 2xl:px-10 2xl:text-lg 3xl:h-16 3xl:px-12 3xl:text-xl",
        icon: "h-10 w-10 2xl:h-12 2xl:w-12 3xl:h-14 3xl:w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
