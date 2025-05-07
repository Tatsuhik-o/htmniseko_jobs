import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  footer: {},
});

export default function Footer() {
  const classes = useStyles();
  return <div className={classes.footer}>Footer</div>;
}
