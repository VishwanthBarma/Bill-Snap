import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import CreateGroup from "../components/Group/CreateGroup";
import Login from "../components/Layout/AppStatus/Login";
import Header from "../components/Layout/Header";
import { BillSnapContext } from "../context/BillSnapContext";

export default function Home() {
  const { session } = useContext(BillSnapContext);
  return (
    <div>
      <Head>
        <title>Bill Snap</title>
        <meta
          name="description"
          content="An app to split the bill among friends going on vacation and stop fighting over who needs to pay who."
        />
      </Head>

      {session ? (
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
