import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        authBtn:
          "bg-custom-primary text-white h-auth-btn max-w-[275px] flex justify-center items-center gap-4 font-plus-jakarta-sans  font-extrabold text-white text-lg  rounded-full w-full",
        prodBtn:
          "bg-custom-primary h-9 w-full max-w-[145px] text-center grid place-items-center py-[10px] px-[23px] font-plus-jakarta-sans font-bold text-[13px] text-white rounded-full",
        profileBtn:
          "bg-custom-primary h-auth-btn rounded-full w-full max-w-[275px] grid place-items-center text-white font-rubik font-semibold text-lg",
        smBtn:
          "text-white flex max-w-fit px-4 py-2  items-center gap-2 rounded-lg bg-custom-primary",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading &&
            "relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/20 cursor-wait"
        )}
        ref={ref}
        disabled={props.disabled || isLoading}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
