import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";

const Layout = ({ children }) => {
  const router = useRouter();
  const [accessTokenData, _] = useLocalStorage(
    "@accessToken",
    {} as { accessToken: string }
  );
  useEffect(() => {
    const accessToken = accessTokenData.accessToken;

    if (!accessToken) {
      // Redirect to the login page if not authenticated
      router.push("/login");
    } else {
      router.push("/home");
    }
  }, []);

  return <>{children}</>;
};

export default Layout;
