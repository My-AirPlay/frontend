'use client';

import * as React from 'react';
// ... other imports remain the same
import { format, subMonths } from 'date-fns';
import { cn } from '@/lib/utils';

import { Button, buttonVariants, Calendar, Popover, PopoverContent, PopoverTrigger } from '.';
import { convertKebabAndSnakeToTitleCase } from '@/utils/strings';
import { labelVariants } from './input';
import { VariantProps } from 'class-variance-authority';
import { DateRange, Matcher } from 'react-day-picker';
import { clsx } from 'clsx';

// The props interface is simplified. `defaultDate` is removed as it's not needed for a controlled component.
interface SingleDatePickerProps extends VariantProps<typeof buttonVariants> {
	id?: string;
	label?: string;
	className?: string;
	placeholder?: string;
	placeholderClassName?: string;
	value?: Date | string; // The value is now the single source of truth
	onChange?: (value: Date) => void;
	align?: 'center' | 'end' | 'start' | undefined;
	continueWithSelectedDate?: boolean;
	disabled?: boolean; // Added disabled prop to pass down
}

const currentYear = new Date().getFullYear();
const twoYearsFromNow = currentYear + 2;

function SingleDatePicker({
	id,
	label,
	className,
	placeholder,
	placeholderClassName,
	value, // We will use this directly
	onChange,
	align = 'end',
	continueWithSelectedDate = true,
	variant = 'inputButton',
	size = 'inputButton',
	disabled = false // Destructure disabled prop
}: SingleDatePickerProps) {
	// We no longer need the internal `useState` for the date.
	const [open, setOpen] = React.useState(false);

	// Create a valid Date object from the value prop, which could be a string or Date.
	const dateValue = value ? new Date(value) : undefined;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<div className="flex flex-col gap-2">
				{label && (
					<label className={cn('text-sm font-medium mb-2.5', labelVariants[variant || 'default'])} htmlFor={id || label}>
						{label}
					</label>
				)}
				<PopoverTrigger asChild>
					<Button
						variant={variant || 'inputButton'}
						size={size}
						disabled={disabled} // Apply the disabled prop
						className={cn('flex w-full items-center justify-between gap-2 text-left text-sm transition duration-300', !dateValue && 'text-muted-foreground', className)}
						id={id}
						type="button"
					>
						{/* The displayed value now comes directly from the 'value' prop */}
						{continueWithSelectedDate && dateValue ? <span className="truncate">{format(dateValue, 'PPP')}</span> : <span className={cn('inline-block font-normal !text-[#A4A4A4]', placeholderClassName)}>{placeholder || 'Pick a date'}</span>}

						<span>
							<svg fill="none" height={20} viewBox="0 0 20 20" width={20} xmlns="http://www.w3.org/2000/svg">
								<path d="M6.667 4.792a.63.63 0 0 1-.625-.625v-2.5a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v2.5a.63.63 0 0 1-.625.625Zm6.666 0a.63.63 0 0 1-.625-.625v-2.5a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v2.5a.63.63 0 0 1-.625.625Zm-.833 6.666H5.833a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625H12.5a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625ZM10 14.792H5.833a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625H10a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Z" fill="#fff" />
								<path d="M12.5 18.959h-5c-4.683 0-5.625-2.209-5.625-5.775V8.042c0-3.95 1.333-5.558 4.758-5.75h6.734c3.425.192 4.758 1.8 4.758 5.75v5.142c0 3.566-.942 5.775-5.625 5.775ZM6.667 3.542c-2.334.133-3.542.867-3.542 4.5v5.142c0 3.191.608 4.525 4.375 4.525h5c3.767 0 4.375-1.334 4.375-4.525V8.042c0-3.625-1.2-4.367-3.558-4.5h-6.65Z" fill="#fff" />
							</svg>
						</span>
					</Button>
				</PopoverTrigger>
			</div>

			<PopoverContent align={align} className="max-h-none min-h-[22.5rem] min-w-[350px] max-w-[400px] p-0">
				<Calendar
					captionLayout="dropdown-buttons"
					fromYear={1930}
					mode="single"
					selected={dateValue} // The selected date is now bound to the prop
					toYear={twoYearsFromNow}
					disabled={disabled} // Disable the calendar if the component is disabled
					onSelect={currentSelection => {
						// It does NOT set internal state. It only notifies the parent.
						if (currentSelection) {
							onChange?.(currentSelection);
						}
						// For better UX, close the popover immediately after selection.
						setOpen(false);
					}}
				/>

				{/* This "Okay" button is now optional since the popover closes on select.
                    You can keep it or remove it based on your desired user experience. */}
				<Button className="mb-4 ml-auto mr-4 block w-max px-2 py-1" variant="ghost" onClick={() => setOpen(false)}>
					<span className="text-xs text-primary">Okay</span>
				</Button>
			</PopoverContent>
		</Popover>
	);
}

