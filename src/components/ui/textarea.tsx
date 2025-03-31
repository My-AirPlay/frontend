'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import FormError from "./form-error"
import { inputVariants } from "./input"


const labelVariants: Record<string, string> = {
    '': 'text-primary',
    default: 'text-primary',
    transparent: 'text-white',
    light: 'bg-[#EAE6FF]',
    white: 'bg-white',
    unstyled: '',
    showcase: '',
}

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
    label?: string
    hasError?: boolean
    errorMessage?: string
    errorMessageClass?: string
    containerClassName?: string
    autoResize?: boolean
    optional?: boolean
    minRows?: number
    maxRows?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({
        className,
        variant,
        inputSize,
        containerClassName,
        hasError,
        errorMessageClass,
        label,
        autoResize = true,
        optional,
        minRows = 2,
        maxRows = 10,
        ...props
    }, ref) => {
        const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

        const resizeTextArea = React.useCallback(() => {
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto'
                const scrollHeight = textareaRef.current.scrollHeight
                const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight)
                const lines = Math.round(scrollHeight / lineHeight)
                const clampedLines = Math.max(minRows, Math.min(lines, maxRows))
                textareaRef.current.style.height = `${clampedLines * lineHeight}px`
            }
        }, [minRows, maxRows])

        React.useEffect(() => {
            if (autoResize) {
                resizeTextArea()
                window.addEventListener('resize', resizeTextArea)
                return () => window.removeEventListener('resize', resizeTextArea)
            }
        }, [autoResize, resizeTextArea, props.value, props.defaultValue])

        const handleInput = React.useCallback((e: React.FormEvent<HTMLTextAreaElement>) => {
            if (autoResize) {
                resizeTextArea()
            }
            props.onInput?.(e)
        }, [autoResize, resizeTextArea, props.onInput])

        return (
            <div className={containerClassName}>
                {label && (
                    <label
                        className={cn("text-sm font-medium mb-2.5", labelVariants[variant || 'default'])}
                        htmlFor={props.id || label}
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    <textarea
                        className={cn(
                            inputVariants({ variant, inputSize, className }),
                            autoResize && "overflow-hidden"
                        )}
                        ref={(node) => {
                            if (typeof ref === 'function') {
                                ref(node)
                            } else if (ref) {
                                ref.current = node
                            }
                            textareaRef.current = node
                        }}
                        {...props}
                        onInput={handleInput}
                    />

                </div>
                {hasError && <FormError className={errorMessageClass} errorMessage={props.errorMessage} />}
            </div>
        )
    }
)

Textarea.displayName = "Textarea"

export { Textarea }