"use client"
import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import APIAxios from "@/utils/axios";

export interface TStaticData {
    Currency: Record<string, string>;
    VerificationReason: Record<string, string>;
    ArtistRegistrationStage: Record<string, string>;
    ArtistActivityType: Record<string, string>;
    StreamingPlatform: Record<string, string>;
    Gender: Record<string, string>;
    Genre: Record<string, string>;
    PaymentOption: Record<string, string>;
    ArtistStatus: Record<string, string>;
    ComplaintType: Record<string, string>;
    MusicalInstrument: Record<string, string>;
    PhotoExtension: Record<string, string>;
    MediaExtension: Record<string, string>;
    ArtistContractStatus: Record<string, string>;
    DirType: Record<string, string>;
}

export interface FormattedOption {
    value: string;
    label: string;
}

export interface FormattedStaticData {
    Currency: FormattedOption[];
    VerificationReason: FormattedOption[];
    ArtistRegistrationStage: FormattedOption[];
    ArtistActivityType: FormattedOption[];
    StreamingPlatform: FormattedOption[];
    Gender: FormattedOption[];
    Genre: FormattedOption[];
    PaymentOption: FormattedOption[];
    ArtistStatus: FormattedOption[];
    ComplaintType: FormattedOption[];
    MusicalInstrument: FormattedOption[];
    PhotoExtension: FormattedOption[];
    MediaExtension: FormattedOption[];
    ArtistContractStatus: FormattedOption[];
    DirType: FormattedOption[];
}

interface StaticAppInfoContextProps {
    rawData: TStaticData | undefined;
    formattedData: FormattedStaticData | undefined;
    isLoading: boolean;
    error: Error | null;
}

const StaticAppInfoContext = createContext<StaticAppInfoContextProps | undefined>(undefined);

function convertToTitleCase(str: string): string {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

async function fetchStaticAppInfo(): Promise<TStaticData> {
    try {
        const response = await APIAxios.get(`/artist/get-statics`);
        return response.data;
    } catch (error) {
        toast.error("Failed to fetch static app info. Please try again later.");
        console.error("Failed to fetch static app info:", error);
        throw error; 
    }
}

export function StaticAppInfoProvider({ children }: { children: ReactNode }) {
    const { data: rawData, isLoading, error } = useQuery({
        queryKey: ["staticAppInfo"],
        queryFn: fetchStaticAppInfo,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24,
    });

    const formattedData = useMemo(() => {
        if (!rawData) return undefined;

        const formatted: any = {};
        
        Object.entries(rawData).forEach(([category, items]) => {
            formatted[category] = Object.entries(items || {}).map(([value, label]) => ({
                value: convertToTitleCase(value),
                label: label,
            }));
        });

        return formatted as FormattedStaticData;
    }, [rawData]);

    return (
        <StaticAppInfoContext.Provider value={{ rawData, formattedData, isLoading, error: error as Error | null }}>
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