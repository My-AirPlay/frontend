import * as Yup from "yup";

export const onboardingBasciInfoSchema = Yup.object({
  firstName: Yup.string()
    .required("Field is required")
    .min(3, "Must be at least 3 charactes"),
  lastName: Yup.string()
    .required("Field is required")
    .min(3, "Must be at least 3 charactes"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]/gi, "Must be a number")
    .optional(),
  country: Yup.string()
    .required("Field is required")
    .min(3, "Must be at least 3 charactes"),
  city: Yup.string()
    .required("Field is required")
    .min(3, "Must be at least 3 charactes"),
  artistName: Yup.string()
    .required("Field is required")
    .min(3, "Must be at least 3 charactes"),
});

export const onboardingBankDetailSchema = Yup.object({
  bankName: Yup.string()
    .required("Field is required")
    .min(3, "Must be at least 3 charactes"),
  accountName: Yup.string()
    .required("Field is required")
    .min(3, "Must be at least 3 charactes"),
  accountNumber: Yup.string()
    .min(10, "Must be at least 3 charactes")
    .matches(/^[0-9]/gi, "Must be a number")
    .required("Field is required"),
});
export const onboardingSocialLinkSchema = Yup.object({
  instagram: Yup.string().optional().url("Invalid url"),
  twitter: Yup.string().optional().url("Invalid url"),
  facebook: Yup.string().optional().url("Invalid url"),
  soundcloud: Yup.string().optional().url("Invalid url"),
  tiktok: Yup.string().optional().url("Invalid url"),
  website: Yup.string().optional().url("Invalid url"),
});
const requiredError = "Field is required";
export const musicInfoSchema = Yup.object({
  song_title: Yup.string().required(requiredError),
  genre: Yup.string().required(requiredError),
  release_date: Yup.string().required(requiredError),
  description: Yup.string()
    .required(requiredError)
    .min(20, "Provide a well detailed description"),
  record_label: Yup.string().required(requiredError),
  publisher: Yup.string().required(requiredError),
  instruments_played: Yup.string().required(requiredError),
  lyrics: Yup.string().required(requiredError),
  explict_content: Yup.string().optional(),
  upcCode: Yup.string().required(requiredError),
  iscCode: Yup.string().required(requiredError),
  realease_version: Yup.string().required(requiredError),
  copyright: Yup.string().required(requiredError),
});
