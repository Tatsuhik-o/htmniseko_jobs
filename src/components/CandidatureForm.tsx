import { makeStyles } from "@mui/styles";
import Input from "./Input";
import type { TApplication } from "../utils/types";
import { useContext, useReducer } from "react";
import { AppContext } from "../utils/context";
import { countries } from "../utils/helpers";

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
  const classes = useStyle({ mobileView });

  return (
    <div className={classes.candidature_form}>
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
    </div>
  );
}
