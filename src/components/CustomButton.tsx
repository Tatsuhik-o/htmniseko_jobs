import { makeStyles } from "@mui/styles";
import { ThreeDot } from "react-loading-indicators";

const useStyles = makeStyles({
  custom_button: (props: {
    color: string;
    bgColor: string;
    pdT: number;
    pdR: number;
    borderRadius: number;
    maxWidth: number;
  }) => ({
    color: props.color,
    backgroundColor: props.bgColor,
    padding: `${props.pdT}rem ${props.pdR}rem`,
    maxWidth: `${props.maxWidth}px`,
    alignSelf: "center",
    width: "100%",
    border: `1px solid ${props.color}`,
    cursor: "pointer",
    fontFamily: "Source Code Pro",
    fontSize: "1.1rem",
    borderRadius: `${props.borderRadius}px`,
    textOverflow: "ellipsis",
    overflow: "hidden",
    textWrap: "nowrap",
  }),
});

type TCustomButton = {
  content: any;
  color: string;
  bgColor: string;
  pdT: number;
  pdR: number;
  state: boolean;
  borderRadius?: number;
  maxWidth?: number;
};

export default function CustomButton({
  content,
  color,
  bgColor,
  pdT,
  pdR,
  state,
  borderRadius = 0,
  maxWidth = 400,
}: TCustomButton) {
  const classes = useStyles({
    color,
    bgColor,
    pdT,
    pdR,
    borderRadius,
    maxWidth,
  });
  return (
    <button className={classes.custom_button} disabled={state}>
      {state ? <ThreeDot color={"#95a5a6"} size="small" /> : content}
    </button>
  );
}
