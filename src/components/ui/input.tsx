"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import FormError from "./form-error"
import { cva, type VariantProps } from "class-variance-authority"
import { Lock, TickCircle } from "iconsax-react"

import { Card, CardContent, CardHeader } from "."
import { EyeClosedIcon, EyeIcon } from "../icons"

interface validator {
    text: string
    validator: (password: string) => boolean
}

export const inputVariants = cva(
    "!appearance-none flex items-center h-[2.875rem] 2xl:h-[3.25rem] rounded-lg text-sm w-full px-3.5 py-1.5 border-2 border-transparent outline-none focus:outline-none",
    {
        variants: {
            variant: {
                default: cn(
                    "bg-[#383838] text-foreground rounded-md border border-border px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-white/50 transition-all",
                    "text-foreground/80 file:bg-transparent file:text-sm ",
                ),
                transparent:
                    "bg-white/20 text-white backdrop-blur-sm focus:border-white focus-within:border-white placeholder:text-white/60 transparent-form",
                light: "bg-[#EAE6FF] text-primary hover:border-primary",
                white: "bg-white text-primary hover:bg-primary-darker hover:text-white",
                 unstyled: "",
            },
            inputSize: {
                default: "",
                short: "",
                icon: "h-9 w-9",
                unstyled: "",
                lg: "h-12 rounded-md px-8",
                authInput: "h-[3rem] rounded-lg px-8 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            inputSize: "default",
        },
    },
)


export const labelVariants: Record<string, string> = {
    "": "text-foreground text-sm",
    default: "text-foreground ",
    transparent: "text-white",
    light: "bg-[#EAE6FF]",
    white: "bg-white",
    unstyled: "",
}
const iconVariants: Record<string, string> = {
    "": "",
    default: " ",
    transparent: "",
    light: "",
    white: "",
    unstyled: "",
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    label?: string | React.ReactNode
    labelClass?: string
    hasError?: boolean
    errormessage?: string
    errormessageClass?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    containerClassName?: string
    iconClassName?: string
    optional?: boolean
    hidelabel?: boolean
    showValidator?: boolean
    validationRequirements?: validator[]
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            variant,
            inputSize,
            containerClassName,
            type,
            hasError,
            leftIcon,
            rightIcon,
            errormessageClass,
            label,
            labelClass,
            inputMode,
            hidelabel,
            showValidator = false,
            validationRequirements,
            ...props
        },
        ref,
    ) => {
        const [show, setShow] = React.useState(false)

        const inputType = React.useMemo(() => {
            if (show) {
                return type === "password" ? "text" : type
            } else {
                return type === "password" ? "password" : type
            }
        }, [show, type])

        return (
            <div className={containerClassName}>
                {label && (
                    <label
                        className={cn("text-sm font-medium mb-2.5", labelVariants[variant || "default"], hidelabel && "sr-only", labelClass)}
                        htmlFor={typeof props.id === "string" ? props.id : ""}
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <span
                            className={cn(
                                "absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer z-[3]",
                                iconVariants[variant || "default"],
                            )}
                        >
                            {leftIcon}
                        </span>
                    )}
                    <input
                        type={type == "password" ? inputType : type}
                        className={cn(
                            inputVariants({ variant, inputSize, className }),
                            type == "password" && "pr-12",
                            !!leftIcon && "pl-12",
                            !!rightIcon && "pr-12",
                        )}
                        ref={ref}
                        inputMode={inputMode}
                        {...props}
                    />
                    {rightIcon && <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer z-[3]">{rightIcon}</span>}
                    

                    {type === "password" && (
                        <button
                            className={cn(
                                iconVariants[variant || "default"],
                                "absolute right-[3%] top-1/2 -translate-y-1/2 text-white cursor-pointer z-[3]",
                            )}
                            onClick={(e) => {
                                e.preventDefault()
                                setShow((prev) => !prev)
                            }}
                            type="button"
                        >
                            {!show ? <EyeClosedIcon className="text-primary" height={20} width={20} /> : <EyeIcon className="text-primary" height={20} width={20} />}
                        </button>
                    )}
                </div>
                {showValidator && !!validationRequirements && !!props.value && (
                    <PasswordValidatorUI password={props.value as string} requirements={validationRequirements} />
                )}
                {hasError && <FormError className={errormessageClass} errormessage={props.errormessage} />}
            </div>
        )
    },
)
Input.displayName = "Input"



type AmountInputProps = Omit<InputProps, "value" | "onChange"> & {
    value?: string | number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (...event: any[]) => void
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
}

const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
    ({ value, onChange, onBlur, name, ...props }, ref) => {
        const [displayValue, setDisplayValue] = React.useState(() => formatNumber(value ? Number(value) : 0))

        const handleChange = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const rawValue = e.target.value.replace(/[^0-9]/g, "")
                const numericValue = Number(rawValue)

                if (!isNaN(numericValue)) {
                    const formattedValue = formatNumber(numericValue)
                    setDisplayValue(formattedValue)
                    if (onChange) {
                        onChange({
                            target: {
                                name: name || "",
                                value: numericValue,
                            },
                        } as unknown as React.ChangeEvent<HTMLInputElement>)
                    }
                } else {
                    setDisplayValue("")
                    if (onChange) {
                        onChange({
                            target: {
                                name: name || "",
                                value: "",
                            },
                        } as unknown as React.ChangeEvent<HTMLInputElement>)
                    }
                }
            },
            [onChange, name],
        )

        const handleBlur = React.useCallback(
            (e: React.FocusEvent<HTMLInputElement>) => {
                const numericValue = Number(e.target.value.replace(/[^0-9]/g, ""))
                if (!isNaN(numericValue)) {
                    const formattedValue = formatNumber(numericValue)
                    setDisplayValue(formattedValue)
                    if (onBlur) {
                        // Create a new event with the numeric value
                        const syntheticEvent = {
                            ...e,
                            target: {
                                ...e.target,
                                value: numericValue.toString(),
                            },
                        }
                        onBlur(syntheticEvent)
                    }
                }
            },
            [onBlur],
        )

        React.useEffect(() => {
            if (value !== undefined) {
                setDisplayValue(formatNumber(Number(value)))
            }
        }, [value])

        return (
            <Input
                {...props}
                ref={ref}
                name={name}
                value={displayValue}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                inputMode="numeric"
            />
        )
    },
)

AmountInput.displayName = "AmountInput"

function formatNumber(num: number): string {
    return num.toLocaleString("en-US", { maximumFractionDigits: 0 })
}

interface PasswordValidatorUIProps {
    password: string
    requirements: validator[]
}

export const PasswordValidatorUI = ({ password, requirements }: PasswordValidatorUIProps) => {
    return (
        <Card className="w-full max-w-md bg-[#FFFFFF]">
            <CardHeader className="space-y-1">
                <div className="flex items-center gap-2 text-xl text-primary">
                    <Lock className="h-8 w-8" />
                    <h2 className="font-medium">Password must have:</h2>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {requirements.map((requirement, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="text-primary">
                                {requirement.validator(password) ? (
                                    <div className="rounded-full bg-primary p-1">
                                        <TickCircle variant="Bold" className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                ) : (
                                    <TickCircle className="h-6 w-6" />
                                )}
                            </div>
                            <span className="text-lg text-primary">{requirement.text}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}



export { Input, AmountInput }