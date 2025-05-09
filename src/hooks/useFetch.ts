import { useEffect, useState } from "react";
import type { TEntry } from "../utils/types";
export default function useFetch(url: string, id: number = 0) {
  const [jobDetails, setJobDetails] = useState<TEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const response = await fetch(`${url}?id=${id}`, {
          signal: controller.signal,
        });
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
