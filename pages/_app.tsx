import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { Lexend } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout";
import PrivateLayout from "@/components/PrivateLayout";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

const AUTH_PAGES = ["/auth/login", "/auth/signup", "/auth/callback"];
const PRIVATE_PAGES = ["/dashboard", "/recipes", "/profile"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getLayout = () => {
    if (AUTH_PAGES.includes(router.pathname)) {
      return <Component {...pageProps} />;
    }

    if (PRIVATE_PAGES.includes(router.pathname)) {
      return (
        <PrivateLayout>
          <Component {...pageProps} />
        </PrivateLayout>
      );
    }

    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  };

  return (
    <>
      <Head>
        <title>DineNote</title>
        <link rel="icon" href="logo.png" />
      </Head>
      <div
        className={`${lexend.className}  bg-primary-950 text-primary-100 min-h-screen`}
      >
        {getLayout()}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#b74735",
              color: "#faf2ea",
            },
          }}
        />
      </div>
    </>
  );
}
