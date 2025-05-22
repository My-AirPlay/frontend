'use client';
import { Reducer, useLayoutEffect } from 'react';
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import APIAxios, { setAxiosDefaultToken } from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { clearAdminTokens, getAdminAccessToken } from '@/actions/auth/auth.action';
import { AxiosError } from 'axios';
import { AppLogo } from '@/components/icons';

interface IAdminUser {
	_id: string;
	email: string;
	stage: string;
	status: string;
	AdminName: string;
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
	accountNumber: number;
	ibanSwiftCode: string;
	currency: string;
	sortCode: number;
	paymentOption: string;
	dealType: string;
	rate: number;
	paidRegistrationFee?: boolean;
}

export interface AdminAuthState {
	Admin: IAdminUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	isAuthenticating: boolean;
	error: string | null;
}

export const initialAuthState: AdminAuthState = {
	Admin: null,
	isAuthenticated: false,
	isLoading: false,
	isAuthenticating: true,
	error: null
};

export type AuthActionType = { type: 'SET_AUTHENTICATING'; payload: boolean } | { type: 'SET_LOADING'; payload: boolean } | { type: 'LOGIN_SUCCESS'; payload: IAdminUser } | { type: 'LOGIN_FAILURE'; payload: string } | { type: 'LOGOUT' } | { type: 'SET_ERROR'; payload: string | null };

export const authReducer: Reducer<AdminAuthState, AuthActionType> = (state, action) => {
	switch (action.type) {
		case 'SET_AUTHENTICATING':
			return {
				...state,
				isAuthenticating: action.payload
			};
		case 'SET_LOADING':
			return {
				...state,
				isLoading: action.payload
			};
		case 'LOGIN_SUCCESS':
			return {
				...state,
				Admin: action.payload,
				isAuthenticated: true,
				isLoading: false,
				isAuthenticating: false,
				error: null
			};
		case 'LOGIN_FAILURE':
			return {
				...state,
				Admin: null,
				isAuthenticated: false,
				isLoading: false,
				isAuthenticating: false,
				error: action.payload
			};
		case 'LOGOUT':
			return {
				...state,
				Admin: null,
				isAuthenticated: false,
				isLoading: false,
				error: null
			};
		case 'SET_ERROR':
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};

interface AuthContextType extends AdminAuthState {
	dispatch: React.Dispatch<AuthActionType>;
	logout: () => void;
	checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	...initialAuthState,
	dispatch: () => {},
	logout: () => {},
	checkAuthStatus: async () => {}
});

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, initialAuthState);
	const router = useRouter();

	const logout = (reroute?: boolean) => {
		clearAdminTokens();
		dispatch({ type: 'LOGOUT' });
		if (reroute) {
			router.replace('/admin/login');
		}
	};

	const checkAuthStatus = React.useCallback(async () => {
		const token = await getAdminAccessToken();
		if (!token) {
			router.replace('/admin/login');
			dispatch({ type: 'SET_AUTHENTICATING', payload: false });
			return;
		}
		setAxiosDefaultToken(token);
		const decodedToken: { exp: number } = JSON.parse(atob(token.split('.')[1]));
		const isTokenExpired = decodedToken.exp * 1000 < Date.now();

		if (isTokenExpired) {
			await clearAdminTokens();
			dispatch({ type: 'SET_AUTHENTICATING', payload: false });
			return;
		}

		try {
			const { data } = await APIAxios.get<IAdminUser>('/admin/profile', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
		} catch (error) {
			if (error instanceof AxiosError) {
				console.log(error.response?.data, token);
				if (error.response?.status === 401) {
					await logout();
					dispatch({ type: 'SET_AUTHENTICATING', payload: false });
				}
			}
		}
	}, [router, dispatch]);

	useLayoutEffect(() => {
		checkAuthStatus();
	}, [checkAuthStatus]);

	return (
		<AuthContext.Provider
			value={{
				...state,
				dispatch,
				logout,
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

export const useadminContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useadminContext must be used within an AuthProvider');
	}
	return context;
};

export async function getAdminProfile() {
	const accessToken = await getAdminAccessToken();

	try {
		if (!accessToken || !accessToken.trim()) return null;

		const { data } = await APIAxios.get<IAdminUser>('/admin/profile', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			}
		});

		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			console.log(error.response?.data, accessToken);
			if (error.response?.status === 401) {
				await logout();
			}
		}
		return null;
	}
}

const logout = async () => {
	try {
		await fetch('/api/auth/logout', {
			method: 'POST'
		});
	} catch (error) {
		console.error('Error during logout:', error);
	}
};
