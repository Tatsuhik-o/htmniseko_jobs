import { makeStyles } from "@mui/styles";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../utils/context";

const useStyles = makeStyles({
  main: {},
});

export default function Main() {
  const classes = useStyles();
  const { mobileView } = useContext(AppContext);
  return (
    <div className={classes.main}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
