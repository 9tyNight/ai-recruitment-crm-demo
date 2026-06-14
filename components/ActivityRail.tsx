import { Check, Eye, Mail, MessageSquareText, Plus, TrendingUp } from "lucide-react";
import type { Activity, Candidate } from "@/lib/types";

const activityIcon = {
  note: MessageSquareText,
  assessment: Check,
  view: Eye,
  email: Mail,
  added: Plus,
  advance: TrendingUp,
};

export function ActivityRail({ candidate }: { candidate: Candidate }) {
  return (
    <aside className="activity-rail" aria-label="Candidate activity">
      <h2>Activity</h2>
      <select aria-label="Filter activity"><option>All activity</option><option>Notes</option><option>Emails</option></select>
      <div className="timeline">
        {candidate.activity.map((activity: Activity, index) => {
          const Icon = activityIcon[activity.type];
          return (
            <article key={`${activity.title}-${index}`}>
              <span className={`timeline-icon ${activity.type}`}><Icon aria-hidden="true" /></span>
              <div>
                <strong>{activity.title}</strong>
                <time>{activity.time}</time>
                <p>{activity.detail}</p>
              </div>
            </article>
          );
        })}
      </div>
      <button className="secondary-button">View all activity</button>
    </aside>
  );
}
