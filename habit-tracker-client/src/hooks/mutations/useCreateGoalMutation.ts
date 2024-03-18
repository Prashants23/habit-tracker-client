import { client } from "@/utils/clients";
import { ENDPOINTS } from "@/utils/api.config";
import { useMutation, UseMutationOptions } from "react-query";

export const useCreateGoalMutation = (options?: UseMutationOptions) => {
  const fetcher = (obj: {
    goalName: string;
    minTimeline: Date;
    maxTimeline: Date;
    completed: boolean;
  }) => {
    const { goalName, minTimeline, maxTimeline, completed } = obj;
    const payload = {
      goalName,
      minTimeline,
      maxTimeline,
      completed,
    };

    return client.post(`${ENDPOINTS.USER_GOALS}`, { ...payload });
  };
  // @ts-ignore : I don't know why this is not working 🙂
  return useMutation(fetcher, options);
};
