import { makeStyles } from "@mui/styles";
import { useContext } from "react";
import { AppContext } from "../utils/context";
import SocialIcons from "../components/SocialIcons";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Box } from "@mui/material";

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
  theme_mode: {
    padding: "10px 15px",
    borderRadius: "25px",
    height: "fit-content",
    border: "1px solid #D1CFCF",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  social_icons_wrapper: {
    maxWidth: "50%",
  },
});

export default function Header() {
  const { mobileView, handleThemeChange, currentTheme } =
    useContext(AppContext);
  const classes = useStyles({ mobileView });
  return (
    <div className={classes.header}>
      <div className={classes.htm_logo}>
        <img src="/logo.webp" alt="" />
      </div>
      <Box className={classes.theme_mode} onClick={handleThemeChange}>
        {currentTheme === "light" ? (
          <DarkModeIcon fontSize="small" />
        ) : (
          <LightModeIcon fontSize="small" />
        )}
      </Box>
      {!mobileView && (
        <div className={classes.social_icons_wrapper}>
          <SocialIcons />
        </div>
      )}
    </div>
  );
}
