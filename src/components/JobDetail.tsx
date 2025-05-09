import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import type { TEntry } from "../utils/types";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiChevronLeft } from "@mdi/js";
import CustomButton from "./CustomButton";
import CandidatureForm from "./CandidatureForm";

const useStyle = makeStyles({
  job_detail: {
    flex: "1",
    height: "100%",
    display: "flex",
    gap: "10px",
    flexDirection: "column",
    padding: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "25px",
  },
  back_to_jobs: {
    width: "fit-content",
    height: "fit-content",
    "& > a": {
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      color: "#676260",
      fontSize: "0.9rem",
      fontFamily: "Inter",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
  head_info: (props: { mobileView: boolean | undefined }) => ({
    display: "flex",
    flexDirection: props.mobileView ? "column" : "row",
    justifyContent: "space-between",
    gap: "20px",
  }),
  job_head_info: {
    flex: "1.1",
  },
  title: {
    padding: "0.5rem",
    fontSize: "1.3rem",
    color: "#1452A7",
    fontWeight: "600",
  },
  location: {
    padding: "0rem 0.5rem",
    fontSize: "0.8rem",
  },
  apply: {
    flex: "0.9",
  },
  extra_details: (props: { mobileView: boolean | undefined }) => ({
    width: "100%",
    display: "flex",
    flexDirection: props.mobileView ? "column" : "row",
    justifyContent: "space-between",
    padding: "0.5rem",
    marginTop: "10px",
    gap: "5px",
  }),
  extra: (props: { mobileView: boolean | undefined }) => ({
    display: "flex",
    flexDirection: props.mobileView ? "row" : "column",
    gap: "20px",
    fontSize: "0.8rem",
    "& p:first-child": {
      minWidth: "140px",
    },
    "& p:nth-child(2)": {
      fontFamily: "Source Code Pro",
      fontWeight: "500",
    },
  }),
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#E7E5E4",
  },
  job_description: (props: { mobileView: boolean | undefined }) => ({
    width: "100%",
    padding: props.mobileView ? "0rem" : "1rem",
    "& ol": {
      listStyleType: "disc",
      "& li": {
        marginLeft: props.mobileView ? "2rem" : "5rem",
      },
    },
    "& p:has(+ol)": {
      marginBottom: "1rem",
      fontWeight: "600",
    },
  }),
});

type TJobDetail = {
  tabletMode: boolean;
  jobDetail: TEntry;
  isApplying: boolean;
  controllerFunction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function JobDetail({
  tabletMode,
  jobDetail,
  isApplying,
  controllerFunction,
}: TJobDetail) {
  const { mobileView } = useContext(AppContext);
  const classes = useStyle({ mobileView });
  const departement = jobDetail.location.split("-")[0];
  return (
    <div className={classes.job_detail}>
      <div className={classes.back_to_jobs}>
        <Link to={"/"}>
          <Icon path={mdiChevronLeft} size={1} /> Job Openings
        </Link>
      </div>
      <div className={classes.head_info}>
        <div className={classes.job_head_info}>
          <div className={classes.title}>
            {jobDetail.company} - {jobDetail.title}
          </div>
          <div className={classes.location}>{jobDetail.location}</div>
        </div>
        {tabletMode && (
          <div
            className={classes.apply}
            onClick={() => controllerFunction((prev) => !prev)}
          >
            <CustomButton
              color={isApplying ? "#145288" : "#ffffff"}
              content={
                isApplying ? "View Job Description" : "Apply For This Job"
              }
              bgColor={isApplying ? "#ffffff" : "#145288"}
              pdR={1.5}
              pdT={1}
              state={false}
              borderRadius={25}
              maxWidth={1000}
            />
          </div>
        )}
      </div>
      {tabletMode && (
        <div className={classes.extra_details}>
          <div className={classes.extra}>
            <p>Departement</p>
            <p>{departement}</p>
          </div>
          <div className={classes.extra}>
            <p>Employment Type</p>
            <p>{`Full-Time(${jobDetail.employment_type})`}</p>
          </div>
          <div className={classes.extra}>
            <p>Minimum Experience</p>
            <p>Mid-Senior</p>
          </div>
          <div className={classes.extra}>
            <p>Compensation</p>
            <p>4.8 - 5.7m</p>
          </div>
        </div>
      )}
      <div className={classes.divider}></div>
      {isApplying ? (
        <CandidatureForm />
      ) : (
        <div
          className={classes.job_description}
          dangerouslySetInnerHTML={{ __html: jobDetail.job_description }}
        ></div>
      )}
      {tabletMode && !isApplying && (
        <div onClick={() => controllerFunction((prev) => !prev)}>
          <CustomButton
            color={isApplying ? "#145288" : "#ffffff"}
            content={isApplying ? "View Job Description" : "Apply For This Job"}
            bgColor={isApplying ? "#ffffff" : "#145288"}
            pdR={1.5}
            pdT={1}
            state={false}
            borderRadius={25}
            maxWidth={1000}
          />
        </div>
      )}
    </div>
  );
}
