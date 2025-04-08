import { onboardingBankDetailSchema } from "@/lib/schemas";
import { useFormik } from "formik";
import React, { useMemo } from "react";
import { FormField } from "../form-step/form-step.interface";
import FormStep from "../form-step/form-step";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { OnboardingSteps } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import { postOnbaordingBankDetail } from "@/app/artiste/(auth)/misc/api/mutations/onboarding.mutation";
import { toast } from "sonner";
import { handleClientError } from "@/lib/utils";

interface OnboardingBankDetailProps {
  setCurrentStep: (a: OnboardingSteps) => void;
  email: string;
}
const OnboardingBankDetail = ({
  setCurrentStep,
  email,
}: OnboardingBankDetailProps) => {
  const { mutateAsync, status } = useMutation({
    mutationFn: postOnbaordingBankDetail,
    onSuccess(result) {
      if (!result) {
        toast.error("Something went wrong. Try again");
        return;
      }
      if (result.error) {
        handleClientError(result.error);
        return;
      }
      setCurrentStep(OnboardingSteps.SOCIAL_LINK);
    },
  });
  const formik = useFormik({
    validateOnChange: true,
    validationSchema: onboardingBankDetailSchema,
    initialValues: {
      bankName: "",
      accountName: "",
      accountNumber: "",
    },
    onSubmit: (value) => {
      mutateAsync({
        bankDetail: value,
        email,
      });
    },
  });
  const fields = useMemo<FormField[]>(() => {
    return [
      {
        id: "bankName",
        label: "Bank Name",
        props: {
          placeholder: "Bank Name",
        },
      },
      {
        id: "accountNumber",
        label: "Account Number",
        props: {
          type: "number",
          placeholder: "Account number",
        },
      },
      {
        id: "accountName",
        label: "Account Name",
        props: {
          placeholder: "Account Name",
        },
      },
    ];
  }, []);
  return (
    <FormStep
      formFields={fields}
      formik={formik}
      title="BANK DETAILS"
      description="Please use your real name and data. It will be used for security purposes to make sure you and only you have access to your account including withdrawals (if applicable)."
    >
      <Button
        size="lg"
        type="submit"
        className="max-w-[250px] w-full rounded-full mx-auto"
        disabled={!formik.isValid || status === "pending"}
      >
        Continue <MoveRight />
      </Button>
    </FormStep>
  );
};

export default OnboardingBankDetail;
