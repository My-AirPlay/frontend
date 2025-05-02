import React from 'react';
import { FormStepProps } from './form-step.interface';
import { Input } from '@/components/ui';

const FormStep = ({ title, description, formFields, formik, children }: FormStepProps) => {
	return (
		<div className="max-w-4xl mx-auto">
			<h1 className="font-inter font-semibold md:text-xl text-lg mb-2 text-custom-primary">{title}</h1>
			<p className="font-plus-jakarta-sans font-normal  max-w-[900px] text-sm text-balance flex flex-col md:block text-white md:mb-[90px] mb-[42px]">
				{description} <span className="text-custom-primary">* All fields are mandatory unless specified otherwise.</span>
			</p>
			<form onSubmit={formik.handleSubmit} className="">
				<div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-[26px] mb-[26px] md:mb-[56px] ">
					{formFields.map(field => (
						<fieldset key={field.id} className="flex flex-col gap-5">
							<Input label={field.label} inputSize={'authInput'} id={field.id} {...field.props} {...formik.getFieldProps(field.id)} hasError={!!(formik.touched[field.id] && formik.errors[field.id])} errormessage={formik.touched[field.id] ? (formik.errors[field.id] as string) : ''} />
						</fieldset>
					))}
				</div>
				{children}
			</form>
		</div>
	);
};

export default FormStep;
