import { makeStyles } from "@mui/styles";
import { useContext, useReducer, useState } from "react";
import { AppContext } from "../utils/context";
import Input from "../components/Input";
import type { TEntry } from "../utils/types";
import Quill from "../components/Quill";
import CustomButton from "../components/CustomButton";
import useError from "../hooks/useError";

const useStyles = makeStyles({
  add_new_job: {
    width: "100%",
    height: "100%",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "25px",
  },
  title: {
    color: "#14578C",
    alignSelf: "center",
    "& h2": {
      fontFamily: "Source Code Pro",
    },
  },
  new_job_content: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  employment_type: {
    height: "55px",
    width: "100%",
    maxWidth: "400px",
    alignSelf: "center",
    border: "none",
    backgroundColor: "#DADADA",
    paddingLeft: "25px",
    color: "#96949D",
    fontFamily: "Inter",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
  },
  error_placeholder: {
    height: "35px",
    width: "fit-content",
    alignSelf: "center",
    fontFamily: "Source Code Pro",
    color: "crimson",
    maxWidth: "400px",
  },
  submit_button: {
    alignSelf: "center",
    minWidth: "335px",
  },
});

const newEntry: TEntry = {
  company: "",
  location: "",
  employment_type: "PLJ",
  job_description: "",
  title: "",
};

type TTypes =
  | "company"
  | "location"
  | "employment_type"
  | "job_description"
  | "title"
  | "reset";

type TAction = {
  type: TTypes;
  payload: string;
};

function reducer(state: TEntry, action: TAction) {
  switch (action.type) {
    case "company":
      return { ...state, company: action.payload };
    case "employment_type":
      return { ...state, employment_type: action.payload as "PLJ" | "PLE" };
    case "job_description":
      return { ...state, job_description: action.payload };
    case "location":
      return { ...state, location: action.payload };
    case "title":
      return { ...state, title: action.payload };
    case "reset":
      return newEntry;
    default:
      return state;
  }
}

export default function AddNewJob() {
  const { mobileView } = useContext(AppContext);
  const classes = useStyles({ mobileView });
  const [state, dispatch] = useReducer(reducer, newEntry);
  const [awaitingSubmit, setAwaitingSubmit] = useState<boolean>(false);
  const { error, setError } = useError(4000);

  async function handleAddNewJob() {
    for (let key in state) {
      if (!state[key as keyof TEntry]) {
        setError("Please Fill All Fields ...");
        return;
      }
    }
    setAwaitingSubmit(true);
    try {
      const controller = new AbortController();
      const token = localStorage.getItem("token");
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(state),
        signal: controller.signal,
      };
      const response = await fetch(
        "http://localhost:3000/api/addNewJob",
        options
      );
      if (!response.ok) {
        setAwaitingSubmit(false);
        return;
      }
      const data = await response.json();
      setAwaitingSubmit(false);
      setError(`Job Created Successfully With ID : ${data.id}`);
      dispatch({ type: "reset", payload: "" });
    } catch (err) {
      console.log(err);
      setAwaitingSubmit(false);
    }
  }

  return (
    <div className={classes.add_new_job}>
      <div className={classes.title}>
        <h2>Add New Entry :</h2>
      </div>
      <div className={classes.new_job_content}>
        <Input
          type="text"
          label="company"
          currentValue={state.company}
          controllerFunction={(value: string) =>
            dispatch({ type: "company", payload: value })
          }
        />
        <Input
          type="text"
          label="title"
          currentValue={state.title}
          controllerFunction={(value: string) =>
            dispatch({ type: "title", payload: value })
          }
        />
        <Input
          type="text"
          label="location"
          currentValue={state.location}
          controllerFunction={(value: string) =>
            dispatch({ type: "location", payload: value })
          }
        />
        <select
          name="employment_type"
          id="employment_type"
          value={state.employment_type}
          onChange={(e) =>
            dispatch({ type: "employment_type", payload: e.target.value })
          }
          className={classes.employment_type}
        >
          <option value="PLJ">Full Time (PLJ)</option>
          <option value="PLE">Full Time (PLE)</option>
        </select>
        <Quill
          description={state.job_description}
          setDescription={(value: string) =>
            dispatch({ type: "job_description", payload: value })
          }
        />
        <div className={classes.error_placeholder}>{error}</div>
        <div className={classes.submit_button} onClick={handleAddNewJob}>
          <CustomButton
            content="Add New Job"
            color="#ffffff"
            bgColor="#424242"
            pdR={3}
            pdT={1}
            state={awaitingSubmit}
          />
        </div>
      </div>
    </div>
  );
}
