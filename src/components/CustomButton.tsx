import { makeStyles } from "@mui/styles";
import { ThreeDot } from "react-loading-indicators";

const useStyles = makeStyles({
  custom_button: (props: {
    color: string;
    bgColor: string;
    pdT: number;
    pdR: number;
  }) => ({
    color: props.color,
    backgroundColor: props.bgColor,
    padding: `${props.pdT}rem ${props.pdR}rem`,
    maxWidth: "400px",
    alignSelf: "center",
    width: "100%",
    border: "none",
    cursor: "pointer",
    fontFamily: "Source Code Pro",
    fontSize: "1.1rem",
  }),
});

type TCustomButton = {
  content: any;
  color: string;
  bgColor: string;
  pdT: number;
  pdR: number;
  state: boolean;
};

export default function CustomButton({
  content,
  color,
  bgColor,
  pdT,
  pdR,
  state,
}: TCustomButton) {
  const classes = useStyles({ color, bgColor, pdT, pdR });
  return (
    <button className={classes.custom_button} disabled={state}>
      {state ? <ThreeDot color={"#95a5a6"} size="small" /> : content}
    </button>
  );
}
