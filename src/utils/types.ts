export type TContext = {
  mobileView?: boolean;
};

export type TJobDetail = {
  id?: number;
  company: string;
  title: string;
  location: string;
  departement?: string;
  employment_type: "PLJ" | "PLE";
  job_details?: string;
};

export type TInputType = "username" | "password";

export type TEntry = {
  id?: number;
  company: string;
  title: string;
  employment_type: "PLJ" | "PLE";
  location: string;
  departement?: string;
  job_description: string;
};

export type TApplication = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
  country: string;
  date?: string | null;
  pay?: string | null;
  education?: string | null;
  languageProficiency?: string | null;
  hearingAboutUs?: string | null;
  driverLicense?: "NO" | "Japanese" | "International" | null;
  visaType?: "H" | "JWVA" | "JWV" | "JN" | null;
  smoke?: boolean | null;
  criminal?: boolean | null;
  feedback?: string | null;
};

export type TRadio = {
  label: string;
  radios: string[];
};
