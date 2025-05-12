import { useEffect, useState } from "react";
import type { TEntry } from "../utils/types";
import { useNavigate } from "react-router-dom";
export default function useFetch(url: string, id: number = 0) {
  const [jobDetails, setJobDetails] = useState<TEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const response = await fetch(`${url}?id=${id}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          navigate("/careers");
          return;
        }
        const data = await response.json();
        setJobDetails(data.job as TEntry[]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url, id]);

  return { jobDetails, isLoading };
}
