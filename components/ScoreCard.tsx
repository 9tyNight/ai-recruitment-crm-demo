import type { Candidate } from "@/lib/types";

export function ScoreCard({ candidate }: { candidate: Candidate }) {
  const strong = candidate.evidence.filter((item) => item.status === "strong").length;
  const partial = candidate.evidence.filter((item) => item.status === "partial").length;
  const missing = candidate.evidence.filter((item) => item.status === "missing").length;

  return (
    <section className="panel score-card">
      <h2>Match explanation</h2>
      <p>Alignment across the role&apos;s key requirements.</p>
      <div className="score-ring" style={{ "--score": `${candidate.match * 3.6}deg` } as React.CSSProperties}>
        <div><strong>{candidate.match}</strong><span>/100</span></div>
      </div>
      <div className="score-legend">
        <span><i className="strong-dot" />Matched <b>{strong}</b></span>
        <span><i className="partial-dot" />Partial <b>{partial}</b></span>
        <span><i className="missing-dot" />Missing <b>{missing}</b></span>
      </div>
      <div className="skill-list">
        <h3>Top skills</h3>
        {candidate.strengths.map((strength) => <span key={strength}><i />{strength}</span>)}
      </div>
    </section>
  );
}
