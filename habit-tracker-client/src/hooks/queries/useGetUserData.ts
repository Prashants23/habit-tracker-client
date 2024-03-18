import { ENDPOINTS } from "@/utils/api.config";
import { client } from "@/utils/clients";
import { useQuery, UseQueryOptions } from "react-query";

// TODO : FIX THIS , this type is not user
const fetchUser = (): Promise<any> =>
  client.get(ENDPOINTS.USER_INFO).then((res) => res.data);

export const useGetUser = (options?: UseQueryOptions) =>
  useQuery<any, Error, any>(ENDPOINTS.USER_INFO, fetchUser, {
    // @ts-ignore : => FIX THIS
    select: (data) => data,
    refetchOnWindowFocus: false,
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
    retry: (failureCount, error) => {
      // @ts-ignore : type of error ?
      if (failureCount < 3 && error?.response?.status >= 500) return true; // retry on 5xx errors for 3 times
    },
    ...options,
  });
