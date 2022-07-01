import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../src/gql/client";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/theme/theme";
import NoJS from "../components/nojs/nojs";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SnackbarProvider } from "notistack";
import { useRouter } from "next/router";
import { initTranslations } from "../src/i18n/i18n";
import { init } from "@socialgouv/matomo-next";
import { useEffect } from "react";
import { MATOMO_SITE_ID, MATOMO_URL } from "../src/constants";
import Script from "next/script";
import Head from "next/head";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const router = useRouter();
  initTranslations(router.locale ?? "cs");

  const initMatomo = () => {
    init({
      url: MATOMO_URL,
      siteId: MATOMO_SITE_ID,
    });
  };

  useEffect(() => {
    // initMatomo();
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme(prefersDarkMode)}>
          <SnackbarProvider className="snacks">
            <noscript>
              <NoJS />
            </noscript>
            <ApolloProvider client={client}>
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
              </QueryClientProvider>
            </ApolloProvider>
          </SnackbarProvider>
        </ThemeProvider>
        <div id="lag"></div>
      </RecoilRoot>
      <Script
        strategy="afterInteractive"
        id="matomo"
        dangerouslySetInnerHTML={{
          __html: `
         var _paq = window._paq = window._paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
  _paq.push(["setCookieDomain", "*.kdenatankuju.cz"]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//analytics.kdenatankuju.cz/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
      `,
        }}
      />
    </>
  );
};

export default MyApp;
