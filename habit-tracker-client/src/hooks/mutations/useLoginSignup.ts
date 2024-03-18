import { client } from "@/utils/clients";
import { ENDPOINTS } from "@/utils/api.config";
import axios from "axios";
import { useMutation, UseMutationOptions } from "react-query";

export const useSignup = (options?: UseMutationOptions) => {
  const fetcher = (obj: {
    email: string;
    userName: string;
    password?: string;
  }) => {
    const { email, userName, password } = obj;
    const payload = {
      email,
      username: userName,
      password,
    };

    return client.post(`${ENDPOINTS.SIGNUP}`, { ...payload });
  };
  // @ts-ignore : I don't know why this is not working 🙂
  return useMutation(fetcher, options);
};

export const useLogin = (options?: UseMutationOptions) => {
  const fetcher = (obj: { email: string; password?: string }) => {
    const { email, password } = obj;
    const payload = {
      email,
      password,
    };

    return client.post(ENDPOINTS.LOGIN, { ...payload });
  };
  // @ts-ignore : I don't know why this is not working 🙂
  return useMutation(fetcher, options);
};
