import { WithdrawalSlipData } from '@/lib/types';

/**
 * Withdrawal slips are a double-entry ledger: `action` says which way the money
 * moved and `status` only says whether the entry counts at all.
 *
 * Deriving credit/debit from `status` instead — as the admin and artist revenue
 * pages both used to — reads a completed payout as revenue, because a settled
 * withdrawal and a royalty credit share the same `Processed` status.
 */

/** The only statuses the backend ever writes (see `WithdrawalStatus`). */
export type SlipStatus = 'Pending' | 'Processed' | 'Cancelled';

/**
 * Slips created before `action` existed carry no direction. `updateWithdrawal`
 * was the only path that omitted it and it always left the slip `Pending`, so
 * a legacy `Pending` slip is a debit and anything else is a credit. This
 * mirrors `backfill-actions.ts` in the backend.
 */
export function resolveAction(slip: WithdrawalSlipData): 'Credit' | 'Debit' {
	if (slip.action) return slip.action;
	return slip.status === 'Pending' ? 'Debit' : 'Credit';
}

/**
 * `Cancelled` is the only status that voids an entry. `Pending` is a
 * bookkeeping state rather than an unsettled one — the payout has already
 * left, so it still counts against the balance.
 */
export function isLive(slip: WithdrawalSlipData): boolean {
	return slip.status !== 'Cancelled';
}

export function isCredit(slip: WithdrawalSlipData): boolean {
	return isLive(slip) && resolveAction(slip) === 'Credit';
}

export function isDebit(slip: WithdrawalSlipData): boolean {
	return isLive(slip) && resolveAction(slip) === 'Debit';
}
