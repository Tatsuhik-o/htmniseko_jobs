import { makeStyles } from "@mui/styles";
import CustomButton from "./CustomButton";
import SocialIcons from "./SocialIcons";
import { Box } from "@mui/material";

const useStyles = makeStyles({
  candidature_wrapper: {
    minWidth: "200px",
    minHeight: "200px",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  candidature: {
    minWidth: "200px",
    minHeight: "200px",
    height: "fit-content",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#C6C2BF",
    margin: "1rem 0rem",
  },
  share: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    "& label": {
      fontFamily: "Source Code Pro",
      fontSize: "0.9rem",
    },
    "& input": {
      width: "100%",
      height: "35px",
      border: "1px solid #C6C2BF",
      borderRadius: "25px",
      paddingLeft: "10px",
    },
  },
  other_info: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "& > *": {
      border: "1px solid black",
    },
  },
});

type TCandidature = {
  id: number;
  tabletMode: boolean;
  isApplying: boolean;
  controllerFunction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Candidature({
  id,
  tabletMode,
  controllerFunction,
  isApplying,
}: TCandidature) {
  const classes = useStyles();

  return (
    <div className={classes.candidature_wrapper}>
      <Box className={classes.candidature}>
        <div onClick={() => controllerFunction((prev) => !prev)}>
          <CustomButton
            color={isApplying ? "#145288" : "#ffffff"}
            content={isApplying ? "View Job Description" : "Apply For This Job"}
            bgColor={isApplying ? "#ffffff" : "#145288"}
            pdR={1.5}
            pdT={1}
            state={false}
            borderRadius={25}
          />
        </div>
        <div className={classes.divider}></div>
        <div className={classes.share}>
          <label htmlFor="share">Link to This Job</label>
          <input
            type="text"
            readOnly
            value={`https://localhost:3000/careers/${id}`}
            name="share"
            id="share"
          />
        </div>
        <SocialIcons />
      </Box>
      {!tabletMode && <div className={classes.other_info}></div>}
    </div>
  );
}
