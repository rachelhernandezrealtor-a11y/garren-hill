import { QueryClient } from '@tanstack/react-query';


export const queryClientInstance = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: 1,
      staleTime: 300000, // 5 minutes
      gcTime: 900000, // 15 minutes
    },
  },
});