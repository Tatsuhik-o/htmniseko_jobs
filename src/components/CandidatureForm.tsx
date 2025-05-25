import { makeStyles } from "@mui/styles";
import Input from "./Input";
import type { TApplication } from "../utils/types";
import { useContext, useReducer, useState, useRef } from "react";
import { AppContext } from "../utils/context";
import { countries, radiosInfo } from "../utils/helpers";
import Icon from "@mdi/react";
import { mdiUploadOutline } from "@mdi/js";
import RadioGroup from "./RadioGroup";
import CustomButton from "./CustomButton";
import useError from "../hooks/useError";
import { useNavigate } from "react-router-dom";
import { Box, FormControl, Typography } from "@mui/material";

const useStyle = makeStyles({
  candidature_form: {
    flex: "1",
    height: "100%",
    display: "flex",
    gap: "15px",
    flexDirection: "column",
    padding: "2rem",
    backgroundColor: "#ffffff",
    borderRadius: "25px",
  },
  group: (props: { mobileView: boolean | undefined }) => ({
    width: "100%",
    display: "flex",
    flexDirection: props.mobileView ? "column" : "row",
    gap: "15px",
  }),
  country: {
    height: "55px",
    width: "fit-content",
    border: "none",
    backgroundColor: "#DADADA",
    paddingLeft: "25px",
    color: "#96949D",
    fontFamily: "Inter",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#D4D2D0",
    margin: "1rem 0rem",
  },
  resume: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "& label": {
      paddingLeft: "5px",
    },
  },
  cover: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    "& label": {
      paddingLeft: "5px",
    },
  },
  resume_input: {
    display: "flex",
    gap: "10px",
    width: "100%",
    alignItems: "center",
    "& button": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "0.5rem 1rem",
      borderRadius: "25px",
      border: "none",
      color: "black",
      fontFamily: "Inter",
      fontSize: "1rem",
      fontWeight: "500",
      cursor: "pointer",
    },
  },
  textArea: {
    minHeight: "100px",
    maxWidth: "500px",
    width: "100%",
    border: "none",
    fontFamily: "Inter",
    fontSize: "1rem",
    fontWeight: "500",
    paddingLeft: "10px",
    paddingTop: "10px",
  },
  radios: {
    display: "flex",
    flexDirection: "column",
    gap: "50px",
  },
  is_applying: {
    maxWidth: (props: { mobileView: boolean | undefined }) =>
      props.mobileView ? "100%" : "75%",
    alignSelf: "center",
    display: "flex",
    justifyContent: "center",
  },
  error: {
    width: "100%",
    height: "20px",
    alignSelf: "center",
    color: "crimson",
    fontFamily: "Source Code Pro",
    marginTop: "25px",
    textTransform: "capitalize",
    display: "flex",
    justifyContent: "center",
  },
});

const newApplication: TApplication = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  zipCode: "",
  country: "Japan",
  date: "",
  pay: "",
  education: "",
  languageProficiency: "",
  hearingAboutUs: "",
  driverLicense: null,
  visaType: null,
  smoke: null,
  criminal: null,
  feedback: null,
};

const requiredFields: (keyof TApplication)[] = [
  "firstName",
  "lastName",
  "email",
  "country",
];

type TAction = {
  type: keyof typeof newApplication;
  payload: string;
};

function reducer(state: TApplication, action: TAction): TApplication {
  return {
    ...state,
    [action.type]: action.payload,
  };
}

