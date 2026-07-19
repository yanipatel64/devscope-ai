"use client";

import { useState } from "react";

import { exportPDF } from "./PDFExporter";
import { useAnalysis } from "@/context/AnalysisContext";

import ScoreCard from "./ScoreCard";
import RepositoryInfo from "./RepositoryInfo";
import RepositoryAnalytics from "./RepositoryAnalytics";
import RepositoryExplorer from "./RepositoryExplorer";
import ArchitectureDiagram from "./ArchitectureDiagram";
import AIRecommendations from "./AIRecommendations";
import MarkdownReport from "./MarkdownReport";
import LoadingOverlay from "./LoadingOverlay";
import DashboardSummary from "./DashboardSummary";
import ExecutiveSummary from "./ExecutiveSummary";
import RepositoryHero from "./RepositoryHero";
import AIInsights from "./AIInsights";

import type { AnalysisResult } from "@/types/repository";

export default function RepositoryAnalyzer() {
  const { setAnalysis } = useAnalysis();

  const [repoUrl, setRepoUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState("");

  const [result, setResult] =
    useState<AnalysisResult | null>(null);

  const scoreData = result
    ? [
        {
          name: "Health",
          score: result.scores.project_health,
        },
        {
          name: "Security",
          score: result.scores.security,
        },
        {
          name: "Architecture",
          score: result.scores.architecture,
        },
        {
          name: "Maintainability",
          score: result.scores.maintainability,
        },
      ]
    : [];

  const languageData = result
    ? Object.entries(
        result.repository_metrics.languages
      ).map(([name, value]) => ({
        name,
        value,
      }))
    : [];

  async function analyzeRepository() {
    if (!repoUrl.trim()) {
      alert("Enter GitHub repository URL");
      return;
    }

    setLoading(true);

    const steps = [
      "Scanning repository...",
      "Analyzing technologies...",
      "Running AI Engine...",
      "Generating report...",
    ];

    let i = 0;

    const timer = setInterval(() => {
      setStep(steps[i]);
      i = (i + 1) % steps.length;
    }, 1200);

    try {
      const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://devscope-ai-2tqa.onrender.com";

const response = await fetch(
  `${API_URL}/analyze?repo_url=${encodeURIComponent(repoUrl)}`
);

console.log("STATUS:", response.status);

const text = await response.text();

console.log("RAW RESPONSE:", text);

if (!response.ok) {
  throw new Error(text);
}

const data = JSON.parse(text);

console.log(data);

setResult(data.analysis);
setAnalysis(data.analysis);

    } catch (err) {
      console.error(err);

      alert("Unable to connect with DevScope AI Engine");
    } finally {
      clearInterval(timer);
      setLoading(false);
      setStep("");
    }
  }

  function downloadReport() {
  if (!result) return;

  exportPDF(result);
}

  return (
        <section className="min-h-screen px-6 py-24">

      <div className="mx-auto max-w-7xl">

        <div className="text-center">

          <p className="uppercase tracking-[0.3em] text-violet-400">
            AI Repository Intelligence
          </p>

          <h1 className="mt-4 text-5xl font-bold">
            Analyze Any GitHub Project
          </h1>

          <p className="mt-5 text-gray-400">
            Understand software projects with AI-powered engineering intelligence.
          </p>

        </div>

        <div className="mt-12 flex gap-4">

          <input
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="https://github.com/user/repository"
            className="flex-1 rounded-xl border border-gray-800 bg-gray-950 px-5 py-4 text-white outline-none"
          />

          <button
            onClick={analyzeRepository}
            disabled={loading}
            className="rounded-xl bg-violet-600 px-8 font-semibold transition hover:bg-violet-500 disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

        </div>

        {loading && (
  <LoadingOverlay step={step} />
)}

        {result && (

          <div className="mt-16 space-y-10">

              <ExecutiveSummary
  health={result.scores.project_health}
  security={result.scores.security}
  architecture={result.scores.architecture}
  maintainability={result.scores.maintainability}
  complexity={result.complexity}
/>

<AIInsights
  scores={result.scores}
/>


            <DashboardSummary
  repository={result.repository_info}
  metrics={result.repository_metrics}
/>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              <ScoreCard
                title="Project Health"
                score={result.scores.project_health}
                color="green"
                factors={result.score_factors?.project_health ?? []}
              />

              <ScoreCard
                title="Security"
                score={result.scores.security}
                color="blue"
                factors={result.score_factors?.security ?? []}
              />

              <ScoreCard
                title="Architecture"
                score={result.scores.architecture}
                color="purple"
                factors={result.score_factors?.architecture ?? []}
              />

              <ScoreCard
                title="Maintainability"
                score={result.scores.maintainability}
                color="orange"
                factors={result.score_factors?.maintainability ?? []}
              />

            </div>

            <RepositoryHero
  repository={result.repository_info}
  repoUrl={repoUrl}
  onDownload={downloadReport}
/>

            <RepositoryInfo
              repository={result.repository_info}
              metrics={result.repository_metrics}
            />

            <RepositoryAnalytics
    scores={result.scores}
    languages={result.repository_metrics.languages}
/>

            <RepositoryExplorer
              folders={result.repository_metrics.folder_structure}
              files={result.repository_metrics.important_files}
            />

            <ArchitectureDiagram
                architecture={result.repository_metrics.architecture_flow}
/>

            <AIRecommendations
              recommendations={result.recommendations}
            />

            <MarkdownReport
              markdown={result.ai_analysis}
            />

            <div className="flex justify-center">

              <button
                onClick={downloadReport}
                className="rounded-xl bg-violet-600 px-8 py-3 font-semibold transition hover:bg-violet-500"
              >
                Download AI Intelligence Report
              </button>

            </div>

          </div>

        )}

      </div>

    </section>
  );
}