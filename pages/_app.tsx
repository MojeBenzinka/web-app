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

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const router = useRouter();
  initTranslations(router.locale ?? "cs");

  return (
    <>
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
    </>
  );
};

export default MyApp;
