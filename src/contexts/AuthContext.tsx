'use client';

import { Reducer, useCallback, useLayoutEffect } from 'react';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import APIAxios, { setAxiosDefaultToken } from '@/utils/axios';
import { usePathname, useRouter } from 'next/navigation';
import { clearAdminTokens, clearArtistTokens, getArtistAccessToken } from '@/actions/auth/auth.action';
import { AxiosError } from 'axios';
import { AppLogo } from '@/components/icons';

interface IArtistUser {
	_id: string;
	email: string;
	stage: string;
	status: string;
	artistName: string;
	city: string;
	country: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	bankDetails: BankDetails;
	contractDetails: ContractDetails;
	profilePicture: string;
	bio: string;
	socialLinks: SocialLinks;
	totalRoyaltyUSD: number;
	totalStreams: number;
	paidRoyalty: number;
}

interface SocialLinks {
	instagram: string | null;
	facebook: string | null;
	twitter: string | null;
	tiktok: string | null;
	soundCloud: string | null;
	website: string | null;
	youtube: string | null;
}

interface ContractDetails {
	startDate: string;
	endDate: string;
	contract: string;
	status: string;
}

interface BankDetails {
	bankName: string;
	accountName: string;
	accountNumber: string;
	ibanSwiftCode: string;
	bvn: string;
	bankCode: string;
	currency: string;
	sortCode: number;
	paymentOption: string;
	dealType: string;
	rate: number;
	paidRegistrationFee?: boolean;
	registrationFeeReference?: string;
}

export interface AuthState {
	artist: IArtistUser | null;
	admin: IArtistUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	isAuthenticating: boolean;
	error: string | null;
}

// --- INITIAL STATE AND REDUCER (No changes needed here) ---
export const initialAuthState: AuthState = {
	artist: null,
	admin: null,
	isAuthenticated: false,
	isLoading: false,
	isAuthenticating: true,
	error: null
};

export type AuthActionType = { type: 'SET_AUTHENTICATING'; payload: boolean } | { type: 'SET_LOADING'; payload: boolean } | { type: 'ARTISTE_LOGIN_SUCCESS'; payload: IArtistUser } | { type: 'ADMIN_LOGIN_SUCCESS'; payload: IArtistUser } | { type: 'LOGIN_FAILURE'; payload: string } | { type: 'LOGOUT' } | { type: 'SET_ERROR'; payload: string | null };

export const authReducer: Reducer<AuthState, AuthActionType> = (state, action) => {
	switch (action.type) {
		case 'SET_AUTHENTICATING':
			return { ...state, isAuthenticating: action.payload };
		case 'SET_LOADING':
			return { ...state, isLoading: action.payload };
		case 'ARTISTE_LOGIN_SUCCESS':
			return {
				...state,
				artist: action.payload,
				admin: null,
				isAuthenticated: true,
				isLoading: false,
				isAuthenticating: false,
				error: null
			};
		case 'ADMIN_LOGIN_SUCCESS':
			return {
				...state,
				admin: action.payload,
				artist: null,
				isAuthenticated: true,
				isLoading: false,
				isAuthenticating: false,
				error: null
			};
		case 'LOGIN_FAILURE':
			return {
				...state,
				artist: null,
				admin: null,
				isAuthenticated: false,
				isLoading: false,
				isAuthenticating: false,
				error: action.payload
			};
		case 'LOGOUT':
			return {
				...state,
				artist: null,
				admin: null,
				isAuthenticated: false,
				isLoading: false,
				isAuthenticating: false, // Ensure this is set to false on logout
				error: null
			};
		case 'SET_ERROR':
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

// --- CONTEXT DEFINITION ---
interface AuthContextType extends AuthState {
	dispatch: React.Dispatch<AuthActionType>;
	logout: (options?: { redirect?: boolean }) => Promise<void>;
	checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	...initialAuthState,
	dispatch: () => {},
	logout: async () => {},
	checkAuthStatus: async () => {}
});

// --- AUTH PROVIDER (Key Changes Here) ---
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialAuthState);
	const router = useRouter();
	const pathname = usePathname();
	const isAdminRoute = pathname.includes('/admin');

	const handleLogout = useCallback(
		async (options: { redirect?: boolean } = { redirect: true }) => {
			dispatch({ type: 'LOGOUT' });

			// Clear tokens and axios headers
			await clearArtistTokens();
			await clearAdminTokens();
			setAxiosDefaultToken('');

			// Reroute after state has been cleared
			if (options.redirect) {
				router.replace(isAdminRoute ? '/admin/login' : '/artiste/login');
			}
		},
		[router, pathname]
	);

	const checkAuthStatus = useCallback(async () => {
		const token = await getArtistAccessToken();
		if (!token) {
			if (isAdminRoute) {
				router.replace('/admin/login');
			} else {
				if (!pathname.includes('password') && !pathname.startsWith('/')) {
					router.replace('/artiste/login');
				}
			}
			dispatch({ type: 'SET_AUTHENTICATING', payload: false });
			return;
		}

		// Decode token to check for expiration
		try {
			const decodedToken: { exp: number } = JSON.parse(atob(token.split('.')[1]));
			const isTokenExpired = decodedToken.exp * 1000 < Date.now();

			if (isTokenExpired) {
				await handleLogout();
				return;
			}

			setAxiosDefaultToken(token);
			const { data } = await APIAxios.get<IArtistUser>('/artist/profile');

			if (data.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
				dispatch({ type: 'ADMIN_LOGIN_SUCCESS', payload: data });
			} else {
				dispatch({ type: 'ARTISTE_LOGIN_SUCCESS', payload: data });
			}
		} catch (error) {
			console.error('Authentication check failed:', error);
			if (error instanceof AxiosError && error.response?.status === 401) {
				await handleLogout();
			} else {
				// Handle other errors, maybe show a generic error message
				dispatch({ type: 'LOGIN_FAILURE', payload: 'Failed to verify session.' });
			}
		}
	}, [handleLogout]);

	useLayoutEffect(() => {
		// Only run check if we don't have a user and are still authenticating
		if (state.isAuthenticating && !state.isAuthenticated) {
			checkAuthStatus();
		}
	}, [checkAuthStatus, state.isAuthenticating, state.isAuthenticated]);

	return (
		<AuthContext.Provider
			value={{
				...state,
				dispatch,
				logout: handleLogout,
				checkAuthStatus
			}}
		>
			{state.isAuthenticating ? (
				<div className="flex items-center justify-center h-screen w-full bg-background">
					<AppLogo className="animate-pulse" />
				</div>
			) : (
				children
			)}
		</AuthContext.Provider>
	);
};

// --- HOOK AND UTILITY FUNCTIONS ---
export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuthContext must be used within an AuthProvider');
	}
	return context;
};

export async function getArtistProfile() {
	const accessToken = await getArtistAccessToken();

	try {
		if (!accessToken || !accessToken.trim()) return null;

		const { data } = await APIAxios.get<IArtistUser>('/artist/profile', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			console.log(error.response?.data, accessToken);
			if (error.response?.status === 401) {
				return null;
			}
		}
		return null;
	}
}
