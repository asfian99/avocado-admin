import { useEffect } from "react";
import { ChakraProvider, extendTheme, CSSReset } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { QueryClient, QueryClientProvider } from "react-query";
import Router from "next/router";
import Head from "next/head";
import { endpoint } from "../utils/gql";

import Layout from "../components/layout";
import { customTheme } from "../components/customStyles/theme";
import { Fonts } from "../components/customStyles/Font";

const theme = extendTheme(customTheme);
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Fonts />
          <CSSReset />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </>
  );
}

const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  try {
    const jwt = parseCookies(ctx).jwt;

    if (jwt) {
      if (ctx.pathname === "/login") {
        redirectUser(ctx, "/dashboard");
      }
    }

    if (!jwt) {
      if (ctx.pathname !== "/login" && ctx.pathname !== "/") {
        redirectUser(ctx, "/login");
      }
    }

    return { msg: jwt };
  } catch (error) {
    console.log(error);
    return { msg: "You need to login first" };
  }
};

export default MyApp;
