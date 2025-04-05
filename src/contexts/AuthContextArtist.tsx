'use client';
import { Reducer, useLayoutEffect } from 'react';
import React, {
    createContext,
    useContext,
    useReducer,
    ReactNode
} from 'react';
import { setAxiosDefaultToken } from "@/utils/axios";
import {  useRouter } from 'next/navigation';
import { clearArtistTokens, getArtistAccessToken } from '@/actions/auth/auth.action';


export interface IArtistUser {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reports: any[];
    _id: string;
    email: string;
    password: string;
    stage: string;
    hasManagement: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    verificationDetails: VerificationDetails;
    artistName: string;
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    bankDetails: BankDetails;
}

interface BankDetails {
    bankName: string;
    accountName: string;
    accountNumber: number;
    ibanSwiftCode: string | null;
    currency: string | null;
    sortCode: string | null;
    paymentOption: string | null;
}

interface VerificationDetails {
    verificationCode: string;
    reason: string;
    createdAt: string;
}



export interface ArtistAuthState {
    artist: IArtistUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isAuthenticating: boolean;
    error: string | null;
}

export const initialAuthState: ArtistAuthState = {
    artist: null,
    isAuthenticated: false,
    isLoading: false,
    isAuthenticating: true,
    error: null,
};



export type AuthActionType =
    | { type: 'SET_AUTHENTICATING'; payload: boolean }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'LOGIN_SUCCESS'; payload: IArtistUser }
    | { type: 'LOGIN_FAILURE'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'SET_ERROR'; payload: string | null };


export const authReducer: Reducer<ArtistAuthState, AuthActionType> = (state, action) => {
    switch (action.type) {
        case 'SET_AUTHENTICATING':
            return {
                ...state,
                isAuthenticating: action.payload,
            };
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                artist: action.payload,
                isAuthenticated: true,
                isLoading: false,
                isAuthenticating: false,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                artist: null,
                isAuthenticated: false,
                isLoading: false,
                isAuthenticating: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                artist: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};



interface AuthContextType extends ArtistAuthState {
    dispatch: React.Dispatch<AuthActionType>;
    logout: () => void;
    checkAuthStatus: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType>({
    ...initialAuthState,
    dispatch: () => { },
    logout: () => { },
    checkAuthStatus: async () => { },
});


export const ArtistAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    const router = useRouter();


    const logout = () => {
        clearArtistTokens();
        dispatch({ type: 'LOGOUT' });
    };

  
    const checkAuthStatus = React.useCallback(async () => {
        const token = await getArtistAccessToken();
console.log("Token in checkAuthStatus:", token)
        if (!token) {
            router.push('/login');
            dispatch({ type: 'SET_AUTHENTICATING', payload: false });
            return;
        }
        setAxiosDefaultToken(token)
        const decodedToken: { exp: number } = JSON.parse(atob(token.split('.')[1]));
        const isTokenExpired = decodedToken.exp * 1000 < Date.now();

        if (isTokenExpired) {
            await clearArtistTokens();
            dispatch({ type: 'SET_AUTHENTICATING', payload: false });
            return;
        }
        // try {
        //     setAxiosDefaultToken(token)
        //     const response = await APIAxios.get('/auth/get-user', {
        //         headers: { Authorization: `Bearer ${token}` }
        //     });
        //     dispatch({
        //         type: 'LOGIN_SUCCESS',
        //         payload: response.data?.data as IArtistUser
        //     });
        // } catch  {
        //     clearArtistTokens();
        //     dispatch({ type: 'SET_AUTHENTICATING', payload: false });
        // }
    }, [router, dispatch]);

 
    useLayoutEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus])



    return (
        <AuthContext.Provider
            value={{
                ...state,
                dispatch,
                logout,
                checkAuthStatus
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using auth context
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};