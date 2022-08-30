import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export const BillSnapContext = createContext();

export const BillSnapProvider = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [appStatus, setAppStatus] = useState("noloading");

  return (
    <BillSnapContext.Provider
      value={{ appStatus, loading, user, setAppStatus }}
    >
      {children}
    </BillSnapContext.Provider>
  );
};
