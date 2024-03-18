import { client } from "@/utils/clients";
import { ENDPOINTS } from "@/utils/api.config";
import { useMutation, UseMutationOptions } from "react-query";

export const useCreateTaskMutation = (options?: UseMutationOptions) => {
  const fetcher = (obj: {
    goalId: string;
    taskName: string;
    quantity: number;
    frequency: string;
    reminders: boolean;
    customReminder: {
      days: [{ type: Number }]; // 0-6 representing Sunday to Saturday
      times: [{ type: String }]; // Array of time strings in 'hh:mm' format
    };
    reminderTime: Date;
  }) => {
    const {
      goalId,
      taskName,
      quantity,
      frequency,
      reminders,
      customReminder,
      reminderTime,
    } = obj;
    const payload = {
      goalId,
      taskName,
      quantity,
      frequency,
      reminders,
      customReminder,
      reminderTime,
    };
    return client.post(`${ENDPOINTS.TASKS}`, { ...payload });
  };
  // @ts-ignore : I don't know why this is not working 🙂
  return useMutation(fetcher, options);
};
