import { makeStyles } from "@mui/styles";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../utils/context";

const useStyles = makeStyles({
  main: {
    width: "100%",
    maxWidth: "1440px",
    height: "100%",
    minHeight: (props: {
      mobileView: boolean | undefined;
      currentTheme: "light" | "dark";
    }) => (props.mobileView ? "calc(100vh - 0.5rem)" : "calc(100vh - 4.5rem)"),
    backgroundColor: (props: { currentTheme: "light" | "dark" }) =>
      props.currentTheme === "light" ? "#F6F6F4" : "#1A1A1A",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
  },
  main_logic: (props: { mobileView: boolean | undefined }) => ({
    width: "100%",
    flex: "1",
    padding: props.mobileView ? "1rem" : "2rem",
    display: "flex",
  }),
});

export default function Main() {
  const { mobileView, currentTheme } = useContext(AppContext);
  const classes = useStyles({
    mobileView,
    currentTheme: currentTheme || "light",
  });
  return (
    <div className={classes.main}>
      <Header />
      <div className={classes.main_logic}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
