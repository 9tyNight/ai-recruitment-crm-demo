import { ArrowRight, BriefcaseBusiness, ChevronDown, Mail, MapPin, MoreVertical, Star, UserRound } from "lucide-react";
import type { Candidate } from "@/lib/types";
import { ActivityRail } from "./ActivityRail";
import { EvidenceThread } from "./EvidenceThread";
import { InsightRail } from "./InsightRail";
import { ScoreCard } from "./ScoreCard";

const tabs = ["Overview", "Resume", "Experience", "Projects", "Assessments", "Notes", "Activity"];

type CandidateDetailProps = {
  candidate: Candidate;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onAdvance: () => void;
};

function PlaceholderTab({ tab, candidate }: { tab: string; candidate: Candidate }) {
  const content: Record<string, string> = {
    Resume: `${candidate.name}'s profile highlights ${candidate.strengths.slice(0, 3).join(", ")}. The structured resume view would connect to the ATS document store in production.`,
    Experience: `Experience is weighted against role scope, ownership, technical depth, and evidence of impact. ${candidate.name} currently has a ${candidate.match}% overall match.`,
    Projects: `Selected project evidence is incorporated into the match thread so reviewers can trace each claim back to its source.`,
    Assessments: `Assessment results are combined with resume evidence without replacing recruiter judgment. Scores and reviewer notes remain separately auditable.`,
    Notes: `The notes workspace keeps hiring-team context attached to the candidate record and visible in the activity history.`,
    Activity: `All candidate interactions, stage changes, reviews, and outbound communication appear in the activity rail.`,
  };
  return (
    <section className="tab-placeholder panel">
      <span>{tab}</span>
      <h2>{candidate.name}&apos;s {tab.toLowerCase()}</h2>
      <p>{content[tab]}</p>
    </section>
  );
}

export function CandidateDetail({ candidate, activeTab, onTabChange, onAdvance }: CandidateDetailProps) {
  return (
    <section className="detail-shell">
      <header className="candidate-header">
        <div className="candidate-title">
          <div>
            <h1>{candidate.name}</h1>
            <button aria-label="Favorite candidate"><Star /></button>
            <button aria-label="More candidate actions"><MoreVertical /></button>
          </div>
          <p>
            <span><BriefcaseBusiness />{candidate.role}</span>
            <span><MapPin />{candidate.location}</span>
            <span><UserRound />{candidate.handle}</span>
            <span><Mail />{candidate.email}</span>
          </p>
        </div>
        <div className="header-actions">
          <div className="overall-score"><span>Overall match</span><strong>{candidate.match}</strong><small>/100</small></div>
          <button className="advance-button" onClick={onAdvance} disabled={candidate.stage === "Interview" || candidate.stage === "Offer"}>
            {candidate.stage === "Interview" || candidate.stage === "Offer" ? "Interview stage" : "Advance to interview"}
            <ArrowRight />
          </button>
          <button className="action-menu" aria-label="More stage actions"><ChevronDown /></button>
        </div>
      </header>

      <nav className="tabs" aria-label="Candidate details">
        {tabs.map((tab) => (
          <button key={tab} className={activeTab === tab ? "active" : ""} onClick={() => onTabChange(tab)}>{tab}</button>
        ))}
      </nav>

      <div className="detail-and-activity">
        <div className="detail-content">
          {activeTab === "Overview" ? (
            <>
              <div className="overview-grid">
                <ScoreCard candidate={candidate} />
                <EvidenceThread candidate={candidate} />
                <InsightRail candidate={candidate} />
              </div>
              <section className="summary-panel panel">
                <h2>Summary</h2><p>{candidate.summary}</p>
              </section>
            </>
          ) : <PlaceholderTab tab={activeTab} candidate={candidate} />}
        </div>
        <ActivityRail candidate={candidate} />
      </div>
    </section>
  );
}