export default function CandidatureForm() {
  const [state, dispatch] = useReducer(reducer, newApplication);
  const { mobileView, themeMode, currentTheme } = useContext(AppContext);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState<File | string>("No File Chosen");
  const [cover, setCover] = useState<File | string>("No File Chosen");
  const classes = useStyle({ mobileView });
  const [isApplying, setIsApplying] = useState<boolean>(false);
  const { error, setError } = useError(2000);
  const navigate = useNavigate();

  const handleResumeClick = () => {
    if (resumeInputRef.current) {
      resumeInputRef.current.click();
    }
  };

  const handleCoverClick = () => {
    if (coverInputRef.current) {
      coverInputRef.current.click();
    }
  };

  const handleApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    for (let required of requiredFields) {
      if (!state[required as keyof TApplication]) {
        setError(`${required} Is Required`);
        return;
      }
    }
    if (!(resume instanceof File) || !(cover instanceof File)) {
      setError("Both Resume & Cover Are Required");
      return;
    }
    setIsApplying(true);
    const formData = new FormData();
    for (let key in state) {
      formData.append(key, String(state[key as keyof TApplication] || ""));
    }
    formData.append("attachement", resume);
    formData.append("attachement", cover);

    try {
      const options = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(
        "http://localhost:3000/api/receiveApplication",
        options
      );
      if (response.ok) {
        setIsApplying(false);
        navigate("/success", { state: { fromRedirect: true } });
        return;
      }
      setIsApplying(false);
    } catch (err) {
      console.log(err);
      setIsApplying(false);
      setError("Failed to Send Application");
    }
  };

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList | null };
  }

  const handleResumeChange = (e: FileChangeEvent): void => {
    const file = e.target.files?.[0];
    setResume(file ? file : "No File Selected");
  };
  const handleCoverChange = (e: FileChangeEvent): void => {
    const file = e.target.files?.[0];
    setCover(file ? file : "No File Selected");
  };

  return (
    <FormControl
      className={classes.candidature_form}
      onSubmit={handleApplication}
      sx={{
        bgcolor: themeMode.palette.background.default,
      }}
    >
      <Box className={classes.group} sx={{ border: "none" }}>
        <Input
          label="First Name"
          currentValue={state.firstName}
          controllerFunction={(value) =>
            dispatch({ type: "firstName", payload: value as string })
          }
          type="text"
          align="flex-start"
        />
        <Input
          label="Last Name"
          currentValue={state.lastName}
          controllerFunction={(value) =>
            dispatch({ type: "lastName", payload: value as string })
          }
          type="text"
          align="flex-start"
        />
      </Box>
      <Input
        label="Email"
        currentValue={state.email}
        controllerFunction={(value) =>
          dispatch({ type: "email", payload: value as string })
        }
        type="email"
        align="flex-start"
      />
      <Input
        label="Phone Number"
        currentValue={state.phone}
        controllerFunction={(value) =>
          dispatch({ type: "phone", payload: value as string })
        }
        type="text"
        align="flex-start"
      />
      <Input
        label="Address"
        currentValue={state.address}
        controllerFunction={(value) =>
          dispatch({ type: "address", payload: value as string })
        }
        type="text"
        align="flex-start"
      />
      <div className={classes.group}>
        <Input
          label="City"
          currentValue={state.city}
          controllerFunction={(value) =>
            dispatch({ type: "city", payload: value as string })
          }
          type="text"
          align="flex-start"
        />
        <Input
          label="Province"
          currentValue={state.province}
          controllerFunction={(value) =>
            dispatch({ type: "province", payload: value as string })
          }
          type="text"
          align="flex-start"
        />
        <Input
          label="Zip Code"
          currentValue={state.zipCode}
          controllerFunction={(value) =>
            dispatch({ type: "zipCode", payload: value as string })
          }
          type="text"
          align="flex-start"
        />
      </div>
      <select
        name="employment_type"
        id="employment_type"
        value={state.country}
        onChange={(e) => dispatch({ type: "country", payload: e.target.value })}
        className={classes.country}
        style={{
          backgroundColor: currentTheme === "light" ? "#DADADA" : "#1A1A1A",
          color: currentTheme === "light" ? "#1A1A1A" : "#DADADA",
        }}
      >
        {countries.map((country) => {
          return (
            <option value={country} key={country}>
              {country}
            </option>
          );
        })}
      </select>
      <div className={classes.divider}></div>
      <Box className={classes.cover} sx={{ border: "none" }}>
        <label htmlFor="cover">Cover Letter*</label>
        <div className={classes.resume_input}>
          <input
            type="file"
            ref={coverInputRef}
            onChange={handleCoverChange}
            style={{ display: "none" }}
            id="cover"
          />
          <button
            onClick={handleCoverClick}
            style={{
              backgroundColor: currentTheme === "light" ? "#DADADA" : "#1A1A1A",
            }}
          >
            <Icon path={mdiUploadOutline} size={1} /> Choose File
          </button>
          <span style={{ color: "crimson" }}>
            {cover instanceof File ? cover.name : "No File Chosen"}
          </span>
        </div>
      </Box>
      <Box className={classes.resume} sx={{ border: "none" }}>
        <label htmlFor="resume">Resume*</label>
        <div className={classes.resume_input}>
          <input
            type="file"
            ref={resumeInputRef}
            onChange={handleResumeChange}
            style={{ display: "none" }}
            id="resume"
          />
          <button
            onClick={handleResumeClick}
            style={{
              backgroundColor: currentTheme === "light" ? "#DADADA" : "#1A1A1A",
            }}
          >
            <Icon path={mdiUploadOutline} size={1} /> Choose File
          </button>
          <span style={{ color: "crimson" }}>
            {resume instanceof File ? resume.name : "No File Chosen"}
          </span>
        </div>
      </Box>
      <Input
        label="Salary Expectations"
        currentValue={state.pay || ""}
        controllerFunction={(value) =>
          dispatch({ type: "pay", payload: value as string })
        }
        type="text"
        align="flex-start"
      />
      <div className={classes.divider}></div>
      <textarea
        name="languageProficiency"
        id="languageProficiency"
        className={classes.textArea}
        placeholder="How much Japanese/English do you speak?/日本語及び英語はどの程度話せますか。"
        value={state.languageProficiency || ""}
        onChange={(e) =>
          dispatch({ type: "languageProficiency", payload: e.target.value })
        }
        style={{
          backgroundColor: currentTheme === "light" ? "#DADADA" : "#1A1A1A",
          color: currentTheme === "light" ? "#1A1A1A" : "#DADADA",
        }}
      ></textarea>
      <textarea
        name="hearingAboutUs"
        id="hearingAboutUs"
        className={classes.textArea}
        placeholder="Where did you hear of this vacancy? /この求人はどちらでご覧になられましたか。"
        value={state.hearingAboutUs || ""}
        onChange={(e) =>
          dispatch({ type: "hearingAboutUs", payload: e.target.value })
        }
        style={{
          backgroundColor: currentTheme === "light" ? "#DADADA" : "#1A1A1A",
          color: currentTheme === "light" ? "#1A1A1A" : "#DADADA",
        }}
      ></textarea>
      <textarea
        name="feedback"
        id="feedback"
        className={classes.textArea}
        placeholder="Why do you want to move to Niseko & work for HTM? /なぜ、ニセコ/HTMで働きたいですか。"
        value={state.feedback || ""}
        onChange={(e) =>
          dispatch({ type: "feedback", payload: e.target.value })
        }
        style={{
          backgroundColor: currentTheme === "light" ? "#DADADA" : "#1A1A1A",
          color: currentTheme === "light" ? "#1A1A1A" : "#DADADA",
        }}
      ></textarea>
      <div className={classes.divider}></div>
      <div className={classes.radios}>
        {radiosInfo.map((radio) => {
          return (
            <RadioGroup
              content={radio.label}
              radios={radio.radios}
              key={radio.label}
              holderForNow={(value: string) =>
                dispatch({
                  type: radio.type as keyof TApplication,
                  payload: value,
                })
              }
            />
          );
        })}
      </div>
      <Typography variant="subtitle2" className={classes.error}>
        {error}
      </Typography>
      <div className={classes.is_applying} onClick={handleApplication}>
        <CustomButton
          content="Submit Application"
          pdR={3}
          pdT={1}
          state={isApplying}
        />
      </div>
    </FormControl>
  );
}
