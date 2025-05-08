import { makeStyles } from "@mui/styles";
import { ThreeDot } from "react-loading-indicators";
const useStyles = makeStyles({
  loading: {
    width: "100%",
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <ThreeDot color={"#95a5a6"} size="medium" />
    </div>
  );
}
