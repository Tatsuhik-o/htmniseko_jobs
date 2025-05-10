import { makeStyles } from "@mui/styles";
import { type InputHTMLAttributes } from "react";
import Icon from "@mdi/react";
import { mdiAccount, mdiLock, mdiConsoleLine } from "@mdi/js";
const useStyles = makeStyles({
  input: (props: { align: string }) => ({
    height: "55px",
    width: "100%",
    maxWidth: "400px",
    position: "relative",
    alignSelf: props.align,
    "& label": {
      position: "absolute",
      top: "50%",
      left: "20px",
      transform: "translateY(-50%)",
      color: "#96949D",
      display: "flex",
      alignItems: "center",
      gap: "5px",
      textTransform: "capitalize",
    },
    "& input": {
      width: "100%",
      height: "100%",
      border: "none",
      backgroundColor: "#DADADA",
      paddingLeft: "50px",
      color: "black",
      fontFamily: "Inter",
      fontSize: "1rem",
      fontWeight: "500",
    },
  }),
});

type TInput = {
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  label: string;
  currentValue: string;
  controllerFunction: (value: string) => void;
  align?: string;
};

export default function Input({
  type,
  label,
  currentValue,
  controllerFunction,
  align = "center",
}: TInput) {
  const classes = useStyles({ align });
  return (
    <div className={classes.input}>
      <label htmlFor={label}>
        <Icon
          path={
            label === "Username"
              ? mdiAccount
              : label === "password"
              ? mdiLock
              : mdiConsoleLine
          }
          size={1}
        />
        {!currentValue && label}
      </label>
      <input
        type={type}
        value={currentValue}
        onChange={(e) => controllerFunction(e.target.value)}
        id={label}
        autoComplete="on"
      />
    </div>
  );
}
