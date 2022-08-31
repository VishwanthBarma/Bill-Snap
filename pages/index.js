import Head from "next/head";
import { useContext } from "react";
import CreateGroup from "../components/HomeGroup/CreateGroup";
import Login from "../components/Layout/AppStatus/Login";
import { BillSnapContext } from "../context/BillSnapContext";

export default function Home() {
  const { user } = useContext(BillSnapContext);
  return (
    <div>
      <Head>
        <title>Bill Snap</title>
        <meta
          name="description"
          content="An app to split the bill among friends going on vacation and stop fighting over who needs to pay who."
        />
      </Head>

      {user ? (
        <>
          <CreateGroup />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}
