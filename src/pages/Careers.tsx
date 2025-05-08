import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  careers: {
    height: "100%",
  },
  test: { height: "100px", width: "100%" },
});

export default function Careers() {
  const classes = useStyles();
  return <div className={classes.careers}></div>;
}
