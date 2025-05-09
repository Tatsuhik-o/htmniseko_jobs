import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loading from "../components/Loading";
import Candidature from "../components/Candidature";
import JobDetail from "../components/JobDetail";
import useTabletMode from "../hooks/useTabletMode";
import { useState } from "react";

const useStyles = makeStyles({
  job_offer: {
    width: "100%",
    height: "100%",
    display: "flex",
    gap: "10px",
  },
});

export default function JobOffer() {
  const { tabletMode } = useTabletMode();
  const classes = useStyles({ tabletMode });
  const { job_id } = useParams();
  const [isApplying, setIsApplying] = useState<boolean>(false);

  const { jobDetails, isLoading } = useFetch(
    "http://localhost:3000/api/fetchJobDetails",
    Number(job_id)
  );
  if (isLoading) return <Loading />;
  return (
    <div className={classes.job_offer}>
      <JobDetail
        tabletMode={tabletMode}
        jobDetail={jobDetails[0]}
        isApplying={isApplying}
        controllerFunction={setIsApplying}
      />
      {!tabletMode && (
        <Candidature
          id={jobDetails[0].id || 0}
          tabletMode={tabletMode}
          jobDetail={jobDetails[0]}
          controllerFunction={setIsApplying}
          isApplying={isApplying}
        />
      )}
    </div>
  );
}
