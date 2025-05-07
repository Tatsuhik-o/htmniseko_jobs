import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  custom_button: {},
});

export default function CustomButton() {
  const classes = useStyles();
  return <div className={classes.custom_button}>CustomButton</div>;
}
