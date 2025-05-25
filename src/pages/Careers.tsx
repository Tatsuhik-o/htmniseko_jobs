import { makeStyles } from "@mui/styles";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import JobCard from "../components/JobCard";
import { Box, Typography } from "@mui/material";

const useStyles = makeStyles({
  careers: {
    height: "100%",
    width: "100%",
    padding: "2rem",
    borderRadius: "25px",
  },
  title_card: {
    width: "100%",
    marginBottom: "20px",
    "& h2": {
      color: "#145288",
      fontFamily: "Inter",
    },
    "& p": {
      fontFamily: "Source Code Pro",
      color: "#706760",
    },
  },
});

export default function Careers() {
  const classes = useStyles();
  const { jobDetails, isLoading } = useFetch(
    "http://localhost:3000/api/fetchJobDetails"
  );

  if (isLoading) return <Loading />;

  return (
    <Box className={classes.careers}>
      <div className={classes.title_card}>
        <Typography variant="h5">Current Openings</Typography>
        <Typography variant="subtitle2">
          Thanks for checking out our job openings. See something that interests
          you? Apply here.
        </Typography>
      </div>
      {jobDetails.map((jobOffer) => {
        return <JobCard jobOffer={jobOffer} key={jobOffer.id} />;
      })}
    </Box>
  );
}
