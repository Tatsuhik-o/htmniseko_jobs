import { useEffect, useState } from "react";
import type { TJobDetail } from "../utils/types";
export default function useFetch(url: string, id: number = 0) {
  const [jobDetail, setJobDetail] = useState<TJobDetail[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const response = await fetch(`${url}/${id}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        setJobDetail(data as TJobDetail[]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [url, id]);

  return jobDetail;
}
