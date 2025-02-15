import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";

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
      {isAuthPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}
