import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  login: {},
});

export default function Login() {
  const classes = useStyles();
  return <div className={classes.login}>Login</div>;
}
