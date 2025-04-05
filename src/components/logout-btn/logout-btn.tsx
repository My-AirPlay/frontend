import React from "react";
import { Button } from "../ui/button";
import { clearArtistTokens } from "@/actions/auth/auth.action";
import { handleClientError } from "@/lib/utils";
import { useRouter } from "nextjs-toploader/app";
import { urls } from "@/lib/constants";

const LogoutBtn = () => {
  const { replace } = useRouter();
  const logout = async () => {
    try {
      await clearArtistTokens();
      replace(urls.login);
    } catch (error) {
      handleClientError(error);
    }
  };
  return (
    <Button
      size={"lg"}
      className="font-inter rounded-[6px]  h-[58px] max-w-[180px]"
      onClick={logout}
    >
      Log Out
    </Button>
  );
};

export default LogoutBtn;
