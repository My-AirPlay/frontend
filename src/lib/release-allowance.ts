/**
 * Free releases before the yearly subscription is needed. Mirrors
 * media/release-allowance.ts on the server, which is what actually enforces it.
 * A release is one UPC: a single, video, EP or album each count once.
 */
export const FREE_RELEASE_LIMIT = 12;
export const SUBSCRIPTION_FEE_NGN = 40000;

export function releaseAllowance(artist?: { releasesUsed?: number; bankDetails?: { paidRegistrationFee?: boolean } } | null) {
	const used = artist?.releasesUsed ?? 0;
	const subscribed = !!artist?.bankDetails?.paidRegistrationFee;
	return {
		used,
		subscribed,
		remaining: subscribed ? Infinity : Math.max(0, FREE_RELEASE_LIMIT - used),
		limit: FREE_RELEASE_LIMIT
	};
}

export const formatFee = () => `₦${SUBSCRIPTION_FEE_NGN.toLocaleString('en-NG')}`;
