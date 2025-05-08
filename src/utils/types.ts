export type TContext = {
  mobileView?: boolean;
};

export type TJobDetail = {
  company: string;
  title: string;
  location: string;
  departement?: string;
  employment_type: "PLJ" | "PLE";
  job_details: string;
};

export type TInputType = "username" | "password";

export type TEntry = {
  company: string;
  title: string;
  employment_type: "PLJ" | "PLE";
  location: string;
  departement?: string;
  job_description: string;
};
