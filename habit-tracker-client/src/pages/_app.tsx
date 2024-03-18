import "@/styles/globals.css";
import { HTTPError } from "ky";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-datepicker/dist/react-datepicker.css";
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: (failureCount, error: HTTPError) => {
        if (failureCount < 3 && error?.response?.status >= 500) return true; // retry on 5xx errors for 3 times
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      onError: async (error: HTTPError) => {
        const data = await error.response?.json();
      },
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
