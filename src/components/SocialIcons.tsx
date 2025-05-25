import { makeStyles } from "@mui/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Box } from "@mui/material";

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
      color: "inherit",
    },
  },
});

export default function SocialIcons() {
  const classes = useStyles();
  return (
    <div className={classes.social_icons}>
      <Box className={classes.icon}>
        <a
          href="https://www.linkedin.com/company/hokkaido-tourism-management/"
          target="_blank"
        >
          <LinkedInIcon fontSize="small" />
        </a>
      </Box>
      <Box className={classes.icon}>
        <a href="https://x.com/nisekojobs" target="_blank">
          <TwitterIcon fontSize="small" />
        </a>
      </Box>
      <Box className={classes.icon}>
        <a href="https://www.facebook.com/htmniseko/" target="_blank">
          <FacebookIcon fontSize="small" />
        </a>
      </Box>
    </div>
  );
}
