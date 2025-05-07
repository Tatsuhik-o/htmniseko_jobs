import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  with_auth: {},
});

export default function WithAuth() {
  const classes = useStyles();
  return <div className={classes.with_auth}>WithAuth</div>;
}
