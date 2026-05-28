"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Gauge,
  Loader2,
  Quote,
  SearchCheck,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react";

type AnalysisResult = {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  summary: string;
  questions: string[];
};

const initialResume = `Senior Frontend Engineer with 6+ years of experience building scalable SaaS products using React, Next.js, TypeScript, Tailwind CSS, and GraphQL.

Led frontend architecture for an analytics platform serving enterprise HR teams. Built reusable design systems, improved Core Web Vitals, and collaborated closely with product, design, and backend teams.

Experience integrating AI-assisted workflows, dashboards, data visualization, authentication, and role-based access control.`;

const initialJobDescription = `We are hiring a Senior Full-Stack Engineer to build AI-powered recruiting workflows for an ATS SaaS platform.

The ideal candidate has strong experience with Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, AI integrations, analytics dashboards, and scalable product architecture.

Experience with LLM APIs, prompt engineering, background jobs, and enterprise SaaS security is highly preferred.`;

const mockResult: AnalysisResult = {
  score: 84,
  matchedSkills: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "AI Workflows",
    "Analytics Dashboards",
    "SaaS Architecture",
    "Design Systems",
  ],
  missingSkills: [
    "PostgreSQL",
    "Background Jobs",
    "Enterprise Security",
    "Prompt Evaluation",
  ],
  summary:
    "The candidate is a strong match for the role, with excellent frontend architecture experience and direct exposure to AI-assisted SaaS workflows. Their background in dashboards, design systems, and cross-functional product delivery aligns well with the core responsibilities of the position. The main gaps are deeper backend ownership, database design, and production-grade AI evaluation practices.",
  questions: [
    "Can you describe a time you integrated an AI feature into a production workflow?",
    "How would you design the data model for storing resume analysis results and audit history?",
    "What tradeoffs would you consider when moving AI analysis from a synchronous request to a background job?",
    "How would you evaluate and monitor the quality of LLM-generated candidate recommendations?",
  ],
};

function CircularScore({ score }: { score: number }) {
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative grid size-44 place-items-center">
      <svg className="size-44 -rotate-90" viewBox="0 0 152 152" aria-hidden="true">
        <circle
          cx="76"
          cy="76"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
          className="text-slate-200"
        />
        <circle
          cx="76"
          cy="76"
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="13"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="45%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute text-center">
        <div className="text-5xl font-semibold tracking-tight text-slate-950">
          {score}%
        </div>
        <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Match
        </div>
      </div>
    </div>
  );
}

function SkillBadge({
  children,
  tone,
}: {
  children: string;
  tone: "green" | "amber";
}) {
  const styles =
    tone === "green"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-amber-200 bg-amber-50 text-amber-700";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${styles}`}
    >
      {tone === "green" ? (
        <Check className="size-3.5" />
      ) : (
        <XCircle className="size-3.5" />
      )}
      {children}
    </span>
  );
}

