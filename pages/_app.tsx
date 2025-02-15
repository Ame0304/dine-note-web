import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { Lexend } from "next/font/google";
import { Toaster } from "react-hot-toast";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const noLayoutPages = ["/auth/login", "/auth/signup"];

  const isAuthPage = noLayoutPages.includes(router.pathname);

  return (
    <>
      <Head>
        <title>DineNote</title>
        <link rel="icon" href="logo.png" />
      </Head>
      <div
        className={`${lexend.className}  bg-primary-950 text-primary-100 min-h-screen`}
      >
        {isAuthPage ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
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
