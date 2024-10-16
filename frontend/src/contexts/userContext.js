import { createContext } from "react";

const userData = {
  userData: null,
  setUserData: null,
};

export const UserDataContext = createContext(userData);
