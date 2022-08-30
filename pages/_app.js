import Layout from "../components/Layout/Layout";
import { BillSnapProvider } from "../context/BillSnapContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <BillSnapProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BillSnapProvider>
  );
}

export default MyApp;
