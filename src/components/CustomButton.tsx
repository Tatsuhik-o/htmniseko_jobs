import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";

const useStyles = makeStyles({
  custom_button: (props: {
    pdT: number;
    pdR: number;
    borderRadius: number;
    maxWidth: number;
  }) => ({
    padding: `${props.pdT}rem ${props.pdR}rem`,
    maxWidth: `${props.maxWidth}px`,
    alignSelf: "center",
    width: "100%",
    cursor: "pointer",
    fontFamily: "Source Code Pro",
    fontSize: "1.1rem",
  }),
});

type TCustomButton = {
  content: any;
  pdT: number;
  pdR: number;
  state: boolean;
  borderRadius?: number;
  maxWidth?: number;
  customVariant?: "contained" | "outlined";
};

export default function CustomButton({
  content,
  pdT,
  pdR,
  state,
  borderRadius = 0,
  maxWidth = 400,
  customVariant = "contained",
}: TCustomButton) {
  const classes = useStyles({
    pdT,
    pdR,
    borderRadius,
    maxWidth,
  });

  return (
    <Button
      variant={customVariant}
      className={classes.custom_button}
      disabled={state}
      sx={{
        borderRadius: `${borderRadius}px`,
        py: "0.75rem",
        px: "1.5rem",
      }}
    >
      <Typography variant="subtitle2" sx={{ zIndex: "5", color: "#fff" }}>
        {state ? <CircularProgress /> : content}
      </Typography>
    </Button>
  );
}
