"use client";
import React from "react";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import Link from "next/link";
import { urls } from "@/lib/constants";
import AuthWrapper from "../_components/auth-wrapper";
import AuthActions from "../_components/auth-actions/auth-actions";
import PasswordInput from "../_components/password-input/password-input";
import { useFormik } from "formik";
import { InferType } from "yup";
import { loginSchema } from "@/lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/mutations";
import { toast } from "sonner";
const LoginPageClient = () => {
  const { mutate, status } = useMutation({
    mutationFn: loginUser,
    onSuccess({ data, error }) {
      if (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error((error.response?.data as any).message);
        return;
      }
      console.log(data);
    },
  });
  const formik = useFormik<InferType<typeof loginSchema>>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit(val) {
      mutate(val);
    },
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
        title="Sign in"
        description={
          <span>
            To upload music and videos, you must accept our{" "}
            <span className="text-custom-primary">terms</span> and{" "}
            <span className="text-custom-primary">conditions</span>{" "}
            <span className="text-custom-registration_link">
              on the registration
            </span>{" "}
            website
          </span>
        }
      >
        <h1 className="font-black text-white text-center md:text-4xl text-2xl  mb-10"></h1>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <InputWrapper
            type="email"
            placeholder="Email"
            error={formik.errors.email}
            {...formik.getFieldProps("email")}
          />
          <div>
            <PasswordInput
              placeholder="Password"
              error={formik.errors.password}
              {...formik.getFieldProps("password")}
            />
            <Link
              href={urls.forgotPassword}
              className="text-custom-primary text-14 font-plus-jakarta-sans font-medium"
            >
              Forgot your password?
            </Link>
          </div>
          <AuthActions
            btnText="Sign In"
            isDisabled={!formik.isValid || status === "pending"}
          />
        </form>
      </AuthWrapper>
    </>
  );
};

export default LoginPageClient;
