import { makeStyles } from "@mui/styles";

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
  content: string;
  color: string;
  bgColor: string;
  pdT: number;
  pdR: number;
};

export default function CustomButton({
  content,
  color,
  bgColor,
  pdT,
  pdR,
}: TCustomButton) {
  const classes = useStyles({ color, bgColor, pdT, pdR });
  return <button className={classes.custom_button}>{content}</button>;
}
