import { ENDPOINTS } from "@/utils/api.config";
import { client } from "@/utils/clients";
import { useQuery, UseQueryOptions } from "react-query";

const fetchTasks = (id: any): Promise<any> => {
  console.log("🚀 ~ id:", id);
  return client.get(`${ENDPOINTS.TASKS}/${id?.id}`).then((res) => res.data);
};

export const useGetTasks = (id: any, options?: UseQueryOptions) =>
  useQuery<any, Error, any>([ENDPOINTS.TASKS, id], () => fetchTasks(id), {
    select: (data) => data,
    refetchOnWindowFocus: true,
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,

    retry: (failureCount, error) => {
      if (failureCount < 3 && error?.response?.status >= 500) return true; // retry on 5xx errors for 3 times
    },
    ...options,
  });
