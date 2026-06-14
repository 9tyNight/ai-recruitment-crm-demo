import { AlertCircle, ArrowRight } from "lucide-react";
import type { Candidate } from "@/lib/types";

export function InsightRail({ candidate }: { candidate: Candidate }) {
  return (
    <div className="insight-rail">
      <section className="panel risk-card">
        <h2>Risks / gaps</h2>
        <ul>
          {candidate.risks.map((risk) => (
            <li key={risk}><AlertCircle aria-hidden="true" /><span>{risk}</span></li>
          ))}
        </ul>
        <button className="text-link">View full analysis <ArrowRight /></button>
      </section>
      <section className="panel interview-card">
        <h2>Interview plan</h2>
        <ol>
          {candidate.interviewPlan.map((step, index) => (
            <li key={step.title}>
              <b>{index + 1}</b><span>{step.title}</span><small>{step.duration}</small>
            </li>
          ))}
        </ol>
        <button className="text-link">Edit interview plan <ArrowRight /></button>
      </section>
    </div>
  );
}
