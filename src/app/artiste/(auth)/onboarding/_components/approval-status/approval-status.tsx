// import CustomAppLayout from '@/components/app-layout/app-layout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Square } from 'lucide-react';
import React from 'react';

const OnboardingApprovalStatus = () => {
	const steps = [
		{
			isDone: true,
			title: 'Application Submitted',
			description: 'Successfully submitted your details, we will review and get back to you within 24 hours'
		},
		{
			isDone: true,
			title: 'Review Application',
			description: 'Your application has passed the standard phase and has been moved to another level'
		},
		{
			isDone: false,
			title: 'Profile Created',
			description: 'Your profile and dashboard has been created'
		}
	];
	return (
		<>
			<div className="max-w-preview-width mx-auto">
				<h1 className="font-inter text-custom-primary md:text-xl text-lg p-[10px]">PENDING APPROVAL</h1>
				<p className=" mb-[63px] font-plus-jakarta-sans text-white text-base">
					Thank you for signing up on AirPlay, we will get back to you shortly as we are reviewing your application
					<br /> <span className="text-white"> You will receive an email about your application int the next 24 hours.</span>
				</p>
				<ul className="max-w-[684px] mb-14 mx-auto md:pb-[60px] pb-[26px] flex flex-col justify-center gap-5  px-[60px] min-h-[415px] w-full bg-custom-edit-modal">
					{steps.map(step => (
						<li key={step.title} className="flex flex-col gap-5">
							<div className="flex items-center gap-2">
								{step.isDone ? (
									<div className="w-5 h-5 border border-custom-primary rounded-sm grid place-items-center text-custom-primary">
										<Check size={20} />
									</div>
								) : (
									<div className="text-white/70">
										<Square />
									</div>
								)}
								<h2 className={cn('font-plus-jakarta-sans font-medium text-base text-white', !step.isDone && 'text-white/70')}>{step.title}</h2>
							</div>
							<p className="text-custom-footer_border font-inter font-normal text-xs">{step.description}</p>
						</li>
					))}
				</ul>

				<Button size={'lg'} className="max-w-[275px] mx-auto h-[75px] ">
					Back to website
				</Button>
			</div>
		</>
	);
};

export default OnboardingApprovalStatus;
