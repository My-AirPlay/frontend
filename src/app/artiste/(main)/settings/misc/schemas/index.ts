import * as z from 'zod';

// Profile Information Schema
export const profileSchema = z.object({
	firstName: z.string().min(2, 'Full name must be at least 2 characters'),
	lastName: z.string().min(2, 'Full name must be at least 2 characters'),
	artistName: z.string().min(1, 'Stage name is required'),
	phoneNumber: z.string().regex(/^\d+$/, 'Phone number must contain only numbers').min(10, 'Phone number must be at least 10 characters'),
	email: z.string().email('Please enter a valid email address'),
	bio: z.string().optional(),
	Instagram: z.string().optional(),
	soundcloud: z.string().optional(),
	tiktok: z.string().optional(),
	twitter: z.string().optional(),
	facebook: z.string().optional(),
	website: z.string().url().optional().or(z.literal(''))
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

// Password Schema
export const passwordSchema = z
	.object({
		currentPassword: z.string().min(6, 'Current password is required'),
		newPassword: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string().min(8, 'Please confirm your password')
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword']
	});

export type PasswordFormValues = z.infer<typeof passwordSchema>;

// Bank Details Schema
export const bankSchema = z.object({
	accountNumber: z.string().min(5, 'Account number is required'),
	bankName: z.string().min(2, 'Bank name is required'),
	accountName: z.string().min(2, 'Account name is required'),
	sortCode: z.string().optional(),
	ibanSwiftCode: z.string().optional(),
	payoutOption: z.string(),
	currency: z.string()
});

export type BankFormValues = z.infer<typeof bankSchema>;

// Account Deletion Schema
export const accountDeletionSchema = z.object({
	reason: z.string().min(1, 'Please select a reason'),
	password: z.string().min(6, 'Password is required to confirm deletion')
});

export type AccountDeletionFormValues = z.infer<typeof accountDeletionSchema>;
