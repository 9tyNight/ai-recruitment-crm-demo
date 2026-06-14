import { Check, FileText, Minus } from "lucide-react";
import type { Candidate, EvidenceStatus } from "@/lib/types";

const statusLabel: Record<EvidenceStatus, string> = {
  strong: "Strong match",
  partial: "Partial match",
  missing: "No match",
};

export function EvidenceThread({ candidate }: { candidate: Candidate }) {
  return (
    <section className="panel evidence-panel">
      <h2>Evidence thread</h2>
      <div className="evidence-head">
        <span>Job requirement</span><span>Evidence</span><span>Source</span>
      </div>
      <div className="evidence-list">
        {candidate.evidence.map((evidence) => (
          <article className={`evidence-row ${evidence.status}`} key={evidence.requirement}>
            <div className="requirement">{evidence.requirement}</div>
            <div className="thread-marker" aria-hidden="true">
              {evidence.status === "missing" ? <Minus /> : <Check />}
            </div>
            <div className="evidence-copy">
              <p>{evidence.detail}</p>
              <span>{statusLabel[evidence.status]}</span>
            </div>
            <div className="source"><FileText aria-hidden="true" />{evidence.source}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
