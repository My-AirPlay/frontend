'use client';

import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { SmallSpinner } from '../icons';

// Variants for the Alert Dialog
const alertDialogWithVariantsVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
  {
    variants: {
      variant: {
        default: "border-t-8 border-t-primary",
        success: "border-t-8 border-t-green-500",
        error: "border-t-8 border-t-red-500",
        warning: "border-t-8 border-t-yellow-500",
        info: "border-t-8 border-t-blue-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Primary button variants matching the dialog types
const alertDialogWithVariantsActionVariants = cva(buttonVariants(), {
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground hover:bg-primary/90',
			success: 'bg-green-500 text-white hover:bg-green-600',
			error: 'bg-red-500 text-white hover:bg-red-600',
			warning: 'bg-yellow-500 text-white hover:bg-yellow-600',
			info: 'bg-blue-500 text-white hover:bg-blue-600'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

// Title variants
const alertDialogWithVariantsTitleVariants = cva('text-xl font-semibold', {
	variants: {
		variant: {
			default: 'text-foreground',
			success: 'text-green-500',
			error: 'text-red-500',
			warning: 'text-yellow-500',
			info: 'text-blue-500'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

// Re-export base components
const AlertDialogWithVariantsTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogWithVariantsPortal = AlertDialogPrimitive.Portal;
const AlertDialogWithVariantsOverlay = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>>(({ className, ...props }, ref) => <AlertDialogPrimitive.Overlay className={cn('fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', className)} {...props} ref={ref} />);
AlertDialogWithVariantsOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

// Main enhanced component with variants
interface AlertDialogWithVariantsContentProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>, VariantProps<typeof alertDialogWithVariantsVariants> {}

const AlertDialogWithVariantsContent = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Content>, AlertDialogWithVariantsContentProps>(({ className, variant, ...props }, ref) => (
	<AlertDialogWithVariantsPortal>
		<AlertDialogWithVariantsOverlay />
		<AlertDialogPrimitive.Content ref={ref} className={cn(alertDialogWithVariantsVariants({ variant }), className)} {...props} />
	</AlertDialogWithVariantsPortal>
));
AlertDialogWithVariantsContent.displayName = AlertDialogPrimitive.Content.displayName;

// Header component
const AlertDialogWithVariantsHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />;
AlertDialogWithVariantsHeader.displayName = 'AlertDialogWithVariantsHeader';

// Footer component
const AlertDialogWithVariantsFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />;
AlertDialogWithVariantsFooter.displayName = 'AlertDialogWithVariantsFooter';

// Title with variants
interface AlertDialogWithVariantsTitleProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>, VariantProps<typeof alertDialogWithVariantsTitleVariants> {}

const AlertDialogWithVariantsTitle = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Title>, AlertDialogWithVariantsTitleProps>(({ className, variant, ...props }, ref) => <AlertDialogPrimitive.Title ref={ref} className={cn(alertDialogWithVariantsTitleVariants({ variant }), className)} {...props} />);
AlertDialogWithVariantsTitle.displayName = AlertDialogPrimitive.Title.displayName;

// Description component
const AlertDialogWithVariantsDescription = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Description>, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>>(({ className, ...props }, ref) => <AlertDialogPrimitive.Description ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />);
AlertDialogWithVariantsDescription.displayName = AlertDialogPrimitive.Description.displayName;

// Action button with variants
interface AlertDialogWithVariantsActionProps extends React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>, VariantProps<typeof alertDialogWithVariantsActionVariants> {}

const AlertDialogWithVariantsAction = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Action>, AlertDialogWithVariantsActionProps>(({ className, variant, ...props }, ref) => <AlertDialogPrimitive.Action ref={ref} className={cn(alertDialogWithVariantsActionVariants({ variant }), className)} {...props} />);
AlertDialogWithVariantsAction.displayName = AlertDialogPrimitive.Action.displayName;

// Cancel button
const AlertDialogWithVariantsCancel = React.forwardRef<React.ElementRef<typeof AlertDialogPrimitive.Cancel>, React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>>(({ className, ...props }, ref) => <AlertDialogPrimitive.Cancel ref={ref} className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)} {...props} />);
AlertDialogWithVariantsCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

// Create reusable component with all props
interface CustomAlertDialogProps extends VariantProps<typeof alertDialogWithVariantsVariants> {

  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description: string
  customContent?: React.ReactNode
  actionLabel?: string
  cancelLabel?: string
  onAction?: () => void
  onCancel?: () => void
  showCancel?: boolean
  showAction?: boolean
  isPerformingAction?:boolean
}

const CustomAlertDialog = ({
  variant = "default",
  open,
  onOpenChange,
  customContent,
  title,
  description,
  actionLabel = "Confirm",
  cancelLabel = "Cancel",
  onAction,
  onCancel,
  showCancel = true,
  showAction = true,
  isPerformingAction = false,
}: CustomAlertDialogProps) => {
  return (
    <AlertDialogWithVariants open={open} onOpenChange={onOpenChange} >
      <AlertDialogWithVariantsContent variant={variant} >
        <AlertDialogWithVariantsHeader>
          <AlertDialogWithVariantsTitle variant={variant}>{title}</AlertDialogWithVariantsTitle>
          <AlertDialogWithVariantsDescription>{description}</AlertDialogWithVariantsDescription>
          {customContent}
        </AlertDialogWithVariantsHeader>
        <AlertDialogWithVariantsFooter>
          {showCancel && (
            <AlertDialogWithVariantsCancel disabled={isPerformingAction} onClick={onCancel}>{cancelLabel}</AlertDialogWithVariantsCancel>
          )}
          {showAction && (
            <AlertDialogWithVariantsAction disabled={isPerformingAction} variant={variant} onClick={onAction}>
              {actionLabel}
              {
                isPerformingAction && <SmallSpinner className="ml-2" />
              }
            </AlertDialogWithVariantsAction>
          )}
        </AlertDialogWithVariantsFooter>
      </AlertDialogWithVariantsContent>
    </AlertDialogWithVariants>
  )
}


const AlertDialogWithVariants = AlertDialogPrimitive.Root

export {
  AlertDialogWithVariants,
  AlertDialogWithVariantsTrigger,
  AlertDialogWithVariantsContent,
  AlertDialogWithVariantsHeader,
  AlertDialogWithVariantsFooter,
  AlertDialogWithVariantsTitle,
  AlertDialogWithVariantsDescription,
  AlertDialogWithVariantsAction,
  AlertDialogWithVariantsCancel,
  CustomAlertDialog,
}
