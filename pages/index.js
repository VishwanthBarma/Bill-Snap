import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bill Snap</title>
        <meta
          name="description"
          content="An app to split the bill among friends going on vacation and stop fighting over who needs to pay who."
        />
      </Head>

      {/* Header */}
      <Header />

      <main>{/* WorkSpace */}</main>
    </div>
  );
}
