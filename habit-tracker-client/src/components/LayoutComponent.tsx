import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if accessToken exists in localStorage
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      // Redirect to the login page if not authenticated
      router.push("/login");
    } else {
      // Redirect to the authenticated flow
      router.push("/home"); // Replace "/authenticated-route" with your authenticated route
    }
  }, []);

  return <>{children}</>;
};

export default Layout;
