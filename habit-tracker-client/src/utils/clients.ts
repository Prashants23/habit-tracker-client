import axios from "axios";

const createAuthorizedClient = (accessToken) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
      Authorization: accessToken ? `${accessToken}` : "",
      "Content-Type": "application/json",
    },
  });
};

let accessToken;
if (typeof window !== "undefined") {
  accessToken = JSON.parse(
    localStorage.getItem("@accessToken") || "{}"
  )?.accessToken;
}

// Initialize the client with the initial access token
let client = createAuthorizedClient(accessToken);

// Function to update the client with a new access token
export const updateClientAccessToken = (newAccessToken: string) => {
  client = createAuthorizedClient(newAccessToken);
};

export { client };
