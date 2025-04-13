'use client'

import * as React from "react"
import { CheckIcon, ChevronDown, SearchIcon, } from "lucide-react"
import { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Command, CommandGroup, CommandItem } from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover-without-portal"
import FormError from "./form-error"
import { inputVariants } from "./input"


interface SelectProps<T> {
    value: string | boolean | undefined;
    onChange: (value: string) => void;
    options: T[] | undefined;
    name: string;
    hasError?: boolean;
    errormessage?: string;
    label?: string | React.ReactNode;
    placeholder: string;
    className?: string;
    containerClass?: string;
    labelClass?: string;
    itemClass?: string;
    fullWidth?: boolean;
    withIcon?: boolean;
    isLoadingOptions?: boolean;
    triggerColor?: string;
    valueKey: keyof T;
    labelKey: keyof T;
    showSelectedValue?: boolean;
    placeHolderClass?: string;
}

const SelectSingleCombo = <T extends object>({
    value,
    onChange,
    options,
    hasError,
    errormessage,
    label,
    name,
    placeholder,
    className,
    containerClass,
    itemClass,
    fullWidth,
    placeHolderClass,
    isLoadingOptions,
    valueKey,
    labelKey,
    triggerColor,
    showSelectedValue = true,
    variant,

}: SelectProps<T> & VariantProps<typeof inputVariants>) => {
    const [open, setOpen] = React.useState(false)
    const [optionsToDisplay, setOptionsToDisplay] = React.useState<T[] | undefined>(options)
    const [searchText, setSearchText] = React.useState<string>("")

    React.useEffect(() => {
        if (searchText) {
            const filteredOptions = options?.filter(option => {
                const optionLabel = String(option[labelKey]).toLowerCase();
                return optionLabel.includes(searchText.toLowerCase());
            });
            setOptionsToDisplay(filteredOptions);
        } else {
            setOptionsToDisplay(options);
        }
    }, [searchText, options, labelKey])

    const getOptionLabel = (option: T) => {
        return option ? String(option[labelKey]) : placeholder;
    }

    const handleSelect = (currentValue: string | boolean) => {
        const selectedOption = options?.find(option => String(option[valueKey]) === String(currentValue));
        const selectedValue = selectedOption ? String(selectedOption[valueKey]) : '';
        onChange(selectedValue);
        setSearchText('')
        setOpen(false);
    }

    const triggerRef = React.useRef<HTMLButtonElement | null>(null)
    const [width, setWidth] = React.useState<string>("50%")
    React.useEffect(() => {
        if (triggerRef?.current) {
            setWidth(`${triggerRef.current.clientWidth}px`)
        }
    }, [triggerRef?.current?.clientWidth])

    return (
        <div className={cn("", containerClass)}>

            <Popover open={open} onOpenChange={setOpen}>
                <div className="flex flex-col gap-2">
                    {
                        label && (
                            <label className="text-sm text-header-text font-normal" htmlFor={name || "gbo"}>
                                {label}
                            </label>
                        )
                    }
                    <PopoverTrigger asChild>
                        <button
                            tabIndex={0}
                            className={cn(
                                // "flex h-max w-full items-center justify-between gap-2 rounded-lg px-3.5 py-2 sm:px-4 sm:py-3 !text-[13px] ",
                                "text-left",
                                "ring-offset-white transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                                fullWidth ? "max-w-full" : "max-w-[520px]",
                                inputVariants({ variant, className })
                            )}
                            type="button"
                            role="combobox"
                            aria-controls="combobox-options"
                            aria-expanded={open}
                            onClick={() => setOpen(!open)}
                            ref={triggerRef}
                        >
                            <span className={cn(
                                '!overflow-hidden text-sm w-full font-normal !text-left truncate',
                                (value && options && options?.length) ? '' : '!text-[#A4A4A4]', placeHolderClass
                            )}>
                                {
                                    (showSelectedValue && value && options && options?.length)
                                        ? getOptionLabel(options.find(option => (option[valueKey]) === String(value)) || {} as T)
                                        : placeholder
                                }

                            </span>
                            <ChevronDown
                                className={cn("ml-2 h-5 w-5 shrink-0 opacity-70 transition-transform duration-300", open && "rotate-180")}
                                stroke={triggerColor || "#FE6902"}
                            />
                        </button>
                    </PopoverTrigger>
                </div>


                <PopoverContent className={cn("p-0", triggerRef?.current && `min`)} style={{ width, maxWidth: width }}>
                    <Command>
                        <div className="relative px-3">
                            <SearchIcon className="absolute top-1/2 left-2 -translate-y-1/2 text-[#032282] h-4 w-4" />
                            <input
                                className="focus:!ring-0 !ring-0 bg-transparent pl-6 p-3 !outline-none text-sm placeholder:text-[#86898ec7] border-b border-[#E6E6E6] w-full rounded-none"
                                placeholder={placeholder || "Search"}
                                type="text"
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </div>
                        <CommandGroup className="flex flex-col gap-3 px-3 max-w-full" id="combobox-options">
                            {isLoadingOptions && (
                                <CommandItem className="flex items-center justify-center gap-2 text-main-solid py-2 font-medium" value={"loading"} disabled>
                                    <ChevronDown color='#fff' /> Loading options...
                                </CommandItem>
                            )}
                            {!isLoadingOptions && options && options?.length > 0 ? (
                                optionsToDisplay?.map((option, index) => (
                                    <button
                                        className={cn("text-xs w-full relative flex select-none items-center rounded-md px-3 py-2 outline-none aria-selected:bg-primary-light aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                            "py-2 my-1 hover:!bg-primary-light hover:!text-primary cursor-pointer rounded-lg hover:border-transparent",
                                            itemClass, "max-w-full text-left items-start"
                                        )}
                                        key={index}
                                        onClick={() => handleSelect(option[valueKey] as string)}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                option[valueKey] === value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {option[labelKey] as string}
                                    </button>
                                ))
                            ) : (
                                <CommandItem className={cn("text-[0.8125rem]", isLoadingOptions && "!hidden", itemClass)} value={""} disabled>
                                    There&apos;s no option to select from
                                </CommandItem>
                            )}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>

            {
                hasError && errormessage && (
                    <FormError errormessage={errormessage} />
                )
            }
        </div >
    )
}

export default SelectSingleCombo
