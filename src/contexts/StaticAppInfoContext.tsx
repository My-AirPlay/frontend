"use client"
import React, { createContext, useContext, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export interface TStaticData {
    Currency: Record<string, string>;
    VerificationReason: Record<string, string>;
    ArtistRegistrationStage: Record<string, string>;
    ArtistActivityType: Record<string, string>;
    StreamingPlatform: Record<string, string>;
    Gender: Record<string, string>;
    PaymentOption: Record<string, string>;
    ArtistStatus: Record<string, string>;
    ComplaintType: Record<string, string>;
    MusicalInstrument: Record<string, string>;
    PhotoExtension: Record<string, string>;
    MediaExtension: Record<string, string>;
    ArtistContractStatus: Record<string, string>;
    DirType: Record<string, string>;
}


interface StaticAppInfoContextProps {
    data: TStaticData | undefined;
    isLoading: boolean;
    error: Error | null;
}

const StaticAppInfoContext = createContext<StaticAppInfoContextProps | undefined>(undefined);


const API_URL = "https://backend-airplay.vercel.app";

async function fetchStaticAppInfo(): Promise<TStaticData> {
    try {
        const response = await axios.get(`${API_URL}/artist/get-statics`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch static app info:", error);
        throw error;

    }
}

export function StaticAppInfoProvider({ children }: {children: ReactNode}) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["staticAppInfo"],
        queryFn: fetchStaticAppInfo,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24, 
    });

    return (
        <StaticAppInfoContext.Provider value={{ data, isLoading, error: error as Error | null }}>
            {children}
        </StaticAppInfoContext.Provider>
    );
}

export function useStaticAppInfo() {
    const context = useContext(StaticAppInfoContext);
    if (context === undefined) {
        throw new Error("useStaticAppInfo must be used within a StaticAppInfoProvider");
    }
    return context;
}


