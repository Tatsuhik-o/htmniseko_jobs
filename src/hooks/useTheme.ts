import { useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );
  return { theme, setTheme };
}
