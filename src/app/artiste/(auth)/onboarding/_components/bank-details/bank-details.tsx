'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { OnboardingSteps } from '@/lib/constants';
import { useMutation } from '@tanstack/react-query';
import { postOnbaordingBankDetail, useInitiatePayment } from '@/app/artiste/(auth)/misc/api/mutations/onboarding.mutation';
import { toast } from 'sonner';
import { handleClientError } from '@/lib/utils';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGetBankList } from '../../../misc/api/mutations/auth.mutations';
import { Input } from '@/components/ui/input';
import SelectSingleCombo from '@/components/ui/select-single-combobox';

export const onboardingBankDetailSchema = z.object({
	bankName: z.string().min(1, 'Bank name is required'),
	accountName: z.string().min(1, 'Account name is required'),
	accountNumber: z.string().min(10, 'Account number must be at least 10 digits'),
	ibanSwiftCode: z.string().min(1, 'IBAN/SWIFT code is required'),
	bvn: z.string().min(11, 'BVN must be at least 11 digits'),
	bankCode: z.string().min(1, 'Bank code is required'),
	currency: z.string().min(1, 'Currency is required'),
	sortCode: z.string().optional(),
	paymentOption: z.string().min(1, 'Payment option is required')
});

interface OnboardingBankDetailProps {
	setCurrentStep: (a: OnboardingSteps) => void;
	email: string;
}

// Define the Zod schema (assuming this is similar to the original onboardingBankDetailSchema)
export const bankDetailSchema = z.object({
	bankName: z.string().min(1, 'Bank name is required'),
	accountName: z.string().min(1, 'Account name is required'),
	accountNumber: z.string().min(10, 'Account number must be at least 10 digits'),
	ibanSwiftCode: z.string().min(1, 'IBAN/SWIFT code is required'),
	bvn: z.string().min(11, 'BVN must be at least 11 digits'),
	bankCode: z.string().min(1, 'Bank code is required'),
	currency: z.string().min(1, 'Currency is required'),
	sortCode: z.string().optional(),
	paymentOption: z.string().min(1, 'Payment option is required')
});

export type BankDetailFormValues = z.infer<typeof bankDetailSchema>;

interface IBank {
	id: number;
	name: string;
	slug: string;
	code: string;
	longcode: string;
	gateway: null | string;
	pay_with_bank: boolean;
	supports_transfer: boolean;
	active: boolean;
	country: string;
	currency: string;
	type: string;
	is_deleted: boolean;
	createdAt: string;
	updatedAt: string;
}

const OnboardingBankDetail = ({ email, setCurrentStep }: OnboardingBankDetailProps) => {
	const { artist } = useAuthContext();
	const { data: bankList } = useGetBankList();

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors }
	} = useForm<BankDetailFormValues>({
		resolver: zodResolver(bankDetailSchema),
		defaultValues: {
			bankName: artist?.bankDetails.bankName ?? '',
			accountName: artist?.bankDetails.accountName ?? '',
			accountNumber: artist?.bankDetails.accountNumber ?? '',
			ibanSwiftCode: artist?.bankDetails.ibanSwiftCode ?? '',
			bvn: artist?.bankDetails.bvn ?? '',
			bankCode: artist?.bankDetails.bankCode ?? '',
			currency: artist?.bankDetails.currency ?? 'naira',
			sortCode: '',
			paymentOption: 'Monthly'
		}
	});

	const { isPending: initiatingPayment } = useInitiatePayment();

	const { mutateAsync, isPending } = useMutation({
		mutationFn: postOnbaordingBankDetail,
		onSuccess(result) {
			if (!result) {
				toast.error('Something went wrong. Try again', {
					duration: 1000000
				});
				return;
			}
			if (result.error) {
				handleClientError(result.error);
				return;
			}
		}
	});
	const onSubmit = (data: BankDetailFormValues) => {
		mutateAsync(
			{
				bankDetail: data,
				email
			},
			{
				onSuccess: () => {
					setCurrentStep(OnboardingSteps.SOCIAL_LINK);
				}
			}
		);
	};

	const handleBankSelect = (value: string) => {
		setValue('bankName', value);

		// Find the selected bank to get its details
		const selectedBank = bankList?.find((bank: IBank) => bank.name === value);

		if (selectedBank) {
			setValue('bankCode', selectedBank.code);

			if (selectedBank.longcode) {
				setValue('sortCode', selectedBank.longcode);
			}
		}
	};

	return (
		<div className="w-full max-w-3xl mx-auto">
			<div className="mb-8">
				<h2 className="text-2xl font-bold">BANK DETAILS</h2>
				<p className="text-gray-600 mt-2">Please use your real name and data. It will be used for security purposes to make sure you and only you have access to your account including withdrawals (if applicable).</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 grid md:grid-cols-2 gap-4 lg:gap-x-8">
				{/* Bank Name Selection */}
				<div>
					<SelectSingleCombo label="Bank Name" name="bankName" placeholder="Select Bank" options={bankList} value={watch('bankName')} onChange={handleBankSelect} valueKey="name" labelKey="name" hasError={!!errors.bankName} errormessage={errors.bankName?.message} />
				</div>

				{/* Account Number */}
				<div>
					<Input label="Account Number" placeholder="Account Number" {...register('accountNumber')} hasError={!!errors.accountNumber} errormessage={errors.accountNumber?.message} />
				</div>

				{/* Account Name */}
				<div>
					<Input label="Account Name" placeholder="Account Name" {...register('accountName')} hasError={!!errors.accountName} errormessage={errors.accountName?.message} />
				</div>

				{/* BVN */}
				<div>
					<Input label="BVN" placeholder="BVN" {...register('bvn')} hasError={!!errors.bvn} errormessage={errors.bvn?.message} />
				</div>

				{/* Bank Code */}
				<div>
					<Input label="Bank Code" placeholder="Bank Code" {...register('bankCode')} hasError={!!errors.bankCode} errormessage={errors.bankCode?.message} />
				</div>

				{/* IBAN/SWIFT Code */}
				<div>
					<Input label="IBAN/SWIFT Code" placeholder="IBAN/SWIFT Code" {...register('ibanSwiftCode')} hasError={!!errors.ibanSwiftCode} errormessage={errors.ibanSwiftCode?.message} />
				</div>

				{/* Sort Code */}
				<div>
					<Input label="Sort Code (optional)" placeholder="Sort Code" {...register('sortCode')} hasError={!!errors.sortCode} errormessage={errors.sortCode?.message} />
				</div>

				{/* Currency */}
				<div>
					<Input label="Currency" placeholder="Currency" {...register('currency')} hasError={!!errors.currency} errormessage={errors.currency?.message} />
				</div>

				<div className="pt-4">
					<Button size="lg" type="submit" className="max-w-[250px] w-full rounded-full mx-auto" disabled={isPending || initiatingPayment} isLoading={isPending || initiatingPayment}>
						Continue <MoveRight />
					</Button>
				</div>
			</form>
		</div>
	);
};

export default OnboardingBankDetail;
