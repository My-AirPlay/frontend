import { cn } from "@/lib/utils";

interface FormErrorProps {
  errormessage?: string;
  className?: string;
}

export default function FormError({ errormessage, className }: FormErrorProps) {
  return (
    <p
      className={cn(
        'mt-1.5 rounded-md bg-red-100 px-5 py-1.5 text-xs text-red-600 animate-in fade-in-40',
        className
      )}
    >
      {errormessage || 'This is required'}
    </p>
  );
}
