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
    backgroundColor: "#DADADA",
    color: "black",
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
    marginTop: "25px",
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
  const { mobileView } = useContext(AppContext);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [resume, setResume] = useState("No File Chosen");
  const [cover, setCover] = useState("No File Chosen");
  const classes = useStyle({ mobileView });
  const [isApplying, setIsApplying] = useState<boolean>(false);

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

  const handleApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    let timer: number = setTimeout(() => {
      setIsApplying(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  };

  interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
    target: HTMLInputElement & { files: FileList | null };
  }

  const handleResumeChange = (event: FileChangeEvent): void => {
    const file = event.target.files?.[0];
    setResume(file ? file.name : "No File Selected");
  };
  const handleCoverChange = (event: FileChangeEvent): void => {
    const file = event.target.files?.[0];
    setCover(file ? file.name : "No File Selected");
  };

  return (
    <form className={classes.candidature_form} onSubmit={handleApplication}>
      <div className={classes.group}>
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
      </div>
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
      <div className={classes.cover}>
        <label htmlFor="cover">Cover Letter*</label>
        <div className={classes.resume_input}>
          <input
            type="file"
            ref={coverInputRef}
            onChange={handleCoverChange}
            style={{ display: "none" }}
            id="cover"
          />
          <button onClick={handleCoverClick}>
            <Icon path={mdiUploadOutline} size={1} /> Choose File
          </button>
          <span>{cover}</span>
        </div>
      </div>
      <div className={classes.resume}>
        <label htmlFor="resume">Resume*</label>
        <div className={classes.resume_input}>
          <input
            type="file"
            ref={resumeInputRef}
            onChange={handleResumeChange}
            style={{ display: "none" }}
            id="resume"
          />
          <button onClick={handleResumeClick}>
            <Icon path={mdiUploadOutline} size={1} /> Choose File
          </button>
          <span>{resume}</span>
        </div>
      </div>
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
      ></textarea>
      <div className={classes.divider}></div>
      <div className={classes.radios}>
        {radiosInfo.map((radio) => {
          return (
            <RadioGroup
              content={radio.label}
              radios={radio.radios}
              key={radio.label}
            />
          );
        })}
      </div>
      <div className={classes.is_applying}>
        <CustomButton
          content="Submit Application"
          color="#ffffff"
          bgColor="#424242"
          pdR={3}
          pdT={1}
          state={isApplying}
        />
      </div>
    </form>
  );
}
