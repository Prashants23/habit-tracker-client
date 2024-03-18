import { useLogin } from "@/hooks/mutations/useLoginSignup";
import useLocalStorage from "@/hooks/useLocalStorage";
import { updateClientAccessToken } from "@/utils/clients";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to hold validation errors
  const router = useRouter();
  const [_, setAccessToken] = useLocalStorage(
    "@accessToken",
    {} as { accessToken: string }
  );
  const { mutate: loginMutation } = useLogin({
    onSuccess: (data) => {
      setAccessToken({ accessToken: data?.data?.token });
      updateClientAccessToken(data?.data?.token);
      router.replace("/home");
    },
  });

  const validateForm = () => {
    // Basic validation for email and password
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!password.trim()) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const clearErrors = () => {
    setError(null);
  };

  const onLogin = () => {
    clearErrors(); // Clear any previous errors
    if (validateForm()) {
      loginMutation({ email: email.toLowerCase(), password });
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-10">
          Habit Tracker
        </h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <div className="space-y-4 md:space-y-6">
              {error && <p className="text-red-500">{error}</p>}{" "}
              {/* Display error message */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearErrors(); // Clear error on change
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearErrors(); // Clear error on change
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                onClick={onLogin}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href={"/signup"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
