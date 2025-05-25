import { useCallback, useRef, useState } from "react";
import { createTheme } from "@mui/material";

export default function useThemeMode(threshold: number = 500) {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme-mode") as "light" | "dark") || "light"
  );
  const themeCooldown = useRef(false);

  const handleThemeChange = useCallback(() => {
    if (themeCooldown.current) return;
    themeCooldown.current = true;
    setCurrentTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
    localStorage.setItem(
      "theme-mode",
      currentTheme === "light" ? "dark" : "light"
    );
    let timer = setTimeout(() => {
      themeCooldown.current = false;
    }, threshold);
    return () => {
      clearTimeout(timer);
    };
  }, [currentTheme]);

  const themeMode = createTheme({
    palette: {
      mode: currentTheme,
      primary: {
        main: currentTheme === "light" ? "#3498db" : "#e74c3c",
        contrastText: currentTheme === "light" ? "#ecf0f1" : "#ecf0f1",
      },
      secondary: {
        main: currentTheme === "light" ? "#E4E3E2" : "#2A2A2A",
      },
    },
    typography: {
      fontFamily: "Source Code Pro",
      allVariants: {
        color: currentTheme === "light" ? "#3498db" : "#e74c3c",
      },
      subtitle2: {
        color: currentTheme === "light" ? "#706760" : "#E0E0E0",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {},
      },
    },
  });

  return { currentTheme, handleThemeChange, themeMode };
}
