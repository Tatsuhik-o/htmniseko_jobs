import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import SocialIcons from "../components/SocialIcons";

const useStyles = makeStyles({
  header: (props: { mobileView: boolean | undefined }) => ({
    width: "100%",
    height: "100px",
    display: "flex",
    justifyContent: props.mobileView ? "center" : "space-between",
    padding: props.mobileView ? "0rem" : "0rem 2rem",
  }),
  htm_logo: (props: { mobileView: boolean | undefined }) => ({
    height: "100%",
    maxWidth: props.mobileView ? "80%" : "50%",
    padding: "1rem 0rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
  }),
  social_icons_wrapper: {
    maxWidth: "50%",
  },
});

export default function Header() {
  const { mobileView } = useContext(AppContext);
  const classes = useStyles({ mobileView });
  return (
    <div className={classes.header}>
      <div className={classes.htm_logo}>
        <img src="/logo.webp" alt="" />
      </div>
      {!mobileView && (
        <div className={classes.social_icons_wrapper}>
          <SocialIcons />
        </div>
      )}
    </div>
  );
}
