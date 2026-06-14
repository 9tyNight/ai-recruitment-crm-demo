"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { CheckCircle2, Menu, Search } from "lucide-react";
import { CandidateDetail } from "@/components/CandidateDetail";
import { CandidateList } from "@/components/CandidateList";
import { Sidebar } from "@/components/Sidebar";
import { candidates as seedCandidates, roles } from "@/lib/data";
import type { Candidate, Stage } from "@/lib/types";

export default function ShortlistDashboard() {
  const [candidates, setCandidates] = useState(seedCandidates);
  const [selectedId, setSelectedId] = useState(seedCandidates[0].id);
  const [selectedRole, setSelectedRole] = useState(roles[0].id);
  const [selectedStage, setSelectedStage] = useState<Stage | "All stages">("All stages");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("Overview");
  const [isPipelineOpen, setIsPipelineOpen] = useState(false);
  const [toast, setToast] = useState("");
  const deferredSearch = useDeferredValue(search);

  const filteredCandidates = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();
    return candidates.filter((candidate) => {
      const stageMatches = selectedStage === "All stages" || candidate.stage === selectedStage;
      const textMatches = !query || [
        candidate.name,
        candidate.role,
        candidate.location,
        candidate.stage,
        ...candidate.strengths,
      ].some((value) => value.toLowerCase().includes(query));
      return stageMatches && textMatches;
    });
  }, [candidates, deferredSearch, selectedStage]);

  const selectedCandidate = candidates.find((candidate) => candidate.id === selectedId) ?? candidates[0];

  function selectCandidate(id: string) {
    setSelectedId(id);
    setActiveTab("Overview");
    setIsPipelineOpen(false);
  }

  function advanceCandidate() {
    if (selectedCandidate.stage === "Interview" || selectedCandidate.stage === "Offer") return;
    const activity = {
      type: "advance" as const,
      title: "Advanced to interview",
      detail: "Stage changed from screen to interview.",
      time: "Just now",
    };
    setCandidates((current) => current.map((candidate): Candidate =>
      candidate.id === selectedCandidate.id
        ? { ...candidate, stage: "Interview", updated: "Just now", activity: [activity, ...candidate.activity] }
        : candidate
    ));
    setToast(`${selectedCandidate.name} advanced to interview`);
    window.setTimeout(() => setToast(""), 3200);
  }

  return (
    <main className="app-shell">
      <Sidebar />
      <CandidateList
        candidates={filteredCandidates}
        roles={roles}
        selectedRole={selectedRole}
        selectedStage={selectedStage}
        search={search}
        selectedId={selectedId}
        isMobileOpen={isPipelineOpen}
        onRoleChange={setSelectedRole}
        onStageChange={setSelectedStage}
        onSearchChange={setSearch}
        onSelect={selectCandidate}
        onClose={() => setIsPipelineOpen(false)}
      />
      <section className="workspace">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setIsPipelineOpen(true)} aria-label="Open candidate pipeline"><Menu /></button>
          <label className="global-search">
            <Search aria-hidden="true" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search candidates, skills, keywords..." />
            <kbd>⌘ K</kbd>
          </label>
          <div className="topbar-actions">
            <button aria-label="Add candidate">+</button>
            <button aria-label="Notifications">3</button>
            <button aria-label="Help">?</button>
            <span className="user-avatar">JL</span>
          </div>
        </header>
        <CandidateDetail candidate={selectedCandidate} activeTab={activeTab} onTabChange={setActiveTab} onAdvance={advanceCandidate} />
      </section>
      {isPipelineOpen ? <button className="mobile-scrim" onClick={() => setIsPipelineOpen(false)} aria-label="Close candidate pipeline" /> : null}
      <div className={`toast ${toast ? "visible" : ""}`} role="status" aria-live="polite">
        <CheckCircle2 />{toast}
      </div>
    </main>
  );
}
