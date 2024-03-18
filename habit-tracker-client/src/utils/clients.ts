import axios from "axios";
import ky from "ky";

let accessToken;
if (typeof window !== "undefined") {
  // Perform localStorage action
  accessToken = localStorage.getItem("accessToken");
}

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    Authorization: accessToken && accessToken,
    "Content-Type": "application/json", // You can add more headers if needed
  },
});
