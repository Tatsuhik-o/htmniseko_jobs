import { useState, useEffect } from "react";

export default function useError(threshold: number = 1000) {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let timer: number;
    if (error) {
      timer = setTimeout(() => {
        setError("");
      }, threshold);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  return { error, setError };
}
