export interface UserVerficationStoreState {
  email: string;
}

export interface UserVerficationStoreActions {
  setUserEmail: (email: string) => void;
}

export type UserVerficationStore = UserVerficationStoreState &
  UserVerficationStoreActions;
