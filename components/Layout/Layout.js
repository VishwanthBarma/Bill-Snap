import React, { useContext } from "react";
import { BillSnapContext } from "../../context/BillSnapContext";
import Header from "./Header";
import Login from "./AppStatus/Login";
import Error from "./AppStatus/Error";
import Loading from "./AppStatus/Loading";

function Layout({ children }) {
  const { appStatus, loading } = useContext(BillSnapContext);
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
      <main className="px-5 lg:px-20 xl:px-56">{children}</main>
    </>
  );

  return <div>{loading ? <Loading /> : app(appStatus)}</div>;
}

export default Layout;
