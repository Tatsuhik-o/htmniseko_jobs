import { makeStyles } from "@mui/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../utils/context";

const useStyles = makeStyles({
  success: (props: { mobileView: boolean | undefined }) => ({
    width: "100%",
    flex: "1",
    padding: "10rem 2rem 2rem 2rem",
    backgroundColor: "#ffffff",
    borderRa: "25px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Source Code Pro",
    fontSize: "1.1rem",
    "& p": {
      width: props.mobileView ? "100%" : "50%",
      textTransform: "capitalize",
    },
  }),
});

export default function Success() {
  const { mobileView } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles({ mobileView });

  useEffect(() => {
    if (!location.state?.fromRedirect) {
      navigate("/");
    }
  }, []);

  return (
    <div className={classes.success}>
      <p>
        🎉 Application Submitted Successfully! Thank you for taking the first
        step toward joining our team. We truly appreciate your interest and the
        time you invested in your application.
      </p>
      <br />
      <br />
      <p>
        If your qualifications match our current needs, we’ll be in touch
        shortly. Until then, we wish you the very best!
      </p>
    </div>
  );
}
