import { Button } from '@/components/ui/button';
import React from 'react';
import { SmallSpinner } from '@/components/icons';
interface AuthActionsProps {
	btnText: string;
	isDisabled?: boolean;
	isBusy?: boolean;
}
const AuthActions = ({ btnText, isDisabled, isBusy }: AuthActionsProps) => {
	return (
		<div className="flex items-center justify-center gap-2 mt-8">
			<Button disabled={isDisabled} size="lg" className="h-12 tracking-wider font-normal text-base rounded-full w-full max-w-[275px]" type="submit">
				{btnText}
				{isBusy && <SmallSpinner className="ml-2" />}
			</Button>
		</div>
	);
};

export default AuthActions;
