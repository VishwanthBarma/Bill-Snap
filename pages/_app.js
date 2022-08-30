import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout/Layout";
import { BillSnapProvider } from "../context/BillSnapContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <BillSnapProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BillSnapProvider>
    </SessionProvider>
  );
}

export default MyApp;
