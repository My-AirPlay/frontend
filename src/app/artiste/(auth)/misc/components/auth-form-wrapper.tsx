import React, { ReactNode } from 'react';
import facebook from '@/app/assets/facebook.svg';
import google from '@/app/assets/google.svg';
import github from '@/app/assets/github.svg';
import Image from 'next/image';
import AuthWrapper from './auth-wrapper';
import Link from 'next/link';
interface AuthFormWrapperProps {
	children: ReactNode;
	pageTitle: string;
	pageDescription: string;
	formTitle: string;
	formDescription: string;
	showFaqs?: boolean;
	showOAuth?: boolean;
	faqIntro?: string;
	faqLink?: string;
	faqLinkText?: string;
}
const faqTexts = ['Terms & Conditions', 'Support', 'Customer Care'];
const AuthFormWrapper = ({ children, formDescription, formTitle, pageDescription, pageTitle, showFaqs = true, showOAuth = true, faqIntro = '', faqLink = '/register', faqLinkText = 'Singup' }: AuthFormWrapperProps) => {
	return (
		<AuthWrapper title={pageTitle} description={pageDescription}>
			<div className="flex-1">
				<h1 className="font-noto-sans text-white font-semibold text-4xl">{formTitle}</h1>
				<p className="font-noto-sans text-base font-medium text-white mb-4">{formDescription}</p>
				{children}

				{showOAuth && (
					<div className="mt-[47px]">
						<div className="flex items-center gap-2 mb-3 ">
							<div className="border-t-2 border-t-custom-auth_stroke w-full flex-1" />
							<div className="w-6 h-5  text-custom-auth_stroke font-noto-sans font-medium text-base">Or</div>
							<div className="border-t-2 border-t-custom-auth_stroke w-full flex-1" />
						</div>
						<div className="flex justify-center items-center gap-5">
							<figure>
								<Image src={google} alt="google" />
							</figure>
							<figure>
								<Image src={facebook} alt="facebook" />
							</figure>
							<figure>
								<Image src={github} alt="github" />
							</figure>
						</div>
					</div>
				)}
			</div>
			{showFaqs && (
				<div className="flex-col gap-2 flex">
					<p className="text-base w-full text-center font-medium text-white">
						{faqIntro}
						<Link className="font-bold" href={faqLink}>
							{faqLinkText}
						</Link>
					</p>
					<nav>
						<ul className="flex items-center justify-between">
							{faqTexts.map(faqText => (
								<li className="font-noto-sans font-normal text-base text-white" key={faqText}>
									{faqText}
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}
		</AuthWrapper>
	);
};

export default AuthFormWrapper;
