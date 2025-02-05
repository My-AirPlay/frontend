"use client";

import CustomSelect from "@/components/custom-dropdown/custom-select";
import SettingsNav from "../_components/settings-nav/settings-nav";
import SettingsProfile from "../_components/settings-profile/settings-profile";
import PasswordInput from "@/app/(auth)/_components/password-input/password-input";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const DeleteAccountPage = () => {
  return (
    <SettingsProfile>
      <SettingsNav />
      <section className="bg-custom-banner_bg/10 max-w-[603px] w-full mx-auto rounded pt-7 pb-10 px-6">
        <h2 className="text-custom-icon-btn-border text-2xl mb-11 font-plus-jakarta-sans font-extrabold text-center">
          Delete Account
        </h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset className="flex flex-col gap-5 mb-6">
            <label
              htmlFor="reason"
              className="text-base text-white font-semibold font-plus-jakarta-sans"
            >
              Reason for Deletion?
            </label>
            <CustomSelect options={[]} placeholder="Reason" />
          </fieldset>
          <fieldset className="flex flex-col gap-5 mb-11">
            <label
              htmlFor="password"
              className="text-base text-white font-semibold font-plus-jakarta-sans"
            >
              Please enter your current password to proceed to account deletion.
            </label>
            <PasswordInput id="password" placeholder="Enter your password" />
          </fieldset>
          <small className="font-plus-jakarta-sans text-custom-error text-base font-normal mb-16  block">
            Deleting your account on AirPlay is permanent and cannot be undone.
            Please make sure that you have saved any important data before
            proceeding. <br /> If you have any doubts, you can always cancel the
            deletion process.
          </small>
          <div className="flex items-center justify-center gap-5">
            <Button
              variant={"authBtn"}
              className="bg-transparent border border-white"
              type="button"
            >
              Cancel
            </Button>
            <Button variant={"authBtn"} type="submit">
              Delete account
              <MoveRight />
            </Button>
          </div>
        </form>
      </section>
    </SettingsProfile>
  );
};

export default DeleteAccountPage;
