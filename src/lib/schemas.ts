import * as Yup from 'yup';

export const onboardingBasciInfoSchema = Yup.object({
	firstName: Yup.string().required('Field is required').min(3, 'Must be at least 3 charactes'),
	lastName: Yup.string().required('Field is required').min(3, 'Must be at least 3 charactes'),
	phoneNumber: Yup.string()
		.matches(/^[0-9]/gi, 'Must be a number')
		.required('Field is required'),
	country: Yup.string().required('Field is required').min(3, 'Must be at least 3 charactes'),
	city: Yup.string().required('Field is required').min(3, 'Must be at least 3 charactes'),
	artistName: Yup.string().required('Field is required').min(3, 'Must be at least 3 charactes')
});

export const onboardingBankDetailSchema = Yup.object({
	bankName: Yup.string().required('Field is required').min(3, 'Must be at least 3 charactes'),
	accountName: Yup.string().required('Field is required').min(3, 'Must be at least 3 charactes'),
	accountNumber: Yup.string()
		.matches(/^[0-9]/gi, 'Must be a number')
		.required('Field is required'),
	bvn: Yup.string()
		.matches(/^[0-9]/gi, 'Must be a number')
		.required('Field is required'),
	paymentOption: Yup.string().required('Field is required'),
	currency: Yup.string().oneOf(['NGN', 'USD', 'EUR', 'GBP'], 'Invalid currency, must be one of NGN, USD, EUR, GBP').required('Field is required'),
	bankCode: Yup.string().required('Field is required'),
	ibanSwiftCode: Yup.string().optional(),
	sortCode: Yup.string().optional()
});
const requiredError = 'Field is required';
export const onboardingSocialLinkSchema = Yup.object({
	instagram: Yup.string().required(requiredError),
	twitter: Yup.string().optional(),
	facebook: Yup.string().optional(),
	soundCloud: Yup.string().optional(),
	tiktok: Yup.string().optional(),
	website: Yup.string().optional().url('Invalid url')
});

export const musicInfoSchema = Yup.object({
	song_title: Yup.string().required(requiredError),
	genre: Yup.string().required(requiredError),
	release_date: Yup.string().required(requiredError),
	description: Yup.string().required(requiredError).min(20, 'Provide a well detailed description'),
	record_label: Yup.string().required(requiredError),
	publisher: Yup.string().required(requiredError),
	instruments_played: Yup.string().required(requiredError),
	lyrics: Yup.string().required(requiredError),
	explict_content: Yup.string().optional(),
	upcCode: Yup.string().required(requiredError),
	iscCode: Yup.string().required(requiredError),
	realease_version: Yup.string().required(requiredError),
	copyright: Yup.string().required(requiredError)
});

export const registerSchema = Yup.object({
	email: Yup.string().required(requiredError).email('Invalid email'),
	password: Yup.string()
		.required(requiredError)
		.min(8, 'Password must be at least 8 characters long')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[0-9]/, 'Password must contain at least one number')
		.matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
	confirm_password: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match')
		.required(requiredError)
});
export const loginSchema = Yup.object({
	email: Yup.string().required(requiredError).email('Invalid email'),

	password: Yup.string()
		.required(requiredError)
		.min(8, 'Password must be at least 8 characters long')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[0-9]/, 'Password must contain at least one number')
		.matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
});
export const forgotPasswordSchema = Yup.object({
	email: Yup.string().required(requiredError).email('Invalid email')
});
export const resetPasswordSchema = Yup.object({
	newPassword: Yup.string()
		.required(requiredError)
		.min(8, 'Password must be at least 8 characters long')
		.matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.matches(/[a-z]/, 'Password must contain at least one lowercase letter')
		.matches(/[0-9]/, 'Password must contain at least one number')
		.matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
	confirm_password: Yup.string()
		.oneOf([Yup.ref('newPassword')], 'Passwords must match')
		.required(requiredError)
});
