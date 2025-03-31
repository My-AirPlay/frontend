import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { UseControllerProps } from 'react-hook-form';
import { cn } from '@/lib/utils';
import FormError from './form-error';
import { inputVariants, labelVariants } from './input';
import {
  SelectContent,
  Select as Selection,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select';
import { SmallSpinner } from '../icons';

type SelectProps<TOption> = {
  value?: string | boolean;
  onChange: (value: string) => void;
  options?: TOption[];
  name?: string;
  hasError?: boolean;
  errorMessage?: string;
  label?: string | React.ReactNode;
  placeholder?: string;
  className?: string;
  valueClass?: string;
  defaultValue?: string | boolean;
  containerClass?: string;
  labelClass?: string;
  itemClass?: string;
  wrapperClass?: string;
  isLoadingOptions?: boolean;
  triggerColor?: string;
  valueKey: keyof TOption;
  labelKey: keyof TOption;
  showSelectedValue?: boolean;
  placeHolderClass?: string;
  variant?: VariantProps<typeof inputVariants>['variant'];
  size?: VariantProps<typeof inputVariants>['inputSize'];
  control?: UseControllerProps<any, string>['control'];
};

function Select<TOption extends Record<string, any>>({
  value: propValue,
  onChange: propOnChange,
  options,
  hasError,
  errorMessage,
  label,
  name,
  placeholder,
  className,
  containerClass,
  labelClass,
  itemClass,
  wrapperClass,
  defaultValue,
  valueClass,
  placeHolderClass,
  isLoadingOptions,
  valueKey,
  labelKey,
  triggerColor,
  showSelectedValue = true,
  variant,
  size,
  control,
}: SelectProps<TOption>) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

    return (
        <div className={cn(containerClass)}>
            {
                label && (
                    <label className={cn("text-sm text-foreground font-normal", labelVariants[variant || "default"], labelClass)} htmlFor={name || "gbo"}>
                        {label}
                    </label>
                )
            }
            <div className={cn("w-full, wrapperClass")}>
                <Selection value={propValue?.toString()} open={isOpen} onValueChange={propOnChange} onOpenChange={handleOpenChange} defaultValue={defaultValue ? String(defaultValue) : undefined}>
                    <SelectTrigger
                        className={cn("w-full !overflow-hidden whitespace-nowrap",
                            inputVariants({ variant, inputSize: size, className })

                        )}
                        id={name}
                        triggerColor={triggerColor}
                        data-state={isOpen ? 'open' : 'closed'}
                    >
                        <SelectValue className={cn('!overflow-hidden !text-ellipsis', valueClass)} placeholder={placeholder} />

                    </SelectTrigger>
                    <SelectContent className="flex flex-col gap-3 !px-1 max-w-full">
                        {
                            isLoadingOptions &&
                            <SelectItem disabled value={"loading"}>
                                <SmallSpinner color='#fff' />
                            </SelectItem>
                        }
                        {
                            options && options?.length > 0 ?
                                options.map((option, index) => (
                                    <SelectItem
                                        key={`${option[labelKey]}.${option[valueKey]}${index} `}
                                        value={String(option[valueKey])}
                                        className={cn(
                                            "text-xs w-full relative flex select-none items-center gap-2 rounded-md px-3 py-2 outline-none aria-selected:bg-primary/70 aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                                            "py-2 my-1 hover:!bg-primary-light hover:!text-primary cursor-pointer rounded-lg hover:border-transparent",
                                            itemClass,
                                            "max-w-full text-left items-start",
                                        )}
                                    // cl1assName={cn(itemClass, "!overflow-hidden text-ellipsis text-xs ")}
                                    >
                                        {option[labelKey] as string}

                                    </SelectItem>
                                ))
                                :
                                <SelectItem value={""} disabled className={itemClass}>
                                    There's no option to select from
                                </SelectItem>
                        }
                    </SelectContent>
                </Selection>
                {
                    hasError && errorMessage && (
                        <FormError errorMessage={errorMessage} />
                    )
                }
            </div>
        </div>
    );
};

export default Select;
