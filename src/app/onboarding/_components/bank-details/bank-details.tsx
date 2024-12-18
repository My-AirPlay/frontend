import { onboardingBankDetailSchema } from "@/lib/schemas";
import { useFormik } from "formik";
import React, { useMemo } from "react";
import { FormField } from "../form-step/form-step.interface";
import FormStep from "../form-step/form-step";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const OnboardingBankDetail = () => {
  const formik = useFormik({
    validateOnChange: true,
    validationSchema: onboardingBankDetailSchema,
    initialValues: {
      bankName: "",
      accountName: "",
      accountNumber: "",
    },
    onSubmit: (value) => {
      console.log(value);
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
        id: "lastName",
        label: "Account Number",
        props: {
          type: "number",
          placeholder: "Account number",
        },
      },
      {
        id: "accountNumber",
        label: "Account Name",
        props: {
          type: "number",
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
        variant={"authBtn"}
        type="submit"
        className="max-w-[275px] h-[75px] mx-auto"
      >
        Continue <MoveRight />
      </Button>
    </FormStep>
  );
};

export default OnboardingBankDetail;
