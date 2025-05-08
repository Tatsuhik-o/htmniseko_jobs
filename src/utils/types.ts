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
