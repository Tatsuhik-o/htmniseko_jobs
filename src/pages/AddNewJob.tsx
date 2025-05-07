import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  add_new_job: {},
});

export default function AddNewJob() {
  const classes = useStyles();
  return <div className={classes.add_new_job}>AddNewJob</div>;
}
