"use client";
import { onboardingSocialLinkSchema } from "@/lib/schemas";
import { useFormik } from "formik";
import React, { useMemo } from "react";
import { FormField } from "../form-step/form-step.interface";
import FormStep from "../form-step/form-step";
import { Button } from "@/components/ui/button";

const OnboardingSocialMedia = () => {
  const formik = useFormik({
    validateOnChange: true,
    validationSchema: onboardingSocialLinkSchema,
    initialValues: {
      instagram: "",
      twitter: "",
      facebook: "",
      soundcloud: "",
      tiktok: "",
      website: "",
    },
    onSubmit: (value) => {
      console.log(value);
    },
  });
  const fields = useMemo<FormField[]>(() => {
    return [
      {
        id: "instagram",
        label: "Instagram",
        props: {
          placeholder: "Social Link",
        },
      },

      {
        id: "twitter",
        label: "X (Formally Twitter)",
        props: {
          placeholder: "Social Link",
        },
      },
      {
        id: "facebook",
        label: "Facebook",
        props: {
          placeholder: "Social Link",
        },
      },
      {
        id: "tiktok",
        label: "TikTok",
        props: {
          placeholder: "Social Link",
        },
      },
      {
        id: "website",
        label: "Website",
        props: {
          placeholder: "Social Link",
        },
      },
    ];
  }, []);
  return (
    <div>
      <FormStep
        formFields={fields}
        formik={formik}
        title="SOCIAL MEDIA LINKS"
        description="Please use your real name and data. It will be used for security purposes to make sure you and only you have access to your account including withdrawals (if applicable)."
      >
        <div className="flex justify-between md:items-center gap-12 w-full md:flex-row flex-col">
          <Button
            variant={"authBtn"}
            className="max-w-[275px] bg-transparent border-2 border-white h-[75px] "
          >
            Skip
          </Button>
          <Button
            variant={"authBtn"}
            type="submit"
            className="max-w-[275px] h-[75px] "
          >
            Submit
          </Button>
        </div>
      </FormStep>
    </div>
  );
};

export default OnboardingSocialMedia;
