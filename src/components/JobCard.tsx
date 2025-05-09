import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import type { TJobDetail } from "../utils/types";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAccountMultipleOutline, mdiMapMarkerOutline } from "@mdi/js";

const useStyles = makeStyles({
  job_card: (props: { mobileView: boolean | undefined }) => ({
    width: "100%",
    padding: "2rem",
    borderTop: "1px solid #E1DFDE",
    display: "flex",
    flexDirection: props.mobileView ? "column" : "row",
    gap: "20px",
  }),
  job_title: (props: { mobileView: boolean | undefined }) => ({
    height: props.mobileView ? "40%" : "100%",
    width: props.mobileView ? "100%" : "40%",
    fontSize: "1.1rem",
    fontFamily: "Source Code Pro",
    "& a": {
      textDecoration: "none",
      color: "#4B7AA1",
      fontSize: "1.1rem",
      fontWeight: "600",
    },
  }),
  job_location_wrapper: {
    flex: "1",
    fontSize: "0.8rem",
    display: "flex",
    fontFamily: "Inter",
    justifyContent: "space-between",
    color: "#706760",
  },
  location: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  employment_type: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
});

type TJobCard = {
  jobOffer: TJobDetail;
};

export default function JobCard({ jobOffer }: TJobCard) {
  const { mobileView } = useContext(AppContext);
  const classes = useStyles({ mobileView });
  const realLocation = jobOffer.location.replace(/[a-zA-Z0-9\s]*\s-\s/, "");

  return (
    <div className={classes.job_card}>
      <div className={classes.job_title}>
        <Link
          to={`/careers/${jobOffer.id || 0}`}
        >{`${jobOffer.company} - ${jobOffer.title}`}</Link>
      </div>
      <div className={classes.job_location_wrapper}>
        <p className={classes.location}>
          <Icon path={mdiMapMarkerOutline} size={0.8} />
          {realLocation}
        </p>
        <p className={classes.employment_type}>
          <Icon path={mdiAccountMultipleOutline} size={0.8} />
          {`Full-Time (${jobOffer.employment_type})`}
        </p>
        <p></p>
      </div>
    </div>
  );
}
