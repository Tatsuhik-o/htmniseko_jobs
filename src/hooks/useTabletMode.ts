import { useEffect, useState } from "react";

export default function useTabletMode(threshold: number = 200) {
  const [tabletMode, setTabletMode] = useState<boolean>(
    window.innerWidth < 1024
  );

  useEffect(() => {
    let timer: number;
    const checkTabletMode = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setTabletMode(window.innerWidth < 1024);
      }, threshold);
    };
    window.addEventListener("resize", checkTabletMode);
    return () => {
      window.removeEventListener("resize", checkTabletMode);
    };
  }, []);

  return { tabletMode };
}
