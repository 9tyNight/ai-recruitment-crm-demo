import { ChevronDown, ListFilter, MapPin, Search, X } from "lucide-react";
import type { Candidate, Role, Stage } from "@/lib/types";

type CandidateListProps = {
  candidates: Candidate[];
  roles: Role[];
  selectedRole: string;
  selectedStage: Stage | "All stages";
  search: string;
  selectedId: string;
  isMobileOpen: boolean;
  onRoleChange: (role: string) => void;
  onStageChange: (stage: Stage | "All stages") => void;
  onSearchChange: (search: string) => void;
  onSelect: (id: string) => void;
  onClose: () => void;
};

const stageClass: Record<Stage, string> = {
  Sourced: "stage-sourced",
  Screen: "stage-screen",
  Interview: "stage-interview",
  Offer: "stage-offer",
};

export function CandidateList({
  candidates,
  roles,
  selectedRole,
  selectedStage,
  search,
  selectedId,
  isMobileOpen,
  onRoleChange,
  onStageChange,
  onSearchChange,
  onSelect,
  onClose,
}: CandidateListProps) {
  return (
    <section className={`candidate-rail ${isMobileOpen ? "mobile-open" : ""}`} aria-label="Candidate pipeline">
      <div className="mobile-rail-title">
        <strong>Candidate pipeline</strong>
        <button className="icon-button" onClick={onClose} aria-label="Close candidate list">
          <X />
        </button>
      </div>

      <div className="role-select-wrap">
        <select value={selectedRole} onChange={(event) => onRoleChange(event.target.value)} aria-label="Select role">
          {roles.map((role) => (
            <option value={role.id} key={role.id}>{role.title}</option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" />
      </div>

      <div className="mobile-search">
        <Search aria-hidden="true" />
        <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search candidates" />
      </div>

      <div className="pipeline-controls">
        <label>
          <span>Pipeline</span>
          <div className="select-control">
            <select value={selectedStage} onChange={(event) => onStageChange(event.target.value as Stage | "All stages")}>
              <option>All stages</option>
              <option>Sourced</option>
              <option>Screen</option>
              <option>Interview</option>
              <option>Offer</option>
            </select>
            <ChevronDown aria-hidden="true" />
          </div>
        </label>
        <button className="filter-button" aria-label="Filter candidates"><ListFilter /></button>
      </div>

      <div className="list-heading"><span>Candidate</span><span>Match ↓</span></div>
      <div className="candidate-list">
        {candidates.map((candidate) => (
          <button
            key={candidate.id}
            className={`candidate-row ${candidate.id === selectedId ? "selected" : ""}`}
            onClick={() => onSelect(candidate.id)}
            aria-current={candidate.id === selectedId ? "true" : undefined}
          >
            <span className="avatar" style={{ background: candidate.accent }}>{candidate.initials}</span>
            <span className="candidate-copy">
              <strong>{candidate.name}</strong>
              <span>{candidate.role}</span>
              <span><MapPin aria-hidden="true" /> {candidate.location}</span>
              <small className={stageClass[candidate.stage]}>{candidate.stage}</small>
            </span>
            <span className="candidate-score">
              <strong>{candidate.match}</strong>
              <small>{candidate.updated}</small>
            </span>
          </button>
        ))}
        {candidates.length === 0 ? (
          <div className="empty-state">
            <Search aria-hidden="true" />
            <strong>No candidates found</strong>
            <span>Try a different name, skill, or pipeline stage.</span>
          </div>
        ) : null}
      </div>
      <div className="list-footer">{candidates.length} candidate{candidates.length === 1 ? "" : "s"}</div>
    </section>
  );
}