interface RangeDatePickerProps extends VariantProps<typeof buttonVariants> {
	id?: string;
	className?: string;
	disabledDays?: Matcher | Matcher[] | undefined;
	placeholder?: string;
	placeholderClassName?: string;
	value?: DateRange;
	onChange?: (value: DateRange) => void;
}

function RangeDatePicker({ id, className, disabledDays, placeholder, placeholderClassName, onChange, variant = 'inputButton', size = 'inputButton' }: RangeDatePickerProps) {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: subMonths(new Date(), 1),
		to: new Date()
	});
	const [open, setOpen] = React.useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button className={cn('flex w-full items-center justify-between gap-2 rounded-md bg-input-bg px-5 py-2 text-left text-xs transition duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-100 disabled:cursor-not-allowed disabled:opacity-50', !date && 'text-muted-foreground', className)} id={id} type="button" variant={variant} size={size}>
					<span>
						<svg fill="none" height={20} viewBox="0 0 20 20" width={20} xmlns="http://www.w3.org/2000/svg">
							<path d="M6.667 4.792a.63.63 0 0 1-.625-.625v-2.5a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v2.5a.63.63 0 0 1-.625.625Zm6.666 0a.63.63 0 0 1-.625-.625v-2.5a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v2.5a.63.63 0 0 1-.625.625Zm-.833 6.666H5.833a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625H12.5a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625ZM10 14.792H5.833a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625H10a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Z" fill="#292D32" />
							<path d="M12.5 18.959h-5c-4.683 0-5.625-2.209-5.625-5.775V8.042c0-3.95 1.333-5.558 4.758-5.75h6.734c3.425.192 4.758 1.8 4.758 5.75v5.142c0 3.566-.942 5.775-5.625 5.775ZM6.667 3.542c-2.334.133-3.542.867-3.542 4.5v5.142c0 3.191.608 4.525 4.375 4.525h5c3.767 0 4.375-1.334 4.375-4.525V8.042c0-3.625-1.2-4.367-3.558-4.5h-6.65Z" fill="#292D32" />
						</svg>
					</span>

					{date?.from ? (
						date.to ? (
							<span>
								{format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
							</span>
						) : (
							format(date.from, 'LLL dd, y')
						)
					) : (
						<span className={cn('font-normal text-input-placeholder', placeholderClassName)}>{placeholder || 'Pick a date'}</span>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent align="end" className="max-h-none min-h-[21.875rem] w-max p-0">
				<Calendar
					defaultMonth={date?.from}
					disabled={disabledDays}
					mode="range"
					numberOfMonths={2}
					selected={date}
					// initialFocus
					onSelect={currentSelection => {
						setDate(currentSelection);
						// Maintain Hook Form state below alongside local state above.
						// This enables the component to be usable without Hook Form
						if (currentSelection) {
							onChange?.(currentSelection);
						}
					}}
				/>

				<Button className="mb-4 ml-auto mr-4 block w-max px-2 py-1" variant="ghost" onClick={() => setOpen(false)}>
					<span className="text-xs text-main-solid">Okay</span>
				</Button>
			</PopoverContent>
		</Popover>
	);
}

interface RangeAndCustomDatePickerProps extends VariantProps<typeof buttonVariants> {
	allDataFilter?:
		| {
				dateType?: string | undefined;
				from?: Date | undefined;
				to?: Date | undefined;
		  }
		| undefined;
	//  { dateType: string } & DateRange;
	id?: string;
	className?: string;
	placeholder?: string;
	placeholderClassName?: string;
	value?: { dateType: string } & DateRange;
	onChange?: (value: { dateType: string } & DateRange) => void;
}

function RangeAndCustomDatePicker({ allDataFilter, id, className, placeholder, placeholderClassName, onChange, variant = 'inputButton', size = 'inputButton' }: RangeAndCustomDatePickerProps) {
	const [date, setDate] = React.useState<({ dateType: string } & DateRange) | undefined>({
		from: subMonths(new Date(), 1),
		to: new Date(),
		dateType: 'today'
	});
	const [open, setOpen] = React.useState(false);

	const setCustomDateType = (value: string) => {
		// setCustomType(value)
		setDate({
			from: undefined,
			to: undefined,
			dateType: value
		});
		onChange?.({
			from: undefined,
			to: undefined,
			dateType: value
		});

		setOpen(false);
	};

	const customDateValues = [
		{
			name: 'Today',
			value: 'today'
		},
		{
			name: 'This week',
			value: 'week'
		},

		{
			name: 'This month',
			value: 'month'
		},

		{
			name: 'This Year',
			value: 'year'
		}
	];

	React.useEffect(() => {
		if (allDataFilter && allDataFilter?.dateType !== 'custom') {
			setCustomDateType(allDataFilter?.dateType || '');
		} else {
			if (allDataFilter)
				setDate(prevDateRange => ({
					...prevDateRange,
					dateType: allDataFilter.dateType || '',
					from: allDataFilter.from,
					to: allDataFilter.to
				}));

			onChange?.({
				dateType: 'custom',
				from: allDataFilter?.from,
				to: allDataFilter?.to
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allDataFilter?.from, allDataFilter?.to, allDataFilter?.dateType]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button className={cn('flex w-full items-center justify-between gap-2 rounded-md text-left text-xs transition duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-100 disabled:cursor-not-allowed disabled:opacity-50', !date && 'text-muted-foreground', className)} id={id} type="button" variant={variant} size={size}>
					<span>
						<svg fill="none" height={20} viewBox="0 0 20 20" width={20} xmlns="http://www.w3.org/2000/svg">
							<path d="M6.667 4.792a.63.63 0 0 1-.625-.625v-2.5a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v2.5a.63.63 0 0 1-.625.625Zm6.666 0a.63.63 0 0 1-.625-.625v-2.5a.63.63 0 0 1 .625-.625.63.63 0 0 1 .625.625v2.5a.63.63 0 0 1-.625.625Zm-.833 6.666H5.833a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625H12.5a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625ZM10 14.792H5.833a.63.63 0 0 1-.625-.625.63.63 0 0 1 .625-.625H10a.63.63 0 0 1 .625.625.63.63 0 0 1-.625.625Z" fill="#292D32" />
							<path d="M12.5 18.959h-5c-4.683 0-5.625-2.209-5.625-5.775V8.042c0-3.95 1.333-5.558 4.758-5.75h6.734c3.425.192 4.758 1.8 4.758 5.75v5.142c0 3.566-.942 5.775-5.625 5.775ZM6.667 3.542c-2.334.133-3.542.867-3.542 4.5v5.142c0 3.191.608 4.525 4.375 4.525h5c3.767 0 4.375-1.334 4.375-4.525V8.042c0-3.625-1.2-4.367-3.558-4.5h-6.65Z" fill="#292D32" />
						</svg>
					</span>

					{date?.from ? (
						date.to ? (
							<span>
								{format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
							</span>
						) : (
							format(date.from, 'LLL dd, y')
						)
					) : (
						<span className={cn('font-normal text-input-placeholder', placeholderClassName)}>{(date?.dateType != 'CUSTOM' && convertKebabAndSnakeToTitleCase(date?.dateType)) || placeholder || 'Pick a date'}</span>
					)}
				</Button>
			</PopoverTrigger>

			<PopoverContent align="end" className=" max-h-none min-h-[21.875rem] w-max p-0">
				<div className="flex">
					<div className="h-full bg-white">
						{customDateValues.map(dateValue => {
							return (
								<button
									className={clsx('block w-full whitespace-nowrap border px-5 py-4 text-xs text-[#242424]', date?.dateType == dateValue.value ? 'bg-black text-white' : '')}
									key={dateValue.value}
									onClick={() => {
										setCustomDateType(dateValue.value);
									}}
								>
									{dateValue.name}
								</button>
							);
						})}
					</div>
					<Calendar
						defaultMonth={date?.from}
						mode="range"
						numberOfMonths={2}
						selected={date}
						// initialFocus
						onSelect={currentSelection => {
							// setDate(currentSelection);

							setDate(currentSelection ? { ...currentSelection, dateType: 'custom' } : undefined);

							// Maintain Hook Form state below alongside local state above.
							// This enables the component to be usable without Hook Form
							if (currentSelection) {
								// onChange?.(currentSelection);
								onChange?.(
									currentSelection && {
										...currentSelection,
										dateType: 'custom'
									}
								);
							}
						}}
					/>
				</div>

				<Button className="mb-4 ml-auto mr-4 block w-max px-2 py-1" variant="ghost" onClick={() => setOpen(false)}>
					<span className="text-xs text-main-solid">Okay</span>
				</Button>
			</PopoverContent>
		</Popover>
	);
}

export { SingleDatePicker, RangeDatePicker, RangeAndCustomDatePicker };
