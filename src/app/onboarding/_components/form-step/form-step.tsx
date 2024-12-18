import InputWrapper from "@/components/input-wrapper/input-wrapper";
import React from "react";
import { FormStepProps } from "./form-step.interface";

const FormStep = ({
  title,
  description,
  formFields,
  formik,
  children,
}: FormStepProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-inter font-semibold md:text-xl text-lg mb-2 text-custom-primary">
        {title}
      </h1>
      <p className="font-plus-jakarta-sans font-normal md:text-base max-w-[990px] text-sm flex flex-col md:block text-white md:mb-[90px] mb-[42px]">
        {description}{" "}
        <span className="text-custom-primary">
          * All fields are mandatory unless specified otherwise.
        </span>
      </p>
      <form onSubmit={formik.handleSubmit} className="">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-[26px] mb-[26px] md:mb-[56px] ">
          {formFields.map((field) => (
            <fieldset key={field.id} className="flex flex-col gap-5">
              <label
                className="font-plus-jakarta-sans text-white font-semibold md:text-base"
                htmlFor={field.id}
              >
                {field.label}
              </label>
              <InputWrapper
                id={field.id}
                {...field.props}
                {...formik.getFieldProps(field.id)}
                error={(formik.errors[field.id] as string) || ""}
                styles="h-[64px]"
              />
            </fieldset>
          ))}
        </div>
        {children}
      </form>
    </div>
  );
};

export default FormStep;
