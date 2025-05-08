import { useEffect, useState } from "react";

export default function useAuth(
  url: string = "http://localhost:3000/api/verifyToken"
) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    const controller = new AbortController();
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    };
    (async () => {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [url]);

  return isAuthenticated;
}
