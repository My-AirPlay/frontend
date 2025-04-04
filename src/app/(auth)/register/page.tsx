"use client";
import React, { useState } from "react";
import { urls } from "@/lib/constants";

import AuthWrapper from "../misc/components/auth-wrapper";
import { Check } from "lucide-react";
import InputWrapper from "@/components/input-wrapper/input-wrapper";
import Link from "next/link";
import AuthActions from "../misc/components/auth-actions";
import PasswordInput from "../misc/components/password-input/password-input";
import { useFormik } from "formik";
import { registerSchema } from "@/lib/schemas";
import { InferType } from "yup";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/app/(auth)/misc/api/mutations/auth.mutations";
import { toast } from "sonner";
import useUserVerifcationStore from "@/stores/verification/user-verification.store";
import { useRouter } from "nextjs-toploader/app";

const SingupPage = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const { setUserEmail } = useUserVerifcationStore.getState();
  const { mutateAsync, status } = useMutation({
    mutationFn: registerUser,
    onSuccess({ error, data }) {
      if (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        toast.error((error.response as any)?.data.message as string);

        return;
      }
      toast.success(
        "Your account has been created. Check your email to verify your acount"
      );

      setUserEmail(data.email);
      router.push(urls.verification);
    },
  });
  const formik = useFormik<InferType<typeof registerSchema>>({
    initialValues: {
      confirm_password: "",
      email: "",
      password: "",
    },
    onSubmit: (val) => {
      mutateAsync(val);
    },
    validationSchema: registerSchema,
  });
  return (
    <>
      <AuthWrapper
        linkText={
          <p className="font-plus-jakarta-sans text-custom-registration_link text-lg font-normal">
            Already a member?{" "}
            <Link href={urls.login} className="font-bold text-custom-primary">
              Sign In
            </Link>{" "}
          </p>
        }
        title=" Sign up"
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
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <InputWrapper
            error={formik.errors.email}
            type="email"
            {...formik.getFieldProps("email")}
            placeholder="Email"
          />

          <PasswordInput
            error={formik.errors.password}
            {...formik.getFieldProps("password")}
            placeholder="Password"
          />
          <PasswordInput
            error={formik.errors.confirm_password}
            {...formik.getFieldProps("confirm_password")}
            placeholder="Confirm Password"
          />

          <AuthActions
            isDisabled={!formik.isValid || !checked || status === "pending"}
            btnText="Sign up"
          />
          <div className="flex items-center gap-1">
            <button
              onClick={() => setChecked((prev) => !prev)}
              type="button"
              className="h-5 text-white rounded-sm w-5 bg-custom-check-box flex justify-center items-center"
            >
              {checked && <Check />}
            </button>
            <small className="font-plus-jakarta-sans text-custom-registration_link text-lg font-normal">
              I read and accepted the{" "}
              <span className="text-custom-primary">terms</span> and{" "}
              <span className="text-custom-primary">conditions</span>
            </small>
          </div>
        </form>
      </AuthWrapper>
    </>
  );
};

export default SingupPage;
