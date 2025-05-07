export type TContext = {
  theme?: "light" | "dark";
  mobileView?: boolean;
  setTheme?: React.Dispatch<React.SetStateAction<"light" | "dark">>;
};