function SignalCard({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700">
          <Icon className="size-4" />
        </div>
        <span className="text-xs font-medium text-emerald-600">{detail}</span>
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight text-slate-950">
        {value}
      </div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}

export default function ResumeMatcherPage() {
  const [resume, setResume] = useState(initialResume);
  const [jobDescription, setJobDescription] = useState(initialJobDescription);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(mockResult);

  const canAnalyze = useMemo(() => {
    return resume.trim().length > 20 && jobDescription.trim().length > 20;
  }, [resume, jobDescription]);

  async function analyzeCandidate() {
    if (!canAnalyze) return;

    setIsAnalyzing(true);

    // Swap this block with a real route when ready:
    // const response = await fetch("/api/analyze", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ resume, jobDescription }),
    // });
    // const data = await response.json();
    // setResult(data);

    await new Promise((resolve) => setTimeout(resolve, 1400));

    setResult({
      ...mockResult,
      score: Math.floor(78 + Math.random() * 14),
    });

    setIsAnalyzing(false);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f8fb] text-slate-950">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.18),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(247,248,251,0))]" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-7 border-b border-slate-200 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm">
              <Sparkles className="size-4 text-indigo-500" />
              AI Recruiting Intelligence
            </div>

            <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Resume Matcher & Analytics Dashboard
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Compare candidate resumes against target roles, surface skill gaps,
              and generate structured interview signals with an AI-ready workflow.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-sm backdrop-blur">
            {[
              ["AI Fit", `${result.score}%`],
              ["Skills", `${result.matchedSkills.length}/12`],
              ["Gaps", `${result.missingSkills.length}`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl px-4 py-3 text-center">
                <div className="text-lg font-semibold text-slate-950">{value}</div>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-semibold text-slate-950">
                  <FileSearch className="size-5 text-indigo-500" />
                  Candidate Resume
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Paste the candidate profile, resume, or LinkedIn summary.
                </p>
              </div>
              <BadgeCheck className="size-5 text-emerald-500" />
            </div>

            <textarea
              value={resume}
              onChange={(event) => setResume(event.target.value)}
              className="min-h-72 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              placeholder="Paste resume here..."
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 font-semibold text-slate-950">
                  <Target className="size-5 text-emerald-500" />
                  Target Job Description
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Add responsibilities, requirements, and preferred skills.
                </p>
              </div>
              <BriefcaseBusiness className="size-5 text-slate-500" />
            </div>

            <textarea
              value={jobDescription}
              onChange={(event) => setJobDescription(event.target.value)}
              className="min-h-72 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              placeholder="Paste job description here..."
            />
          </div>
        </section>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={analyzeCandidate}
            disabled={!canAnalyze || isAnalyzing}
            className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Analyzing Candidate
              </>
            ) : (
              <>
                <Brain className="size-5" />
                Analyze Candidate with AI
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
              </>
            )}
          </button>
          <p className="text-xs font-medium text-slate-500">
            Mock AI latency included. Ready to connect to /api/analyze.
          </p>
        </div>

        <section className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-slate-950">Overall Match</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Weighted fit across skills, experience, and role context.
                </p>
              </div>
              <div className="rounded-full bg-indigo-50 p-2 text-indigo-600">
                <Zap className="size-5" />
              </div>
            </div>

            <div className="flex justify-center">
              <CircularScore score={result.score} />
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <SignalCard
                icon={SearchCheck}
                label="Matched signals"
                value={String(result.matchedSkills.length)}
                detail="+ high confidence"
              />
              <SignalCard
                icon={ShieldAlert}
                label="Priority gaps"
                value={String(result.missingSkills.length)}
                detail="review"
              />
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-emerald-500" />
                  <h2 className="font-semibold text-slate-950">
                    Keyword Alignment
                  </h2>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  <TrendingUp className="size-3.5" />
                  ATS ready
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">
                    Matched Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.matchedSkills.map((skill) => (
                      <SkillBadge key={skill} tone="green">
                        {skill}
                      </SkillBadge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold text-slate-700">
                    Missing Critical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {result.missingSkills.map((skill) => (
                      <SkillBadge key={skill} tone="amber">
                        {skill}
                      </SkillBadge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <Quote className="size-5 text-indigo-500" />
                <h2 className="font-semibold text-slate-950">
                  AI Executive Summary
                </h2>
              </div>

              <blockquote className="rounded-xl border-l-4 border-indigo-500 bg-indigo-50/70 px-5 py-4 text-sm leading-7 text-slate-700">
                {result.summary}
              </blockquote>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <ClipboardList className="size-5 text-slate-700" />
                <h2 className="font-semibold text-slate-950">
                  Suggested Interview Questions
                </h2>
              </div>

              <div className="grid gap-3">
                {result.questions.map((question, index) => (
                  <div
                    key={question}
                    className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="grid size-6 shrink-0 place-items-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-700">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
