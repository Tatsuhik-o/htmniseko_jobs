import { useEffect, useState } from "react";

export default function useAuth(url: string) {
  const token: string = localStorage.getItem("token") || "";
  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    const controller = new AbortController();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    };
    (async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        setIsValid(data.status as boolean);
      } catch (err) {
        console.log("Error Verifying Token ...");
      }
    })();
  }, []);

  return isValid;
}
