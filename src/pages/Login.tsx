import { makeStyles } from "@mui/styles";
import { useContext, useState } from "react";
import { AppContext } from "../utils/context";
import useAvatar from "../hooks/useAvatar";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import { sanitizeInput } from "../utils/helpers";

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
      aspectRation: "1",
    },
  },
});

export default function Login() {
  const { mobileView } = useContext(AppContext);
  const avatar = useAvatar(250);
  const classes = useStyles({ mobileView });
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (
      !sanitizeInput("username", username) ||
      !sanitizeInput("password", password)
    ) {
      return;
    } else {
      console.log(username, password);
    }
  }

  return (
    <div className={classes.login}>
      <div className={classes.login_wrapper}>
        <div className={classes.avatar}>
          <img src={avatar} alt="" />
        </div>
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
          <CustomButton
            content="Login"
            color="#ffffff"
            bgColor="#424242"
            pdR={3}
            pdT={1}
          />
        </form>
      </div>
    </div>
  );
}
