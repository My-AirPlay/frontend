// import { FormikProps } from "formik";
import { ComponentProps, ReactNode } from 'react';

export interface FormStepProps {
	title: string;
	description: string;
	formFields: FormField[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	formik: any;
	children: ReactNode;
}

export interface FormField {
	label: string;
	id: string;
	props: ComponentProps<'input'>;
}
