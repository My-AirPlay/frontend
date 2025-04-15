import Image from 'next/image';
import React from 'react';
import facbookImg from '@/app/(auth)/_assets/facebook.svg';
const SocialBtn = () => {
	return (
		<button className="bg-white gap-2 w-full items-center flex px-4 py-3 rounded-lg">
			<Image src={facbookImg} alt="Facebook" />
			<div className="flex-1 flex items-center justify-center">
				<span className=" text-base font-semibold text-custom-dark">Continue with Facebook</span>
			</div>
		</button>
	);
};

export default SocialBtn;
