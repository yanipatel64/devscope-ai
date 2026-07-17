"use client";

import { useAnalysis } from "@/context/AnalysisContext";
import IntelligenceDashboard from "./IntelligenceDashboard";

export default function Dashboard() {
  const { analysis } = useAnalysis();

  if (!analysis) {
    return null;
  }

  return <IntelligenceDashboard data={analysis} />;
}