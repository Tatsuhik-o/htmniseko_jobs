import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  social_icons: {},
});

export default function SocialIcons() {
  const classes = useStyles();
  return <div className={classes.social_icons}>SocialIcons</div>;
}
