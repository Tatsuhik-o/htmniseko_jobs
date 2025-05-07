import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  careers: {},
});

export default function Careers() {
  const classes = useStyles();
  return <div className={classes.careers}>Careers</div>;
}
