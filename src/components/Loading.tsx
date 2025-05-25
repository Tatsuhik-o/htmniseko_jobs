import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../utils/context";
const useStyles = makeStyles({
  loading: {
    width: "100%",
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Loading() {
  const classes = useStyles();
  const { themeMode } = useContext(AppContext);
  return (
    <Box className={classes.loading}>
      <CircularProgress
        sx={{
          width: "50px",
          height: "2px",
          color: `${themeMode.palette.primary.main} !important`,
        }}
      />
    </Box>
  );
}
