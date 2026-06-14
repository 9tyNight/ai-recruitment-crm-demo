export type Stage = "Sourced" | "Screen" | "Interview" | "Offer";

export type EvidenceStatus = "strong" | "partial" | "missing";

export type Evidence = {
  requirement: string;
  detail: string;
  source: string;
  status: EvidenceStatus;
};

export type Activity = {
  type: "note" | "assessment" | "view" | "email" | "added" | "advance";
  title: string;
  detail: string;
  time: string;
};

export type Candidate = {
  id: string;
  name: string;
  initials: string;
  role: string;
  location: string;
  email: string;
  handle: string;
  stage: Stage;
  match: number;
  updated: string;
  accent: string;
  summary: string;
  strengths: string[];
  risks: string[];
  evidence: Evidence[];
  interviewPlan: { title: string; duration: string }[];
  activity: Activity[];
};

export type Role = {
  id: string;
  title: string;
  location: string;
  openSince: string;
};
