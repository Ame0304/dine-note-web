import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative">
      <Navbar />

      <div className="flex-1 px-8 py-12 grid">
        <main className="max-w-7xl mx-auto w-full">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}
