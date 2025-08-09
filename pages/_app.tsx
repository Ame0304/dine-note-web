import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Head from "next/head";
import { Lexend } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Layout from "@/components/Layout";
import PrivateLayout from "@/components/PrivateLayout";
import { UserProvider } from "@/context/UserContext";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
});

const AUTH_PAGES = ["/auth/login", "/auth/signup", "/auth/callback"];
const PRIVATE_PAGES = [
  "/dashboard",
  "/recipes",
  "/profile",
  "/recipes/[recipeId]",
  "/meal-plans",
  "/orders",
];

const PUBLIC_SHARE_RECIPE_PREFIX = "/share/recipes/";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const getLayout = () => {
    // Auth page layout
    if (AUTH_PAGES.includes(router.pathname)) {
      return <Component {...pageProps} />;
    }
    // Private page layout
    if (PRIVATE_PAGES.includes(router.pathname)) {
      return (
        <UserProvider>
          <PrivateLayout>
            <Component {...pageProps} />
          </PrivateLayout>
        </UserProvider>
      );
    }

    if (router.pathname.startsWith(PUBLIC_SHARE_RECIPE_PREFIX)) {
      return (
        <Layout isSharePage={true}>
          <Component {...pageProps} />
        </Layout>
      );
    }
    // Public page layout
    return (
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    );
  };

  return (
    <>
      <Head>
        <title>DineNote</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div
        className={`${lexend.className} bg-gradient-to-br from-primary-950 via-orange-100/30 to-blue-100/20 text-primary-100 min-h-screen`}
      >
        {getLayout()}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: "#98D8EF",
              color: "#fff4e5",
            },
          }}
        />
      </div>
    </>
  );
}
