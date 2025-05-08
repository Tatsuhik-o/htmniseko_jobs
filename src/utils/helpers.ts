import type { TInputType } from "./types";
export function sanitizeInput(inputType: TInputType, input: string): boolean {
  const usernameRegex = /^(?![_.-])(?!.*[_.-][_.-])[a-zA-Z0-9_.-]+(?<![_.-])$/;
  const passwordRegex = /^(?=.*[&@!_.-])[a-zA-Z0-9&@!_.-]{8,25}$/;

  return inputType === "username"
    ? usernameRegex.test(input)
    : passwordRegex.test(input);
}
