"use client";
import React from "react";
// import ThemeHeader from "../_components/theme-header/theme-header";
import AuthWrapper from "../../_components/auth-wrapper";
import Link from "next/link";
import { urls } from "@/lib/constants";
import AuthActions from "../../_components/auth-actions/auth-actions";
import PasswordInput from "../../_components/password-input/password-input";

import { useParams } from "next/navigation";
import { useFormik } from "formik";
import { resetPasswordSchema } from "@/lib/schemas";
import { InferType } from "yup";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/lib/api/mutations/auth.mutations";
import { handleClientError } from "@/lib/utils";
const ResetPasswordPage = () => {
  const { token } = useParams();

  const { mutateAsync, status } = useMutation({
    mutationFn: resetPassword,
    onSuccess({ data, error }) {
      if (error) {
        handleClientError(error);
        return;
      }
      console.log(data);
    },
  });
  const formik = useFormik<InferType<typeof resetPasswordSchema>>({
    initialValues: {
      newPassword: "",
      confirm_password: "",
    },
    onSubmit({ newPassword }) {
      mutateAsync({
        newPassword,
        token: token as string,
      });
    },
    validateOnMount: true,
    validationSchema: resetPasswordSchema,
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
        title="Reset your password"
        description="Enter your new password carefully. The password must be 8 characters
          long"
      >
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <PasswordInput
            {...formik.getFieldProps("newPassword")}
            error={formik.touched.newPassword ? formik.errors.newPassword : ""}
            placeholder="New password"
          />
          <PasswordInput
            {...formik.getFieldProps("confirm_password")}
            error={
              formik.touched.confirm_password
                ? formik.errors.confirm_password
                : ""
            }
            placeholder="Repeat the password"
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

export default ResetPasswordPage;
