import { makeStyles } from "@mui/styles";
import { type InputHTMLAttributes } from "react";
import Icon from "@mdi/react";
import { mdiAccount, mdiLock } from "@mdi/js";
const useStyles = makeStyles({
  input: {
    height: "55px",
    width: "100%",
    maxWidth: "400px",
    alignSelf: "center",
    position: "relative",
    "& label": {
      position: "absolute",
      top: "50%",
      left: "20px",
      transform: "translateY(-50%)",
      color: "#96949D",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    "& input": {
      width: "100%",
      height: "100%",
      border: "none",
      backgroundColor: "#DADADA",
      paddingLeft: "50px",
      color: "#96949D",
      fontFamily: "Inter",
      fontSize: "1rem",
    },
  },
});

type TInput = {
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  label: string;
  currentValue: string;
  controllerFunction: React.Dispatch<React.SetStateAction<string>>;
};

export default function Input({
  type,
  label,
  currentValue,
  controllerFunction,
}: TInput) {
  const classes = useStyles();
  return (
    <div className={classes.input}>
      <label htmlFor={label}>
        <Icon path={label === "Username" ? mdiAccount : mdiLock} size={1} />
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
