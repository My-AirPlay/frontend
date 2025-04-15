import React, { ReactNode } from 'react';
interface AuthWrapperProps {
	children: ReactNode;
	linkText?: ReactNode;
	title: string;
	description: string | ReactNode;
}
const AuthWrapper = ({ children, linkText, description, title }: AuthWrapperProps) => {
	return (
		<div className="max-w-[550px] font-plus-jakarta-sans w-full grid items-center mx-auto flex-1">
			<div className="bg-custom-banner_bg/10  px-6 md:px-10 py-10 mb-3 shadow  rounded-xl">
				<h1 className="font-black text-white text-center md:text-3xl text-2xl mb-3">{title}</h1>
				<div className="font-plus-jakarta-sans font-medium text-sm text-center max-w-[320px text-balance mx-auto mb-10 text-custom-footer_border ">{description}</div>
				{children}
			</div>
			<small>{linkText}</small>
		</div>
	);
};

export default AuthWrapper;
