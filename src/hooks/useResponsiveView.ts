import { useEffect, useState } from "react";

export default function useResponsiveView(
  threshold: number = 750,
  debounceTimer: number = 100
) {
  const [mobileView, setMobileView] = useState<boolean>(
    window.innerWidth < threshold
  );

  useEffect(() => {
    let timer: number;
    const handleMobileView = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setMobileView(window.innerWidth < threshold);
      }, debounceTimer);
    };
    window.addEventListener("resize", handleMobileView);
    return () => {
      window.removeEventListener("resize", handleMobileView);
    };
  }, []);

  return mobileView;
}
