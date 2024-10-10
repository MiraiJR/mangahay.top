import MainLayout from "@/shared/components/main-layout/Page";
import { AppProps } from "next/app";
import "@/shared/styles/global.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "swiper/css";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css/effect-cards";
import "swiper/css/autoplay";
import "react-toastify/dist/ReactToastify.css";
import { ThemProvider } from "@/shared/contexts/ThemeContext";
import { ToastContainer } from "react-toastify";
import React from "react";
import { createStore } from "zustand";
import Head from "next/head";
import "@/shared/libs/i18n";
import { queryClient } from "@/shared/libs/react-query";
import { QueryClientProvider } from "@tanstack/react-query";

const store = createStore();
const StoreContext = React.createContext<any>({});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-adsense-account"
          content="ca-pub-6188777334311255"
        ></meta>
      </Head>
      <QueryClientProvider client={queryClient}>
        <StoreContext.Provider value={store}>
          <ThemProvider>
            <MainLayout>
              <Component {...pageProps} />
              <ToastContainer position="bottom-right" autoClose={500} />
            </MainLayout>
          </ThemProvider>
        </StoreContext.Provider>
      </QueryClientProvider>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6188777334311255"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}
