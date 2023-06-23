import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { StateProvider } from "@/components/context/StateContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StateProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </StateProvider>
  );
}
