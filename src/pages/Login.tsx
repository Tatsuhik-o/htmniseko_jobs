import { makeStyles } from "@mui/styles";
import { useContext, useLayoutEffect, useState } from "react";
import { AppContext } from "../utils/context";
import useAvatar from "../hooks/useAvatar";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import { sanitizeInput } from "../utils/helpers";
import useError from "../hooks/useError";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import { Box, Typography } from "@mui/material";

const useStyles = makeStyles({
  login: {
    width: "100%",
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  login_wrapper: (props: { mobileView: boolean | undefined }) => ({
    width: props.mobileView ? "100%" : "50%",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "& form": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  }),
  avatar: {
    alignSelf: "center",
    "& img": {
      maxWidth: "100px",
      aspectRatio: "1",
    },
  },
  error: {
    height: "20px",
    width: "100%",
    fontFamily: "Source Code Pro",
    color: "crimson",
    fontSize: "0.9rem",
    alignSelf: "center",
    maxWidth: "400px",
  },
});

export default function Login() {
  const { mobileView } = useContext(AppContext);
  const classes = useStyles({ mobileView });
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [awaitingLogin, setAwaitingLogin] = useState<boolean>(false);
  const navigate = useNavigate();
  const { error, setError } = useError(3000);
  const isAuthenticated = useAuth();
  const avatar = useAvatar(250);
  const [count, setCount] = useState<number>(0);

  useLayoutEffect(() => {
    if (isAuthenticated === true) {
      navigate("/add_new_job");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated === null) return <Loading />;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAwaitingLogin(true);
    if (
      !sanitizeInput("username", username) ||
      !sanitizeInput("password", password)
    ) {
      setError("Username & Password Must Be Secure ...");
      setAwaitingLogin(false);
      return;
    }
    try {
      const response = await fetch(
        "https://htmniseko-jobs.vercel.app/api/verifyLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/add_new_job");
      } else {
        setCount((count) => count + 1);
        count > 3
          ? setError("Try Guillermo:Guillermo@001")
          : setError("Username or Password is Incorrect ...");
      }
      setAwaitingLogin(false);
    } catch (err) {
      setError("Server Error. Please try again later.");
      setAwaitingLogin(false);
    }
  }

  return (
    isAuthenticated === false && (
      <div className={classes.login}>
        <div className={classes.login_wrapper}>
          <div className={classes.avatar}>
            <img src={avatar} alt="" />
          </div>
          <Typography variant="subtitle2" className={classes.error}>
            {error}
          </Typography>
          <form onSubmit={handleSubmit} name="login">
            <Input
              type="text"
              label="Username"
              currentValue={username}
              controllerFunction={setUsername}
            />
            <Input
              type="password"
              label="Password"
              currentValue={password}
              controllerFunction={setPassword}
            />
            <Box
              sx={{
                width: "100%",
                alignSelf: "center",
                display: "flex",
                justifyContent: "center",
                bgcolor: "transparent",
                border: "none",
              }}
              onClick={handleSubmit}
            >
              <CustomButton
                content="Login"
                pdR={3}
                pdT={1}
                state={awaitingLogin}
              />
            </Box>
          </form>
        </div>
      </div>
    )
  );
}
