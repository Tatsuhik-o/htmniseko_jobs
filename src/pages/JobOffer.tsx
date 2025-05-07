import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  job_offer: {},
});

export default function JobOffer() {
  const classes = useStyles();
  return <div className={classes.job_offer}>JobOffer</div>;
}
