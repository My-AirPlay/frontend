import { useFormik } from "formik";
import React, { useMemo } from "react";
import { FormField } from "../form-step/form-step.interface";
import { onboardingBasciInfoSchema } from "@/lib/schemas";
import FormStep from "../form-step/form-step";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { OnboardingSteps } from "@/lib/constants";
import { useMutation } from "@tanstack/react-query";
import { postOnboardingPersonalDetail } from "@/lib/api/mutations/onboarding.mutation";
import { toast } from "sonner";
import { handleClientError } from "@/lib/utils";
interface OnboardingBasciDetailProps {
  setCurrentStep: (a: OnboardingSteps) => void;
  email: string;
}
const OnboardingBasciDetail = ({
  setCurrentStep,
  email,
}: OnboardingBasciDetailProps) => {
  const { mutateAsync, status } = useMutation({
    mutationFn: postOnboardingPersonalDetail,
    onSuccess(data) {
      if (!data) {
        toast.error("Something went wrong. Try again");
        return;
      }
      if (data.error) {
        handleClientError(data.error);
        return;
      }
      setCurrentStep(OnboardingSteps.BANK);
    },
  });
  const formik = useFormik({
    validateOnChange: true,
    validationSchema: onboardingBasciInfoSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      country: "",
      city: "",
      artistName: "",
    },
    onSubmit: (value) => {
      mutateAsync({
        userInfo: value,
        email,
      });
    },
  });
  const fields = useMemo<FormField[]>(() => {
    return [
      {
        id: "firstName",
        label: "First Name",
        props: {
          placeholder: "First Name",
        },
      },
      {
        id: "lastName",
        label: "Last Name",
        props: {
          placeholder: "Last Name",
        },
      },
      {
        id: "phoneNumber",
        label: "Phone Number (Optional)",
        props: {
          type: "number",
          placeholder: "Phone Number",
        },
      },
      {
        id: "country",
        label: "Country",
        props: {
          placeholder: "Input Country",
        },
      },
      {
        id: "city",
        label: "City",
        props: {
          placeholder: "Input City",
        },
      },
      {
        id: "artistName",
        label:
          "Artist Name (Please use your official Artist, Band, Songwriter Name)",
        props: {
          placeholder: "Input Name",
        },
      },
    ];
  }, []);
  return (
    <FormStep
      formFields={fields}
      formik={formik}
      title="BASIC INFORMATION"
      description="Please use your real name and data. It will be used for security purposes to make sure you and only you have access to your account including withdrawals (if applicable)."
    >
      <Button
        variant={"authBtn"}
        type="submit"
        className="max-w-[275px] h-[75px] mx-auto"
        disabled={!formik.isValid || status === "pending"}
      >
        Continue <MoveRight />
      </Button>
    </FormStep>
  );
};

export default OnboardingBasciDetail;
