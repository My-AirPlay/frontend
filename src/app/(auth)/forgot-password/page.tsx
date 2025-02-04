"use client";
import React from "react";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import AuthWrapper from "../_components/auth-wrapper";
import Link from "next/link";
import { urls } from "@/lib/constants";
import AuthActions from "../_components/auth-actions/auth-actions";
import useUserVerifcationStore from "@/stores/verification/user-verification.store";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "@/lib/schemas";
import { InferType } from "yup";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/lib/api/mutations/auth.mutations";
import { handleClientError } from "@/lib/utils";
import { toast } from "sonner";
const ForgotPasswordPage = () => {
  const { setUserEmail } = useUserVerifcationStore.getState();
  const { mutateAsync, status } = useMutation({
    mutationFn: forgotPassword,
    onSuccess({ data, error }) {
      if (error) {
        handleClientError(error);
        return;
      }
      setUserEmail(formik.values.email);
      toast.success(data.message);
    },
  });
  const formik = useFormik<InferType<typeof forgotPasswordSchema>>({
    initialValues: {
      email: "",
    },
    onSubmit(value) {
      mutateAsync(value);
    },
    validationSchema: forgotPasswordSchema,
    validateOnMount: true,
  });
  return (
    <>
      <AuthWrapper
        linkText={
          <p className="font-plus-jakarta-sans text-custom-registration_link text-lg font-normal">
            Not a member?{" "}
            <Link
              href={urls.register}
              className="font-bold text-custom-primary"
            >
              Sign up
            </Link>{" "}
            now
          </p>
        }
        title="Forgot Password"
        description="Enter your email address below and we'll email you a link to
          reset your password."
      >
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <InputWrapper
            placeholder="Email"
            {...formik.getFieldProps("email")}
            error={formik.touched.email ? formik.errors.email : ""}
          />
          <AuthActions
            btnText="Confirm"
            isDisabled={!formik.isValid || status === "pending"}
          />
        </form>
      </AuthWrapper>
    </>
  );
};

export default ForgotPasswordPage;
