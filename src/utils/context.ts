import { createContext } from "react";
import type { TContext } from "./types";

export const AppContext = createContext<TContext>({});
