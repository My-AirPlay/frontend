import InputWrapper from "@/components/input-wrapper/input-wrapper";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import React from "react";
import ArtistNameModal from "../artist-name-modal/artist-name-modal";
import { useFormik } from "formik";
import { musicInfoSchema } from "@/lib/schemas";
import { InferType } from "yup";
import CustomSelect from "@/components/custom-dropdown/custom-select";
import { GENRES, UPLOAD_STEPS } from "@/lib/constants";
import TextareaWrapper from "@/components/text-area-wrapper/text-area-wrapper";
import DateField from "@/components/date-field/date-filed";
import useUploadMusicStore from "@/stores/upload-music.store";

const MusicInfo = () => {
  const {
    musicUpload: { musicInfo },
    updateMusicUpload,
    setCurrentStep,
    setCompletedSteps,
  } = useUploadMusicStore((s) => s);
  const formik = useFormik<InferType<typeof musicInfoSchema>>({
    initialValues: musicInfo,
    onSubmit: (musicInfo) => {
      updateMusicUpload({ musicInfo });
      setCurrentStep(UPLOAD_STEPS.TRACK_UPLOAD);
      setCompletedSteps(UPLOAD_STEPS.MUSIC_INFO);
    },
    validationSchema: musicInfoSchema,
    validateOnChange: true,
  });

  return (
    <div>
      <h2 className="p-[10px] w-fit mx-auto font-inter font-semibold text-xl text-custom-primary mb-2">
        Music Info
      </h2>
      <p className="font-plus-jakarta-sans mb-10 font-normal text-base text-white max-w-[990px] mx-auto">
        Please use your real name and data. It will be used for security
        purposes to make sure you and only you have access to your account
        including withdrawals (if applicable).{" "}
        <span className="text-custom-primary">
          * All fields are mandatory unless specified otherwise.
        </span>
      </p>

      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="title"
          >
            Song Title
          </label>
          <InputWrapper
            id="title"
            placeholder="Input title"
            styles="h-[64px]"
            {...formik.getFieldProps("song_title")}
            error={formik.errors.song_title}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label className="font-plus-jakarta-sans text-white font-semibold md:text-base">
            Artist Name
          </label>

          <ArtistNameModal />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="various_artist"
          >
            Genre Selection
          </label>
          <CustomSelect
            placeholder="What is the genre of your music?"
            options={GENRES.map((genre) => ({
              label: genre,
              value: genre,
            }))}
            onChange={(val) =>
              formik.setFieldValue("genre", val, formik.submitCount > 0)
            }
            error={formik.errors.genre}
            defaultValue={formik.values.genre}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="release_yaer"
          >
            Release Date
          </label>
          <DateField
            onDateChange={(date) =>
              formik.setFieldValue("release_date", date.toISOString(), true)
            }
            error={formik.errors.release_date}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-5 mb-10">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="main_desc"
          >
            Description/Notes
          </label>
          <TextareaWrapper
            id="main_desc"
            placeholder="Write description/notes here"
            styles="h-[64px]"
            {...formik.getFieldProps("description")}
            error={formik.errors.description}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="record_label"
          >
            Record Label
          </label>
          <InputWrapper
            id="record_label"
            placeholder="Input record label"
            styles="h-[64px]"
            {...formik.getFieldProps("record_label")}
            error={formik.errors.record_label}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="publisher"
          >
            Publisher (Artist Real name)
          </label>
          <InputWrapper
            id="publisher"
            placeholder="Input Name"
            styles="h-[64px]"
            {...formik.getFieldProps("publisher")}
            error={formik.errors.publisher}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="instruments_played"
          >
            Instruments Played
          </label>
          <InputWrapper
            id="instruments_played"
            placeholder="Select Instruments"
            styles="h-[64px]"
            {...formik.getFieldProps("instruments_played")}
            error={formik.errors.instruments_played}
          />
        </fieldset>

        <fieldset className="flex flex-col gap-5 mb-10">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="lyrics"
          >
            Lyrics (Paste in lyrics box)
          </label>
          <TextareaWrapper
            id="lyrics"
            placeholder="Add Lyrics here"
            styles="h-[64px]"
            {...formik.getFieldProps("lyrics")}
            error={formik.errors.lyrics}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="explict_content"
          >
            Explicit Content
          </label>
          <InputWrapper
            id="explict_content"
            placeholder="Input restriction"
            styles="h-[64px]"
            {...formik.getFieldProps("explict_content")}
            error={formik.errors.explict_content}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="upcCode"
          >
            Universal product code(UPC)
          </label>
          <InputWrapper
            id="upcCode"
            placeholder="Input Code"
            styles="h-[64px]"
            {...formik.getFieldProps("upcCode")}
            error={formik.errors.upcCode}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="iscCode"
          >
            ISRC(International standard recording code)
          </label>
          <InputWrapper
            id="iscCode"
            placeholder="Input Code"
            styles="h-[64px]"
            {...formik.getFieldProps("iscCode")}
            error={formik.errors.iscCode}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="realease_version"
          >
            Release Version
          </label>
          <InputWrapper
            id="realease_version"
            placeholder="Input version"
            styles="h-[64px]"
            {...formik.getFieldProps("realease_version")}
            error={formik.errors.realease_version}
          />
        </fieldset>
        <fieldset className="flex flex-col gap-5">
          <label
            className="font-plus-jakarta-sans text-white font-semibold md:text-base"
            htmlFor="copyright"
          >
            Copyright
          </label>
          <InputWrapper
            id="copyright"
            placeholder="Input Copyright"
            styles="h-[64px]"
            {...formik.getFieldProps("copyright")}
            error={formik.errors.copyright}
          />
        </fieldset>
        <Button
          variant={"authBtn"}
          className="w-full max-w-[275px] mx-auto h-auth-btn"
          type="submit"
          disabled={!formik.isValid}
        >
          Track Upload <MoveRight />
        </Button>
      </form>
    </div>
  );
};

export default MusicInfo;
