import React, { useContext } from "react";
import { BillSnapContext } from "../../context/BillSnapContext";
import Header from "./Header";
import Login from "./AppStatus/Login";
import Error from "./AppStatus/Error";
import Loading from "./AppStatus/Loading";

function Layout({ children }) {
  const { appStatus } = useContext(BillSnapContext);
  const app = (status = appStatus) => {
    switch (status) {
      case "noloading":
        return displayContent;
      case "error":
        return <Error />;
      default:
        return <Loading />;
    }
  };

  const displayContent = (
    <>
      <Header />
      <main>{children}</main>
    </>
  );

  return <div>{app(appStatus)}</div>;
}

export default Layout;
