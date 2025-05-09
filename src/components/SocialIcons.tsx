import { makeStyles } from "@mui/styles";
import Icon from "@mdi/react";
import { mdiLinkedin, mdiTwitter, mdiFacebook } from "@mdi/js";

const useStyles = makeStyles({
  social_icons: {
    height: "100%",
    width: "100%",
    padding: "1rem",
    gap: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    padding: "10px 15px",
    backgroundColor: "#ffffff",
    borderRadius: "25px",
    height: "fit-content",
    border: "1px solid #D1CFCF",
    "& a": {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      textDecoration: "none",
      color: "#48413F",
    },
  },
});

export default function SocialIcons() {
  const classes = useStyles();
  return (
    <div className={classes.social_icons}>
      <div className={classes.icon}>
        <a
          href="https://www.linkedin.com/company/hokkaido-tourism-management/"
          target="_blank"
        >
          <Icon path={mdiLinkedin} size={0.8} />
        </a>
      </div>
      <div className={classes.icon}>
        <a href="https://x.com/nisekojobs" target="_blank">
          <Icon path={mdiTwitter} size={0.8} />
        </a>
      </div>
      <div className={classes.icon}>
        <a href="https://www.facebook.com/htmniseko/" target="_blank">
          <Icon path={mdiFacebook} size={0.8} />
        </a>
      </div>
    </div>
  );
}
