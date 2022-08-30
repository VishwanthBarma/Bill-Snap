import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const BillSnapContext = createContext();

export const BillSnapProvider = ({ children }) => {
  const { data: session, status: sessionStatus } = useSession();
  const [appStatus, setAppStatus] = useState("noloading");

  useEffect(() => {
    if (sessionStatus == "loading") {
      setAppStatus("loading");
    } else {
      setAppStatus("noloading");
    }
  }, [sessionStatus]);

  return (
    <BillSnapContext.Provider
      value={{ appStatus, sessionStatus, session, setAppStatus }}
    >
      {children}
    </BillSnapContext.Provider>
  );
};
