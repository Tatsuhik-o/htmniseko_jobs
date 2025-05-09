import { makeStyles } from "@mui/styles";

const useStyle = makeStyles({
  candidature_form: {
    flex: "1",
    height: "100%",
    display: "flex",
    gap: "10px",
    flexDirection: "column",
    padding: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "25px",
  },
});

export default function CandidatureForm() {
  const classes = useStyle();
  return <div className={classes.candidature_form}></div>;
}
