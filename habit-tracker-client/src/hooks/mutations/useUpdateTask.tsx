import { client } from "@/utils/clients";
import { ENDPOINTS } from "@/utils/api.config";
import { useMutation, UseMutationOptions } from "react-query";

export const useUpdateTaskMutation = (options?: UseMutationOptions) => {
  const fetcher = (obj: any) => {
    // const {
    //   goalId,
    //   taskName,
    //   quantity,
    //   frequency,
    //   reminders,
    //   customReminder,
    //   reminderTime,
    // } = obj;
    const payload = {
      ...obj,
    };
    console.log("🚀 ~ fetcher ~ obj:", obj);
    return client.put(`${ENDPOINTS.TASKS}/${obj.id}`, { ...payload });
  };
  // @ts-ignore : I don't know why this is not working 🙂
  return useMutation(fetcher, options);
};
