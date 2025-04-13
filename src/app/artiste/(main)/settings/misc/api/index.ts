import APIAxios from "@/utils/axios";
import { BankFormValues, ProfileFormValues } from "../schemas";
import { useMutation } from "@tanstack/react-query";

const updateProfile = async (profile: ProfileFormValues) => {
    const bioResponse = await APIAxios.post(
        "/artist/add-biodata",
        {
            userBioData: profile,
            email: profile.email,
        },
    );
    const socialResponse = await APIAxios.post(
        "/artist/add-social-links",
        {
            userBio: profile,
            email: profile.email,
        },

    );
    // const bankResponse = await APIAxios.post(
    //     "/artist/add-bankdata",
    //     {
    //         userBankData: profile,
    //         email: profile.email,
    //     },
    // );
    // const response = await APIAxios.post(
    //     "/artist/update_profile",
    //     {
    //         userBioData: profile,
    //         email: profile.email,
    //     },
    // );
    return {
        bioResponse: bioResponse.data,
        socialResponse: socialResponse.data,
        // bankResponse: bankResponse.data,
        // response: response.data,
    };
};

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: updateProfile,
    });
};



export const forgotPasswordRequestOTP = async ({ email }: { email: string }) => {
    const { data } = await APIAxios.post("/artist/request-password-reset", {
        email,
    });
    return data;
};

export const useRequestResetPasswordOTP = () => {
    return useMutation({
        mutationFn: forgotPasswordRequestOTP,
    });
}


const updateBankData = async (profile: BankFormValues & { email: string }) => {

    const bankResponse = await APIAxios.post(
        "/artist/add-bankdata",
        {
            userBankData: profile,
            email: profile.email,
        },
    );

    return bankResponse.data;
};

export const useUpdateBankData = () => {
    return useMutation({
        mutationFn: updateBankData,
    });
};
