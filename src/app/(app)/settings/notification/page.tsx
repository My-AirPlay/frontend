import React from "react";
import SettingsNav from "../_components/settings-nav/settings-nav";
import SettingsProfile from "../_components/settings-profile/settings-profile";
import NotificationItem from "./_components/notification-item/notification-item";

const Notifications = () => {
  return (
    <SettingsProfile>
      <SettingsNav />
      <section className="flex flex-col gap-4 max-w-[851px] ">
        <NotificationItem type="error" />
        <NotificationItem type="success" />
        <NotificationItem />
      </section>
    </SettingsProfile>
  );
};

export default Notifications;
