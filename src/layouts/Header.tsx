import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  header: {},
});

export default function Header() {
  const classes = useStyles();
  return <div className={classes.header}>Header</div>;
}
