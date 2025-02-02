import { createStore } from "zustand";
import { persist } from "zustand/middleware";
import { UserVerficationStore } from "./user-verification.store.interface";

const useUserVerifcationStore = createStore<UserVerficationStore>()(
  persist(
    (set) => ({
      email: "",
      setUserEmail: (email) => {
        set({ email });
      },
    }),
    { name: "user-verif" }
  )
);

export default useUserVerifcationStore;
