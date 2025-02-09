import { QueryCache, QueryClient } from "react-query";
import { createStandaloneToast } from "@chakra-ui/react";
import { theme } from "../theme";

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    error instanceof Error ? error.message : "error connecting to server";

  // prevent duplicate toasts
  // toast.closeAll();
  toast({ title, status: "error", variant: "subtle", isClosable: true });
}

export function generateQueryClient(): QueryClient {
  return new QueryClient({
    // defaultOptions: {
    //   queries: {
    //     onError: queryErrorHandler,
    //   },
    // },
    queryCache: new QueryCache({
      onError: queryErrorHandler,
    }),
    defaultOptions: {
      mutations: {
        onError: queryErrorHandler,
      },
    },
  });
}

// to satisfy typescript until this file has uncommented contents
export const queryClient = generateQueryClient();
