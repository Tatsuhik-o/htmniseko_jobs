import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import BambooHR from "../components/BambooHR";

const useStyles = makeStyles({
  footer: (props: { mobileView: boolean | undefined }) => ({
    width: "100%",
    height: "100px",
    display: "flex",
    flexDirection: props.mobileView ? "column-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 2rem",
    gap: "10px",
  }),
  copyrights_material: (props: { mobileView: boolean | undefined }) => ({
    display: "flex",
    flexDirection: props.mobileView ? "column" : "row",
    gap: props.mobileView ? "10px" : "0px",
  }),
  combine: {
    display: "flex",
  },
  copyright_instance: {
    color: "#676260",
    fontFamily: "Inter",
    fontSize: "1rem",
    "& a": {
      textDecoration: "none",
      color: "inherit",
      fontWeight: "bold",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  },
});

export default function Footer() {
  const { mobileView } = useContext(AppContext);
  const classes = useStyles({ mobileView });
  return (
    <div className={classes.footer}>
      <div className={classes.copyrights_material}>
        <div className={classes.combine}>
          <p className={classes.copyright_instance}>
            <a href="https://www.bamboohr.com/privacy-policy">Privacy Policy</a>
          </p>
          <span>&nbsp;.&nbsp;</span>
          <p className={classes.copyright_instance}>
            <a href="https://www.bamboohr.com/terms-of-service">
              Terms of Service
            </a>
          </p>
          {!mobileView && <span>&nbsp;.&nbsp;</span>}
        </div>
        <p className={classes.copyright_instance}>
          © BambooHR All rights reserved.
        </p>
      </div>
      <BambooHR />
    </div>
  );
}
