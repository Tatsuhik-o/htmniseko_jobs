import { makeStyles } from "@mui/styles";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import Loading from "../components/Loading";

const useStyles = makeStyles({
  with_auth: {
    width: "100%",
    flex: "1",
  },
});

export default function WithAuth() {
  const isAuthenticated = useAuth();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) return <Loading />;

  return (
    <div className={classes.with_auth}>
      <Outlet />
    </div>
  );
}
