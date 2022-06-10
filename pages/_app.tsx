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

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  return (
    <>
      <RecoilRoot>
        <ThemeProvider theme={theme(prefersDarkMode)}>
          <noscript>
            <NoJS />
          </noscript>
          <ApolloProvider client={client}>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
            </QueryClientProvider>
          </ApolloProvider>
        </ThemeProvider>
        <div id="lag"></div>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
